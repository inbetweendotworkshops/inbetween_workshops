import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("stories")
    .select("slug")
    .eq("id", id)
    .single();

  const { data, error } = await supabase
    .from("stories")
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath(`/stories/${data.slug}`);
  if (existing && existing.slug !== data.slug) {
    revalidatePath(`/stories/${existing.slug}`);
  }
  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("stories")
    .select("slug")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("stories").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/stories");
  if (existing) revalidatePath(`/stories/${existing.slug}`);
  return NextResponse.json({ ok: true });
}
