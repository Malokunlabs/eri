import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    // Validation
    if (!firstName?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Please enter your first name." },
        { status: 400 },
      );
    }

    if (!email?.trim() || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid work email address." },
        { status: 400 },
      );
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Please enter a message or inquiry." },
        { status: 400 },
      );
    }

    const fullName = [firstName.trim(), lastName?.trim()]
      .filter(Boolean)
      .join(" ");

    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const formspreeId = process.env.FORMSPREE_FORM_ID;
    const customEndpoint = process.env.CONTACT_FORM_ENDPOINT;

    // Option 1: Web3Forms
    if (web3FormsKey) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: fullName,
          email: email.trim(),
          message: message.trim(),
          subject: `New Project Inquiry from ${fullName} [Eri]`,
          from_name: "Eri Website",
          to_email: "info@useeri.com",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return NextResponse.json(
          {
            ok: false,
            error: data.message || "Failed to deliver message via Web3Forms.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Your message has been sent successfully.",
      });
    }

    // Option 2: Formspree
    if (formspreeId) {
      const formspreeUrl = formspreeId.startsWith("http")
        ? formspreeId
        : `https://formspree.io/f/${formspreeId}`;

      const res = await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email.trim(),
          message: message.trim(),
          _subject: `New Project Inquiry from ${fullName} [Eri]`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(
          {
            ok: false,
            error:
              (data as { error?: string }).error ||
              "Failed to deliver message via Formspree.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Your message has been sent successfully.",
      });
    }

    // Option 3: Custom endpoint
    if (customEndpoint) {
      const res = await fetch(customEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          firstName: firstName.trim(),
          lastName: lastName?.trim() || "",
          email: email.trim(),
          message: message.trim(),
          recipient: "info@useeri.com",
        }),
      });

      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Failed to forward submission to endpoint." },
          { status: 502 },
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Your message has been sent successfully.",
      });
    }

    // Fallback: If no external key is configured yet in environment,
    // log the submission to server console so developers can see it,
    // and instruct how to add the live key.
    console.info(
      "[Eri Contact Form] Submission to info@useeri.com:",
      JSON.stringify(
        {
          name: fullName,
          email: email.trim(),
          message: message.trim(),
          recipient: "info@useeri.com",
          timestamp: new Date().toISOString(),
        },
        null,
        2,
      ),
    );

    return NextResponse.json({
      ok: true,
      message:
        "Submission received! (Set WEB3FORMS_ACCESS_KEY or FORMSPREE_FORM_ID in .env.local to route live email delivery)",
    });
  } catch (error) {
    console.error("[Eri Contact Form Error]:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
