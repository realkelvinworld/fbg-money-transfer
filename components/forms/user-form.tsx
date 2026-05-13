"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RippleButton } from "../ui/ripple-button";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  accountNumber: z
    .string()
    .min(10, "Account number must be exactly 10 digits")
    .max(10, "Account number must be exactly 10 digits")
    .regex(/^\d+$/, "Account number must be numeric only"),
  branch: z.string().min(1, "Select a branch"),
});

type FormValues = z.infer<typeof schema>;

const BRANCHES = [
  "Accra Main Branch",
  "Airport City Branch",
  "Osu Branch",
  "Cantonments Branch",
  "East Legon Branch",
  "Spintex Branch",
  "Tema Branch",
  "Achimota Branch",
  "Kumasi Main Branch",
  "Takoradi Branch",
];

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserForm({ open, onOpenChange }: UserFormProps) {
  // hooks
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", accountNumber: "", branch: "" },
  });

  // functions
  function onSubmit(data: FormValues) {
    setUser(data);
    onOpenChange(false);
    router.push("/transfer");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your identity</DialogTitle>
          <DialogDescription>
            Enter your account details to get started with your transfer.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-2"
        >
          {/* Full name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              {...form.register("fullName")}
              id="fullName"
              placeholder="Kwame Asante"
              autoComplete="off"
            />
            {form.formState.errors.fullName && (
              <p className="text-xs text-destructive">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          {/* Account number */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              {...form.register("accountNumber")}
              id="accountNumber"
              placeholder="0123456789"
              inputMode="numeric"
              maxLength={10}
              autoComplete="off"
              onChange={(e) => {
                const numeric = e.target.value.replace(/\D/g, "").slice(0, 10);
                form.setValue("accountNumber", numeric, {
                  shouldValidate: true,
                });
              }}
            />
            {form.formState.errors.accountNumber && (
              <p className="text-xs text-destructive">
                {form.formState.errors.accountNumber.message}
              </p>
            )}
          </div>

          {/* Branch */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="branch">Branch</Label>
            <Controller
              name="branch"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="branch" className="w-full">
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.branch && (
              <p className="text-xs text-destructive">
                {form.formState.errors.branch.message}
              </p>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            This is a demo — enter any name, a 10-digit number, and pick any
            branch.
          </p>

          <RippleButton
            type="submit"
            rippleColor="#ffbd00"
            className="w-full mt-2 bg-brand text-white rounded-full border-amber-400/50"
          >
            Continue to Transfer
          </RippleButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
