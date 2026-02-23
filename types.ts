
export enum UserRole {
  PROPERTY_MANAGER = 'PM',
  CONTRACTOR = 'CONTRACTOR',
  ADMIN = 'ADMIN'
}

export enum JobStatus {
  SCHEDULED = 'Scheduled',
  INSPECTED = 'Inspected',
  REPORT_SENT = 'Report Sent',
  APPROVED = 'Approved',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Complete',
  PAID = 'Paid'
}

export enum VettingStatus {
  NOT_STARTED = 'Not Started',
  PENDING = 'Pending Review',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  EXPIRED = 'Expired Insurance'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
  lastLogin?: string;
  // Account Setup Fields
  companyName?: string;
  portfolioSize?: string;
  isSetupComplete?: boolean;
}

export interface RepairItem {
  id: string;
  task: string;
  description: string;
  estimatedCost: number;
  contractorPrice: number;
  margin: number;
  category: string;
}

export interface Inspection {
  id: string;
  address: string;
  pmName: string;
  date: string;
  status: JobStatus;
  inspectionFee: number;
  repairs: RepairItem[];
  contractorId?: string;
  completionDate?: string;
}

export interface Reference {
  name: string;
  phone: string;
  relationship: string;
}

export interface Contractor {
  id: string;
  name: string;
  company: string;
  skills: string[];
  rating: number;
  jobsCompleted: number;
  status: 'Active' | 'Inactive';
  vettingStatus: VettingStatus;
  licenseNumber?: string;
  inviteCode?: string;
  insuranceExpiry?: string;
  references?: Reference[];
}

export interface InboundEmail {
  id: string;
  from: string;
  subject: string;
  body: string;
  receivedAt: string;
  status: 'Unprocessed' | 'Parsed' | 'Archived';
}
