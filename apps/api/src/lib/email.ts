import "dotenv/config";

import type { SupportedLanguagesCode } from "@stage-locker/types";

import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

import env from "@/api/env";

import { translations } from "./i18n";

async function sendEmail({
  email,
  templateId,
  subject,
  personalizationData,
}: {
  email: string;
  templateId: string;
  subject: string;
  personalizationData: Record<string, string>;
}) {
  const mailerSend = new MailerSend({
    apiKey: env.MAILERSEND_API_TOKEN,
  });

  const sentFrom = new Sender(env.MAILERSEND_EMAIL);

  const recipients = [new Recipient(email)];

  const personalization = [
    {
      email,
      data: {
        ...personalizationData,
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setTemplateId(templateId)
    .setSubject(subject)
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
  await sendEmail({
    email,
    templateId: env.MAILERSEND_TEMPLATE_1_ID,
    subject: translations[language].email.emailVerification.subject,
    personalizationData: {
      link: `${env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
      supportEmail: "support@stagelocker.com",
      ctaText: translations[language].email.emailVerification.ctaText,
      subText: translations[language].email.emailVerification.subText,
      topText: translations[language].email.emailVerification.topText,
      ctaLabel: translations[language].email.emailVerification.ctaLabel,
      bottomText: translations[language].email.emailVerification.bottomText,
      disclaimer: translations[language].email.emailVerification.disclaimer,
      footerText: translations[language].email.emailVerification.footerText,
      subHeading: translations[language].email.emailVerification.subHeading,
      topHeading: translations[language].email.emailVerification.topHeading,
      subTextBold: translations[language].email.emailVerification.subTextBold,
      bottomHeading: translations[language].email.emailVerification.bottomHeading,
      footerHeading: translations[language].email.emailVerification.footerHeading,
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
  await sendEmail({
    email,
    templateId: env.MAILERSEND_TEMPLATE_1_ID,
    subject: translations[language].email.passwordReset.subject,
    personalizationData: {
      link: `${env.FRONTEND_URL}/reset-password?token=${passwordResetToken}`,
      supportEmail: "support@stagelocker.com",
      ctaText: translations[language].email.passwordReset.ctaText,
      subText: translations[language].email.passwordReset.subText,
      topText: translations[language].email.passwordReset.topText,
      ctaLabel: translations[language].email.passwordReset.ctaLabel,
      bottomText: translations[language].email.passwordReset.bottomText,
      disclaimer: translations[language].email.passwordReset.disclaimer,
      footerText: translations[language].email.passwordReset.footerText,
      subHeading: translations[language].email.passwordReset.subHeading,
      topHeading: translations[language].email.passwordReset.topHeading,
      subTextBold: translations[language].email.passwordReset.subTextBold,
      bottomHeading: translations[language].email.passwordReset.bottomHeading,
      footerHeading: translations[language].email.passwordReset.footerHeading,
    },
  });
}
