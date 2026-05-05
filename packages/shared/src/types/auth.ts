export type RegisterPayload = {
  name: string;
  lastName: string;
  middleName?: string;
  phoneNumber?: string;
  email?: string;
};

export type RegisterResponse = {
  succeeded: boolean;
  data: {
    id: string;
    phoneNumber: string;
    email: string;
    name: string;
    lastName: string;
    middleName: string;
    active: boolean;
    isVerified: boolean;
    lastLoginAt: string;
    loginCount: number;
  };
  message: string;
  error: {
    code: string;
    messages: string[];
  };
  statusCode: number;
};

export type SendOTPPayload = {
  phoneNumber?: string;
  email?: string;
  language: string;
};

export type SendOTPResponse = {
  succeeded: boolean;
  data: {
    isSuccess: boolean;
    message: string;
    clientId: string;
    isVerified: boolean;
    token: string;
    tokenExpiresAt: string;
    rawRefreshToken: string;
    refreshTokenExpiresAt: string;
  };
  message: string;
  error: {
    code: string;
    messages: string[];
  };
  statusCode: number;
};

export type VerifyOTPPayload = {
  phoneNumber: string;
  email: string;
  code: string;
  fingerprintHash: string;
  deviceInfo: string;
  ipAddress: string;
  userAgent: string;
};

export type VerifyOTPResponse = {
  succeeded: boolean;
  data: {
    isSuccess: boolean;
    message: string;
    clientId: string;
    isVerified: boolean;
    token: string;
    tokenExpiresAt: string;
    rawRefreshToken: string;
    refreshTokenExpiresAt: string;
  };
  message: string;
  error: {
    code: string;
    messages: string[];
  };
  statusCode: number;
};
