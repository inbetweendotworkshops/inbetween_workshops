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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import type { ScheduleEvent } from "@/lib/types";

const EMPTY: Omit<ScheduleEvent, "id"> = {
  workshop_title: "",
  date: "",
  time: "",
  location: "",
  price_label: "",
  seats_total: 12,
  status: "open",
  description: "",
  image_url: "",
  is_featured: false,
  sort_order: 0,
};

export function ScheduleManager({ initial }: { initial: ScheduleEvent[] }) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ScheduleEvent | null>(null);
  const [draft, setDraft] = useState<Omit<ScheduleEvent, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  function openNew() {
    setEditing(null);
    setDraft({ ...EMPTY, sort_order: items.length });
    setOpen(true);
  }

  function openEdit(event: ScheduleEvent) {
    setEditing(event);
    setDraft(event);
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const res = await fetch(
      editing ? `/api/admin/schedule/${editing.id}` : "/api/admin/schedule",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      },
    );
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save the session");
      return;
    }
    const saved: ScheduleEvent = await res.json();
    setItems((prev) =>
      editing
        ? prev.map((e) => (e.id === saved.id ? saved : e))
        : [...prev, saved],
    );
    toast.success(editing ? "Session updated" : "Session added");
    setOpen(false);
  }

  async function handleDelete(event: ScheduleEvent) {
    if (!confirm(`Delete "${event.workshop_title}"? This can't be undone.`))
      return;
    const res = await fetch(`/api/admin/schedule/${event.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Couldn't delete the session");
      return;
    }
    setItems((prev) => prev.filter((e) => e.id !== event.id));
    toast.success("Session deleted");
  }

  async function move(event: ScheduleEvent, direction: -1 | 1) {
    const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
    const index = sorted.findIndex((e) => e.id === event.id);
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[swapIndex];
    const [aOrder, bOrder] = [b.sort_order, a.sort_order];

    await Promise.all([
      fetch(`/api/admin/schedule/${a.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: aOrder }),
      }),
      fetch(`/api/admin/schedule/${b.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: bOrder }),
      }),
    ]);

    setItems((prev) =>
      prev.map((e) => {
        if (e.id === a.id) return { ...e, sort_order: aOrder };
        if (e.id === b.id) return { ...e, sort_order: bOrder };
        return e;
      }),
    );
  }

  const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={openNew} className="w-fit gap-2">
        <Plus className="size-4" />
        Add session
      </Button>

      <div className="flex flex-col gap-3">
        {sorted.map((event, i) => (
          <Card key={event.id}>
            <CardContent className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={i === 0}
                  onClick={() => move(event, -1)}
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  disabled={i === sorted.length - 1}
                  onClick={() => move(event, 1)}
                >
                  <ArrowDown className="size-3.5" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{event.workshop_title}</p>
                  <Badge variant="secondary">{event.status}</Badge>
                  {event.is_featured ? (
                    <Badge className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.date} · {event.time} · {event.location}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(event)}>
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(event)}
              >
                <Trash2 className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No sessions yet — add your first one above.
          </p>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit session" : "Add session"}</DialogTitle>
          </DialogHeader>
          <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-title">Workshop title</Label>
              <Input
                id="s-title"
                value={draft.workshop_title}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, workshop_title: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="s-date">Date</Label>
                <Input
                  id="s-date"
                  placeholder="5 Sep 2026"
                  value={draft.date}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, date: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="s-time">Time</Label>
                <Input
                  id="s-time"
                  placeholder="3:30 PM"
                  value={draft.time}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, time: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-location">Location</Label>
              <Input
                id="s-location"
                value={draft.location}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, location: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="s-price">Price label</Label>
                <Input
                  id="s-price"
                  placeholder="₹1,800 · all materials included"
                  value={draft.price_label}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, price_label: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="s-seats">Seats</Label>
                <Input
                  id="s-seats"
                  type="number"
                  min={1}
                  value={draft.seats_total}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      seats_total: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-description">Description</Label>
              <Textarea
                id="s-description"
                rows={3}
                value={draft.description}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, description: e.target.value }))
                }
              />
            </div>
            <ImageUrlField
              id="s-image"
              label="Image URL"
              value={draft.image_url}
              onChange={(v) => setDraft((d) => ({ ...d, image_url: v }))}
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="s-status">Booking status</Label>
              <Select
                value={draft.status}
                onValueChange={(v) =>
                  setDraft((d) => ({
                    ...d,
                    status: v as ScheduleEvent["status"],
                  }))
                }
              >
                <SelectTrigger id="s-status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Booking open</SelectItem>
                  <SelectItem value="waitlist">Waitlist</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2">
              <div>
                <p className="text-sm font-medium">Featured as &quot;Next up&quot;</p>
                <p className="text-xs text-muted-foreground">
                  Shown at the top of the Schedule page.
                </p>
              </div>
              <Switch
                checked={draft.is_featured}
                onCheckedChange={(v) =>
                  setDraft((d) => ({ ...d, is_featured: v }))
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
