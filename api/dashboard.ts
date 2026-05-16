// ==========================================
// API CONTRACTS: DASHBOARD & WALLET
// ==========================================

// ------------------------------------------
// SHARED TYPES
// ------------------------------------------

export interface JobSummary {
  id: string;
  title: string;
  postedBy: string;
  matchPercentage: number;
  distance: string;
  duration: string;
  pay: number;
  payFrequency?: string;
}

export interface Transaction {
  id: string;
  title: string;
  timestamp: string; // ISO 8601 date string
  amount: number;
  type: "credit" | "debit";
  category: "job_payment" | "savings_transfer" | "withdrawal" | "deposit" | "other";
  status: "completed" | "pending" | "failed";
  // formattedDateGroup is frontend-only — compute from timestamp, do not expect from API
}

export interface MatchReason {
  type: "ai" | "location" | "experience" | "skills";
  title: string;
  description: string;
}

export interface SafetyPoint {
  title: string;
  description: string;
}

// ------------------------------------------
// 1. DASHBOARD OVERVIEW
// ------------------------------------------

export interface DashboardRequestInterface {
  userId: string;
}

export interface DashboardResponseInterface {
  success: boolean;
  message: string;
  data?: {
    user: {
      name: string;
      trustScore: number;
    };
    wallet: {
      availableBalance: number;
    };
    financialGrowth: {
      estimatedMonthly: number;
      matchPercentageIncrease: number; // e.g., 42 for +42%
    };
    savingsEligibility: {
      isEligible: boolean;
      jobsCompleted: number;
      jobsRequired: number;
      percentageComplete: number; // e.g., 60 for 60%
    };
    recommendedOpportunities: JobSummary[];
  };
  errors?: Record<string, string>;
}

// ------------------------------------------
// 2. WALLET DETAILS
// ------------------------------------------

export interface WalletRequestInterface {
  userId: string;
}

export interface WalletResponseInterface {
  success: boolean;
  message: string;
  data?: {
    availableBalance: number;
    savings: {
      totalSaved: number;
      jobsCompleted: number;
      jobsRequired: number;
      percentageComplete: number;
      interestRate: number; // e.g., 8 for 8%
    };
    financialActivity: {
      totalEarned: number;
      totalSaved: number;
      availableNow: number;
    };
    transactions: Transaction[];
  };
  errors?: Record<string, string>;
}

// ------------------------------------------
// 3. JOB DETAILS
// ------------------------------------------

export interface JobDetailsRequestInterface {
  jobId: string;
  userId: string;
}

export interface JobDetailsResponseInterface {
  success: boolean;
  message: string;
  data?: {
    id: string;
    title: string;
    postedBy: string;
    isVerified: boolean;
    location: string;
    rating: number;
    reviewCount: number;
    matchPercentage: number;
    jobType: string;
    pay: number;
    payFrequency: string; // e.g., "per week"
    distance: string;
    duration: string;
    startDate: string;
    description: string;
    requiredSkills: string[];
    matchReasons: MatchReason[];
    financialPotential: {
      weeklyEarnings: number;
      monthlyPotential: number;
      sixMonthTotal: number;
      increasesTrustScore: boolean;
      unlocksSavings: boolean;
    };
    earningsBreakdown: {
      basePay: number;
      performanceBonus: number;
      totalWeeklyPay: number;
    };
    safetyPoints: SafetyPoint[];
  };
  errors?: Record<string, string>;
}

// ------------------------------------------
// 4. ACTIONS (APPLY, WITHDRAW, TRANSFER)
// ------------------------------------------

export interface ApplyJobRequestInterface {
  jobId: string;
  userId: string;
}

export interface ApplyJobResponseInterface {
  success: boolean;
  message: string;
  data?: {
    applicationId: string;
    status: "submitted" | "under_review" | "accepted" | "rejected";
  };
  errors?: Record<string, string>;
}

export interface TransactionActionRequestInterface {
  userId: string;
  amount: number;
  actionType: "withdraw" | "send" | "save";
  destinationDetails?: {
    accountNumber?: string;
    bankName?: string;
    recipientId?: string;
  };
}

export interface TransactionActionResponseInterface {
  success: boolean;
  message: string;
  data?: {
    transactionId: string;
    newBalance: number;
    status: "completed" | "pending";
  };
  errors?: Record<string, string>;
}

// ==========================================
// EXAMPLE PAYLOADS
// ==========================================

