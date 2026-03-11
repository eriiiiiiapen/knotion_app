import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Task {
  id: number;
  title: string;
  status: string;
  description: string;
  due_date: string;
}

interface UserData {
  company_name: string;
  email: string;
  tasks: Task[];
}

function App() {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch("http://localhost:3002/api/v1/me")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Fetch error:", err))
  }, [])

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold text-slate-800">Knotionへようこそ</h1>
      {data ? (
          <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-4">
            <p className="text-slate-600 border-b pb-2">
              所属: <span className="font-semibold text-slate-900">{data.company_name}</span>
            </p>
            
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">現在のタスク</h2>
              {data.tasks.length > 0 ? (
                <ul className="space-y-2">
                  {data.tasks.map((task) => (
                    <li key={task.id} className="p-3 bg-slate-50 border rounded-lg text-slate-700 flex justify-between items-center">
                      <span>{task.title}</span>
                      <span>{task.description}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{task.status}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400 italic">タスクはありません</p>
              )}
            </div>
          </div>
        )  : (
          <p>
            読み込み中...
          </p>
        )}
      <p className="text-slate-500">テスト</p>
      <Button variant="outline">ダッシュボードへ</Button>
    </div>
    </>
  )
}

export default App