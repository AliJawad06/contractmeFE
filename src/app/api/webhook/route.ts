import { NextRequest } from 'next/server';
import { ProcessWebhook } from '@/utils/paddle/process-webhook';
import { getPaddleInstance } from '@/utils/paddle/get-paddle-instance';
import crypto from 'crypto';

const webhookProcessor = new ProcessWebhook();

export async function POST(request: NextRequest) {
  const signature = request.headers.get('paddle-signature') || '';
  const rawRequestBody = await request.text();
  const privateKey = process.env['PADDLE_NOTIFICATION_WEBHOOK_SECRET'] || '';

  // Debug: Manual signature verification
  const parts = Object.fromEntries(signature.split(';').map((p) => p.split('='))) as { ts: string; h1: string };

  const computed = crypto.createHmac('sha256', privateKey).update(`${parts.ts}:${rawRequestBody}`).digest('hex');

  console.log('=== Signature Debug ===');
  console.log('Expected h1:', parts.h1);
  console.log('Computed:   ', computed);
  console.log('Match:', computed === parts.h1);
  console.log('=======================');

  try {
    if (!signature || !rawRequestBody) {
      return Response.json({ error: 'Missing signature from header' }, { status: 400 });
    }

    const paddle = getPaddleInstance();
    const eventData = await paddle.webhooks.unmarshal(rawRequestBody, privateKey, signature);
    const eventName = eventData?.eventType ?? 'Unknown event';

    if (eventData) {
      await webhookProcessor.processEvent(eventData);
    }

    return Response.json({ status: 200, eventName });
  } catch (e) {
    console.log(e);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
