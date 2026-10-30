import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company?: string;
  role?: string;
  bio?: string;
  linkedin?: string;
  interests?: string[];
  lookingFor?: string;
  privacy: 'public' | 'private';
}

export interface Notification {
  id: string;
  type: 'mention' | 'message' | 'meeting' | 'badge' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface Activity {
  boothsVisited: string[];
  resourcesDownloaded: string[];
  commentsPosted: number;
  meetingsScheduled: number;
  connectionsMode: number;
  timeSpent: {
    lobby: number;
    auditorium: number;
    lounge: number;
    booth: number;
  };
}

export interface BingoTask {
  id: string;
  task: string;
  completed: boolean;
  points: number;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  points: number;
  addPoints: (amount: number, reason: string) => void;
  badges: Badge[];
  addBadge: (badge: Badge) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  activity: Activity;
  updateActivity: (updates: Partial<Activity>) => void;
  visitBooth: (boothId: string) => void;
  downloadResource: (resourceId: string) => void;
  postComment: () => void;
  scheduleMeeting: () => void;
  bingoCard: BingoTask[];
  completeBingoTask: (taskId: string) => void;
  leaderboard: { name: string; points: number; avatar: string }[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  id: 'user-001',
  name: 'Alex Thompson',
  email: 'alex.thompson@company.com',
  avatar: 'https://i.pravatar.cc/150?img=20',
  company: 'Tech Innovations Inc.',
  role: 'Product Manager',
  bio: 'Passionate about technology and innovation. Always looking to connect with like-minded professionals.',
  linkedin: 'linkedin.com/in/alexthompson',
  interests: ['AI/ML', 'Product Management', 'SaaS', 'Digital Transformation'],
  lookingFor: 'Networking, partnerships, and learning opportunities',
  privacy: 'public'
};

const defaultBingoTasks: BingoTask[] = [
  { id: 'bingo-1', task: 'Visit 3 different booths', completed: false, points: 50 },
  { id: 'bingo-2', task: 'Post 5 comments', completed: false, points: 30 },
  { id: 'bingo-3', task: 'Download 3 resources', completed: false, points: 40 },
  { id: 'bingo-4', task: 'Schedule a meeting', completed: false, points: 60 },
  { id: 'bingo-5', task: 'Visit all 4 environments', completed: false, points: 100 },
  { id: 'bingo-6', task: 'React to 10 comments', completed: false, points: 20 },
  { id: 'bingo-7', task: 'Complete your profile', completed: false, points: 50 },
  { id: 'bingo-8', task: 'Watch an auditorium session', completed: false, points: 40 },
  { id: 'bingo-9', task: 'Make 5 connections', completed: false, points: 80 },
];

const mockLeaderboard = [
  { name: 'Sarah Chen', points: 1250, avatar: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Michael Torres', points: 1180, avatar: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Emily Watson', points: 1050, avatar: 'https://i.pravatar.cc/150?img=3' },
  { name: 'David Kim', points: 980, avatar: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Jessica Martinez', points: 920, avatar: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Ryan Patel', points: 850, avatar: 'https://i.pravatar.cc/150?img=6' },
  { name: 'Lisa Anderson', points: 780, avatar: 'https://i.pravatar.cc/150?img=7' },
  { name: 'James Wilson', points: 720, avatar: 'https://i.pravatar.cc/150?img=8' },
  { name: 'Maria Garcia', points: 650, avatar: 'https://i.pravatar.cc/150?img=9' },
  { name: 'Robert Brown', points: 580, avatar: 'https://i.pravatar.cc/150?img=10' },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [points, setPoints] = useState(420);
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'badge-1',
      name: 'Early Bird',
      description: 'Joined the event in the first hour',
      icon: '🎯',
      earnedAt: new Date().toISOString()
    }
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      type: 'announcement',
      title: 'Welcome to the Event!',
      message: 'Explore all environments and earn points',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      read: false
    }
  ]);
  const [activity, setActivity] = useState<Activity>({
    boothsVisited: [],
    resourcesDownloaded: [],
    commentsPosted: 0,
    meetingsScheduled: 0,
    connectionsMode: 0,
    timeSpent: {
      lobby: 0,
      auditorium: 0,
      lounge: 0,
      booth: 0
    }
  });
  const [bingoCard, setBingoCard] = useState<BingoTask[]>(defaultBingoTasks);
  const [leaderboard] = useState(mockLeaderboard);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addPoints = (amount: number, reason: string) => {
    setPoints(prev => prev + amount);
    
    // Add notification for points earned
    addNotification({
      type: 'badge',
      title: `+${amount} Points!`,
      message: reason
    });

    // Check for badge achievements
    const newPoints = points + amount;
    if (newPoints >= 500 && !badges.find(b => b.id === 'badge-500')) {
      const badge: Badge = {
        id: 'badge-500',
        name: 'Rising Star',
        description: 'Earned 500 points',
        icon: '⭐',
        earnedAt: new Date().toISOString()
      };
      addBadge(badge);
    }
    if (newPoints >= 1000 && !badges.find(b => b.id === 'badge-1000')) {
      const badge: Badge = {
        id: 'badge-1000',
        name: 'Super Networker',
        description: 'Earned 1000 points',
        icon: '🏆',
        earnedAt: new Date().toISOString()
      };
      addBadge(badge);
    }
  };

  const addBadge = (badge: Badge) => {
    setBadges(prev => [...prev, badge]);
    addNotification({
      type: 'badge',
      title: `New Badge Earned: ${badge.name}!`,
      message: badge.description
    });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const updateActivity = (updates: Partial<Activity>) => {
    setActivity(prev => ({ ...prev, ...updates }));
  };

  const visitBooth = (boothId: string) => {
    if (!activity.boothsVisited.includes(boothId)) {
      setActivity(prev => ({
        ...prev,
        boothsVisited: [...prev.boothsVisited, boothId]
      }));
      addPoints(10, 'Visited a booth');
      
      // Check bingo tasks
      const newBoothCount = activity.boothsVisited.length + 1;
      if (newBoothCount >= 3) {
        completeBingoTask('bingo-1');
      }
    }
  };

  const downloadResource = (resourceId: string) => {
    if (!activity.resourcesDownloaded.includes(resourceId)) {
      setActivity(prev => ({
        ...prev,
        resourcesDownloaded: [...prev.resourcesDownloaded, resourceId]
      }));
      addPoints(15, 'Downloaded a resource');
      
      // Check bingo tasks
      const newDownloadCount = activity.resourcesDownloaded.length + 1;
      if (newDownloadCount >= 3) {
        completeBingoTask('bingo-3');
      }
    }
  };

  const postComment = () => {
    setActivity(prev => ({
      ...prev,
      commentsPosted: prev.commentsPosted + 1
    }));
    addPoints(5, 'Posted a comment');
    
    // Check bingo tasks
    if (activity.commentsPosted + 1 >= 5) {
      completeBingoTask('bingo-2');
    }
  };

  const scheduleMeeting = () => {
    setActivity(prev => ({
      ...prev,
      meetingsScheduled: prev.meetingsScheduled + 1
    }));
    addPoints(25, 'Scheduled a meeting');
    completeBingoTask('bingo-4');
  };

  const completeBingoTask = (taskId: string) => {
    setBingoCard(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        addPoints(task.points, `Completed: ${task.task}`);
        return { ...task, completed: true };
      }
      return task;
    }));

    // Check if all tasks completed
    const allCompleted = bingoCard.every(task => task.id === taskId ? true : task.completed);
    if (allCompleted && !badges.find(b => b.id === 'bingo-master')) {
      addBadge({
        id: 'bingo-master',
        name: 'Bingo Master',
        description: 'Completed all bingo tasks',
        icon: '🎰',
        earnedAt: new Date().toISOString()
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        points,
        addPoints,
        badges,
        addBadge,
        notifications,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
        activity,
        updateActivity,
        visitBooth,
        downloadResource,
        postComment,
        scheduleMeeting,
        bingoCard,
        completeBingoTask,
        leaderboard
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
