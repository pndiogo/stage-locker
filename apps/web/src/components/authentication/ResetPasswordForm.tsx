import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@stage-locker/types";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import type { RequestState } from "@/web/types/api";

import { useResetPassword } from "@/web/api/auth/reset-password/useResetPassword";
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
import { PasswordInput } from "@/web/components/ui/password-input";
import { Routes } from "@/web/types/router";

function ResetPasswordForm({ token }: { token: string }) {
  const { t, i18n } = useTranslation();
  const [passwordResetState, setPasswordResetState] = useState<RequestState>("idle");

  const { resetPassword, isPending: resetPasswordIsPending } = useResetPassword();

  const formSchema = z.object({
    password: passwordSchema({
      min: t("common.form.password.min"),
      uppercase: t("common.form.password.uppercase"),
      lowercase: t("common.form.password.lowercase"),
      number: t("common.form.password.number"),
      special: t("common.form.password.special"),
      max: t("common.form.password.max"),
      noSpaces: t("common.form.password.noSpaces"),
      noPassword: t("common.form.password.noPassword"),
    }),
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: t("common.form.confirmPassword.match"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  i18n.on("languageChanged", () => {
    form.reset();
  });

  async function onSubmit(values: FormSchema) {
    resetPassword({ body:
      {
        newPassword: values.password,
        token,
      } }, {
      onSuccess: () => {
        setPasswordResetState("success");
      },
      onError: (error) => {
        if (error.status === 401) {
          form.setError("root.expired", { type: "manual", message: t("resetPasswordForm.error.expired") });
        }
        else {
          form.setError("root", { type: "manual", message: t("common.error.generic") });
        }
      },
    });
  }

  if (passwordResetState === "success") {
    return (
      <CardActionSuccess
        title={t("resetPasswordForm.success.title")}
        description={t("resetPasswordForm.success.description")}
        link={Routes.LOGIN}
        linkText={t("page.login.title")}
      />
    );
  }

  return (
    <div className="flex">
      <Card className="mx-auto w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {t("resetPasswordForm.title")}
          </CardTitle>
          <CardDescription>
            {t("resetPasswordForm.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">
                        {t("common.form.password.label")}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder={t("common.form.password.placeholder")}
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="confirmPassword">
                        {t("common.form.confirmPassword.label")}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="confirmPassword"
                          placeholder={t(
                            "common.form.confirmPassword.placeholder",
                          )}
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" loading={resetPasswordIsPending}>
                  {t("resetPasswordForm.submit")}
                </Button>

                {form.formState.errors.root && !form.formState.errors.root.expired && (
                  <div className="text-red-500 text-center text-sm">
                    {form.formState.errors.root?.message}
                  </div>
                )}

                {form.formState.errors.root?.expired && (
                  <>
                    <div className="text-red-500 text-center text-sm">
                      {form.formState.errors.root.expired?.message}
                    </div>
                    <div className="text-center text-sm">
                      <Link to={Routes.FORGOT_PASSWORD} className="underline">
                        {t("page.forgotPassword.title")}
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export { ResetPasswordForm };
