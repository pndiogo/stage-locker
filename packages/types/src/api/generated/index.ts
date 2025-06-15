import { z } from "zod";

// --- Request Body Schemas and Types ---
// Define constants individual export
// Note: The description for this request body (postSignup_Body) is typically found where it's used as an endpoint parameter.
const postSignup_Body = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(128).regex(/[A-Z]/),
  })
  .passthrough(); // e.g., const postAuthSignup_Body = z.object(...);
export type postSignup_BodyType = z.infer<typeof postSignup_Body>; // Export the TS type
// Note: The description for this request body (postResetPassword_Body) is typically found where it's used as an endpoint parameter.
const postResetPassword_Body = z
  .object({
    token: z.string().min(1),
    newPassword: z.string().min(8).max(128).regex(/[A-Z]/),
  })
  .passthrough(); // e.g., const postAuthSignup_Body = z.object(...);
export type postResetPassword_BodyType = z.infer<typeof postResetPassword_Body>; // Export the TS type

// Export a map of these request body Zod schemas
export const requestBodySchemas = {
  postSignup_Body: postSignup_Body, // Refer to the constant defined above
  postResetPassword_Body: postResetPassword_Body, // Refer to the constant defined above
};

// --- Endpoint-specific Schemas and Types (Responses and Parameters) ---
/**
 * get /api/v1/
 * No description available for this endpoint.
 */
// Response Schema and Type for getApiv1
export const getApiv1_ResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getApiv1_ResponseType = z.infer<typeof getApiv1_ResponseSchema>;

// Error Response Schemas and Types for getApiv1

// Parameters Schema and Type for getApiv1
/**
 * post /api/v1/auth/login
 * Login a user
 */
// Response Schema and Type for postLogin
export const postLogin_ResponseSchema = z
  .object({ id: z.string(), email: z.string().email(), token: z.string() })
  .passthrough();
export type postLogin_ResponseType = z.infer<typeof postLogin_ResponseSchema>;

// Error Response Schemas and Types for postLogin
export const postLogin_400_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postLogin_400_ErrorResponseType = z.infer<
  typeof postLogin_400_ErrorResponseSchema
>;
export const postLogin_401_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postLogin_401_ErrorResponseType = z.infer<
  typeof postLogin_401_ErrorResponseSchema
>;
export const postLogin_403_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postLogin_403_ErrorResponseType = z.infer<
  typeof postLogin_403_ErrorResponseSchema
>;
export const postLogin_404_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postLogin_404_ErrorResponseType = z.infer<
  typeof postLogin_404_ErrorResponseSchema
>;
export const postLogin_422_ErrorResponseSchema = z
  .object({
    success: z.boolean(),
    error: z
      .object({
        issues: z.array(
          z
            .object({
              code: z.string(),
              path: z.array(z.union([z.string(), z.number()])),
              message: z.string().optional(),
            })
            .passthrough()
        ),
        name: z.string(),
      })
      .passthrough(),
  })
  .passthrough();
export type postLogin_422_ErrorResponseType = z.infer<
  typeof postLogin_422_ErrorResponseSchema
>;
export const postLogin_500_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postLogin_500_ErrorResponseType = z.infer<
  typeof postLogin_500_ErrorResponseSchema
>;

// Parameters Schema and Type for postLogin
export const postLogin_ParametersSchema = z.object({
  /** The user to log in */
  body: postSignup_Body,
});
export type postLogin_ParametersType = z.infer<
  typeof postLogin_ParametersSchema
>;
/**
 * post /api/v1/auth/reset-password
 * Reset a user&#x27;s password
 */
// Response Schema and Type for postResetPassword
export const postResetPassword_ResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postResetPassword_ResponseType = z.infer<
  typeof postResetPassword_ResponseSchema
>;

// Error Response Schemas and Types for postResetPassword
export const postResetPassword_401_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postResetPassword_401_ErrorResponseType = z.infer<
  typeof postResetPassword_401_ErrorResponseSchema
