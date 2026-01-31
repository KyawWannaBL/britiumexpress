/* =====================================================================================
   File: src/layouts/AdminLayout.tsx
   Description: Main layout for authenticated admin pages with sidebar navigation.
   ===================================================================================== */

import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/brand";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  MapPin, 
  Settings, 
  LogOut, 
  Menu,
  Bell
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Orders", path: "/admin/orders", icon: Package },
    { label: "Riders", path: "/admin/riders", icon: Users },
    { label: "Tracking", path: "/admin/tracking", icon: MapPin },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white px-4 py-6">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2">
        <img 
          src={BRAND.logoSrc} 
          alt="Logo" 
          className="h-10 w-10 rounded-xl bg-white p-1 ring-1 ring-black/5 object-contain shadow-sm" 
        />
        <span className="text-xl font-black tracking-tight" style={{ color: BRAND.colors.blue }}>
          {BRAND.name}
        </span>
      </div>

      <Separator className="my-6 opacity-50" />

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-all ${
                  isActive 
                    ? "text-white shadow-md" 
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
                style={isActive ? { background: BRAND.colors.blue } : {}}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-neutral-400"}`} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-6">
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start gap-3 rounded-xl px-3 py-6 font-bold text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r border-black/5 bg-white lg:block">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/5 bg-white/80 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>
            <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400">
              Admin Console
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5 text-neutral-500" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500 border-2 border-white"></span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-neutral-200 border border-black/5"></div>
          </div>
        </header>

        {/* Page Content (Outlet) */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}