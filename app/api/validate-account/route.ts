import type { NextRequest } from "next/server";

import type {
  ValidateAccountRequestModel,
  ValidateAccountResponseModel,
} from "@/models/transfer";

const MOCK_ACCOUNTS: Record<string, string> = {
  "0241234567": "KWAME ASANTE",
  "0551234567": "AMA BOATENG",
  "0201234567": "KOFI MENSAH",
  "0271234567": "ABENA OSEI",
  "0301234567": "YAW DARKO",
};

export async function POST(request: NextRequest) {
  const body: ValidateAccountRequestModel = await request.json();

  const { accountNumber, bankCode } = body;

  if (!accountNumber || accountNumber.length !== 10) {
    return Response.json(
      { message: "Account number must be exactly 10 digits" },
      { status: 400 }
    );
  }

  if (!bankCode) {
    return Response.json({ message: "Bank code is required" }, { status: 400 });
  }

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const accountName = MOCK_ACCOUNTS[accountNumber];

  if (!accountName) {
    return Response.json(
      { message: "Account not found. Please check the account number." },
      { status: 404 }
    );
  }

  const response: ValidateAccountResponseModel = { accountName };
  return Response.json(response);
}