>;
export const postResetPassword_404_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postResetPassword_404_ErrorResponseType = z.infer<
  typeof postResetPassword_404_ErrorResponseSchema
>;
export const postResetPassword_422_ErrorResponseSchema = z
  .object({
    success: z.boolean(),
    error: z
      .object({
        issues: z.array(
          z
            .object({
              code: z.string(),
              path: z.array(z.union([z.string(), z.number()])),
              message: z.string().optional(),
            })
            .passthrough()
        ),
        name: z.string(),
      })
      .passthrough(),
  })
  .passthrough();
export type postResetPassword_422_ErrorResponseType = z.infer<
  typeof postResetPassword_422_ErrorResponseSchema
>;
export const postResetPassword_500_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postResetPassword_500_ErrorResponseType = z.infer<
  typeof postResetPassword_500_ErrorResponseSchema
>;

// Parameters Schema and Type for postResetPassword
export const postResetPassword_ParametersSchema = z.object({
  /** The user to reset the password */
  body: postResetPassword_Body,
});
export type postResetPassword_ParametersType = z.infer<
  typeof postResetPassword_ParametersSchema
>;
/**
 * post /api/v1/auth/send-password-reset-email
 * Send a password reset email to a user
 */
// Response Schema and Type for postSendPasswordResetEmail
export const postSendPasswordResetEmail_ResponseSchema = z.void();
export type postSendPasswordResetEmail_ResponseType = z.infer<
  typeof postSendPasswordResetEmail_ResponseSchema
>;

// Error Response Schemas and Types for postSendPasswordResetEmail
export const postSendPasswordResetEmail_403_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendPasswordResetEmail_403_ErrorResponseType = z.infer<
  typeof postSendPasswordResetEmail_403_ErrorResponseSchema
>;
export const postSendPasswordResetEmail_422_ErrorResponseSchema = z
  .object({
    success: z.boolean(),
    error: z
      .object({
        issues: z.array(
          z
            .object({
              code: z.string(),
              path: z.array(z.union([z.string(), z.number()])),
              message: z.string().optional(),
            })
            .passthrough()
        ),
        name: z.string(),
      })
      .passthrough(),
  })
  .passthrough();
export type postSendPasswordResetEmail_422_ErrorResponseType = z.infer<
  typeof postSendPasswordResetEmail_422_ErrorResponseSchema
>;
export const postSendPasswordResetEmail_429_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendPasswordResetEmail_429_ErrorResponseType = z.infer<
  typeof postSendPasswordResetEmail_429_ErrorResponseSchema
>;
export const postSendPasswordResetEmail_500_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendPasswordResetEmail_500_ErrorResponseType = z.infer<
  typeof postSendPasswordResetEmail_500_ErrorResponseSchema
>;

// Parameters Schema and Type for postSendPasswordResetEmail
export const postSendPasswordResetEmail_ParametersSchema = z.object({
  /** The user to send the password reset email */
  body: z.object({ email: z.string().email() }).passthrough(),
});
export type postSendPasswordResetEmail_ParametersType = z.infer<
  typeof postSendPasswordResetEmail_ParametersSchema
>;
/**
 * post /api/v1/auth/send-verification-email-with-email
 * Send a verification email to a user
 */
// Response Schema and Type for postSendVerificationEmailWithEmail
export const postSendVerificationEmailWithEmail_ResponseSchema = z.void();
export type postSendVerificationEmailWithEmail_ResponseType = z.infer<
  typeof postSendVerificationEmailWithEmail_ResponseSchema
>;

