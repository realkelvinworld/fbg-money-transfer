import http from "@/lib/http";

import type {
  ValidateAccountRequestModel,
  ValidateAccountResponseModel,
  TransferRequestModel,
  TransferResponseModel,
} from "@/models/transfer";

export const validateAccountService = (payload: ValidateAccountRequestModel) =>
  http.post<ValidateAccountResponseModel>("/api/validate-account", payload);

export const transferService = (payload: TransferRequestModel) =>
  http.post<TransferResponseModel>("/api/transfer", payload);
