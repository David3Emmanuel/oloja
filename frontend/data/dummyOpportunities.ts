export interface Opportunity {
  id: string;
  title: string;
  postedBy: string;
  companyLocation: string;
  category: string;
  matchPercentage: number;
  pay: number;
  payFrequency: string;
  distance: string;
  duration: string;
  date: string;
  dateYear: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  description: string;
  skills: string[];
  basePay: number;
  bonus: number;
  matchReasons: {
    title: string;
    description: string;
    type: "ai" | "location" | "experience";
  }[];
}

export const DUMMY_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Wedding Photography",
    postedBy: "Dalo Events",
    companyLocation: "Victoria Island, Lagos",
    category: "Photography",
    matchPercentage: 95,
    pay: 45000,
    payFrequency: "per day",
    distance: "2.3 km",
    duration: "One day",
    date: "July 6th",
    dateYear: "2026",
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    description:
      "Luminary Events is seeking an experienced wedding photographer for a full-day bridal celebration on July 6th, 2026, at a premium venue in Victoria Island, Lagos. Coverage starts from bridal preparation through to the reception. The client expects warm, candid storytelling alongside formal portraits. RAW files and 200+ edited images are required within 7 days of the shoot.",
    skills: ["Photography", "Event Coverage", "Weddings Coverage"],
    basePay: 40000,
    bonus: 5000,
    matchReasons: [
      {
        title: "AI-Powered Match",
        description: "Your photography skills align perfectly with this role's requirements",
        type: "ai",
      },
      {
        title: "Convenient Location",
        description: "Only 2.3 km from your location – easy commute saves time and money",
        type: "location",
      },
      {
        title: "Experience Match",
        description: "Your intermediate skill level matches the position requirements",
        type: "experience",
      },
    ],
  },
  {
    id: "opp-2",
    title: "House Cleaning – Deep Clean",
    postedBy: "SparkleHome NG",
    companyLocation: "Lekki Phase 1, Lagos",
    category: "Cleaning",
    matchPercentage: 88,
    pay: 15000,
    payFrequency: "per day",
    distance: "4.1 km",
    duration: "6 hours",
    date: "July 10th",
    dateYear: "2026",
    rating: 4.6,
    reviewCount: 89,
    verified: true,
    description:
      "SparkleHome NG needs a professional cleaner for a deep-clean session in a 4-bedroom duplex in Lekki Phase 1. Tasks include kitchen degreasing, bathroom sanitization, floor mopping, and furniture dusting. Cleaning supplies will be provided. Punctuality and attention to detail are a must.",
    skills: ["Cleaning", "Attention to Detail"],
    basePay: 13000,
    bonus: 2000,
    matchReasons: [
      {
        title: "AI-Powered Match",
        description: "Your cleaning experience is a strong fit for this role",
        type: "ai",
      },
      {
        title: "Short Commute",
        description: "4.1 km away – reachable within minutes by bus or bike",
        type: "location",
      },
      {
        title: "Quick Earnings",
        description: "Earn ₦15,000 in just 6 hours of work",
        type: "experience",
      },
    ],
  },
  {
    id: "opp-3",
    title: "Private Driver – Weekly",
    postedBy: "Mrs. Adeyemi",
    companyLocation: "Ikoyi, Lagos",
    category: "Driving",
    matchPercentage: 82,
    pay: 60000,
    payFrequency: "per week",
    distance: "5.8 km",
    duration: "1 week",
    date: "July 8th",
    dateYear: "2026",
    rating: 4.9,
    reviewCount: 12,
    verified: true,
    description:
      "Looking for a reliable, well-mannered driver for school runs and errands in Ikoyi and Victoria Island for one week while my regular driver is on leave. Vehicle provided. Must have a valid driver's licence and at least 2 years of experience driving in Lagos.",
    skills: ["Driving", "Navigation", "Customer Service"],
    basePay: 55000,
    bonus: 5000,
    matchReasons: [
      {
        title: "AI-Powered Match",
        description: "Your driving skills and Lagos navigation experience are ideal",
        type: "ai",
      },
      {
        title: "Premium Client",
        description: "Verified employer with a 4.9-star rating – high repeat-hire rate",
        type: "experience",
      },
      {
        title: "Competitive Pay",
        description: "₦60,000/week with a performance bonus included",
        type: "ai",
      },
    ],
  },
  {
    id: "opp-4",
    title: "Catering Assistant – Corporate Event",
    postedBy: "TasteBuds Catering",
    companyLocation: "Ikeja GRA, Lagos",
    category: "Catering",
    matchPercentage: 79,
    pay: 20000,
    payFrequency: "per day",
    distance: "8.2 km",
    duration: "One day",
    date: "July 15th",
    dateYear: "2026",
    rating: 4.5,
    reviewCount: 67,
    verified: true,
    description:
      "TasteBuds Catering needs 3 catering assistants for a 200-guest corporate luncheon in Ikeja GRA. Duties include food plating, serving, table setup, and clean-up. Experience in hospitality or event catering is preferred but not required. Meals and transport allowance provided.",
    skills: ["Cooking", "Catering", "Customer Service"],
    basePay: 18000,
    bonus: 2000,
    matchReasons: [
      {
        title: "AI-Powered Match",
        description: "Your cooking and catering skills make you a great fit",
        type: "ai",
      },
      {
        title: "Team Environment",
        description: "Work alongside other assistants – great for networking",
        type: "experience",
      },
      {
        title: "Meals Included",
        description: "Free meals and transport allowance provided on the day",
        type: "location",
      },
    ],
  },
  {
    id: "opp-5",
    title: "Electrical Wiring – New Build",
    postedBy: "BuildRight Construction",
    companyLocation: "Ajah, Lagos",
    category: "Electrical Work",
    matchPercentage: 91,
    pay: 75000,
    payFrequency: "per project",
    distance: "12 km",
    duration: "3 days",
    date: "July 12th",
    dateYear: "2026",
    rating: 4.7,
    reviewCount: 34,
    verified: true,
    description:
      "BuildRight Construction requires a certified electrician to complete the wiring for a 3-bedroom bungalow in Ajah. Scope includes conduit installation, socket/switch placement, distribution board setup, and final testing. Materials will be provided. Must have own hand tools.",
    skills: ["Electrical Work", "Wiring", "Safety Compliance"],
    basePay: 65000,
    bonus: 10000,
    matchReasons: [
      {
        title: "AI-Powered Match",
        description: "Your electrical work certification and experience are a perfect fit",
        type: "ai",
      },
      {
        title: "High Earning",
        description: "₦75,000 for 3 days of work – one of the highest-paying gigs this week",
        type: "experience",
      },
      {
        title: "Repeat Opportunity",
        description: "BuildRight has 5 more projects lined up this quarter",
        type: "ai",
      },
    ],
  },
];
