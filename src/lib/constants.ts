export const DESIGN_SYSTEM = {
  COLORS: {
    PRIMARY: '#00FF41',
    PRIMARY_GLOW: 'rgba(0, 255, 65, 0.15)',
    PRIMARY_MUTED: 'rgba(0, 255, 65, 0.08)',
    PRIMARY_STARK: '#000000',
    BACKGROUND: '#F8F9FA',
    SURFACE: '#FFFFFF',
    BLACK: '#111111',
    ZINC_50: '#fafafa',
    ZINC_100: '#f4f4f5',
    ZINC_200: '#e4e4e7',
    ZINC_300: '#d4d4d8',
    ZINC_400: '#a1a1aa',
    ZINC_500: '#71717a',
    ZINC_600: '#52525b',
    ZINC_700: '#3f3f46',
    ZINC_800: '#27272a',
    ZINC_900: '#18181b',
    ZINC_950: '#0f0f11',
    NEUTRAL_600: '#737373',
    WHITE: '#FFFFFF',
    WHITE_GLOW: 'rgba(255, 255, 255, 0.95)',
  },
  SHAPES: {
    DIAMOND_CLIP: 'polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)',
    RECT_CLIP: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
  ANIMATION: {
    DURATION_BASE: 'duration-200',
    DURATION_SLOW: 'duration-300',
    DURATION_GLOW: 'duration-1000',
    EASING_CUBIC: 'cubic-bezier(0.87,0,0.13,1)',
  },
  TYPOGRAPHY: {
    TRACKING_DEFAULT: 'tracking-[0.4em]',
    TRACKING_XL: 'tracking-[0.5em]',
    TRACKING_2XL: 'tracking-[0.6em]',
  },
  EFFECTS: {
    MEDIA_OVERLAY: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)',
  }
}

export type SortFilterItem = {
  reverse: boolean
  slug: null | string
  title: string
}

export const defaultSort: SortFilterItem = {
  slug: null,
  reverse: false,
  title: 'Alphabetic A-Z',
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  { slug: '-createdAt', reverse: true, title: 'Latest arrivals' },
  { slug: 'priceInUSD', reverse: false, title: 'Price: Low to high' }, // asc
  { slug: '-priceInUSD', reverse: true, title: 'Price: High to low' },
]

export type SelectFieldItems = {
  label: string
  value: string
}

export const timezones = [
  { label: 'Universal Coordinated Time (UTC)', value: 'UTC' },
  { label: 'Greenwich Mean Time (GMT)', value: 'GMT' },
  { label: 'European Central Time (UTC+1)', value: 'ECT' },
  { label: 'Eastern European Time (UTC+2)', value: 'EET' },
  { label: 'Arabic Standard Time (UTC+3)', value: 'AST' },
  { label: 'Middle East Time (UTC+3:30)', value: 'MET' },
  { label: 'Near East Time (UTC+4)', value: 'NET' },
  { label: 'Pakistan Lahore Time (UTC+5)', value: 'PLT' },
  { label: 'India Standard Time (UTC+5:30)', value: 'IST' },
  { label: 'Bangladesh Standard Time (UTC+6)', value: 'BST' },
  { label: 'Vietnam Standard Time (UTC+7)', value: 'VST' },
  { label: 'China Taiwan Time (UTC+8)', value: 'CTT' },
  { label: 'Japan Standard Time (UTC+9)', value: 'JST' },
  { label: 'Australia Central Time (UTC+9:30)', value: 'ACT' },
  { label: 'Australia Eastern Time (UTC+10)', value: 'AET' },
  { label: 'New Zealand Standard Time (UTC+12)', value: 'NZST' },
  { label: 'Atlantic Standard Time (UTC-4)', value: 'AST_US' },
  { label: 'Eastern Standard Time (UTC-5)', value: 'EST' },
  { label: 'Central Standard Time (UTC-6)', value: 'CST' },
  { label: 'Mountain Standard Time (UTC-7)', value: 'MST' },
  { label: 'Pacific Standard Time (UTC-8)', value: 'PST' },
  { label: 'Alaska Standard Time (UTC-9)', value: 'AKST' },
  { label: 'Hawaii-Aleutian Standard Time (UTC-10)', value: 'HST' },
];

