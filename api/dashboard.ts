// ==========================================
// API CONTRACTS: DASHBOARD & WALLET
// ==========================================

// ------------------------------------------
// SHARED TYPES
// ------------------------------------------

export interface JobSummary {
  id: string;
  title: string;
  company: string;
  matchPercentage: number;
  distance: string;
  duration: string;
  pay: string;
}

export interface Transaction {
  id: string;
  title: string;
  timestamp: string; // ISO 8601 date string or display string (e.g. "10:30 AM")
  amount: number;
  type: "credit" | "debit";
  category: "job_payment" | "savings_transfer" | "withdrawal" | "deposit" | "other";
  status: "completed" | "pending" | "failed";
  formattedDateGroup?: string; // e.g. "Today", "May 12" for grouping
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
    company: string;
    isVerified: boolean;
    location: string;
    rating: number;
    reviewCount: number;
    matchPercentage: number;
    jobType: string;
    payment: {
      amount: number;
      formattedAmount: string;
      period: string; // e.g., "per week"
    };
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
        company: "Alaro Fashion House",
        matchPercentage: 95,
        distance: "2.3 km",
        duration: "6 months",
        pay: "₦45,000/week"
      },
      {
        id: "job-2",
        title: "Textile Specialist",
        company: "Balogun Textiles",
        matchPercentage: 88,
        distance: "5.7 km",
        duration: "3 months",
        pay: "₦38,000/week"
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
        title: "Job Payment - Fashion...",
        timestamp: "10:30 AM",
        amount: 45000,
        type: "credit",
        category: "job_payment",
        status: "completed",
        formattedDateGroup: "Today"
      },
      {
        id: "txn-2",
        title: "Savings Transfer",
        timestamp: "9:15 AM",
        amount: 5000,
        type: "debit",
        category: "savings_transfer",
        status: "completed",
        formattedDateGroup: "Today"
      },
      {
        id: "txn-3",
        title: "Withdrawal Request",
        timestamp: "Yesterday",
        amount: 20000,
        type: "debit",
        category: "withdrawal",
        status: "pending",
        formattedDateGroup: "May 12"
      },
      {
        id: "txn-4",
        title: "Job Payment - Textile W",
        timestamp: "2:45 PM",
        amount: 38000,
        type: "credit",
        category: "job_payment",
        status: "completed",
        formattedDateGroup: "May 10"
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
    company: "Alaro Fashion House",
    isVerified: true,
    location: "Ikeja, Lagos",
    rating: 4.8,
    reviewCount: 124,
    matchPercentage: 95,
    jobType: "Full-time position",
    payment: {
      amount: 45000,
      formattedAmount: "₦45,000",
      period: "per week"
    },
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