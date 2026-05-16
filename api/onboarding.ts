// ==========================================
// API CONTRACTS
// ==========================================

export interface OnboardingRequestInterface {
  email?: string;
  password?: string;
  role: "find_jobs" | "hire_services" | null;
  firstName: string;
  lastName: string;
  brandName?: string;
  phone: string;
  bvn: string;
  location: string;
  languages: string[];
  skills: string[];
  experience: "beginner" | "intermediate" | "expert" | null;
  jobType: "one_time" | "full_time" | "contract" | "flexible" | null;
  workType: "remote" | "onsite" | "hybrid" | null;
  workDistance?: string;
}

export interface OnboardingResponseInterface {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    profileCompleted: boolean;
    role: string | null;
  };
  errors?: Record<string, string>;
}

// ==========================================
// EXAMPLE PAYLOADS
// ==========================================

// This is the payload the frontend would send:
export const mockOnboardingRequest: OnboardingRequestInterface = {
  email: "user@example.com",
  password: "SecurePassword123!",
  role: "find_jobs",
  firstName: "John",
  lastName: "Doe",
  brandName: "Doe Services",
  phone: "08012345678",
  bvn: "12345678901",
  location: "Lagos, Nigeria",
  languages: ["English", "Yoruba"],
  skills: ["Tailoring", "Photography"],
  experience: "intermediate",
  jobType: "full_time",
  workType: "hybrid",
  workDistance: "15 miles"
};

// This is the exact data shape the frontend expects back:
export const mockOnboardingResponseSuccess: OnboardingResponseInterface = {
  success: true,
  message: "User onboarding completed successfully",
  data: {
    userId: "usr_mock_12345",
    profileCompleted: true,
    role: "find_jobs"
  }
};

export const mockOnboardingResponseError: OnboardingResponseInterface = {
  success: false,
  message: "Validation failed",
  errors: {
    phone: "Invalid phone number format",
    role: "Role selection is required"
  }
};

// ==========================================
// GOOGLE AUTH CONTRACTS & EXAMPLES
// ==========================================

export interface GoogleAuthRequestInterface {
  provider: "google";
  idToken: string; // The JWT token received from Google Identity Services
}

export interface GoogleAuthResponseInterface {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
    isNewUser: boolean; // Indicates if they need to go through onboarding
    token: string;      // App's internal session/JWT token
  };
  errors?: string;
}

export const mockGoogleAuthRequest: GoogleAuthRequestInterface = {
  provider: "google",
  idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQ1...[mock_google_jwt_token]"
};

export const mockGoogleAuthResponse: GoogleAuthResponseInterface = {
  success: true,
  message: "Successfully authenticated with Google",
  data: {
    userId: "usr_mock_67890",
    email: "user@example.com",
    isNewUser: true, // Frontend should redirect to onboarding flow
    token: "app_jwt_session_token_abc123"
  }
};