export const standardsLevels = [
  { label: 'Level 1 (Highest/International)', value: 'level_1' },
  { label: 'Level 2 (High/Continental)', value: 'level_2' },
  { label: 'Level 3 (Standard/National)', value: 'level_3' },
  { label: 'Level 4 (Entry/Regional)', value: 'level_4' },
  { label: 'Experimental/Provisional', value: 'experimental' },
];

export const standardsStatus = [
  { label: 'Fully Compliant', value: 'compliant' },
  { label: 'Pending Certification', value: 'pending' },
  { label: 'Under Review', value: 'review' },
  { label: 'Non-Compliant/Restricted', value: 'non_compliant' },
  { label: 'Exempted', value: 'exempted' },
];

export const technicalUnits = [
  { label: 'Kilograms (kg)', value: 'kg' },
  { label: 'Millimeters (mm)', value: 'mm' },
  { label: 'Centimeters (cm)', value: 'cm' },
  { label: 'Liters (L)', value: 'liters' },
  { label: 'Cubic Centimeters (cc)', value: 'cc' },
  { label: 'Horsepower (hp)', value: 'hp' },
  { label: 'Kilowatts (kW)', value: 'kw' },
  { label: 'Newton-meters (Nm)', value: 'nm' },
  { label: 'Bar / PSI', value: 'pressure' },
  { label: 'Degrees Celsius (°C)', value: 'celsius' },
  { label: 'Revolutions Per Minute (RPM)', value: 'rpm' },
  { label: 'Percentage (%)', value: 'percent' },
];

export const featureTypes = [
  { label: 'Technical Innovation', value: 'tech' },
  { label: 'Sporting Format', value: 'format' },
  { label: 'Environmental/Sustainability', value: 'green' },
  { label: 'Geographical/Venue', value: 'venue' },
  { label: 'Legacy/Heritage', value: 'heritage' },
];

export const impactLevels = [
  { label: 'Low (Minor Detail)', value: 'low' },
  { label: 'Medium (Noticeable Influence)', value: 'medium' },
  { label: 'High (Core Identity)', value: 'high' },
  { label: 'Critical (Game Changer)', value: 'critical' },
];

export const engagementTypes = [
  { label: 'In-Person (Live)', value: 'live' },
  { label: 'Digital/Mobile', value: 'digital' },
  { label: 'Social Media', value: 'social' },
  { label: 'Broadcast/Streaming', value: 'broadcast' },
  { label: 'Gaming/Esports', value: 'gaming' },
  { label: 'Merchandising', value: 'retail' },
];

export const accessibilityLevels = [
  { label: 'Public (All Fans)', value: 'public' },
  { label: 'Ticket Holders Only', value: 'tickets' },
  { label: 'Premium/VIP', value: 'premium' },
  { label: 'Corporate/Partners', value: 'corporate' },
  { label: 'Invite Only', value: 'invite' },
];

export const safetyTiers = [
  { label: 'Tier 1: Life-Safety (Critical)', value: 'critical' },
  { label: 'Tier 2: Operational Protocol', value: 'operational' },
  { label: 'Tier 3: Precautionary / Medical', value: 'precautionary' },
  { label: 'Tier 4: Training & Simulation', value: 'training' },
];

export const equipmentRequirements = [
  { label: 'Specialized Medical Unit', value: 'medical_unit' },
  { label: 'Fire Suppression Systems', value: 'fire_suppression' },
  { label: 'Extraction / Recovery Vehicles', value: 'recovery_vehicles' },
  { label: 'Telemetry & Monitoring Systems', value: 'telemetry' },
  { label: 'PPE (Personal Protective Equipment)', value: 'ppe' },
  { label: 'Hazardous Material Handling', value: 'hazmat' },
];

export const sustainabilityTiers = [
  { label: 'ISO 20121 (Sustainable Events)', value: 'iso_20121' },
  { label: 'FIA 3-Star Environmental Accreditation', value: 'fia_3_star' },
  { label: 'Carbon Neutral / Net Zero', value: 'net_zero' },
  { label: 'Circular Economy Commitment', value: 'circular_economy' },
];

