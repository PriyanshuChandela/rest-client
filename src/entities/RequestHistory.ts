import { EntitySchema } from '@mikro-orm/core';

export interface RequestHistory {
  id: number;
  method: string;
  url: string;
  requestBody?: string;
  responseBody?: string;
  createdAt: Date;
}

export const RequestHistorySchema = new EntitySchema<RequestHistory>({
  name: 'RequestHistory',
  properties: {
    id: { type: 'number', primary: true },
    method: { type: 'string' },
    url: { type: 'string' },
    requestBody: { type: 'string', nullable: true },
    responseBody: { type: 'string', nullable: true },
    createdAt: { type: 'date' },
  },
});
