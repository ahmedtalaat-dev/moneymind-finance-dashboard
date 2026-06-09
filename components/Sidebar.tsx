"use client";

// Imports
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sidebar Component
export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Navigation items
  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      href: "/dashboard/expenses",
      label: "Expenses",
      icon: "💳",
    },
    {
      href: "/dashboard/goals",
      label: "Goals",
      icon: "🎯",
    },
    {
      href: "/dashboard/insights",
      label: "Insights",
      icon: "💡",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: "⚙️",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-sidebar border-x border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-primary">💰 MoneyMind</h1>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          // Check if current route is active
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-3 text-base"
              >
                {/* Navigation icon */}
                <span className="text-lg">{item.icon}</span>

                {/* Navigation label */}
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User profile section */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        {/* Show user info if logged in */}
        {user && (
          <div className="flex items-center gap-3 p-2">
            {/* User avatar */}
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />

              {/* Fallback to first letter if no avatar */}
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* User details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>

              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}

        {/* User actions dropdown */}
        <DropdownMenu>
          {/* Dropdown trigger button */}
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              Menu
            </Button>
          </DropdownMenuTrigger>

          {/* Dropdown menu content */}
          <DropdownMenuContent align="end" className="w-56">
            {/* Logout action */}
            <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
