"use server";

export type ContactState = {
  success?: boolean;
  error?: string;
} | null;

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return { error: "Contact form is not configured yet. Please email me directly at mehrahoney638@gmail.com." };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio message from ${name}`,
        from_name: name,
        email,
        message,
        botcheck: false,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return { error: "Failed to send. Please email me directly at mehrahoney638@gmail.com." };
    }

    return { success: true };
  } catch {
    return { error: "Network error. Please email me directly at mehrahoney638@gmail.com." };
  }
}
