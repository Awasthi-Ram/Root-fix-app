export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  id: number;
  email: string;
  realName: string;
  dummyName: string;
  isPrivate: boolean;
  role: UserRole;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string; // lucide icon name
}

export interface Donation {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  currency: 'USD' | 'INR' | 'BTC' | 'ETH';
  status: 'pending' | 'success' | 'failed';
  donatedAt: string;
  isPrivateSnapshot: boolean; // Snapshot of user privacy setting at time of donation
  userRealName?: string;
  userDummyName?: string;
}

export interface Certificate {
  id: number;
  donationId: number;
  categoryName: string;
  amount: number;
  issuedAt: string;
}

export interface AdminPost {
  id: number;
  title: string;
  content: string;
  mediaUrl?: string;
  postedAt: string;
}

export interface ChatMessage {
  id: number;
  userId: number;
  userName: string;
  text: string;
  sentAt: string;
}

export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  isActive: boolean;
}
