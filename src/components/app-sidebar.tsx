"use client"

import { useState, useEffect } from "react"

import * as React from "react"
import {
  Search,
  GalleryVerticalEnd,
  Heart,
  Home,
} from "lucide-react"
import { NavPages } from "@/components/nav-pages"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { useRouter } from "next/navigation"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  tools: [
    {
      name: "Inicio",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "Pesquisar",
      url: "/dashboard/search",
      icon: Search,
    },
    {
      name: "Favoritos",
      url: "/dashboard/favorites",
      icon: Heart,
    },
  ],
}

interface UserProps {
  name: string,
  email: string,
  username: string,
}

async function fetchUser() {
  const res = await fetch('/api/user');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();


  useEffect(() => {

    async function loadUser() {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    loadUser();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="w-8 h-8 ">
            <AvatarImage src="/favicon.ico" alt="Portifol.io" className="w-full h-full object-cover rounded-xs" />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Portifol.io</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavPages projects={data.tools} />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
