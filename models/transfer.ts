export interface ValidateAccountRequestModel {
  accountNumber: string;
  bankCode: string;
}

export interface ValidateAccountResponseModel {
  accountName: string;
}

export interface TransferRequestModel {
  recipientAccount: string;
  bankCode: string;
  amount: number;
  narration: string;
}

export interface TransferResponseModel {
  status: "success" | "failed";
  reference: string;
}

export interface TransactionModel {
  id: string;
  recipientAccount: string;
  recipientName: string;
  bankCode: string;
  amount: number;
  narration: string;
  reference: string;
  createdAt: string;
}
