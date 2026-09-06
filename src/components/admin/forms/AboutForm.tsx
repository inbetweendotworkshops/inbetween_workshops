"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import type { AboutPage } from "@/lib/types";

export function AboutForm({ initial }: { initial: AboutPage }) {
  const [about, setAbout] = useState(initial);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof AboutPage>(key: K, value: AboutPage[K]) {
    setAbout((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    });
    setSaving(false);
    if (!res.ok) {
      toast.error("Couldn't save the about page");
      return;
    }
    toast.success("About page updated");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="heading">Heading</Label>
        <Input
          id="heading"
          value={about.heading}
          onChange={(e) => set("heading", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="intro_paragraph">Intro paragraph</Label>
        <Textarea
          id="intro_paragraph"
          rows={3}
          value={about.intro_paragraph}
          onChange={(e) => set("intro_paragraph", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="story_paragraph">Story paragraph</Label>
        <Textarea
          id="story_paragraph"
          rows={4}
          value={about.story_paragraph}
          onChange={(e) => set("story_paragraph", e.target.value)}
        />
      </div>

      <ImageUrlField
        id="about-image"
        label="Photo URL"
        value={about.image_url}
        onChange={(v) => set("image_url", v)}
      />

      <div className="flex flex-col gap-4 border-t border-border/70 pt-4">
        <p className="text-sm font-medium">Three pillars</p>
        {(
          [
            ["pillar_1_title", "pillar_1_desc"],
            ["pillar_2_title", "pillar_2_desc"],
            ["pillar_3_title", "pillar_3_desc"],
          ] as const
        ).map(([titleKey, descKey], i) => (
          <div key={titleKey} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor={titleKey}>Pillar {i + 1} title</Label>
              <Input
                id={titleKey}
                value={about[titleKey]}
                onChange={(e) => set(titleKey, e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={descKey}>Pillar {i + 1} description</Label>
              <Input
                id={descKey}
                value={about[descKey]}
                onChange={(e) => set(descKey, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={saving} className="w-fit">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
