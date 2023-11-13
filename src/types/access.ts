import { convertToDate } from '$lib/utils/convert';

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

export const parseTokenData = (token: AccessStore) => {
  token.iat = convertToDate(token.iat);
  token.exp = convertToDate(token.exp);

  return token;
};
