import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorDetails } from "@stage-locker/api-client";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

import { useLogin } from "@/web/api/auth/login/useLogin";
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
import { Routes } from "@/web/types/router";

// Todo: Improve schema with additional validation rules for password
function LoginForm() {
  const { t, i18n } = useTranslation();
  const { login } = useLogin();

  const formSchema = z.object({
    email: z.string().email({ message: t("loginForm.email.invalid") }),
    password: z
      .string()
      .min(6, { message: t("loginForm.password.min") })
      .regex(/[a-z0-9]/i, { message: t("loginForm.password.alphanumeric") }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  i18n.on("languageChanged", () => {
    form.reset();
  });

  async function onSubmit(values: FormSchema) {
    console.log("🚀 ~ onSubmit ~ values:", values);

    login({ body: values }, {
      onSuccess: (data) => {
        console.log("Login successful", data);
        toast.success(t("loginForm.success.generic"));
      },
      onError: (error) => {
        console.error("Login error: ", error);
        toast.error(t("loginForm.error.generic"));

        const details = getApiErrorDetails(error);
        console.log("🚀 ~ onSubmit ~ error details:", details);
      },
    });
  }

  return (
    <div className="flex">
      <Card className="mx-auto w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t("loginForm.title")}</CardTitle>
          <CardDescription>{t("loginForm.description")}</CardDescription>
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
                        {t("loginForm.email.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder={t("loginForm.email.placeholder")}
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
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">
                          {t("loginForm.password.label")}
                        </FormLabel>
                        <Link
                          to={Routes.FORGOT_PASSWORD}
                          className="ml-auto inline-block text-sm underline"
                        >
                          {t("loginForm.password.forgot")}
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder={t("loginForm.password.placeholder")}
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {t("loginForm.submit")}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t("loginForm.signupPrompt")}
            {" "}
            <Link to={Routes.SIGNUP} className="underline">
              {t("loginForm.signupLink")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { LoginForm };
