"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Suspense } from "react";

const formSchema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z
      .string()
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type ResetPasswordForm = z.infer<typeof formSchema>;

function ResetPasswordPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const searchParams = useSearchParams();
  const [shownewpassword, setShownewpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: ResetPasswordForm) => {
    try {
      const response = await axios.post(
        `https://24cf-103-240-169-156.ngrok-free.app/api/v1/startup/auth/password-reset/${uid}/${token}/`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        toast.success("Password reset successful");
        logout();

        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md space-y-6 border p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={shownewpassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShownewpassword(!shownewpassword)}
                    >
                      {shownewpassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showconfirmpassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setShowconfirmpassword(!showconfirmpassword)
                      }
                    >
                      {showconfirmpassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function Forgetpassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
