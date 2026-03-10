import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3002/api/v1/me")
      .then(res => res.json())
      .then(json => setData(json))
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold text-slate-800">Knotionへようこそ</h1>
      {data ? (
          <p className="text-slate-600">
            所属：<span className="font-bold text-blue-600">
              { data.company_name }
            </span>
          </p>
        )  : (
          <p>
            読み込み中...
          </p>
        )}
      <p className="text-slate-500">テスト</p>
      <Button variant="outline">ダッシュボードへ</Button>
    </div>
  )
}

export default App