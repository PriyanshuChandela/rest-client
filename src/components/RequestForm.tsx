import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function RequestForm({ onResult }: { onResult: (r: any) => void }) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();

  const sendRequest = async () => {
    const parsedHeaders = headers ? JSON.parse(headers) : {};
    const payload = { url, headers: parsedHeaders, body };
    const resp = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, method }),
    });
    if (!resp.ok) throw new Error('Request failed');
    return resp.json();
  };

  const mutation = useMutation({
    mutationFn: sendRequest,
    onSuccess: (data) => {
      onResult(data);
      // refresh history cache after successful request
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <form onSubmit={onSubmit}>
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
        <option>PATCH</option>
      </select>
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/posts" />
      <textarea value={headers} onChange={e => setHeaders(e.target.value)} placeholder='{"Authorization":"Bearer ..."}' />
      <textarea value={body} onChange={e => setBody(e.target.value)} placeholder='{ "name": "john" }' />
      <button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Sending…' : 'Send'}</button>
    </form>
  );
}
