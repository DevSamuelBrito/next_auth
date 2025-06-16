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
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

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
      name:"Inicio",
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
  username:string,
}

async function fetchUser() {
  const res = await fetch('/api/user');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<UserProps| null>(null);

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
        <TeamSwitcher teams={data.teams} />
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
