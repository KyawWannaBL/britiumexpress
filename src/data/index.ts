import { 
  User, 
  Order, 
  DeliveryTask, 
  Notification, 
  USER_ROLES, 
  ORDER_STATUS 
} from '@/lib/index';

export const mockUsers: User[] = [
  {
    id: 'u-001',
    name: 'Alex Sterling',
    email: 'alex.admin@britiumexpress.com',
    role: USER_ROLES.SUPER_ADMIN,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    phone: '+44 20 7123 4567',
    lastSync: '2026-01-27T15:30:00Z',
    isOffline: false,
  },
  {
    id: 'u-002',
    name: 'Sarah Chen',
    email: 's.chen@britiumexpress.com',
    role: USER_ROLES.MANAGER,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    stationId: 'ST-LDN-01',
    phone: '+44 20 7987 6543',
    lastSync: '2026-01-27T16:00:00Z',
    isOffline: false,
  },
  {
    id: 'u-003',
    name: 'Marcus Rodriguez',
    email: 'm.rodriguez@britiumexpress.com',
    role: USER_ROLES.DRIVER,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    vehicleId: 'VAN-772',
    phone: '+44 77 1234 5678',
    lastSync: '2026-01-27T16:15:00Z',
    isOffline: false,
  },
  {
    id: 'u-004',
    name: 'Elena Volkov',
    email: 'e.volkov@britiumexpress.com',
    role: USER_ROLES.WAREHOUSE,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    stationId: 'ST-LDN-01',
    phone: '+44 20 7555 0199',
    lastSync: '2026-01-27T14:45:00Z',
    isOffline: true,
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord-1001',
    trackingNumber: 'BTX-2026-7789A',
    status: ORDER_STATUS.IN_TRANSIT,
    senderName: 'TechHub Solutions',
    receiverName: 'John Doe',
    origin: 'Manchester Hub (ST-MAN-02)',
    destination: '221B Baker St, London, NW1 6XE',
    weight: 2.5,
    createdAt: '2026-01-25T09:00:00Z',
    updatedAt: '2026-01-27T10:30:00Z',
    description: 'Electronics - Fragile',
    value: 1250.00,
    currency: 'GBP'
  },
  {
    id: 'ord-1002',
    trackingNumber: 'BTX-2026-8812B',
    status: ORDER_STATUS.DELIVERED,
    senderName: 'Fashion Direct',
    receiverName: 'Alice Smith',
    origin: 'London Station 01 (ST-LDN-01)',
    destination: '15 High St, Reading, RG1 1AF',
    weight: 1.2,
    createdAt: '2026-01-26T14:20:00Z',
    updatedAt: '2026-01-27T15:45:00Z',
    description: 'Apparel - Summer Collection',
    value: 85.50,
    currency: 'GBP'
  },
  {
    id: 'ord-1003',
    trackingNumber: 'BTX-2026-9901C',
    status: ORDER_STATUS.OUT_FOR_DELIVERY,
    senderName: 'Gourmet Foods Ltd',
    receiverName: 'Robert Wilson',
    origin: 'London Station 01 (ST-LDN-01)',
    destination: '42 Primrose Hill, London, NW3 3AA',
    weight: 5.8,
    createdAt: '2026-01-27T08:15:00Z',
    updatedAt: '2026-01-27T16:05:00Z',
    description: 'Perishables - Refrigerated',
    value: 210.00,
    currency: 'GBP'
  },
  {
    id: 'ord-1004',
    trackingNumber: 'BTX-2026-1122D',
    status: ORDER_STATUS.PENDING,
    senderName: 'Office World',
    receiverName: 'Catherine Lane',
    origin: 'Birmingham Station (ST-BIR-04)',
    destination: '88 Canal St, Oxford, OX1 2EE',
    weight: 15.0,
    createdAt: '2026-01-27T13:45:00Z',
    updatedAt: '2026-01-27T13:45:00Z',
    description: 'Office Furniture',
    value: 450.00,
    currency: 'GBP'
  },
  {
    id: 'ord-1005',
    trackingNumber: 'BTX-2026-3344E',
    status: ORDER_STATUS.CANCELLED,
    senderName: 'Global Parts',
    receiverName: 'Mechanic Pro',
    origin: 'London Station 01 (ST-LDN-01)',
    destination: 'Unit 4, Industrial Estate, Watford',
    weight: 3.2,
    createdAt: '2026-01-24T11:00:00Z',
    updatedAt: '2026-01-25T09:30:00Z',
    description: 'Automotive Spares',
    value: 320.00,
    currency: 'GBP'
  }
];

export const mockDeliveryTasks: DeliveryTask[] = [
  {
    id: 'task-501',
    orderId: 'ord-1003',
    trackingNumber: 'BTX-2026-9901C',
    type: 'delivery',
    status: 'in_progress',
    address: '42 Primrose Hill, London, NW3 3AA',
    customerName: 'Robert Wilson',
    customerContact: '+44 79 1122 3344',
    priority: 'high',
    scheduledTime: '2026-01-27T17:30:00Z',
    lat: 51.5393,
    lng: -0.1606,
    notes: 'Ring doorbell twice. Gate code: 1234'
  },
  {
    id: 'task-502',
    orderId: 'ord-1004',
    trackingNumber: 'BTX-2026-1122D',
    type: 'pickup',
    status: 'assigned',
    address: '88 Canal St, Oxford, OX1 2EE',
    customerName: 'Office World',
    customerContact: '+44 20 7555 0101',
    priority: 'medium',
    scheduledTime: '2026-01-28T10:00:00Z',
    lat: 51.7520,
    lng: -1.2577,
    notes: 'Heavy items, use trolley.'
  },
  {
    id: 'task-503',
    orderId: 'ord-1002',
    trackingNumber: 'BTX-2026-8812B',
    type: 'delivery',
    status: 'completed',
    address: '15 High St, Reading, RG1 1AF',
    customerName: 'Alice Smith',
    customerContact: '+44 77 8899 0011',
    priority: 'low',
    scheduledTime: '2026-01-27T15:00:00Z',
    lat: 51.4543,
    lng: -0.9781,
    notes: 'Leave at reception.'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'New Assignment',
    message: 'You have been assigned a new pickup task in Oxford.',
    type: 'info',
    timestamp: '2026-01-27T16:10:00Z',
    isRead: false,
  },
  {
    id: 'notif-002',
    title: 'Delivery Successful',
    message: 'Package BTX-2026-8812B has been successfully delivered.',
    type: 'success',
    timestamp: '2026-01-27T15:46:00Z',
    isRead: true,
  },
  {
    id: 'notif-003',
    title: 'Route Delay',
    message: 'Heavy traffic reported on M25. Expect 20 min delay for London deliveries.',
    type: 'warning',
    timestamp: '2026-01-27T14:30:00Z',
    isRead: false,
  },
  {
    id: 'notif-004',
    title: 'Sync Failed',
    message: 'Could not synchronize local changes. Please check your internet connection.',
    type: 'error',
    timestamp: '2026-01-27T12:00:00Z',
    isRead: false,
  }
];