export type MockResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
};

type MockInit = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

const DELAY_MS = 600;
const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000;

// "Server-side" data only. The app never stores the password.
const VALID_EMAIL = 'student@example.com';
const VALID_PASSWORD = 'password123';

const USER = { id: 1, name: 'Student User', email: VALID_EMAIL, role: 'Student' };

const STUDENTS = [
  { id: 1, name: 'John Denver Descatin', email: 'j.descartin@school.edu', course: 'BSIT' },
  { id: 2, name: 'Lhindex khim Gamones', email: 'l.gamones@school.edu', course: 'BSIT' },
  { id: 3, name: 'Dwayne lee Gonzales', email: 'd.gonzales@school.edu', course: 'BSIT' },
  { id: 4, name: 'Mike Airon Iroy', email: 'm.iroy@school.edu', course: 'BSIT' },
  { id: 5, name: 'Edieson Malintad', email: 'e.malintad@school.edu', course: 'BSIT' },
  { id: 6, name: 'Jade Olacao', email: 'j.olacao@school.edu', course: 'BSIT' },
];

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const reply = (status: number, body: unknown): MockResponse => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});

// A new random token with an expiry is generated on every login (never hardcoded).
function createToken(): string {
  const random = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const expires = (Date.now() + TOKEN_LIFETIME_MS).toString(36);
  return `mock.${random}.${expires}`;
}

function isValidToken(token: string): boolean {
  const match = /^mock\.[0-9a-f]{32}\.([0-9a-z]+)$/.exec(token);
  if (!match) return false;
  return parseInt(match[1], 36) > Date.now();
}

function getBearerToken(headers?: Record<string, string>): string | null {
  const value = headers?.Authorization ?? headers?.authorization;
  if (!value || !value.startsWith('Bearer ')) return null;
  return value.slice(7);
}

export async function apiFetch(path: string, init: MockInit = {}): Promise<MockResponse> {
  await delay(DELAY_MS);
  const method = (init.method ?? 'GET').toUpperCase();

  if (method === 'POST' && path === '/login') {
    let creds: { email?: string; password?: string } = {};
    try {
      creds = JSON.parse(init.body ?? '{}');
    } catch {
      return reply(400, { message: 'Invalid request.' });
    }
    if (creds.email?.trim().toLowerCase() !== VALID_EMAIL || creds.password !== VALID_PASSWORD) {
      return reply(401, { message: 'Invalid email or password.' });
    }
    return reply(200, { accessToken: createToken(), user: USER });
  }

  const token = getBearerToken(init.headers);
  if (!token || !isValidToken(token)) {
    return reply(401, { message: 'Unauthorized. Please sign in again.' });
  }

  if (method === 'GET' && path === '/profile') {
    return reply(200, USER);
  }

  if (method === 'GET' && path === '/students') {
    return reply(200, STUDENTS);
  }

  const studentMatch = /^\/students\/([^/]+)$/.exec(path);
  if (method === 'GET' && studentMatch) {
    const student = STUDENTS.find((s) => String(s.id) === studentMatch[1]);
    return student ? reply(200, student) : reply(404, { message: 'Student not found.' });
  }

  return reply(404, { message: 'Not found.' });
}