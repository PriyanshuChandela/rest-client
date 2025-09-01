interface HistoryItem {
  id: number;
  method: string;
  url: string;
  timestamp: string;
}

const dummyHistory: HistoryItem[] = [
  { id: 1, method: "GET", url: "https://jsonplaceholder.typicode.com/posts", timestamp: "2025-09-01 10:30" },
  { id: 2, method: "POST", url: "https://jsonplaceholder.typicode.com/users", timestamp: "2025-09-01 10:40" },
  { id: 3, method: "DELETE", url: "https://jsonplaceholder.typicode.com/comments/1", timestamp: "2025-09-01 11:00" },
];

function getMethodColor(method: string) {
  switch (method) {
    case "GET":
      return "text-green-400";
    case "POST":
      return "text-blue-400";
    case "PUT":
      return "text-yellow-400";
    case "DELETE":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export default function HistoryList() {
  return (
    <div className="space-y-3">
      {dummyHistory.map((item) => (
        <div
          key={item.id}
          className="bg-[#1E1E1E] p-3 rounded-lg border border-gray-700 hover:bg-[#333] transition"
        >
          <p className={`font-semibold ${getMethodColor(item.method)}`}>
            {item.method} <span className="text-gray-300">{item.url}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
