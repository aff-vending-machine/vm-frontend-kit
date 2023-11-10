export type SidebarMenuType = {
  icon: string;
  title: string;
  link?: string;
  submenu?: SidebarSubMenuType[];
};

export type SidebarSubMenuType = {
  title: string;
  link: string;
};

export const menulist: SidebarMenuType[] = [
  {
    icon: 'mdi:view-dashboard',
    title: 'Dashboard',
    link: '/main/dashboard',
  },
  {
    icon: 'mdi:shape-plus-outline',
    title: 'Machine',
    submenu: [
      {
        title: 'List',
        link: '/main/machines',
      },
      {
        title: 'Reports',
        link: '/main/machines/reports',
      },
      {
        title: 'Attributes',
        link: '/main/machines/attributes',
      },
      {
        title: 'Payments',
        link: '/main/machines/payments',
      },
    ],
  },
  {
    icon: 'mdi:face-agent',
    title: 'Customers',
    link: '/main/customers',
  },
  {
    icon: 'mdi:clipboard-text-outline',
    title: 'Orders',
    link: '/main/orders',
  },
  {
    icon: 'mdi:account-group-outline',
    title: 'Our Staff',
    link: '/main/staffs',
  },
];
