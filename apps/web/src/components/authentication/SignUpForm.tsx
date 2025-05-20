"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
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

// Todo: Improve schema with additional validation rules for password
function SignUpForm() {
  const { t, i18n } = useTranslation();

  const formSchema = z
    .object({
      email: z.string().email({ message: t("registerForm.email.invalid") }),
      password: z
        .string()
        .min(6, { message: t("registerForm.password.min") })
        .regex(/[a-z0-9]/i, {
          message: t("registerForm.password.alphanumeric"),
        }),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("registerForm.confirmPassword.match"),
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
    try {
      // Assuming an async registration function
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    }
    catch (error) {
      console.error("Form submission error", error);
      toast.error(t("registerForm.error.generic"));
    }
  }

  return (
    <div className="flex p-4 ">
      <Card className="mx-auto w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t("registerForm.title")}</CardTitle>
          <CardDescription>{t("registerForm.description")}</CardDescription>
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
                        {t("registerForm.email.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder={t("registerForm.email.placeholder")}
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
                        {t("registerForm.password.label")}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder={t("registerForm.password.placeholder")}
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
                        {t("registerForm.confirmPassword.label")}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="confirmPassword"
                          placeholder={t(
                            "registerForm.confirmPassword.placeholder",
                          )}
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {t("registerForm.submit")}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t("registerForm.loginPrompt")}
            {" "}
            <Link to="/login" className="underline">
              {t("registerForm.loginLink")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { SignUpForm };
