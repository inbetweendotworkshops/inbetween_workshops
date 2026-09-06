"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import type { Story } from "@/lib/types";

const EMPTY: Omit<Story, "id"> = {
  title: "",
  published_date: "",
  excerpt: "",
  body: null,
  image_url: "",
  sort_order: 0,
};

export function StoriesManager({ initial }: { initial: Story[] }) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Story | null>(null);
  const [draft, setDraft] = useState<Omit<Story, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditing(null);
    setDraft({ ...EMPTY, sort_order: items.length });
    setOpen(true);
  }

  function openEdit(story: Story) {
    setEditing(story);
    setDraft(story);
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const res = await fetch(
      editing ? `/api/admin/stories/${editing.id}` : "/api/admin/stories",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      },
    );
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save the story");
      return;
    }
    const saved: Story = await res.json();
    setItems((prev) =>
      editing
        ? prev.map((s) => (s.id === saved.id ? saved : s))
        : [...prev, saved],
    );
    toast.success(editing ? "Story updated" : "Story added");
    setOpen(false);
  }

  async function handleDelete(story: Story) {
    if (!confirm(`Delete "${story.title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/admin/stories/${story.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Couldn't delete the story");
      return;
    }
    setItems((prev) => prev.filter((s) => s.id !== story.id));
    toast.success("Story deleted");
  }

  async function move(story: Story, direction: -1 | 1) {
    const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
    const index = sorted.findIndex((s) => s.id === story.id);
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[swapIndex];
    const [aOrder, bOrder] = [b.sort_order, a.sort_order];

    await Promise.all([
      fetch(`/api/admin/stories/${a.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: aOrder }),
      }),
      fetch(`/api/admin/stories/${b.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: bOrder }),
      }),
    ]);

    setItems((prev) =>
      prev.map((s) => {
        if (s.id === a.id) return { ...s, sort_order: aOrder };
        if (s.id === b.id) return { ...s, sort_order: bOrder };
        return s;
      }),
    );
  }

  const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={openNew} className="w-fit gap-2">
        <Plus className="size-4" />
        Add story
      </Button>

      <div className="flex flex-col gap-3">
        {sorted.map((story, i) => (
          <Card key={story.id}>
            <CardContent className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={i === 0}
                  onClick={() => move(story, -1)}
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={i === sorted.length - 1}
                  onClick={() => move(story, 1)}
                >
                  <ArrowDown className="size-3.5" />
                </Button>
              </div>
              <div className="size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                {story.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={story.image_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  {story.published_date}
                </p>
                <p className="font-medium">{story.title}</p>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {story.excerpt}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(story)}>
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(story)}
              >
                <Trash2 className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No stories yet — add your first one above.
          </p>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit story" : "Add story"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="st-title">Title</Label>
              <Input
                id="st-title"
                value={draft.title}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, title: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="st-date">Published date</Label>
              <Input
                id="st-date"
                placeholder="12 August 2026"
                value={draft.published_date}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, published_date: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="st-excerpt">Excerpt</Label>
              <Textarea
                id="st-excerpt"
                rows={3}
                value={draft.excerpt}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, excerpt: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="st-body">
                Full story body (optional — leave blank to show
                &quot;Full story coming soon&quot;)
              </Label>
              <Textarea
                id="st-body"
                rows={6}
                value={draft.body ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, body: e.target.value || null }))
                }
              />
            </div>
            <ImageUrlField
              id="st-image"
              label="Image URL"
              value={draft.image_url}
              onChange={(v) => setDraft((d) => ({ ...d, image_url: v }))}
            />
            <Button onClick={handleSave} disabled={saving} className="w-fit">
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
