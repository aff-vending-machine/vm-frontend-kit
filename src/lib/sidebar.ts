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

export const menulist = (t: (s: string) => string, branch: string) => [
  {
    icon: 'mdi:view-dashboard',
    title: t('sidebar.console'),
    link: `/console/${branch}`,
  },
  {
    icon: 'mdi:finance',
    title: t('sidebar.report'),
    submenu: [
      {
        title: t('sidebar.report-info'),
        link: `/console/${branch}/reports`,
      },
      {
        title: t('sidebar.report-stock'),
        link: `/console/${branch}/reports/stocks`,
      },
      {
        title: t('sidebar.report-transaction'),
        link: `/console/${branch}/reports/transactions`,
      },
    ],
  },
  {
    icon: 'game-icons:vending-machine',
    title: t('sidebar.machine'),
    submenu: [
      {
        title: t('sidebar.machine-info'),
        link: `/console/${branch}/machines`,
      },
      {
        title: t('sidebar.machine-slot'),
        link: `/console/${branch}/machines/0/slots`,
      },
      {
        title: t('sidebar.machine-payment'),
        link: `/console/${branch}/machines/payments`,
      },
    ],
  },
  {
    icon: 'fluent-mdl2:product-variant',
    title: t('sidebar.product'),
    submenu: [
      {
        title: t('sidebar.product-group'),
        link: `/console/${branch}/products/groups`,
      },
      {
        title: t('sidebar.product-item'),
        link: `/console/${branch}/products`,
      },
    ],
  },
  {
    icon: 'mdi:clipboard-text-outline',
    title: t('sidebar.transaction'),
    link: `/console/${branch}/transactions`,
  },
  {
    icon: 'mdi:account-group-outline',
    title: t('sidebar.staff'),
    link: `/console/${branch}/staffs`,
  },
];
