import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"

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
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = () => {
    fetch("http://localhost:3002/api/v1/me")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Fetch error:", err))
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTask = async () => {
    const response = await fetch("http://localhost:3002/api/v1/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: { title, description, status: "todo" }
      })
    });

    if (response.ok){
      setOpen(false);
      setTitle("");
      setDescription("");
      fetchData();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Knotion ダッシュボード</h1>
            <p className="text-muted-foreground">
              {data ? `所属：${data.company_name}` : "読み込み中..."}
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-slate-900 text-white hover:bg-slate-800">新規タスク作成</Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>タスクの新規作成</DialogTitle>
                <DialogDescription>
                  割り当てるタスクの詳細を入力してください。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="タスク名"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="説明"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleCreateTask} className="bg-slate-900 text-white hover:bg-slate-800">保存する</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableCaption>最近割り当てられたタスクの一覧</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>タスク名</TableHead>
                <TableHead className="text-center">ステータス</TableHead>
                <TableHead className="text-center">期限</TableHead>
                <TableHead className="text-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{task.title}</div>
                      <div className="text-xs text-muted-foreground">{task.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs flex justify-center font-medium ${
                      task.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{task.due_date || "未設定"}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm">詳細</Button>
                  </TableCell>
                </TableRow>
              ))}
              {data?.tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    タスクが見つかりません。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default App