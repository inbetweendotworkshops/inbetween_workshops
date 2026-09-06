"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import type { InstagramGalleryItem } from "@/lib/types";

const EMPTY: Omit<InstagramGalleryItem, "id"> = {
  image_url: "",
  link: "",
  sort_order: 0,
};

export function InstagramGalleryManager({
  initial,
}: {
  initial: InstagramGalleryItem[];
}) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<InstagramGalleryItem | null>(null);
  const [draft, setDraft] = useState<Omit<InstagramGalleryItem, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditing(null);
    setDraft({ ...EMPTY, sort_order: items.length });
    setOpen(true);
  }

  function openEdit(item: InstagramGalleryItem) {
    setEditing(item);
    setDraft(item);
    setOpen(true);
  }

  async function handleSave() {
    if (!draft.image_url.trim()) {
      toast.error("This tile needs an image URL");
      return;
    }
    setSaving(true);
    const res = await fetch(
      editing ? `/api/admin/instagram/${editing.id}` : "/api/admin/instagram",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      },
    );
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save the tile");
      return;
    }
    const saved: InstagramGalleryItem = await res.json();
    setItems((prev) =>
      editing
        ? prev.map((i) => (i.id === saved.id ? saved : i))
        : [...prev, saved],
    );
    toast.success(editing ? "Tile updated" : "Tile added");
    setOpen(false);
  }

  async function handleDelete(item: InstagramGalleryItem) {
    if (!confirm("Delete this tile? This can't be undone.")) return;
    const res = await fetch(`/api/admin/instagram/${item.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Couldn't delete the tile");
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    toast.success("Tile deleted");
  }

  async function move(item: InstagramGalleryItem, direction: -1 | 1) {
    const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
    const index = sorted.findIndex((i) => i.id === item.id);
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[swapIndex];
    const [aOrder, bOrder] = [b.sort_order, a.sort_order];

    await Promise.all([
      fetch(`/api/admin/instagram/${a.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: aOrder }),
      }),
      fetch(`/api/admin/instagram/${b.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: bOrder }),
      }),
    ]);

    setItems((prev) =>
      prev.map((i) => {
        if (i.id === a.id) return { ...i, sort_order: aOrder };
        if (i.id === b.id) return { ...i, sort_order: bOrder };
        return i;
      }),
    );
  }

  const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        The homepage shows the first 6 tiles below, in this order.
      </p>
      <Button onClick={openNew} className="w-fit gap-2">
        <Plus className="size-4" />
        Add tile
      </Button>

      <div className="flex flex-col gap-3">
        {sorted.map((item, i) => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={i === 0}
                  onClick={() => move(item, -1)}
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={i === sorted.length - 1}
                  onClick={() => move(item, 1)}
                >
                  <ArrowDown className="size-3.5" />
                </Button>
              </div>
              <div className="size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {i < 6 ? "Shown on homepage" : "Hidden (beyond first 6)"}
                </p>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {item.link || "No link set"}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(item)}
              >
                <Trash2 className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tiles yet — add your first one above.
          </p>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit tile" : "Add tile"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <ImageUrlField
              id="ig-image"
              label="Image URL"
              value={draft.image_url}
              onChange={(v) => setDraft((d) => ({ ...d, image_url: v }))}
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="ig-link">
                Link (the actual Instagram post URL, optional)
              </Label>
              <Input
                id="ig-link"
                placeholder="https://www.instagram.com/p/…"
                value={draft.link}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, link: e.target.value }))
                }
              />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-fit">
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
