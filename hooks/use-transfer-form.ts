"use client";

import { useRef, useState } from "react";

import { validateAccountService, transferService } from "@/services/transfer";
import type { TransferFormValues } from "@/schemas/transfer";

type ValidationStatus = "idle" | "loading" | "success" | "error";

export function useTransferForm() {
  // account validation state
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>("idle");
  const [validatedName, setValidatedName] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // transfer state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);

  // confirmation modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState<TransferFormValues | null>(
    null
  );

  // success state
  const [reference, setReference] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // called on every account number keystroke
  function handleAccountChange(accountNumber: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (accountNumber.length < 10) {
      setValidationStatus("idle");
      setValidatedName(null);
      setValidationError(null);
      return;
    }

    setValidationStatus("loading");

    debounceRef.current = setTimeout(() => {
      validateAccountService({ accountNumber, bankCode: "FBN" })
        .then((data) => {
          setValidationStatus("success");
          setValidatedName(data.accountName);
        })
        .catch((error: Error) => {
          setValidationStatus("error");
          setValidationError(error.message);
        });
    }, 500);
  }

  // called when user taps Transfer — opens confirmation modal
  function openConfirmation(data: TransferFormValues) {
    setPendingData(data);
    setModalOpen(true);
  }

  // called when user taps Confirm inside the modal
  function confirmTransfer() {
    if (!pendingData) return;

    setIsSubmitting(true);
    setTransferError(null);

    transferService({
      recipientAccount: pendingData.accountNumber,
      bankCode: "FBN",
      amount: pendingData.amount,
      narration: pendingData.narration ?? "",
    })
      .then((data) => {
        setReference(data.reference);
      })
      .catch((error: Error) => {
        setTransferError(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function closeModal() {
    if (isSubmitting) return;
    setModalOpen(false);
    setPendingData(null);
    setTransferError(null);
    setReference(null);
  }

  function resetAll() {
    setValidationStatus("idle");
    setValidatedName(null);
    setValidationError(null);
    setIsSubmitting(false);
    setTransferError(null);
    setModalOpen(false);
    setPendingData(null);
    setReference(null);
  }

  return {
    // account validation
    validationStatus,
    validatedName,
    validationError,
    handleAccountChange,

    // confirmation modal
    modalOpen,
    pendingData,
    openConfirmation,
    confirmTransfer,
    closeModal,

    // transfer
    isSubmitting,
    transferError,

    // success
    reference,
    resetAll,
  };
}
