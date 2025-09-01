import { useState } from "react";
import HistoryList from "../components/HistoryList";

export default function Home() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState<string | null>(null);

  const handleRequest = async () => {
    try {
      const res = await fetch(url, { method });
      const text = await res.text();
      setResponse(text);
    } catch (err) {
      setResponse("❌ Failed to fetch. Check your URL.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-gray-200 flex">
      {/* Sidebar - History */}
      <aside className="w-64 bg-[#2D2D2D] border-r border-gray-700 p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">History</h2>
        <HistoryList />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#2D2D2D] border-b border-gray-700 px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">REST Client</h1>
          <span className="text-sm text-gray-400">Postman Inspired</span>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Request Section */}
          <section className="bg-[#2D2D2D] p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-3">Request</h2>

            <div className="flex gap-2 mb-3">
              {/* Method Select */}
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="bg-[#1E1E1E] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>

              {/* URL Input */}
              <input
                type="text"
                placeholder="Enter request URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-[#1E1E1E] text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none"
              />

              {/* Send Button */}
              <button
                onClick={handleRequest}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium"
              >
                Send
              </button>
            </div>
          </section>

          {/* Response Section */}
          <section className="bg-[#2D2D2D] p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-3">Response</h2>
            <div className="bg-[#1E1E1E] text-green-400 p-4 rounded-lg h-80 overflow-auto font-mono text-sm whitespace-pre-wrap border border-gray-700">
              {response ? response : "No response yet..."}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