export const environmentalImpacts = [
  { label: 'Carbon Emissions & Footprint', value: 'carbon' },
  { label: 'Waste Management & Recycling', value: 'waste' },
  { label: 'Energy Efficiency & Renewables', value: 'energy' },
  { label: 'Water Conservation', value: 'water' },
  { label: 'Biodiversity & Land Use', value: 'biodiversity' },
  { label: 'Supply Chain Sustainability', value: 'supply_chain' },
];

export const sessionStatus = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Red Flagged', value: 'red_flagged' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Postponed', value: 'postponed' },
];

export const trackStatus = [
  { label: 'Green (Clear)', value: 'green' },
  { label: 'Yellow (Hazard)', value: 'yellow' },
  { label: 'SC (Safety Car)', value: 'safety_car' },
  { label: 'VSC (Virtual Safety Car)', value: 'vsc' },
  { label: 'Red (Stopped)', value: 'red' },
  { label: 'Damp', value: 'damp' },
  { label: 'Wet', value: 'wet' },
];

export const sessionTypes = [
  { label: 'Practice', value: 'practice' },
  { label: 'Qualifying', value: 'qualifying' },
  { label: 'Race', value: 'race' },
  { label: 'Shootout', value: 'shootout' },
  { label: 'Test', value: 'test' },
  { label: 'Other', value: 'other' },
];

export const sessionFormats = [
  { label: 'Knockout', value: 'knockout' },
  { label: 'Single Lap', value: 'single_lap' },
  { label: 'Timed Duration', value: 'timed' },
  { label: 'Lap Count', value: 'laps' },
];

export const sessionPriority = [
  { label: 'P1: Main Event', value: 'high' },
  { label: 'P2: Supporting', value: 'medium' },
  { label: 'P3: Exhibition', value: 'low' },
];

export const entryStatus = [
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Withdrawn', value: 'withdrawn' },
  { label: 'DNS (Did Not Start)', value: 'did_not_start' },
  { label: 'DNQ (Did Not Qualify)', value: 'did_not_qualify' },
  { label: 'DSQ (Disqualified)', value: 'disqualified' },
];

export const eligibilityStatus = [
  { label: 'Full Eligibility', value: 'eligible' },
  { label: 'Under Technical Protest', value: 'protest' },
  { label: 'Probational', value: 'probation' },
  { label: 'Exhibition Only', value: 'exhibition' },
];

export const devices: SelectFieldItems[] = [
  {
    label: 'Mobile',
    value: 'mobile'
  },
  {
    label: 'Landline',
    value: 'landline'
  },
  {
    label: 'Fax',
    value: 'fax'
  },
  {
    label: 'Other',
    value: 'other'
  }
]

export const departments: SelectFieldItems[] = [
  {
    label: 'Engineering',
    value: 'engineering',
  },
  {
    label: 'Operations',
    value: 'operations',
  },
  {
    label: 'Marketing',
    value: 'marketing',
  },
  {
    label: 'Hospitality',
    value: 'hospitality',
  },
  {
    label: 'Logistics',
    value: 'logistics',
  },
  {
    label: 'Management',
    value: 'management',
  },
  {
    label: 'Technical',
    value: 'technical',
  },
  {
    label: 'Commercial',
    value: 'commercial',
  },
  {
    label: 'Sales',
    value: 'sales',
  },
];

export const designations: SelectFieldItems[] = [
  { label: 'Mr', value: 'mr' },
  { label: 'Mrs', value: 'mrs' },
  { label: 'Ms', value: 'ms' },
  { label: 'Dr', value: 'dr' },
  { label: 'Prof', value: 'prof' },
  { label: 'Rev', value: 'rev' },
];

export const roles: SelectFieldItems[] = [
  {
    label: 'Pit Crew',
    value: 'pit-crew',
  },
  {
    label: 'Engineer',
    value: 'engineer',
  },
  {
    label: 'Contracter',
    value: 'contracter',
  },
  {
    label: 'Staff',
    value: 'staff',
  },
  {
    label: 'Employee',
    value: 'employee',
  },
  {
    label: 'Cleaner',
    value: 'cleaner',
  },
  {
    label: 'Mechanic',
    value: 'mechanic',
  },
];

