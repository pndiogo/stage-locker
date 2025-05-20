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

function ForgotPasswordForm() {
  const { t, i18n } = useTranslation();

  const formSchema = z.object({
    email: z.string().email({ message: t("forgotPasswordForm.email.invalid") }),
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
    try {
      // Assuming an async login function
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    }
    catch (error) {
      console.error("Form submission error", error);
      toast.error(t("forgotPasswordForm.error.generic"));
    }
  }

  return (
    <div className="flex p-4">
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
                        {t("forgotPasswordForm.email.label")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder={t(
                            "forgotPasswordForm.email.placeholder",
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

                <Button type="submit" className="w-full">
                  {t("forgotPasswordForm.submit")}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t("forgotPasswordForm.signupPrompt")}
            {" "}
            <Link to="/signup" className="underline">
              {t("forgotPasswordForm.signupLink")}
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            {t("forgotPasswordForm.loginPrompt")}
            {" "}
            <Link to="/login" className="underline">
              {t("forgotPasswordForm.loginLink")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { ForgotPasswordForm };
