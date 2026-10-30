export interface EventCustomization {
  themeColor: string;
  logoUrl: string;
  font: string;
}

export interface Placeholder {
  key: string;
  value: string;
}

export interface ContentItem {
  type: 'text' | 'image' | 'video';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  scale?: number;
}

export interface VirtualEvent {
  id: string;
  name: string;
  createdAt: string;
  customization?: EventCustomization;
  lobby: {
    template: string;
    imageUrl: string;
    title: string;
    placeholders?: Placeholder[];
  };
  auditorium: {
    template: string;
    imageUrl: string;
    title: string;
    placeholders?: Placeholder[];
  };
  lounge: {
    template: string;
    imageUrl: string;
    title: string;
    panelPosition?: { x: number; y: number };
    panelSize?: { width: number; height: number };
    panelContent?: ContentItem[];
    panelScale?: number;
    placeholders?: Placeholder[];
  };
  booth: {
    template: string;
    imageUrl: string;
    title: string;
    placeholders?: Placeholder[];
  };
  stats: {
    totalVisitors: number;
    activeUsers: number;
    comments: number;
    lastUpdated: string;
  };
  link: string;
  visitors?: Visitor[];
}

export interface User {
  username: string;
  role: 'admin' | 'user';
}

export interface Visitor {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  lastActive: string;
  status: 'online' | 'offline';
  timeSpent: number; // in minutes
  pagesVisited: string[];
  commentsCount: number;
  points: number;
  location?: string;
  company?: string;
}