// Error Response Schemas and Types for postSendVerificationEmailWithEmail
export const postSendVerificationEmailWithEmail_400_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendVerificationEmailWithEmail_400_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithEmail_400_ErrorResponseSchema
>;
export const postSendVerificationEmailWithEmail_404_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendVerificationEmailWithEmail_404_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithEmail_404_ErrorResponseSchema
>;
export const postSendVerificationEmailWithEmail_422_ErrorResponseSchema = z
  .object({
    success: z.boolean(),
    error: z
      .object({
        issues: z.array(
          z
            .object({
              code: z.string(),
              path: z.array(z.union([z.string(), z.number()])),
              message: z.string().optional(),
            })
            .passthrough()
        ),
        name: z.string(),
      })
      .passthrough(),
  })
  .passthrough();
export type postSendVerificationEmailWithEmail_422_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithEmail_422_ErrorResponseSchema
>;
export const postSendVerificationEmailWithEmail_429_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendVerificationEmailWithEmail_429_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithEmail_429_ErrorResponseSchema
>;
export const postSendVerificationEmailWithEmail_500_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendVerificationEmailWithEmail_500_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithEmail_500_ErrorResponseSchema
>;

// Parameters Schema and Type for postSendVerificationEmailWithEmail
export const postSendVerificationEmailWithEmail_ParametersSchema = z.object({
  /** The user to send the verification email */
  body: z.object({ email: z.string().email() }).passthrough(),
});
export type postSendVerificationEmailWithEmail_ParametersType = z.infer<
  typeof postSendVerificationEmailWithEmail_ParametersSchema
>;
/**
 * post /api/v1/auth/send-verification-email-with-id
 * Send a verification email to a user
 */
// Response Schema and Type for postSendVerificationEmailWithId
export const postSendVerificationEmailWithId_ResponseSchema = z.void();
export type postSendVerificationEmailWithId_ResponseType = z.infer<
  typeof postSendVerificationEmailWithId_ResponseSchema
>;

// Error Response Schemas and Types for postSendVerificationEmailWithId
export const postSendVerificationEmailWithId_400_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendVerificationEmailWithId_400_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithId_400_ErrorResponseSchema
>;
export const postSendVerificationEmailWithId_404_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendVerificationEmailWithId_404_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithId_404_ErrorResponseSchema
>;
export const postSendVerificationEmailWithId_422_ErrorResponseSchema = z
  .object({
    success: z.boolean(),
    error: z
      .object({
        issues: z.array(
          z
            .object({
              code: z.string(),
              path: z.array(z.union([z.string(), z.number()])),
              message: z.string().optional(),
            })
            .passthrough()
        ),
        name: z.string(),
      })
      .passthrough(),
  })
  .passthrough();
export type postSendVerificationEmailWithId_422_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithId_422_ErrorResponseSchema
>;
export const postSendVerificationEmailWithId_429_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendVerificationEmailWithId_429_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithId_429_ErrorResponseSchema
>;
export const postSendVerificationEmailWithId_500_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSendVerificationEmailWithId_500_ErrorResponseType = z.infer<
  typeof postSendVerificationEmailWithId_500_ErrorResponseSchema
>;

// Parameters Schema and Type for postSendVerificationEmailWithId
export const postSendVerificationEmailWithId_ParametersSchema = z.object({
  /** The user to send the verification email */
  body: z.object({ id: z.string().uuid() }).passthrough(),
});
export type postSendVerificationEmailWithId_ParametersType = z.infer<
  typeof postSendVerificationEmailWithId_ParametersSchema
>;
/**
 * post /api/v1/auth/signup
 * Create a new user
 */
// Response Schema and Type for postSignup
export const postSignup_ResponseSchema = z
  .object({ id: z.string().uuid(), email: z.string().email() })
  .passthrough();
export type postSignup_ResponseType = z.infer<typeof postSignup_ResponseSchema>;

// Error Response Schemas and Types for postSignup
export const postSignup_400_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSignup_400_ErrorResponseType = z.infer<
  typeof postSignup_400_ErrorResponseSchema
