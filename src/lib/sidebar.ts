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
  ignored?: Record<string, string>;
  params?: Record<string, string>;
  role?: string;
};

export const menulist = (t: (s: string) => string, branch: string): SidebarMenuType[] => [
  {
    icon: 'mdi:view-dashboard',
    title: t('sidebar.portal'),
    link: `/portal/${branch}`,
  },
  {
    icon: 'mdi:finance',
    title: t('sidebar.report'),
    submenu: [
      {
        title: t('sidebar.report-info'),
        link: `/portal/${branch}/reports`,
      },
      {
        title: t('sidebar.report-stock'),
        link: `/portal/${branch}/reports/stocks`,
      },
      {
        title: t('sidebar.report-transaction'),
        link: `/portal/${branch}/reports/transactions`,
      },
    ],
  },
  {
    icon: 'game-icons:vending-machine',
    title: t('sidebar.machine'),
    link: `/portal/${branch}/machines`,
  },
  {
    icon: 'fluent-mdl2:product-variant',
    title: t('sidebar.product'),
    submenu: [
      {
        title: t('sidebar.product-group'),
        link: `/portal/${branch}/products/groups`,
      },
      {
        title: t('sidebar.product-item'),
        link: `/portal/${branch}/products`,
      },
    ],
    role: 'manager',
  },
  {
    icon: 'mdi:clipboard-text-outline',
    title: t('sidebar.transaction'),
    submenu: [
      {
        title: t('sidebar.transaction-all'),
        link: `/portal/${branch}/transactions`,
        ignored: {
          order_status: 'DONE',
          is_error: 'true',
        },
      },
      {
        title: t('sidebar.transaction-done'),
        link: `/portal/${branch}/transactions`,
        params: {
          order_status: 'DONE',
        },
      },
      {
        title: t('sidebar.transaction-error'),
        link: `/portal/${branch}/transactions`,
        params: {
          order_status: 'REQUEST_ACTION',
          is_error: 'true',
        },
      },
    ],
  },
  {
    icon: 'mdi:account-group-outline',
    title: t('sidebar.staff'),
    link: `/portal/${branch}/staffs`,
    role: 'manager',
  },
];
