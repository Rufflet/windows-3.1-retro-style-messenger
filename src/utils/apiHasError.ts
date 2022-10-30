import { APIError } from "api/types/auth";

export function hasError(response: any): response is APIError {
  return response && response.reason;
}
