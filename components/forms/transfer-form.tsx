"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  SpinnerGapIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  PaperPlaneTiltIcon,
  SealCheckIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RippleButton } from "@/components/ui/ripple-button";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransferForm } from "@/hooks";
import {
  transferFormSchema,
  type TransferFormValues,
} from "@/schemas/transfer";

export default function TransferForm() {
  // hooks
  const router = useRouter();
  const {
    validationStatus,
    validatedName,
    validationError,
    handleAccountChange,
    modalOpen,
    pendingData,
    openConfirmation,
    confirmTransfer,
    closeModal,
    isSubmitting,
    transferError,
    reference,
    resetAll,
  } = useTransferForm();

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: { accountNumber: "", amount: 0, narration: "" },
  });

  // variables
  const amount = useWatch({ control: form.control, name: "amount" });
  const accountNumber = useWatch({
    control: form.control,
    name: "accountNumber",
  });
  const narration =
    useWatch({ control: form.control, name: "narration" }) ?? "";
  const canTransfer = validationStatus === "success" && Number(amount) > 0;

  const formattedAmount = pendingData
    ? new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
      }).format(pendingData.amount)
    : "";

  // functions
  function handleAccountInput(e: React.ChangeEvent<HTMLInputElement>) {
    const numeric = e.target.value.replace(/\D/g, "").slice(0, 10);
    form.setValue("accountNumber", numeric, { shouldValidate: true });
    handleAccountChange(numeric);
  }

  return (
    <>
      {/* ── Form ── */}
      <div className="rounded-2xl border border-border bg-card px-5 py-6">
        <h2 className="text-base font-semibold text-foreground">Send Money</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Fill in the details below to make a transfer
        </p>

        <form
          onSubmit={form.handleSubmit(openConfirmation)}
          className="mt-6 flex flex-col gap-5"
        >
          {/* Account number */}
          <Field>
            <FieldLabel htmlFor="accountNumber">
              Recipient Account Number
            </FieldLabel>
            <Input
              id="accountNumber"
              inputMode="numeric"
              placeholder="0241234567"
              autoComplete="off"
              value={accountNumber}
              onChange={handleAccountInput}
            />
            <div className="mt-1 flex items-center gap-1.5 min-h-4.5">
              {validationStatus === "loading" && (
                <>
                  <SpinnerGapIcon className="size-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Verifying account...
                  </span>
                </>
              )}
              {validationStatus === "success" && validatedName && (
                <>
                  <CheckCircleIcon
                    weight="fill"
                    className="size-3.5 text-emerald-500"
                  />
                  <span className="text-xs font-medium text-emerald-600">
                    {validatedName}
                  </span>
                </>
              )}
              {validationStatus === "error" && validationError && (
                <>
                  <WarningCircleIcon
                    weight="fill"
                    className="size-3.5 text-destructive"
                  />
                  <span className="text-xs text-destructive">
                    {validationError}
                  </span>
                </>
              )}
            </div>
            <FieldError errors={[form.formState.errors.accountNumber]} />
          </Field>

          {/* Bank — read-only */}
          <Field>
            <FieldLabel htmlFor="bank">Bank</FieldLabel>
            <Input
              id="bank"
              value="First Bank Ghana"
              readOnly
              disabled
              className="cursor-default"
            />
          </Field>

          {/* Amount */}
          <Field>
            <FieldLabel htmlFor="amount">Amount</FieldLabel>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground select-none">
                GHS
              </span>
              <Input
                id="amount"
                inputMode="decimal"
                placeholder="0.00"
                className="pl-12"
                {...form.register("amount", { valueAsNumber: true })}
              />
            </div>
            <FieldError errors={[form.formState.errors.amount]} />
          </Field>

          {/* Narration */}
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="narration">
                Narration{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </FieldLabel>
              <span className="text-xs text-muted-foreground">
                {narration.length} / 50
              </span>
            </div>
            <Input
              id="narration"
              placeholder="e.g. Lunch money"
              autoComplete="off"
              maxLength={50}
              {...form.register("narration")}
            />
            <FieldError errors={[form.formState.errors.narration]} />
          </Field>

          <RippleButton
            type="submit"
            rippleColor="#ffbd00"
            disabled={!canTransfer || isSubmitting}
            className="mt-2 w-full gap-2 rounded-full bg-brand text-white border-amber-400/50 border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Transfer
            <PaperPlaneTiltIcon weight="bold" className="size-4" />
          </RippleButton>
        </form>
      </div>

      {/* ── Confirmation / Success Modal ── */}
      <Dialog open={modalOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-sm">
          {!reference ? (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Transfer</DialogTitle>
                <DialogDescription className="sr-only">
                  Review your transfer details before confirming
                </DialogDescription>
              </DialogHeader>

              {/* Hero */}
              <div className="flex flex-col items-center gap-3 rounded-xl bg-brand/5 p-5">
                <div className="flex size-14 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <ArrowUpRightIcon weight="bold" className="size-7" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold tabular-nums">
                    {formattedAmount}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    to {validatedName}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <span className="text-xs text-muted-foreground">Recipient</span>
                <span className="truncate text-right text-sm font-medium">
                  {validatedName}
                </span>

                <span className="text-xs text-muted-foreground">Account</span>
                <span className="truncate text-right font-mono text-xs font-medium">
                  {pendingData?.accountNumber}
                </span>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <span className="text-xs text-muted-foreground">Bank</span>
                <span className="truncate text-right text-sm font-medium">
                  First Bank Ghana
                </span>

                <span className="text-xs text-muted-foreground">Narration</span>
                <span className="truncate text-right text-sm font-medium">
                  {pendingData?.narration || "—"}
                </span>
              </div>

              {transferError && (
                <p className="text-sm text-destructive">{transferError}</p>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <RippleButton
                  rippleColor="#ffbd00"
                  className="flex-1 gap-2 rounded-full bg-brand text-white border-amber-400/50 border"
                  onClick={confirmTransfer}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerGapIcon className="size-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm"
                  )}
                </RippleButton>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">
                  Transfer Successful
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Your transfer was completed successfully
                </DialogDescription>
              </DialogHeader>

              {/* Hero */}
              <div className="flex flex-col items-center gap-3 rounded-xl bg-emerald-50 p-5 dark:bg-emerald-900/20">
                <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                  <SealCheckIcon weight="fill" className="size-7" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                    {formattedAmount}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Transfer Successful
                  </span>
                </div>
              </div>

              {/* Reference */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <span className="text-xs text-muted-foreground">Reference</span>
                <span className="truncate text-right font-mono text-xs font-medium">
                  {reference}
                </span>

                <span className="text-xs text-muted-foreground">To</span>
                <span className="truncate text-right text-sm font-medium">
                  {validatedName}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={() => {
                    resetAll();
                    form.reset();
                  }}
                >
                  Send Again
                </Button>
                <Button
                  className="flex-1 rounded-full bg-brand dark:text-white"
                  onClick={() => router.push("/")}
                >
                  Back to Home
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
