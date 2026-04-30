const MOCK_DELAY = 800;

const MOCK_TOKEN = "mock-jwt-token-abc123";
const MOCK_REFRESH_TOKEN = "mock-refresh-token-xyz789";
const VALID_OTP = "12345678";

export type OtpErrorCode = "INVALID_CODE" | "EXPIRED" | "TOO_MANY_ATTEMPTS";

export type OtpResult =
  | { ok: true; token: string; refreshToken: string }
  | { ok: false; code: OtpErrorCode };

export async function mockRequestOtp(
  _method: "email" | "phone",
  _contact: string,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
}

export async function mockVerifyOtp(
  _method: "email" | "phone",
  _contact: string,
  code: string,
): Promise<OtpResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  if (code !== VALID_OTP) return { ok: false, code: "INVALID_CODE" };
  return { ok: true, token: MOCK_TOKEN, refreshToken: MOCK_REFRESH_TOKEN };
}
