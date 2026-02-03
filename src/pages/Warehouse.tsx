import React, { useState, useMemo } from 'react';
import {
  Package,
  ScanLine,
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Filter,
  AlertCircle,
  History,
  LayoutDashboard,
  Boxes
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ROUTE_PATHS, 
  ORDER_STATUS, 
  Order, 
  getStatusColor 
} from '@/lib/index';
import { mockOrders } from '@/data/index';
import { useAuth } from '@/hooks/useAuth';
import { StatsCard, OrderCard } from '@/components/Cards';
import { Scanner } from '@/components/Scanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { IMAGES } from '@/assets/images';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

/**
 * Warehouse Operations Page
 * Handles inventory management, package scanning, and stock monitoring.
 * Current Year: 2026
 */
export default function Warehouse() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');

  // Mock logic for scanning
  const handleScan = (data: string) => {
    setIsScannerOpen(false);
    const foundOrder = mockOrders.find(o => o.trackingNumber === data || o.id === data);
    
    if (foundOrder) {
      toast({
        title: "Package Identified",
        description: `Tracking: ${foundOrder.trackingNumber} found in system.`,
      });
      // In a real app, this would open a package detail modal or update status
    } else {
      toast({
        title: "Unknown Barcode",
        description: "This package is not in the local manifest.",
        variant: "destructive",
      });
    }
  };

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => 
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.receiverName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const stats = {
    total: mockOrders.length,
    inbound: mockOrders.filter(o => o.status === ORDER_STATUS.PENDING).length,
    outbound: mockOrders.filter(o => o.status === ORDER_STATUS.OUT_FOR_DELIVERY).length,
    storage: 82 // Mock percentage
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header Area */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Warehouse Operations</h1>
            <p className="text-sm text-muted-foreground">Station: {user?.stationId || 'Main Hub'}</p>
          </div>
          <Button 
            size="icon" 
            variant="default" 
            className="rounded-full w-12 h-12 shadow-lg shadow-primary/20"
            onClick={() => setIsScannerOpen(true)}
          >
            <ScanLine className="w-6 h-6" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search waybill or tracking ID..." 
            className="pl-10 bg-muted/50 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <Tabs defaultValue="inventory" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/30 p-1">
            <TabsTrigger value="overview" className="flex gap-2 items-center">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex gap-2 items-center">
              <Boxes className="w-4 h-4" /> Stock
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex gap-2 items-center">
              <History className="w-4 h-4" /> Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={staggerItem}>
                  <StatsCard 
                    title="Total Packages"
                    value={stats.total.toString()}
                    icon={<Package className="text-primary" />}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard 
                    title="Inbound Today"
                    value={stats.inbound.toString()}
                    icon={<ArrowDownToLine className="text-chart-2" />}
                    trend="+12%"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard 
                    title="Outbound"
                    value={stats.outbound.toString()}
                    icon={<ArrowUpFromLine className="text-chart-3" />}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <StatsCard 
                    title="Storage Utilization"
                    value={`${stats.storage}%`}
                    icon={<AlertCircle className="text-destructive" />}
                  />
                </motion.div>
              </div>

              <motion.div variants={staggerItem} className="relative h-48 rounded-2xl overflow-hidden mt-4">
                <img 
                  src={IMAGES.WAREHOUSE_MOBILE_1} 
                  alt="Warehouse View"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs font-medium uppercase tracking-wider opacity-80">Active Zone</p>
                    <h3 className="text-lg font-bold">Main Distribution Floor</h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="inventory" className="mt-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Current Stock ({filteredOrders.length})</h2>
              <Button variant="ghost" size="sm" className="text-primary flex gap-1">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <motion.div key={order.id} variants={staggerItem}>
                    <OrderCard order={order} />
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Package className="w-12 h-12 mb-2 opacity-20" />
                  <p>No matching packages found</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    {i % 2 === 0 ? <ArrowDownToLine className="w-5 h-5 text-chart-2" /> : <ArrowUpFromLine className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm truncate">
                        {i % 2 === 0 ? 'Package Checked-in' : 'Dispatched to Fleet'}
                      </p>
                      <span className="text-[10px] text-muted-foreground uppercase">{10 + i}:25 AM</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">BTX-2026-{8000 + i}X by Operator Elena</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>

      {/* Scanner Modal Overlay */}
      <AnimatePresence>
        {isScannerOpen && (
          <Scanner 
            isActive={isScannerOpen} 
            onScan={handleScan} 
            onClose={() => setIsScannerOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Bottom Action Bar for Warehouse */}
      <div className="fixed bottom-4 left-4 right-4 flex gap-2">
        <Button className="flex-1 h-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 gap-2 font-bold">
          <ArrowDownToLine className="w-5 h-5" />
          Receive Load
        </Button>
        <Button className="flex-1 h-14 rounded-2xl bg-secondary text-secondary-foreground shadow-xl border border-border gap-2 font-bold">
          <ArrowUpFromLine className="w-5 h-5" />
          Dispatch Load
        </Button>
      </div>
    </div>
  );
}
