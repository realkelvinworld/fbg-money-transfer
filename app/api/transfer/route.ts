import type { NextRequest } from "next/server";

import type {
  TransactionModel,
  TransferRequestModel,
  TransferResponseModel,
} from "@/models/transfer";

const MOCK_ACCOUNTS: Record<string, string> = {
  "0241234567": "KWAME ASANTE",
  "0551234567": "AMA BOATENG",
  "0201234567": "KOFI MENSAH",
  "0271234567": "ABENA OSEI",
  "0301234567": "YAW DARKO",
};

// In-memory transaction log — resets on server restart
const transactions: TransactionModel[] = [];

function generateReference(): string {
  return `TXN${Math.floor(Math.random() * 9_000_000 + 1_000_000)}`;
}

export async function POST(request: NextRequest) {
  const body: TransferRequestModel = await request.json();

  const { recipientAccount, bankCode, amount, narration } = body;

  if (!recipientAccount || recipientAccount.length !== 10) {
    return Response.json(
      { message: "Invalid recipient account number" },
      { status: 400 }
    );
  }

  if (!bankCode) {
    return Response.json({ message: "Bank code is required" }, { status: 400 });
  }

  if (!amount || amount <= 0) {
    return Response.json(
      { message: "Amount must be greater than 0" },
      { status: 400 }
    );
  }

  if (narration && narration.length > 50) {
    return Response.json(
      { message: "Narration must not exceed 50 characters" },
      { status: 400 }
    );
  }

  const recipientName = MOCK_ACCOUNTS[recipientAccount];
  if (!recipientName) {
    return Response.json(
      { message: "Recipient account not found. Transfer aborted." },
      { status: 422 }
    );
  }

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const reference = generateReference();

  transactions.push({
    id: crypto.randomUUID(),
    recipientAccount,
    recipientName,
    bankCode,
    amount,
    narration: narration ?? "",
    reference,
    createdAt: new Date().toISOString(),
  });

  const response: TransferResponseModel = { status: "success", reference };
  return Response.json(response);
}
