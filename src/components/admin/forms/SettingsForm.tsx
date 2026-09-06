"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SiteSettings } from "@/lib/types";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [settings, setSettings] = useState(initial);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save settings");
      return;
    }
    toast.success("Site settings updated");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="logo_text">Logo / site name (shown in the nav)</Label>
        <Input
          id="logo_text"
          value={settings.logo_text}
          onChange={(e) => set("logo_text", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="footer_tagline">Footer tagline</Label>
        <Input
          id="footer_tagline"
          value={settings.footer_tagline}
          onChange={(e) => set("footer_tagline", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact_email">Contact email</Label>
          <Input
            id="contact_email"
            type="email"
            value={settings.contact_email}
            onChange={(e) => set("contact_email", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="address_line">Address line</Label>
          <Input
            id="address_line"
            value={settings.address_line}
            onChange={(e) => set("address_line", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border/70 pt-4">
        <p className="text-sm font-medium">Booking links</p>
        <p className="text-sm text-muted-foreground">
          Every &quot;Book a seat&quot; button site-wide opens one of these.
        </p>

        <div className="flex flex-col gap-2">
          <Label htmlFor="primary_booking_method">Primary booking method</Label>
          <Select
            value={settings.primary_booking_method}
            onValueChange={(v) =>
              set(
                "primary_booking_method",
                v as SiteSettings["primary_booking_method"],
              )
            }
          >
            <SelectTrigger id="primary_booking_method" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whatsapp">WhatsApp DM</SelectItem>
              <SelectItem value="instagram">Instagram DM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="whatsapp_number">
              WhatsApp number (with country code, digits only)
            </Label>
            <Input
              id="whatsapp_number"
              placeholder="919876543210"
              value={settings.whatsapp_number}
              onChange={(e) => set("whatsapp_number", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="instagram_handle">Instagram handle</Label>
            <Input
              id="instagram_handle"
              placeholder="inbetweenworkshops"
              value={settings.instagram_handle}
              onChange={(e) => set("instagram_handle", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="instagram_url">
            Instagram profile URL (used by the &quot;Socials&quot; nav link)
          </Label>
          <Input
            id="instagram_url"
            value={settings.instagram_url}
            onChange={(e) => set("instagram_url", e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" disabled={saving} className="w-fit">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