export const statuses: SelectFieldItems[] = [
  { label: 'Active', value: 'active' },
  { label: 'Reserve', value: 'reserve' },
  { label: 'Alumni', value: 'alumni' },
  { label: 'Junior', value: 'junior' },
  { label: 'Development', value: 'development' },
  { label: 'Injured', value: 'injured' },
  { label: 'Retired', value: 'retired' },
  { label: 'Other', value: 'other' },
];

export const shiftPatterns: SelectFieldItems[] = [
  { label: 'Day Shift', value: 'day_shift' },
  { label: 'Night Shift', value: 'night_shift' },
  { label: 'Evening Shift', value: 'evening_shift' },
  { label: 'Rotating Shift', value: 'rotating_shift' },
  { label: 'Flexible Shift', value: 'flexible_shift' },
  { label: 'Other', value: 'other' },
];

export const partnershipStatuses: SelectFieldItems[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
  { label: 'Terminated', value: 'terminated' },
  { label: 'Other', value: 'other' },
];

export const preferences: SelectFieldItems[] = [
  { label: 'Not Important', value: 'not_important' },
  { label: 'Important', value: 'important' },
  { label: 'Very Important', value: 'very_important' },
  { label: 'Extremely Important', value: 'extremely_important' },
];

export const relations: SelectFieldItems[] = [
  { label: 'Members', value: 'members' },
  { label: 'Leaders', value: 'leaders' },
  { label: 'Drivers', value: 'drivers' },
  { label: 'Cars', value: 'cars' },
  { label: 'Events', value: 'events' },
  { label: 'Initiatives', value: 'initiatives' },
  { label: 'Celebrations', value: 'celebrations' },
  { label: 'Careers', value: 'careers' },
  { label: 'Series', value: 'series' },
  { label: 'Seasons', value: 'seasons' }
];

export const questionPurposes: SelectFieldItems[] = [
  { label: 'Contact', value: 'contact' },
  { label: 'Preference', value: 'preference' },
  { label: 'General Inquiry', value: 'general_inquiry' },
  { label: 'Technical Support', value: 'technical_support' },
  { label: 'Billing & Payments', value: 'billing_payments' },
  { label: 'Account Management', value: 'account_management' },
  { label: 'Membership', value: 'membership' },
  { label: 'Event Registration', value: 'event_registration' },
  { label: 'Sponsorship', value: 'sponsorship' },
  { label: 'Careers', value: 'careers' },
  { label: 'Other', value: 'other' },
];

export const proficiencyTypes: SelectFieldItems[] = [
  {
    label: 'Beginner',
    value: 'beginner',
  },
  {
    label: 'Intermediate',
    value: 'intermediate',
  },
  {
    label: 'Advanced',
    value: 'advanced',
  },
  {
    label: 'Expert',
    value: 'expert',
  },
];

export const seriesLevels: SelectFieldItems[] = [
  { label: "International", value: "international" },
  { label: "National", value: "national" },
  { label: "Regional", value: "regional" },
  { label: "Club/Amateur", value: "club" },
  { label: "Junior", value: "junior" },
  { label: "Professional", value: "professional" },
  { label: "Semi-Professional", value: "semi_professional" },
  { label: "Other", value: "other" }
];

export const seriesTypes: SelectFieldItems[] = [
  { label: "Formula Racing", value: "formula" },
  { label: "GT Racing", value: "gt" },
  { label: "Prototype/Sports Car Racing", value: "sports" },
  { label: "Touring Car Racing", value: "touring" },
  { label: "Single-Make Series", value: "single-make" },
  { label: "Endurance Racing", value: "endurance" },
  { label: "Sprint Racing", value: "sprint" },
  { label: "Rally/Rallycross", value: "rally" },
  { label: "Historic/Vintage Racing", value: "historic" },
  { label: "Club Racing", value: "club" },
];

