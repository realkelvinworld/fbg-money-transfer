"use client";

import Image from "next/image";
import { BuildingIcon } from "@phosphor-icons/react/dist/ssr";

import { useUserStore } from "@/store/user";

const MOCK_BALANCE = 12_450.0;

export default function AccountCard() {
  // state
  const user = useUserStore((s) => s.user);

  // variables
  const maskedAccount = user?.accountNumber
    ? `**** **** ${user.accountNumber.slice(-4)}`
    : "**** **** ****";

  const formattedBalance = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(MOCK_BALANCE);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand px-6 py-6 text-white">
      {/* decorative circles */}
      <div className="absolute -top-8 -right-8 size-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-10 -right-4 size-52 rounded-full bg-white/5" />

      {/* top row — avatar + account number */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3 rounded-full bg-white/15 px-2 py-1.5 backdrop-blur-sm">
          <div className="relative size-7 overflow-hidden rounded-full ring-2 ring-white/40">
            <Image
              src="/images/kelvin.JPG"
              alt={user?.fullName ?? "User"}
              fill
              className="object-cover"
            />
          </div>
          <span className="pr-2 text-sm font-medium leading-none">
            {user?.fullName ?? "—"}
          </span>
        </div>

        <span className="font-mono text-sm font-semibold tracking-widest text-white">
          {maskedAccount}
        </span>
      </div>

      {/* balance */}
      <div className="relative mt-8">
        <p className="text-xs font-medium uppercase tracking-widest text-white/60">
          Available Balance
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight">
          {formattedBalance}
        </p>
      </div>

      {/* bottom row — branch + bank logo */}
      <div className="relative mt-6 flex items-end justify-between">
        <div>
          {user?.branch ? (
            <>
              <p className="text-xs text-white uppercase tracking-widest">
                Branch
              </p>
              <div className="flex items-center gap-1.5 text-white/50">
                <BuildingIcon className="size-4" />
                <p className="text-sm font-medium text-white/90">
                  {user.branch}
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-white/50">
              <BuildingIcon className="size-4" />
              <span className="text-xs">First Bank Ghana</span>
            </div>
          )}
        </div>

        <Image
          src="/images/firstbank-logo.png"
          alt="First Bank"
          width={80}
          height={80}
          className="opacity-80 brightness-0 invert"
        />
      </div>
    </div>
  );
}
