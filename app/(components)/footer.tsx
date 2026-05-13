import Image from "next/image";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeSimpleIcon,
  LockSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Separator } from "@/components/ui/separator";

const QUICK_LINKS = [
  { label: "About FBN Ghana", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Security Notice", href: "#" },
  { label: "FAQs", href: "#" },
];

const SERVICES = [
  { label: "Account Statement", href: "#" },
  { label: "Fund Transfers", href: "#" },
  { label: "Bill Payments", href: "#" },
  { label: "Mobile Banking", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mx-4 my-3">
      <div className="px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Image
              src="/images/logo-blue.png"
              alt="First Bank Ghana"
              width={40}
              height={40}
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted banking partner in Ghana. Secure, reliable, and
              always available.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <LockSimpleIcon className="size-4 text-brand shrink-0 dark:text-amber-400" />
              <p className="text-xs text-muted-foreground">
                256-bit SSL encrypted · Bank of Ghana licensed
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Company
            </p>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Services
            </p>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contact Us
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <PhoneIcon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/70">
                  +233 302 214 060
                </span>
              </li>
              <li className="flex items-start gap-2">
                <EnvelopeSimpleIcon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/70">
                  support@fbnghana.com
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPinIcon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/70 leading-relaxed">
                  Valco Trust House, Castle Road, Ridge, Accra
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} First Bank Nigeria (Ghana) Ltd. All
            rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Regulated by the Bank of Ghana · RC No. 0000421
          </p>
        </div>
      </div>
    </footer>
  );
}
