import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Package, 
  ArrowUpDown,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ORDER_STATUS, 
  OrderStatus, 
  Order, 
  getStatusColor 
} from '@/lib/index';
import { mockOrders } from '@/data/index';
import { useAuth } from '@/hooks/useAuth';
import { useSync } from '@/hooks/useSync';
import { OrderCard } from '@/components/Cards';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

/**
 * Orders Management Page
 * Provides a mobile-optimized interface for tracking and managing logistics orders.
 * Integrated with real-time sync for 2026 production standards.
 */
export default function Orders() {
  const { user } = useAuth();
  const { isOnline, isSyncing, lastSync, forceSync } = useSync();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch = 
        order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.receiverName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 'ALL' || order.status === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Orders</h1>
            <p className="text-xs text-muted-foreground">
              {isOnline ? (
                <span className="flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-chart-2" /> 
                  Online • Last sync {lastSync ? new Date(lastSync).toLocaleTimeString() : 'Never'}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-destructive">
                  <WifiOff className="w-3 h-3" /> Offline Mode
                </span>
              )}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => forceSync()}
            disabled={isSyncing || !isOnline}
            className={isSyncing ? 'animate-spin' : ''}
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

        {/* Search and Quick Filters */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search tracking, sender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-muted/50 border-none"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className={isFilterOpen ? 'bg-accent border-primary' : ''}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Status Tabs */}
        <Tabs defaultValue="ALL" className="mt-4 w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-transparent p-0 flex overflow-x-auto no-scrollbar justify-start gap-4">
            {['ALL', ...Object.values(ORDER_STATUS)].map((status) => (
              <TabsTrigger 
                key={status} 
                value={status}
                className="px-0 pb-2 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-medium text-xs whitespace-nowrap"
              >
                {status.replace(/_/g, ' ')}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </header>

      {/* Orders List */}
      <main className="flex-1 px-4 py-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredOrders.map((order) => (
                <motion.div key={order.id} variants={staggerItem}>
                  <OrderCard order={order} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No orders found</h3>
              <p className="text-sm text-muted-foreground max-w-[200px] mx-auto mt-1">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button 
                variant="link" 
                className="mt-2 text-primary"
                onClick={() => { setSearchTerm(''); setActiveTab('ALL'); }}
              >
                Reset all filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button for Warehouse/Admin (Mock) */}
      {['SUPER_ADMIN', 'WAREHOUSE'].includes(user?.role || '') && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springPresets.bouncy}
          className="fixed bottom-24 right-6"
        >
          <Button className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90">
            <Package className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      {/* Offline Sync Warning */}
      {!isOnline && (
        <div className="fixed bottom-20 left-0 right-0 bg-destructive/90 text-destructive-foreground py-2 px-4 flex items-center justify-between text-xs font-medium backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            Working offline. Changes will sync when reconnected.
          </div>
        </div>
      )}
    </div>
  );
}
