import { createHash, randomUUID, scryptSync, timingSafeEqual } from 'crypto';
import type { Membership, User } from '@/lib/types';
import { users } from '@/lib/mock-db';

let activeSessionUserId: string | null = null;

function scryptHash(password: string, salt: string): string {
  return scryptSync(password, salt, 64).toString('hex');
}

export function hashPassword(password: string): string {
  const salt = randomUUID().replace(/-/g, '');
  return `${salt}:${scryptHash(password, salt)}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, digest] = hash.split(':');
  if (!salt || !digest) return false;
  const expected = Buffer.from(digest, 'hex');
  const got = Buffer.from(scryptHash(password, salt), 'hex');
  return expected.length === got.length && timingSafeEqual(expected, got);
}

export function createSession(userId: string): string {
  activeSessionUserId = userId;
  return createHash('sha256').update(`${userId}:${randomUUID()}`).digest('hex');
}

export function destroySession(): void {
  activeSessionUserId = null;
}

export function setSessionCookie(_token: string): void {
  // 演示环境：使用内存会话。
}

export function clearSessionCookie(): void {
  activeSessionUserId = null;
}

export function getSessionToken(): string | undefined {
  return undefined;
}

export function getCurrentUser(): User | null {
  if (!activeSessionUserId) return null;
  return users.find((u) => u.id === activeSessionUserId) ?? null;
}

export function requireAuth(): User {
  const user = getCurrentUser();
  if (!user) throw new Error('UNAUTHORIZED');
  return user;
}

export function requireMembership(user: User, expected: Membership = 'member'): void {
  if (expected === 'member' && user.membership !== 'member') {
    throw new Error('MEMBERSHIP_REQUIRED');
  }
}
