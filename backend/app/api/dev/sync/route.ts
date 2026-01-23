import { NextResponse } from "next/server";
import { runOnceForDev } from '@/trigger/sync-store-data'

export async function POST() {
  await runOnceForDev();
  return NextResponse.json({ ok: true });
}
