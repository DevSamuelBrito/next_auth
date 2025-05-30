import { EmailTemplate } from "@/components/emails/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", 
      to: [process.env.PERSONAL_EMAIL as string],          
      subject: "Hello world",
        react: <EmailTemplate firstName="John" />
    });

    if (error) {
      return new NextResponse("Failed to send email", { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Failed to send email", { status: 500 });
  }
}
