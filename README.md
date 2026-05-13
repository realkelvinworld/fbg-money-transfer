# FBN Ghana — Money Transfer

A money transfer interface built as a Frontend Engineer interview assessment for First Bank Nigeria (Ghana).

---

## Features

- **Landing page** — bank-branded hero, identity form with Zod validation
- **Account card** — user name, masked account number, and mock available balance
- **Transfer form** — recipient account number, amount (GHS), optional narration
- **Real-time account validation** — fires at 10 digits with 500ms debounce, resolves account holder name
- **Confirmation modal** — transaction summary before execution, blocks double-submit
- **Success state** — transaction reference, send again or return home
- **States** — loading indicators, validation errors, API error messages

---

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Icons | Phosphor Icons |
| Global state | Zustand v5 |
| Forms | React Hook Form + Zod |
| HTTP | Axios |

---

## Mock Accounts

| Account Number | Name |
| --- | --- |
| 0241234567 | KWAME ASANTE |
| 0551234567 | AMA BOATENG |
| 0201234567 | KOFI MENSAH |
| 0271234567 | ABENA OSEI |
| 0301234567 | YAW DARKO |

Any other 10-digit number returns a 404 and blocks the transfer.

---

## Getting started

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. Enter any name, a 10-digit number, and pick a branch to get in.
