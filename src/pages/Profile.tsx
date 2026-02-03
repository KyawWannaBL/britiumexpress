import React from 'react';
import { motion } from 'framer-motion';
import {
  User as UserIcon,
  Settings,
  RefreshCw,
  Wifi,
  WifiOff,
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  HelpCircle,
  Smartphone,
  History
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSync } from '@/hooks/useSync';
import { APP_VERSION, COPYRIGHT_YEAR } from '@/lib/index';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

/**
 * Profile Page Component
 * Features user account management, real-time sync status, and offline mode control.
 */
export default function Profile() {
  const { user, logout } = useAuth();
  const { isOnline, isSyncing, lastSync, forceSync } = useSync();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      className="flex flex-col gap-6 pb-24"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Header */}
      <motion.section variants={fadeInUp} className="px-4 pt-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight">{user?.name || 'User Profile'}</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <Badge variant="secondary" className="mt-1 w-fit capitalize bg-primary/10 text-primary border-none">
              {user?.role?.toLowerCase().replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </motion.section>

      {/* Sync & Connectivity Status */}
      <motion.section variants={fadeInUp} className="px-4">
        <Card className="overflow-hidden border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className={`h-5 w-5 ${isSyncing ? 'animate-spin text-primary' : ''}`} />
              System Sync
            </CardTitle>
            <CardDescription>
              Keep your device data synchronized with the main server
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isOnline ? 'bg-chart-2/10' : 'bg-destructive/10'}`}>
                  {isOnline ? (
                    <Wifi className="h-4 w-4 text-chart-2" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">Connectivity</p>
                  <p className="text-xs text-muted-foreground">
                    {isOnline ? 'Connected to Cloud' : 'Offline Mode Active'}
                  </p>
                </div>
              </div>
              <Badge variant={isOnline ? 'outline' : 'destructive'} className="font-mono">
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <History className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Synchronized</p>
                  <p className="text-xs text-muted-foreground">{formatDate(lastSync)}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={forceSync}
                disabled={!isOnline || isSyncing}
                className="h-8 text-xs"
              >
                Sync Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Settings Sections */}
      <motion.section variants={fadeInUp} className="px-4 space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            App Settings
          </h2>
          <Card className="border-border/50">
            <div className="divide-y divide-border/50">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Push Notifications</span>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Biometric Login</span>
                </div>
                <Switch />
              </div>

              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Security & Privacy</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-1 pt-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Support
          </h2>
          <Card className="border-border/50">
            <div className="divide-y divide-border/50">
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Help Center</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Terms of Service</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* App Info & Actions */}
      <motion.section variants={fadeInUp} className="px-4 pt-4">
        <div className="flex flex-col items-center gap-4">
          <Button 
            variant="destructive" 
            className="w-full h-12 text-base font-semibold shadow-lg shadow-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>

          <div className="text-center space-y-1 opacity-60">
            <p className="text-xs font-medium">Britium Express Mobile v{APP_VERSION}</p>
            <p className="text-[10px]">© {COPYRIGHT_YEAR} Britium Express. All rights reserved.</p>
          </div>
        </div>
      </motion.section>

      {/* Bottom Padding for Nav */}
      <div className="h-4" />
    </motion.div>
  );
}
