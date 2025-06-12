export const QUERY_KEYS = {
  LOGIN: () => ["login"] as const,
  SIGNUP: () => ["signup"] as const,
  VERIFY_EMAIL: () => ["verifyEmail"] as const,
  SEND_VERIFICATION_EMAIL: () => ["sendVerificationEmail"] as const,
  SEND_PASSWORD_RESET_EMAIL: () => ["sendPasswordResetEmail"] as const,
  RESET_PASSWORD: () => ["resetPassword"] as const,
};
