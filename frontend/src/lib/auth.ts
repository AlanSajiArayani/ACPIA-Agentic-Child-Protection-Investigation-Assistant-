export const DEMO_USERNAME = 'investigator';
export const DEMO_PASSWORD = 'hackup2026';
export const AUTH_KEY = 'hackup_auth';
export const USER_KEY = 'hackup_user';

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function setAuthenticatedUser(username: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(AUTH_KEY, 'true');
  sessionStorage.setItem(USER_KEY, username);
}

export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function getAuthenticatedUser(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(USER_KEY);
}
