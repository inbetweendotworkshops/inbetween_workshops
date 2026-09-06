"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import type { HeroSection } from "@/lib/types";

export function HeroForm({ initial }: { initial: HeroSection }) {
  const [hero, setHero] = useState(initial);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof HeroSection>(key: K, value: HeroSection[K]) {
    setHero((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hero),
    });
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save the hero section");
      return;
    }
    toast.success("Home page hero updated");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={hero.heading}
          onChange={(e) => set("heading", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subheading">Subheading</Label>
        <Textarea
          id="subheading"
          rows={4}
          value={hero.subheading}
          onChange={(e) => set("subheading", e.target.value)}
        />
      </div>

      <ImageUrlField
        id="hero-image"
        label="Hero image URL"
        value={hero.image_url}
        onChange={(v) => set("image_url", v)}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="featured_date">Featured date</Label>
          <Input
            id="featured_date"
            value={hero.featured_date}
            onChange={(e) => set("featured_date", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="featured_time">Featured time</Label>
          <Input
            id="featured_time"
            value={hero.featured_time}
            onChange={(e) => set("featured_time", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="featured_location">Featured location</Label>
          <Input
            id="featured_location"
            value={hero.featured_location}
            onChange={(e) => set("featured_location", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="featured_title">
          Featured workshop title (used in the WhatsApp/Instagram message)
        </Label>
        <Input
          id="featured_title"
          value={hero.featured_title}
          onChange={(e) => set("featured_title", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="primary_cta_label">Primary button label</Label>
          <Input
            id="primary_cta_label"
            value={hero.primary_cta_label}
            onChange={(e) => set("primary_cta_label", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="secondary_cta_label">Secondary link label</Label>
          <Input
            id="secondary_cta_label"
            value={hero.secondary_cta_label}
            onChange={(e) => set("secondary_cta_label", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="secondary_cta_link">Secondary link target</Label>
          <Input
            id="secondary_cta_link"
            value={hero.secondary_cta_link}
            onChange={(e) => set("secondary_cta_link", e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" disabled={saving} className="w-fit">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
