import { RATE_LIMIT } from '../config/constants';

const attempts = new Map<string, { count: number; timestamp: number }>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const attempt = attempts.get(key);

  if (!attempt) {
    attempts.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (now - attempt.timestamp > RATE_LIMIT.WINDOW_MS) {
    attempts.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (attempt.count >= RATE_LIMIT.MAX_ATTEMPTS) {
    return false;
  }

  attempt.count += 1;
  return true;
}

export function resetRateLimit(key: string): void {
  attempts.delete(key);
}