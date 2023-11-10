export type SidebarMenuType = {
  icon: string;
  title: string;
  link?: string;
  submenu?: SidebarSubMenuType[];
  role?: string;
};

export type SidebarSubMenuType = {
  title: string;
  link: string;
  role?: string;
};

export const menulist: SidebarMenuType[] = [
  {
    icon: 'mdi:view-dashboard',
    title: 'sidebar.console',
    link: '/console',
  },
  {
    icon: 'mdi:finance',
    title: 'sidebar.report',
    submenu: [
      {
        title: 'sidebar.report-info',
        link: '/console/reports',
      },
      {
        title: 'sidebar.report-stock',
        link: '/console/reports/stocks',
      },
      {
        title: 'sidebar.report-transaction',
        link: '/console/reports/transactions',
      },
    ],
  },
  {
    icon: 'icon-park-outline:branch-one',
    title: 'sidebar.branch',
    link: '/console/branches',
  },
  {
    icon: 'game-icons:vending-machine',
    title: 'sidebar.machine',
    submenu: [
      {
        title: 'sidebar.machine-info',
        link: '/console/machines',
      },
      {
        title: 'sidebar.machine-slot',
        link: '/main/machines/slots',
      },
      {
        title: 'sidebar.machine-payment',
        link: '/main/machines/payments',
      },
    ],
  },
  {
    icon: 'fluent-mdl2:product-variant',
    title: 'sidebar.product',
    submenu: [
      {
        title: 'sidebar.product-group',
        link: '/console/products/groups',
      },
      {
        title: 'sidebar.product-group',
        link: '/console/products/items',
      },
    ],
  },
  {
    icon: 'mdi:clipboard-text-outline',
    title: 'sidebar.transaction',
    link: '/console/transactions',
  },
  {
    icon: 'mdi:account-group-outline',
    title: 'sidebar.staff',
    link: '/console/staffs',
  },
];
