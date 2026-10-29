import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/site-config";

const OBSERVATORY_SUPABASE_URL = "https://xffjtfdcwktwzignhgfz.supabase.co";
const OBSERVATORY_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmZmp0ZmRjd2t0d3ppZ25oZ2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4Mzc5NjgsImV4cCI6MjA4OTQxMzk2OH0.-cjFwY3TtUH5swyeDi4QrGTsmAtAN-bF_UQsB6a9M5w";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid work email address." },
        { status: 400 },
      );
    }

    const askEriBaseUrl = siteConfig.askEriHref.replace(/\/$/, "");
    let askEriMessage: string | undefined;
    let askEriOk = false;

    // 1. Forward subscription to Ask Eri (/api/engagement)
    try {
      const askRes = await fetch(`${askEriBaseUrl}/api/engagement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          kind: "subscription",
          email,
          organisation: "",
          question: "",
          consent: true,
          website: "",
          topics: ["signals", "longitudinal", "site"],
          preferences: {
            audience: "general",
            frequency: "weekly",
          },
        }),
      });

      const askData = (await askRes.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (askRes.ok) {
        askEriOk = true;
        askEriMessage = askData.message;
      }
    } catch (err) {
      console.warn("[Eri Subscribe] Ask Eri engagement endpoint error:", err);
    }

    // 2. Record in the shared Observatory / Ask Eri submissions table
    let observatoryOk = false;
    try {
      const sbRes = await fetch(
        `${OBSERVATORY_SUPABASE_URL}/rest/v1/submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: OBSERVATORY_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${OBSERVATORY_SUPABASE_ANON_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            email,
            source: "subscribe",
            company: null,
          }),
        },
      );
      if (sbRes.ok) {
        observatoryOk = true;
      }
    } catch (err) {
      console.warn("[Eri Subscribe] Observatory submissions insert error:", err);
    }

    if (!askEriOk && !observatoryOk) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to complete your subscription right now. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        askEriMessage ||
        "You're subscribed! You'll be notified when new Signals and field observations are published.",
    });
  } catch (error) {
    console.error("[Eri Subscribe Error]:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}

