export type Auth = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};

export type AuthUser = {
  user_id: number;
  username: string;
  role_id: number;
  role: string;
  branch_id: number;
  branch: string;
};
