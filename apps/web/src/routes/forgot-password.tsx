import { createFileRoute } from "@tanstack/react-router";

import { ForgotPasswordForm } from "@/web/components/authentication/ForgotPasswordForm";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
}
