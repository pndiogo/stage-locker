import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, passwordSchema } from "@stage-locker/types";
import { Link, useNavigate } from "@tanstack/react-router";
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
import { useAuthStore } from "@/web/store/authStore";
import { Routes } from "@/web/types/router";

function LoginForm() {
  const { t, i18n } = useTranslation();
  const { login, isPending } = useLogin();
  const setUser = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  const formSchema = z.object({
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
    login({ body: values }, {
      onSuccess: (data) => {
        setUser(data);
        navigate({ to: Routes.DASHBOARD });
        toast.success(t("loginForm.success.generic"));
      },
      onError: (error) => {
        console.error("Login error: ", error);
        toast.error(t("common.error.generic"));

        if (error.status === 401 || error.status === 404) {
          form.setError("root", { type: "manual", message: t("common.error.auth") });
        }
        else if (error.status === 403) {
          form.setError("root", { type: "manual", message: t("common.error.unverified") });
        }
        else {
          form.setError("root", { type: "manual", message: t("common.error.generic") });
        }
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
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">
                          {t("common.form.password.label")}
                        </FormLabel>
                        <Link
                          to={Routes.FORGOT_PASSWORD}
                          className="ml-auto inline-block text-sm underline"
                        >
                          {t("loginForm.forgotPassword")}
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder={t("common.form.password.placeholder")}
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" loading={isPending}>
                  {t("loginForm.submit")}
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
