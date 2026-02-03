import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Layers,
  Maximize2,
  Minimize2,
  Plus,
  Minus,
  Info,
  Phone,
  Package,
  CheckCircle2
} from 'lucide-react';
import { DeliveryTask, getStatusColor } from '@/lib/index';
import { springPresets } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MapViewProps {
  deliveries: DeliveryTask[];
  currentLocation?: { lat: number; lng: number };
  onLocationUpdate?: (location: { lat: number; lng: number }) => void;
}

/**
 * MapView Component
 * Provides a high-fidelity simulated interactive map for logistics tracking.
 * Optimized for mobile touch interaction and real-time status visualization.
 */
export function MapView({ deliveries, currentLocation, onLocationUpdate }: MapViewProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedTask, setSelectedTask] = useState<DeliveryTask | null>(null);
  const [isMapTypeSatellite, setIsMapTypeSatellite] = useState(false);

  // Simulated movement for demonstration if no external location is provided
  useEffect(() => {
    if (!currentLocation && onLocationUpdate) {
      const interval = setInterval(() => {
        // Random walk simulation for driver
        onLocationUpdate({
          lat: 51.505 + (Math.random() - 0.5) * 0.01,
          lng: -0.09 + (Math.random() - 0.5) * 0.01,
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentLocation, onLocationUpdate]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-chart-3';
      default: return 'bg-chart-2';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] bg-muted overflow-hidden rounded-xl border border-border shadow-inner">
      {/* Simulated Map Background - Stylized SVG Grid */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          scale: zoom,
          x: pan.x,
          y: pan.y,
        }}
        transition={springPresets.gentle}
      >
        <div 
          className={`absolute inset-0 transition-colors duration-700 ${isMapTypeSatellite ? 'bg-slate-900' : 'bg-background'}`}
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isMapTypeSatellite ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        >
          {/* Simulated Road Network */}
          <svg width="200%" height="200%" className="opacity-20 translate-x-[-25%] translate-y-[-25%]">
            <path d="M0 100 L2000 100 M0 500 L2000 500 M0 900 L2000 900 M100 0 L100 2000 M500 0 L500 2000 M900 0 L900 2000" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="500" cy="500" r="300" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10,10" />
          </svg>

          {/* Delivery Markers */}
          {deliveries.map((task) => (
            <motion.div
              key={task.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${((task.lng || 0) + 0.2) * 200}%`,
                top: `${((task.lat || 0) - 51.4) * 500}%`,
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelectedTask(task)}
            >
              <div className="relative">
                <div className={`absolute -inset-2 rounded-full blur-sm opacity-50 ${getPriorityColor(task.priority)} animate-pulse`} />
                <MapPin className={`w-8 h-8 ${task.status === 'completed' ? 'text-chart-2' : 'text-primary'} fill-current shadow-lg transition-transform`} />
                {task.priority === 'high' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background" />
                )}
              </div>
            </motion.div>
          ))}

          {/* User Location Marker */}
          {currentLocation && (
            <motion.div
              className="absolute z-10"
              animate={{
                left: `${(currentLocation.lng + 0.2) * 200}%`,
                top: `${(currentLocation.lat - 51.4) * 500}%`,
              }}
              transition={springPresets.smooth}
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping" />
                <div className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-xl flex items-center justify-center">
                  <Navigation className="w-3 h-3 text-primary-foreground fill-current rotate-45" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Map Controls Overlay */}
      <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
        <Button size="icon" variant="secondary" onClick={handleZoomIn} className="shadow-md">
          <Plus className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="secondary" onClick={handleZoomOut} className="shadow-md">
          <Minus className="w-5 h-5" />
        </Button>
        <Button 
          size="icon" 
          variant={isMapTypeSatellite ? "default" : "secondary"} 
          onClick={() => setIsMapTypeSatellite(!isMapTypeSatellite)} 
          className="shadow-md mt-4"
        >
          <Layers className="w-5 h-5" />
        </Button>
      </div>

      <div className="absolute left-4 top-4 z-20">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-md px-3 py-1 font-mono text-xs">
          GPS: {currentLocation?.lat.toFixed(4)}, {currentLocation?.lng.toFixed(4)}
        </Badge>
      </div>

      {/* Selected Task Detail Card */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-4 left-4 right-4 z-30"
          >
            <Card className="p-4 shadow-2xl border-primary/20 backdrop-blur-lg bg-card/95">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="font-mono">{selectedTask.trackingNumber}</Badge>
                    <Badge className={getPriorityColor(selectedTask.priority)}>
                      {selectedTask.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg leading-tight">{selectedTask.customerName}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {selectedTask.address}
                  </p>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => setSelectedTask(null)} 
                  className="-mr-2 -mt-2"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <Package className="w-4 h-4 text-primary" />
                  <div className="text-xs">
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">{selectedTask.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <CheckCircle2 className={`w-4 h-4 ${getStatusColor(selectedTask.status)}`} />
                  <div className="text-xs">
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium capitalize">{selectedTask.status.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Navigation className="w-4 h-4" /> Start Route
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={`tel:${selectedTask.customerContact}`}>
                    <Phone className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Center Hint */}
      {!selectedTask && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border flex items-center gap-2 text-sm shadow-lg">
            <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse" />
            <span>{deliveries.filter(d => d.status !== 'completed').length} Pending Deliveries</span>
          </div>
        </div>
      )}
    </div>
  );
}