>;
export const postSignup_422_ErrorResponseSchema = z
  .object({
    success: z.boolean(),
    error: z
      .object({
        issues: z.array(
          z
            .object({
              code: z.string(),
              path: z.array(z.union([z.string(), z.number()])),
              message: z.string().optional(),
            })
            .passthrough()
        ),
        name: z.string(),
      })
      .passthrough(),
  })
  .passthrough();
export type postSignup_422_ErrorResponseType = z.infer<
  typeof postSignup_422_ErrorResponseSchema
>;
export const postSignup_500_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type postSignup_500_ErrorResponseType = z.infer<
  typeof postSignup_500_ErrorResponseSchema
>;

// Parameters Schema and Type for postSignup
export const postSignup_ParametersSchema = z.object({
  /** The user to create */
  body: postSignup_Body,
});
export type postSignup_ParametersType = z.infer<
  typeof postSignup_ParametersSchema
>;
/**
 * get /api/v1/auth/user/:id
 * Get a user by id
 */
// Response Schema and Type for getUser
export const getUser_ResponseSchema = z
  .object({ id: z.string().uuid(), email: z.string().email() })
  .passthrough();
export type getUser_ResponseType = z.infer<typeof getUser_ResponseSchema>;

// Error Response Schemas and Types for getUser
export const getUser_401_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getUser_401_ErrorResponseType = z.infer<
  typeof getUser_401_ErrorResponseSchema
>;
export const getUser_403_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getUser_403_ErrorResponseType = z.infer<
  typeof getUser_403_ErrorResponseSchema
>;
export const getUser_404_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getUser_404_ErrorResponseType = z.infer<
  typeof getUser_404_ErrorResponseSchema
>;
export const getUser_422_ErrorResponseSchema = z
  .object({
    success: z.boolean(),
    error: z
      .object({
        issues: z.array(
          z
            .object({
              code: z.string(),
              path: z.array(z.union([z.string(), z.number()])),
              message: z.string().optional(),
            })
            .passthrough()
        ),
        name: z.string(),
      })
      .passthrough(),
  })
  .passthrough();
export type getUser_422_ErrorResponseType = z.infer<
  typeof getUser_422_ErrorResponseSchema
>;
export const getUser_500_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getUser_500_ErrorResponseType = z.infer<
  typeof getUser_500_ErrorResponseSchema
>;

// Parameters Schema and Type for getUser
export const getUser_ParametersSchema = z.object({
  /** Parameter: id */
  id: z.string().uuid(),
  /** Parameter: Authorization */
  Authorization: z.string(),
});
export type getUser_ParametersType = z.infer<typeof getUser_ParametersSchema>;
/**
 * get /api/v1/auth/verify-email
 * Verify a user&#x27;s email
 */
// Response Schema and Type for getVerifyEmail
export const getVerifyEmail_ResponseSchema = z.void();
export type getVerifyEmail_ResponseType = z.infer<
  typeof getVerifyEmail_ResponseSchema
>;

// Error Response Schemas and Types for getVerifyEmail
export const getVerifyEmail_400_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getVerifyEmail_400_ErrorResponseType = z.infer<
  typeof getVerifyEmail_400_ErrorResponseSchema
>;
export const getVerifyEmail_401_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getVerifyEmail_401_ErrorResponseType = z.infer<
  typeof getVerifyEmail_401_ErrorResponseSchema
>;
export const getVerifyEmail_404_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getVerifyEmail_404_ErrorResponseType = z.infer<
  typeof getVerifyEmail_404_ErrorResponseSchema
>;
export const getVerifyEmail_500_ErrorResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getVerifyEmail_500_ErrorResponseType = z.infer<
  typeof getVerifyEmail_500_ErrorResponseSchema
>;

// Parameters Schema and Type for getVerifyEmail
export const getVerifyEmail_ParametersSchema = z.object({
  /** Parameter: token */
  token: z.string(),
});
export type getVerifyEmail_ParametersType = z.infer<
  typeof getVerifyEmail_ParametersSchema
