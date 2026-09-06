"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import type { Workshop } from "@/lib/types";

const EMPTY: Omit<Workshop, "id"> = {
  title: "",
  category: "",
  description: "",
  image_url: "",
  sort_order: 0,
  is_active: true,
};

export function WorkshopsManager({ initial }: { initial: Workshop[] }) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Workshop | null>(null);
  const [draft, setDraft] = useState<Omit<Workshop, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditing(null);
    setDraft({ ...EMPTY, sort_order: items.length });
    setOpen(true);
  }

  function openEdit(workshop: Workshop) {
    setEditing(workshop);
    setDraft(workshop);
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const res = await fetch(
      editing ? `/api/admin/workshops/${editing.id}` : "/api/admin/workshops",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      },
    );
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save the workshop");
      return;
    }
    const saved: Workshop = await res.json();
    setItems((prev) =>
      editing
        ? prev.map((w) => (w.id === saved.id ? saved : w))
        : [...prev, saved],
    );
    toast.success(editing ? "Workshop updated" : "Workshop added");
    setOpen(false);
  }

  async function handleDelete(workshop: Workshop) {
    if (!confirm(`Delete "${workshop.title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/admin/workshops/${workshop.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Couldn't delete the workshop");
      return;
    }
    setItems((prev) => prev.filter((w) => w.id !== workshop.id));
    toast.success("Workshop deleted");
  }

  async function move(workshop: Workshop, direction: -1 | 1) {
    const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
    const index = sorted.findIndex((w) => w.id === workshop.id);
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[swapIndex];
    const [aOrder, bOrder] = [b.sort_order, a.sort_order];

    await Promise.all([
      fetch(`/api/admin/workshops/${a.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: aOrder }),
      }),
      fetch(`/api/admin/workshops/${b.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: bOrder }),
      }),
    ]);

    setItems((prev) =>
      prev.map((w) => {
        if (w.id === a.id) return { ...w, sort_order: aOrder };
        if (w.id === b.id) return { ...w, sort_order: bOrder };
        return w;
      }),
    );
  }

  const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={openNew} className="w-fit gap-2">
        <Plus className="size-4" />
        Add workshop
      </Button>

      <div className="flex flex-col gap-3">
        {sorted.map((workshop, i) => (
          <Card key={workshop.id}>
            <CardContent className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={i === 0}
                  onClick={() => move(workshop, -1)}
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={i === sorted.length - 1}
                  onClick={() => move(workshop, 1)}
                >
                  <ArrowDown className="size-3.5" />
                </Button>
              </div>
              <div className="size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                {workshop.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={workshop.image_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  {workshop.category}
                  {!workshop.is_active ? " · Hidden" : ""}
                </p>
                <p className="font-medium">{workshop.title}</p>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {workshop.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openEdit(workshop)}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(workshop)}
              >
                <Trash2 className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No workshops yet — add your first one above.
          </p>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit workshop" : "Add workshop"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="w-title">Title</Label>
              <Input
                id="w-title"
                value={draft.title}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, title: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="w-category">Category</Label>
              <Input
                id="w-category"
                placeholder="Textile, Print, Home…"
                value={draft.category}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, category: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="w-description">Description</Label>
              <Textarea
                id="w-description"
                rows={3}
                value={draft.description}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, description: e.target.value }))
                }
              />
            </div>
            <ImageUrlField
              id="w-image"
              label="Image URL"
              value={draft.image_url}
              onChange={(v) => setDraft((d) => ({ ...d, image_url: v }))}
            />
            <div className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2">
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-xs text-muted-foreground">
                  Turn off to hide this workshop from the live site.
                </p>
              </div>
              <Switch
                checked={draft.is_active}
                onCheckedChange={(v) =>
                  setDraft((d) => ({ ...d, is_active: v }))
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
