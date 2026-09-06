"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSettings } from "@/lib/types";

export function ScheduleVisibilityForm({ initial }: { initial: SiteSettings }) {
  const [settings, setSettings] = useState(initial);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        schedule_enabled: settings.schedule_enabled,
        schedule_empty_message: settings.schedule_empty_message,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save");
      return;
    }
    toast.success("Schedule visibility updated");
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Show events on the Schedule page</p>
            <p className="text-xs text-muted-foreground">
              Turn this off between events — the page will show the message
              below instead of your session list, without deleting any
              sessions.
            </p>
          </div>
          <Switch
            checked={settings.schedule_enabled}
            onCheckedChange={(v) =>
              setSettings((s) => ({ ...s, schedule_enabled: v }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="schedule-empty-message">
            Message shown when there are no events (or the toggle above is off)
          </Label>
          <Textarea
            id="schedule-empty-message"
            rows={2}
            value={settings.schedule_empty_message}
            onChange={(e) =>
              setSettings((s) => ({
                ...s,
                schedule_empty_message: e.target.value,
              }))
            }
          />
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-fit">
          {saving ? "Saving…" : "Save"}
        </Button>
      </CardContent>
    </Card>
  );
}
