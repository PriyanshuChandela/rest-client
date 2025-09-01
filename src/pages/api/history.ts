import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrm } from '../../lib/mikroorm';
import { RequestHistory } from '../../entities/RequestHistory';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { limit = '20', cursor } = req.query;
  const l = Math.min(100, Number(limit) || 20);
  const orm = await getOrm();
  const em = orm.em.fork();

  const qb = em.createQueryBuilder(RequestHistory);
  if (cursor) {
    qb.where({ createdAt: { $lt: new Date(String(cursor)) } });
  }
  qb.orderBy({ createdAt: 'DESC' }).limit(l + 1);
  const rows = await qb.getResultList();

  const hasMore = rows.length > l;
  const items = hasMore ? rows.slice(0, l) : rows;
  const nextCursor = hasMore ? items[items.length - 1].createdAt.toISOString() : null;

  res.json({ items, nextCursor, hasMore });
}
