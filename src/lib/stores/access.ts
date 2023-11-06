import { writable, type Writable } from 'svelte/store';

export type TokenType = 'access_token' | 'refresh_token';

export type TokenData = {
  jti: string;
  sub: string;
  iat: Date;
  exp: Date;
  aud: string;
  iss: string;
  type: TokenType;
  user_id: string;
  username: string;
  role: string;
};

const access: Writable<TokenData> = writable();

export default { ...access };
