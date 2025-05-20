import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@/web/components/authentication/SignUpForm";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
