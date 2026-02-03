import React from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  MapPin,
  User,
  Phone,
  Clock,
  Bell,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Order,
  DeliveryTask,
  Notification,
  getStatusColor,
  ORDER_STATUS,
} from '@/lib/index.ts';
import { cn } from '@/lib/utils';

/**
 * OrderCard: Displays high-level information about a shipment order
 */
export function OrderCard({ order }: { order: Order }) {
  const statusColor = getStatusColor(order.status);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <Card className="overflow-hidden border-border bg-card">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Tracking ID
              </p>
              <h3 className="font-mono text-sm font-bold text-foreground">
                {order.trackingNumber}
              </h3>
            </div>
            <Badge
              variant="secondary"
              className={cn('capitalize border-none px-2.5 py-0.5 font-semibold', statusColor)}
            >
              {order.status.replace(/_/g, ' ')}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-0.5 h-6 bg-border" />
                <div className="w-2 h-2 rounded-full border-2 border-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium truncate">{order.origin}</p>
                <p className="text-sm font-medium truncate">{order.destination}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                <span>{order.receiverName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * TaskCard: Operational card for riders and drivers showing delivery tasks
 */
export function TaskCard({ task }: { task: DeliveryTask }) {
  const isPickup = task.type === 'pickup';
  const priorityColors = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-chart-3/20 text-chart-3',
    high: 'bg-destructive/20 text-destructive',
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-xl",
                isPickup ? "bg-primary/10 text-primary" : "bg-chart-2/10 text-chart-2"
              )}>
                {isPickup ? <Package className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-bold text-sm capitalize">{task.type} Task</h4>
                <p className="text-xs font-mono text-muted-foreground">{task.trackingNumber}</p>
              </div>
            </div>
            <Badge className={cn("text-[10px] px-1.5 py-0 border-none", priorityColors[task.priority])}>
              {task.priority.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-sm text-foreground line-clamp-2">{task.address}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{task.customerName}</span>
              </div>
              <a 
                href={`tel:${task.customerContact}`} 
                className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * NotificationCard: Alerts and system messages
 */
export function NotificationCard({ notification }: { notification: Notification }) {
  const iconMap = {
    info: <Info className="w-5 h-5 text-primary" />,
    success: <CheckCircle className="w-5 h-5 text-chart-2" />,
    warning: <AlertTriangle className="w-5 h-5 text-chart-3" />,
    error: <XCircle className="w-5 h-5 text-destructive" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-2xl border transition-colors flex gap-4",
        notification.isRead ? "bg-card border-border" : "bg-primary/5 border-primary/20"
      )}
    >
      <div className="shrink-0 mt-1">
        {iconMap[notification.type]}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-start">
          <h5 className="text-sm font-bold leading-none">{notification.title}</h5>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
            {notification.timestamp}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {notification.message}
        </p>
        {!notification.isRead && (
          <div className="w-2 h-2 rounded-full bg-primary mt-2" />
        )}
      </div>
    </motion.div>
  );
}

/**
 * StatsCard: Numerical dashboard metrics with visual indicators
 */
export function StatsCard({ 
  title, 
  value, 
  icon, 
  trend 
}: { 
  title: string, 
  value: string, 
  icon: React.ReactNode, 
  trend?: string 
}) {
  const isPositive = trend && !trend.startsWith('-');

  return (
    <Card className="border-none shadow-sm bg-card">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
              isPositive ? "bg-chart-2/10 text-chart-2" : "bg-destructive/10 text-destructive"
            )}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend}
            </div>
          )}
        </div>
        <div className="mt-1">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