// --- Dashboard Example ---
export const mockDashboardResponse: DashboardResponseInterface = {
  success: true,
  message: "Dashboard data retrieved successfully",
  data: {
    user: {
      name: "Gemini",
      trustScore: 320
    },
    wallet: {
      availableBalance: 12450.00
    },
    financialGrowth: {
      estimatedMonthly: 187000,
      matchPercentageIncrease: 42
    },
    savingsEligibility: {
      isEligible: false,
      jobsCompleted: 3,
      jobsRequired: 5,
      percentageComplete: 60
    },
    recommendedOpportunities: [
      {
        id: "job-1",
        title: "Fashion Designer",
        postedBy: "Alaro Fashion House",
        matchPercentage: 95,
        distance: "2.3 km",
        duration: "6 months",
        pay: 45000,
        payFrequency: "per week"
      },
      {
        id: "job-2",
        title: "Textile Specialist",
        postedBy: "Balogun Textiles",
        matchPercentage: 88,
        distance: "5.7 km",
        duration: "3 months",
        pay: 38000,
        payFrequency: "per week"
      }
    ]
  }
};

// --- Wallet Example ---
export const mockWalletResponse: WalletResponseInterface = {
  success: true,
  message: "Wallet data retrieved successfully",
  data: {
    availableBalance: 12450.00,
    savings: {
      totalSaved: 8200,
      jobsCompleted: 3,
      jobsRequired: 5,
      percentageComplete: 60,
      interestRate: 8
    },
    financialActivity: {
      totalEarned: 45000,
      totalSaved: 8200,
      availableNow: 12450
    },
    transactions: [
      {
        id: "txn-1",
        title: "Job Payment - Fashion Designer",
        timestamp: "2026-05-16T10:30:00Z",
        amount: 45000,
        type: "credit",
        category: "job_payment",
        status: "completed"
      },
      {
        id: "txn-2",
        title: "Savings Transfer",
        timestamp: "2026-05-16T09:15:00Z",
        amount: 5000,
        type: "debit",
        category: "savings_transfer",
        status: "completed"
      },
      {
        id: "txn-3",
        title: "Withdrawal Request",
        timestamp: "2026-05-15T14:00:00Z",
        amount: 20000,
        type: "debit",
        category: "withdrawal",
        status: "pending"
      },
      {
        id: "txn-4",
        title: "Job Payment - Textile Specialist",
        timestamp: "2026-05-13T14:45:00Z",
        amount: 38000,
        type: "credit",
        category: "job_payment",
        status: "completed"
      }
    ]
  }
};

// --- Job Details Example ---
export const mockJobDetailsResponse: JobDetailsResponseInterface = {
  success: true,
  message: "Job details retrieved successfully",
  data: {
    id: "job-1",
    title: "Fashion Designer",
    postedBy: "Alaro Fashion House",
    isVerified: true,
    location: "Ikeja, Lagos",
    rating: 4.8,
    reviewCount: 124,
    matchPercentage: 95,
    jobType: "Full-time position",
    pay: 45000,
    payFrequency: "per week",
    distance: "2.3 km",
    duration: "6 months",
    startDate: "May 20, 2026",
    description: "We are looking for a talented fashion designer to join our growing team. You will be responsible for creating custom garments, working with clients on designs, and managing production timelines. Experience with traditional and modern techniques is preferred.",
    requiredSkills: ["Tailoring", "Pattern Making", "Machine Operation"],
    matchReasons: [
      {
        type: "skills",
        title: "AI-Powered Match",
        description: "Your tailoring and pattern making skills align perfectly with this role's requirements"
      },
      {
        type: "location",
        title: "Convenient Location",
        description: "Only 2.3 km from your location - easy commute saves time and money"
      },
      {
        type: "experience",
        title: "Experience Match",
        description: "Your intermediate skill level matches the position requirements"
      }
    ],
    financialPotential: {
      weeklyEarnings: 45000,
      monthlyPotential: 180000,
      sixMonthTotal: 1080000,
      increasesTrustScore: true,
      unlocksSavings: true
    },
    earningsBreakdown: {
      basePay: 40000,
      performanceBonus: 5000,
      totalWeeklyPay: 45000
    },
    safetyPoints: [
      {
        title: "Verified Employer",
        description: "Identity and business documents confirmed"
      },
      {
        title: "Secure Payment",
        description: "Weekly payments protected by EcoMatch"
      },
      {
        title: "Work Agreement",
        description: "Digital contract protects both parties"
      }
    ]
  }
};

// --- Action Request Examples ---
export const mockApplyJobRequest: ApplyJobRequestInterface = {
  jobId: "job-1",
  userId: "usr_mock_12345"
};

export const mockTransactionActionRequest: TransactionActionRequestInterface = {
  userId: "usr_mock_12345",
  amount: 5000,
  actionType: "withdraw",
  destinationDetails: {
    bankName: "First Bank",
    accountNumber: "0123456789"
  }
};