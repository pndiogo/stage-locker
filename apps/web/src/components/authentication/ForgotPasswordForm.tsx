import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@stage-locker/types";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import type { RequestState } from "@/web/types/api";

import { useSendPasswordResetEmail } from "@/web/api/auth/send-password-reset-email/useSendPasswordResetEmail";
import { Button } from "@/web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
import { CardActionSuccess } from "@/web/components/ui/card-action-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/web/components/ui/form";
import { Input } from "@/web/components/ui/input";
import { Routes } from "@/web/types/router";

function ForgotPasswordForm() {
  const { t, i18n } = useTranslation();
  const [sendPasswordResetEmailState, setSendPasswordResetEmailState] = useState<RequestState>("idle");

  const { sendPasswordResetEmail, isPending: sendPasswordResetEmailIsPending } = useSendPasswordResetEmail();

  const formSchema = z.object({
    email: emailSchema({
      invalid: t("common.form.email.invalid"),
    }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  i18n.on("languageChanged", () => {
    form.reset();
  });

  async function onSubmit(values: FormSchema) {
    sendPasswordResetEmail({ body: values }, {
      onSuccess: () => {
        setSendPasswordResetEmailState("success");
      },
      onError: () => {
        form.setError("root", { type: "manual", message: t("common.error.generic") });
      },
    });
  }

  if (sendPasswordResetEmailState === "success") {
    return (
      <CardActionSuccess
        title={t("forgotPasswordForm.success.title")}
        description={t("forgotPasswordForm.success.description")}
        link={Routes.ROOT}
        linkText={t("page.home.title")}
      />
    );
  }

  return (
    <div className="flex">
      <Card className="mx-auto w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {t("forgotPasswordForm.title")}
          </CardTitle>
          <CardDescription>
            {t("forgotPasswordForm.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">
                        {t("common.form.email.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder={t(
                            "common.form.email.placeholder",
                          )}
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" loading={sendPasswordResetEmailIsPending}>
                  {t("forgotPasswordForm.submit")}
                </Button>

                {form.formState.errors.root && (
                  <div className="text-red-500 text-center text-sm">
                    {form.formState.errors.root?.message}
                  </div>
                )}
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t("forgotPasswordForm.signupPrompt")}
            {" "}
            <Link to={Routes.SIGNUP} className="underline">
              {t("forgotPasswordForm.signupLink")}
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            {t("forgotPasswordForm.loginPrompt")}
            {" "}
            <Link to={Routes.LOGIN} className="underline">
              {t("forgotPasswordForm.loginLink")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { ForgotPasswordForm };
