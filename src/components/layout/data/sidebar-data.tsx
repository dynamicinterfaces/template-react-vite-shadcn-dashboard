import { DashboardMenu } from '@/router'
import { Building2 } from 'lucide-react'
import { NavGroup, NavItem, type SidebarData } from '../types'

interface ISidebarDataComponent {
  sidebarData: SidebarData
}

export const SidebarDataComponent = (): ISidebarDataComponent => {
  const routes = DashboardMenu()
  console.log({ routes })

  type NavGroups = NavGroup[]

  function removeHiddenItems(navGroups: NavGroups): NavGroups {
    function filterItems(items: NavItem[]): NavItem[] {
      return items
        .map(item => {
          if (item?.children) {
            const filteredChildren = filterItems(item.children)
            return { ...item, children: filteredChildren }
          }
          return item
        })
        .filter(item => !item.hide) as NavItem[]
    }

    return navGroups.map(group => ({
      ...group,
      children: filterItems(group.children)
    }))
  }

  return {
    sidebarData: {
      user: {
        name: 'username',
        email: 'user@gmail.com',
        avatar: '/avatars/shadcn.jpg'
      },
      app: {
        name: 'Dynamics',
        logo: Building2,
        plan: 'Vite + ShadcnUI'
      },
      navGroups: removeHiddenItems(routes)
    }
  }
}
