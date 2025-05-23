import { createFileRoute } from "@tanstack/react-router";

import { RegisterForm } from "@/web/components/authentication/RegisterForm";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
