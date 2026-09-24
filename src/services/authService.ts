const BASE_URL = 'https://dummyjson.com';

export type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image?: string;
};

export type LoginResponse = UserProfile & {
  accessToken: string;
  refreshToken?: string;
};

export async function loginUser(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });

  if (!response.ok) {
    throw new Error('Login failed. Check your username and password.');
  }
  return await response.json();
}

export async function getCurrentUser(token: string): Promise<UserProfile> {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Session expired or token rejected. Please log in again.');
  }
  return await response.json();
}