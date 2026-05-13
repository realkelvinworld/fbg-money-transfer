"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CaretLeftIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import TransferForm from "@/components/forms/transfer-form";

import AccountCard from "./(components)/account-card";

export default function Page() {
  // hooks
  const router = useRouter();
  const { user, clearUser, _hasHydrated } = useUserStore();

  // effects
  useEffect(() => {
    if (_hasHydrated && !user) {
      router.push("/");
    }
  }, [_hasHydrated, user, router]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
      <Button
        variant="outline"
        className="rounded-full my-2"
        onClick={() => {
          clearUser();
          router.push("/");
        }}
      >
        <CaretLeftIcon weight="bold" className="size-4" /> Back
      </Button>

      <AccountCard />

      <div className="mt-4">
        <TransferForm />
      </div>
    </div>
  );
}
