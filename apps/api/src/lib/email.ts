import "dotenv/config";

import type { SupportedLanguagesCode } from "@stage-locker/types";

import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

import env from "@/api/env";

async function sendEmail({
  email,
  token,
  templateId,
  linkPath,
  personalizationData,
}: {
  email: string;
  token: string;
  templateId: string;
  linkPath: string;
  personalizationData: Record<string, string>;
}) {
  const mailerSend = new MailerSend({
    apiKey: env.MAILERSEND_API_TOKEN,
  });

  const sentFrom = new Sender(env.MAILERSEND_EMAIL);

  const recipients = [new Recipient(email)];

  const link = `${env.FRONTEND_URL}/${linkPath}?token=${token}`;

  const personalization = [
    {
      email,
      data: {
        ...personalizationData,
        support_email: "test@test.com", // TODO: add a real support email
        link,
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setTemplateId(templateId)
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);
}

export async function sendVerificationEmailToUser({
  email,
  verificationToken,
  language,
}: {
  email: string;
  verificationToken: string;
  language: SupportedLanguagesCode;
}) {
  let templateId;

  switch (language) {
    case "en-US":
      templateId = env.MAILERSEND_EN_VERIFY_EMAIL_TEMPLATE_ID;
      break;
    case "pt-PT":
      templateId = env.MAILERSEND_PT_VERIFY_EMAIL_TEMPLATE_ID;
      break;
    default:
      templateId = env.MAILERSEND_EN_VERIFY_EMAIL_TEMPLATE_ID;
      break;
  }

  await sendEmail({
    email,
    token: verificationToken,
    templateId,
    linkPath: "verify-email",
    personalizationData: {
      verify_email_link: `${env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
    },
  });
}

export async function sendPasswordResetEmailToUser({
  email,
  passwordResetToken,
  language,
}: {
  email: string;
  passwordResetToken: string;
  language: SupportedLanguagesCode;
}) {
  let templateId;

  switch (language) {
    case "en-US":
      templateId = env.MAILERSEND_EN_PASSWORD_RESET_TEMPLATE_ID;
      break;
    case "pt-PT":
      templateId = env.MAILERSEND_PT_PASSWORD_RESET_TEMPLATE_ID;
      break;
    default:
      templateId = env.MAILERSEND_EN_PASSWORD_RESET_TEMPLATE_ID;
      break;
  }

  await sendEmail({
    email,
    token: passwordResetToken,
    templateId,
    linkPath: "reset-password",
    personalizationData: {
      reset_password_link: `${env.FRONTEND_URL}/reset-password?token=${passwordResetToken}`,
    },
  });
}
