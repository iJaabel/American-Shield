import { env } from './env';

export function logError(error: Error, context?: Record<string, unknown>) {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
}

export function logSecurityEvent(
  eventType: string,
  details: Record<string, unknown>
) {
  console.log('Security Event:', {
    type: eventType,
    details,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
}