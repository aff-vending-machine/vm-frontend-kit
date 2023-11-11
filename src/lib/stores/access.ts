import { writable, type Writable } from 'svelte/store';

export type TokenType = 'access_token' | 'refresh_token';

export type AccessStore = {
  jti: string;
  sub: string;
  iat: Date;
  exp: Date;
  aud: string;
  iss: string;
  type: TokenType;
  user_id: string;
  name: string;
  role: string;
};

const access: Writable<AccessStore> = writable();

export default access;