export const seriesCodes: SelectFieldItems[] = [
  { label: "FIA Formula 1 World Championship", value: "f1" },
  { label: "FIA World Endurance Championship", value: "wec" },
  { label: "FIA World Rally Championship", value: "wrc" },
  { label: "Formula E", value: "fe" },
  { label: "IndyCar Series", value: "indycar" },
  { label: "NASCAR Cup Series", value: "nascar" },
  { label: "IMSA WeatherTech SportsCar Championship", value: "imsa" },
  { label: "GT World Challenge", value: "gtwc" },
  { label: "DTM", value: "dtm" },
  { label: "Super GT", value: "supergt" },
  { label: "Other", value: "other" }
];

export const raceFormats: SelectFieldItems[] = [
  { label: "Sprint", value: "sprint" },
  { label: "Endurance", value: "endurance" },
  { label: "Street Circuit", value: "street" },
  { label: "Road Course", value: "road" },
  { label: "Oval", value: "oval" },
  { label: "Rally Stage", value: "rally_stage" },
  { label: "Hill Climb", value: "hill_climb" },
  { label: "Drag Strip", value: "drag" },
  { label: "Mixed Surface", value: "mixed" },
  { label: "Other", value: "other" }
];

export const regions: SelectFieldItems[] = [
  { label: "Europe", value: "europe" },
  { label: "North America", value: "north_america" },
  { label: "Asia", value: "asia" },
  { label: "South America", value: "south_america" },
  { label: "Africa", value: "africa" },
  { label: "Oceania", value: "oceania" },
  { label: "Global", value: "global" },
  { label: "Middle East", value: "middle_east" },
  { label: "Asia-Pacific", value: "asia_pacific" },
  { label: "Other", value: "other" }
];

export const fastestLapConditions = [
  { label: 'None', value: 'none' },
  { label: 'Top 10 Finishers', value: 'top_10_finishers' },
  { label: 'Lead Lap Only', value: 'lead_lap_only' },
  { label: 'Finished Race', value: 'finished_race' },
];

export const penaltyCurrencies = [
  { label: 'US Dollar ($)', value: 'USD' },
  { label: 'Euro (€)', value: 'EUR' },
  { label: 'British Pound (£)', value: 'GBP' },
  { label: 'Swiss Franc (CHF)', value: 'CHF' },
];

export const penaltyResetPeriods = [
  { label: 'End of Season', value: 'season_end' },
  { label: 'Rolling 12 Months', value: 'rolling_12' },
  { label: 'Fixed Calendar Date', value: 'fixed_date' },
];

export const seasonUnits = [
  { label: 'Days', value: 'days' },
  { label: 'Weeks', value: 'weeks' },
  { label: 'Months', value: 'months' },
  { label: 'Years', value: 'years' },
];

export const frequencyUnits = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Bi-Weekly', value: 'bi_weekly' },
  { label: 'Monthly', value: 'monthly' },
];

export const windowUnits = [
  { label: 'Minutes', value: 'minutes' },
  { label: 'Hours', value: 'hours' },
  { label: 'Days', value: 'days' },
];

export const carStatuses: SelectFieldItems[] = [
  { label: 'Active', value: 'active' },
  { label: 'Retired', value: 'retired' },
  { label: 'Prototype', value: 'prototype' },
  { label: 'Destroyed', value: 'destroyed' },
  { label: 'Museum', value: 'museum' },
  { label: 'Spare', value: 'spare' },
];

export const componentStatuses: SelectFieldItems[] = [
  { label: 'Good', value: 'good' },
  { label: 'Damaged', value: 'damaged' },
  { label: 'Broken', value: 'broken' },
  { label: 'Missing', value: 'missing' },
  { label: 'Other', value: 'other' },
];

export const componentCategories: SelectFieldItems[] = [
  { label: 'Engine', value: 'engine' },
  { label: 'Transmission', value: 'transmission' },
  { label: 'Suspension', value: 'suspension' },
  { label: 'Brakes', value: 'brakes' },
  { label: 'Exhaust', value: 'exhaust' },
  { label: 'Intake', value: 'intake' },
  { label: 'Cooling', value: 'cooling' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Other', value: 'other' },
];