import {
  ShoppingBag,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Default",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      
      
      
      
    ],
  },
  {
    id: 2,
    label: "Pages",
    items: [
      
      
      {
        title: "User Management",
        url: "/auth",
        icon: Fingerprint,
        subItems: [
          { title: "Platform User", url: "/", icon:Users},
          { title: "Admin User", url: "/", icon:Users },
          
        ],
      },
    ],
  },
  
    
    
  
];
