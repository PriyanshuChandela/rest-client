import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrm } from '../../lib/mikroorm';
import { RequestHistory } from '../../entities/RequestHistory';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { url, headers: reqHeaders, body } = req.body as any;
  if (!url) return res.status(400).json({ error: 'Missing url in body' });

  const start = Date.now();
  try {
    const fetchOptions: any = {
      method,
      headers: reqHeaders || {},
      body: ['GET', 'HEAD'].includes(method || '') ? undefined : body,
    };
    const response = await fetch(url, fetchOptions);
    const duration = Date.now() - start;
    const text = await response.text();

    const orm = await getOrm();
    const em = orm.em.fork();
    const item = em.create(RequestHistory, {
      method: method ?? 'GET',
      url,
      requestHeaders: JSON.stringify(reqHeaders || {}),
      requestBody: body ? JSON.stringify(body) : undefined,
      statusCode: response.status,
      responseHeaders: JSON.stringify(Object.fromEntries(response.headers.entries())),
      responseBody: text,
      durationMs: duration,
    });
    await em.persistAndFlush(item);

    res.status(200).json({ status: response.status, headers: Object.fromEntries(response.headers.entries()), body: text, id: item.id, duration });
  } catch (err: any) {
    const duration = Date.now() - start;
    const orm = await getOrm();
    const em = orm.em.fork();
    const item = em.create(RequestHistory, {
      method: method ?? 'GET',
      url,
      requestHeaders: JSON.stringify(reqHeaders || {}),
      requestBody: body ? JSON.stringify(body) : undefined,
      statusCode: 0,
      responseHeaders: JSON.stringify({ error: String(err) }),
      responseBody: String(err),
      durationMs: duration,
    });
    await em.persistAndFlush(item);
    res.status(500).json({ error: String(err) });
  }
}
