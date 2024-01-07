export type AuthResult = {
  access_token: string;
  refresh_token: string;
  profile: Profile;
};

export type Profile = {
  id: number;
  branch_id: number;
  username: string;
  role: string;
};
