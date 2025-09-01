export default function ResponseViewer({ data }: { data: any }) {
  if (!data) return <div>No response yet</div>;
  return (
    <div>
      <div>Status: {data.status}</div>
      <div>Duration: {data.duration}ms</div>
      <pre>{typeof data.body === 'string' ? data.body : JSON.stringify(data.body, null, 2)}</pre>
    </div>
  );
}