>;
/**
 * get /api/v1/health
 * No description available for this endpoint.
 */
// Response Schema and Type for getApiv1health
export const getApiv1health_ResponseSchema = z
  .object({ message: z.string() })
  .passthrough();
export type getApiv1health_ResponseType = z.infer<
  typeof getApiv1health_ResponseSchema
>;

// Error Response Schemas and Types for getApiv1health

// Parameters Schema and Type for getApiv1health

// --- API Schemas Grouped by Tag ---
// This utilizes the endpointsGroups object provided by openapi-zod-client when a group-strategy is used.
export const apiSchemasByTag = {
  Index: {
    // @key is the tag name (e.g., "Auth", "Index")
    endpoints: {
      // 'this.endpoints' is the array of endpoint objects for the current tag
      getApiv1: {
        responses: {
          // This checks if a main success response schema exists
          successSchema: getApiv1_ResponseSchema, // Schema for success response
        },
      },
    },
  },
  Health: {
    // @key is the tag name (e.g., "Auth", "Index")
    endpoints: {
      // 'this.endpoints' is the array of endpoint objects for the current tag
      getApiv1health: {
        responses: {
          // This checks if a main success response schema exists
          successSchema: getApiv1health_ResponseSchema, // Schema for success response
        },
      },
    },
  },
  Auth: {
    // @key is the tag name (e.g., "Auth", "Index")
    endpoints: {
      // 'this.endpoints' is the array of endpoint objects for the current tag
      postSignup: {
        parametersSchema: postSignup_ParametersSchema, // Schema for all parameters

        requestBodySchema: postSignup_Body, // Schema name (e.g., postSignup_Body) or inline Zod definition
        responses: {
          // This checks if a main success response schema exists
          successSchema: postSignup_ResponseSchema, // Schema for success response
          // Check if there are any error responses defined
          errors: {
            // Iterate over error responses
            "400Schema": postSignup_400_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "422Schema": postSignup_422_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "500Schema": postSignup_500_ErrorResponseSchema, // Schema for this error status
          },
        },
      },
      // 'this.endpoints' is the array of endpoint objects for the current tag
      postLogin: {
        parametersSchema: postLogin_ParametersSchema, // Schema for all parameters

        requestBodySchema: postSignup_Body, // Schema name (e.g., postSignup_Body) or inline Zod definition
        responses: {
          // This checks if a main success response schema exists
          successSchema: postLogin_ResponseSchema, // Schema for success response
          // Check if there are any error responses defined
          errors: {
            // Iterate over error responses
            "400Schema": postLogin_400_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "401Schema": postLogin_401_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "403Schema": postLogin_403_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "404Schema": postLogin_404_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "422Schema": postLogin_422_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "500Schema": postLogin_500_ErrorResponseSchema, // Schema for this error status
          },
        },
      },
      // 'this.endpoints' is the array of endpoint objects for the current tag
      getVerifyEmail: {
        parametersSchema: getVerifyEmail_ParametersSchema, // Schema for all parameters

        responses: {
          // This checks if a main success response schema exists
          successSchema: getVerifyEmail_ResponseSchema, // Schema for success response
          // Check if there are any error responses defined
          errors: {
            // Iterate over error responses
            "400Schema": getVerifyEmail_400_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "401Schema": getVerifyEmail_401_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "404Schema": getVerifyEmail_404_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "500Schema": getVerifyEmail_500_ErrorResponseSchema, // Schema for this error status
          },
        },
      },
      // 'this.endpoints' is the array of endpoint objects for the current tag
      postSendVerificationEmailWithId: {
        parametersSchema: postSendVerificationEmailWithId_ParametersSchema, // Schema for all parameters

        requestBodySchema: z.object({ id: z.string().uuid() }).passthrough(), // Schema name (e.g., postSignup_Body) or inline Zod definition
        responses: {
          // This checks if a main success response schema exists
          successSchema: postSendVerificationEmailWithId_ResponseSchema, // Schema for success response
          // Check if there are any error responses defined
          errors: {
            // Iterate over error responses
            "400Schema":
              postSendVerificationEmailWithId_400_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "404Schema":
              postSendVerificationEmailWithId_404_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "422Schema":
              postSendVerificationEmailWithId_422_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "429Schema":
              postSendVerificationEmailWithId_429_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "500Schema":
              postSendVerificationEmailWithId_500_ErrorResponseSchema, // Schema for this error status
          },
        },
      },
      // 'this.endpoints' is the array of endpoint objects for the current tag
      postSendVerificationEmailWithEmail: {
        parametersSchema: postSendVerificationEmailWithEmail_ParametersSchema, // Schema for all parameters

        requestBodySchema: z
          .object({ email: z.string().email() })
          .passthrough(), // Schema name (e.g., postSignup_Body) or inline Zod definition
        responses: {
          // This checks if a main success response schema exists
          successSchema: postSendVerificationEmailWithEmail_ResponseSchema, // Schema for success response
          // Check if there are any error responses defined
          errors: {
            // Iterate over error responses
            "400Schema":
              postSendVerificationEmailWithEmail_400_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "404Schema":
              postSendVerificationEmailWithEmail_404_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "422Schema":
              postSendVerificationEmailWithEmail_422_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "429Schema":
              postSendVerificationEmailWithEmail_429_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "500Schema":
              postSendVerificationEmailWithEmail_500_ErrorResponseSchema, // Schema for this error status
          },
        },
      },
      // 'this.endpoints' is the array of endpoint objects for the current tag
      postSendPasswordResetEmail: {
        parametersSchema: postSendPasswordResetEmail_ParametersSchema, // Schema for all parameters

        requestBodySchema: z
          .object({ email: z.string().email() })
          .passthrough(), // Schema name (e.g., postSignup_Body) or inline Zod definition
        responses: {
          // This checks if a main success response schema exists
          successSchema: postSendPasswordResetEmail_ResponseSchema, // Schema for success response
          // Check if there are any error responses defined
          errors: {
            // Iterate over error responses
            "403Schema": postSendPasswordResetEmail_403_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "422Schema": postSendPasswordResetEmail_422_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "429Schema": postSendPasswordResetEmail_429_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "500Schema": postSendPasswordResetEmail_500_ErrorResponseSchema, // Schema for this error status
          },
        },
      },
      // 'this.endpoints' is the array of endpoint objects for the current tag
      postResetPassword: {
        parametersSchema: postResetPassword_ParametersSchema, // Schema for all parameters

        requestBodySchema: postResetPassword_Body, // Schema name (e.g., postSignup_Body) or inline Zod definition
        responses: {
          // This checks if a main success response schema exists
          successSchema: postResetPassword_ResponseSchema, // Schema for success response
          // Check if there are any error responses defined
          errors: {
            // Iterate over error responses
            "401Schema": postResetPassword_401_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "404Schema": postResetPassword_404_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "422Schema": postResetPassword_422_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "500Schema": postResetPassword_500_ErrorResponseSchema, // Schema for this error status
          },
        },
      },
      // 'this.endpoints' is the array of endpoint objects for the current tag
      getUser: {
        parametersSchema: getUser_ParametersSchema, // Schema for all parameters

        responses: {
          // This checks if a main success response schema exists
          successSchema: getUser_ResponseSchema, // Schema for success response
          // Check if there are any error responses defined
          errors: {
            // Iterate over error responses
            "401Schema": getUser_401_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "403Schema": getUser_403_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "404Schema": getUser_404_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "422Schema": getUser_422_ErrorResponseSchema, // Schema for this error status
            // Iterate over error responses
            "500Schema": getUser_500_ErrorResponseSchema, // Schema for this error status
          },
        },
      },
    },
  },
};
