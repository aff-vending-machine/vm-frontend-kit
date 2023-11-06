export const isExpired = (iat: Date, exp: Date) => {
  if (iat > exp) return true;

  const now = new Date();
  return now < iat || now > exp;
};
