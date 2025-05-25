import { createFileRoute } from "@tanstack/react-router";

import { SignupForm } from "@/web/components/authentication/SignupForm";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}
