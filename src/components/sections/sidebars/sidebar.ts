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
    title: 'Catalog',
    submenu: [
      {
        title: 'Products',
        link: '/main/catalog/products',
      },
      {
        title: 'Categories',
        link: '/main/catalog/categories',
      },
      {
        title: 'Attributes',
        link: '/main/catalog/attributes',
      },
      {
        title: 'Coupons',
        link: '/main/catalog/coupons',
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
