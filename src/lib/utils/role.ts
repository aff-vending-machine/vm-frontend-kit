export const getPermissionType = (level: number) => {
  switch (level) {
    case 0:
      return 'None';
    case 1:
      return 'View';
    case 2:
      return 'Owner';
    case 3:
      return 'Edit';
    case 4:
      return 'Admin';
  }
};

export const getRoleLevel = (role: string) => {
  switch (role) {
    case 'super-admin':
      return 99;
    case 'admin':
      return 9;
    case 'manager':
      return 5;
    case 'staff':
      return 1;
    default:
      return 0;
  }
};

export const requestRole = (access: string, role: string) => {
  return getRoleLevel(role) <= getRoleLevel(access);
};
