import { useQuery } from '@tanstack/react-query';

export default function ServerStatus() {
  const { isLoading, error } = useQuery({
    queryKey: ['server-status'],
    queryFn: async () => {
      const r = await fetch('/api/history?limit=1');
      if (!r.ok) throw new Error('Server unreachable');
      return r.json();
    },
  });

  if (isLoading) return <div>Checking server…</div>;
  if (error) return <div>Server error</div>;
  return <div>Server OK</div>;
}
