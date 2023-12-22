import { browser } from '$app/environment';

export function isTokenExpired(token: string) {
  try {
    const payloadBase64Url = token.split('.')[1];
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');

    const decodedJson = browser ? decodeURIComponent(window.atob(payloadBase64)) : atob(payloadBase64);

    const decodedToken = JSON.parse(decodedJson);
    const exp = decodedToken.exp;
    const currentUnixTime = Math.floor(Date.now() / 1000);

    return exp < currentUnixTime;
  } catch (e) {
    // If the token can't be decoded, treat it as expired
    return true;
  }
}
