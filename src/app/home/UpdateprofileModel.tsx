"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const updateProfileSchema = z.object({
  gender: z.string().min(1, "Gender is required."),
  phone: z.string().min(10, "Phone number is required."),
  interest: z.string().optional(),
  description: z.string().optional(),
  image: z.any().optional(),
});

type PasswordFormType = z.infer<typeof updateProfileSchema>;

export default function UpdateprofileModel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const profileForm = useForm<PasswordFormType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      gender: "",
      phone: "",
      interest: "",
      description: "",
    },
  });

  const onSubmitProfile = async (values: PasswordFormType) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onSubmitProfile)}
            className="space-y-4"
          >
            <FormField
              control={profileForm.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Male / Female / Other" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Tech, Music" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Short bio..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save Profile
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
