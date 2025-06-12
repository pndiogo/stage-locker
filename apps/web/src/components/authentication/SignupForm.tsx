import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, passwordSchema } from "@stage-locker/types";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import type { RequestState } from "@/web/types/api";

import { useSignup } from "@/web/api/auth/signup/useSignup";
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
import { PasswordInput } from "@/web/components/ui/password-input";
import { Routes } from "@/web/types/router";

// Todo: Improve schema with additional validation rules for password
function SignupForm() {
  const { t, i18n } = useTranslation();
  const { signup, isPending } = useSignup();
  const [signupState, setSignupState] = useState<RequestState>("idle");

  const formSchema = z
    .object({
      email: emailSchema({
        invalid: t("common.form.email.invalid"),
      }),
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
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("common.form.confirmPassword.match"),
    });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  i18n.on("languageChanged", () => {
    form.reset();
  });

  async function onSubmit(values: FormSchema) {
    signup({
      headers: {
        "Accept-Language": i18n.language,
      },
      body: {
        email: values.email,
        password: values.password,
      },
    }, {
      onSuccess: () => {
        form.reset();
        setSignupState("success");
      },
      onError: (error) => {
        if (error.status === 400) {
          form.setError("root", { type: "manual", message: t("common.error.auth") });
        }
        else {
          form.setError("root", { type: "manual", message: t("common.error.generic") });
        }
      },
    });
  }

  if (signupState === "success") {
    return (
      <CardActionSuccess
        title={t("signupForm.success.title")}
        description={t("signupForm.success.description")}
        link={Routes.ROOT}
        linkText={t("page.home.title")}
      />
    );
  }

  return (
    <div className="flex">
      <Card className="mx-auto w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t("signupForm.title")}</CardTitle>
          <CardDescription>{t("signupForm.description")}</CardDescription>
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
                          placeholder={t("common.form.email.placeholder")}
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <Button type="submit" className="w-full" loading={isPending}>
                  {t("signupForm.submit")}
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
            {t("signupForm.loginPrompt")}
            {" "}
            <Link to={Routes.LOGIN} className="underline">
              {t("signupForm.loginLink")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { SignupForm };
