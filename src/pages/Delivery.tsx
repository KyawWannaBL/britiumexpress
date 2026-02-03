import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  List, 
  Scan, 
  Search, 
  Filter, 
  Navigation, 
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { 
  DeliveryTask, 
  USER_ROLES, 
  hasPermission 
} from '@/lib/index';
import { mockDeliveryTasks } from '@/data/index';
import { useAuth } from '@/hooks/useAuth';
import { TaskCard } from '@/components/Cards';
import { Scanner } from '@/components/Scanner';
import { MapView } from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

export default function Delivery() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<DeliveryTask[]>(mockDeliveryTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number }>({ lat: 51.5074, lng: -0.1278 });

  // Check permission
  const canAccess = user && hasPermission(user.role, [
    USER_ROLES.SUPER_ADMIN, 
    USER_ROLES.MANAGER, 
    USER_ROLES.DRIVER, 
    USER_ROLES.RIDER
  ]);

  useEffect(() => {
    // Simulate GPS tracking in a real app
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const filteredTasks = tasks.filter(task => 
    task.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScan = (data: string) => {
    console.log('Scanned data:', data);
    // In a real app, find task by tracking ID and update status or open details
    setIsScannerOpen(false);
  };

  if (!canAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground mt-2">
          You do not have the necessary permissions to access the delivery management system.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background">
      {/* Sticky Header with Controls */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Delivery Fleet</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                Online
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated 1m ago
              </span>
            </div>
          </div>
          <Button 
            onClick={() => setIsScannerOpen(true)}
            className="rounded-full w-12 h-12 p-0 shadow-lg shadow-primary/20"
          >
            <Scan className="w-6 h-6" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search waybill, customer, or address..."
            className="pl-10 bg-secondary/50 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <div className="px-4 mt-4">
          <TabsList className="w-full grid grid-cols-2 bg-secondary">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" /> Task List
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Active Map
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="mt-0">
          <motion.div 
            className="px-4 py-6 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <motion.div key={task.id} variants={staggerItem}>
                  <TaskCard task={task} />
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>No delivery tasks found matching your search.</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="map" className="mt-0 p-0 h-[calc(100vh-280px)]">
          <div className="h-full w-full rounded-none overflow-hidden">
            <MapView 
              deliveries={filteredTasks}
              currentLocation={currentLocation}
            />
          </div>
          
          {/* Floating Quick Task Info for Map */}
          <div className="absolute bottom-28 left-4 right-4 z-10">
            <AnimatePresence>
              {filteredTasks.find(t => t.status === 'in_progress') && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-primary uppercase">Current Trip</p>
                      <p className="text-sm font-bold truncate max-w-[180px]">
                        {filteredTasks.find(t => t.status === 'in_progress')?.address}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" className="rounded-full">
                    Navigate <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>

      {/* Scanner Overlay */}
      <Scanner 
        isActive={isScannerOpen} 
        onScan={handleScan} 
        onClose={() => setIsScannerOpen(false)} 
      />

      {/* Bottom Padding for Navigation Menu (usually handled by Layout, but keeping page self-contained for visibility) */}
      <div className="h-20" />
    </div>
  );
}
