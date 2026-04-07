import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { useNavigate } from "react-router-dom";
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
} from "../components/ui/dialog"
import { ChevronRight, Plus } from "lucide-react"

interface Task {
  id: number;
  title: string;
  status: string;
  description: string;
  due_date: string;
  knowledge_article?: {
    id: number;
    title: string;
  };
}

interface UserData {
  company_name: string;
  email: string;
  tasks: Task[];
}

interface KnowledgeArticle {
  id: number,
  title: string;
}

function App() {
  const [data, setData] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [knowledgeArticles, setKnowledgeArticles] = useState<KnowledgeArticle[]>([]);
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string>("");

  const navigate = useNavigate();

  const fetchData = () => {
    fetch("http://localhost:3002/api/v1/me")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Fetch error:", err))
  };

  const fetchKnowledges = () => {
    fetch("http://localhost:3002/api/v1/knowledge_articles")
      .then(res => res.json())
      .then(json => setKnowledgeArticles(json))
      .catch(err => console.error("Knowledge fetch error:", err));
  };

  useEffect(() => {
    fetchData();
    fetchKnowledges();
  }, []);

  const handleCreateTask = async () => {
    const response = await fetch("http://localhost:3002/api/v1/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: { title, description, due_date, status: "todo", knowledge_article_id: selectedKnowledgeId || null }
      })
    });

    if (response.ok){
      setOpen(false);
      setTitle("");
      setDescription("");
      setDueDate("");
      setSelectedKnowledgeId("");
      fetchData();
    }
  }

  const handleOpenDetail = (task: Task) => {
    setSelectedTask(task);
  }

  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === "done" ? "todo" : "done";

    const response = await fetch(`http://localhost:3002/api/v1/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: { status: newStatus }
      })
    });

    if (response.ok) {
      fetchData();
    }
  };

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
              <Button className="bg-slate-900 text-white hover:bg-slate-600">
                <Plus className="mr-2 h-4 w-4" /> 新規タスク作成
              </Button>
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
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">関連ナレッジ</label>
                  <select 
                    className="w-full p-2 border rounded-md text-sm bg-white"
                    value={selectedKnowledgeId}
                    onChange={(e) => setSelectedKnowledgeId(e.target.value)}
                  >
                    <option value="">選択なし</option>
                    {knowledgeArticles.map((kb) => (
                      <option key={kb.id} value={kb.id}>{kb.title}</option>
                    ))}
                  </select>
                </div>
                <Textarea
                  placeholder="説明"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  placeholder="期限日"
                  value={due_date}
                  type="date"
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleCreateTask} className="bg-slate-900 text-white hover:bg-slate-800">保存する</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="p-2 bg-gray-200">
            最近割り当てられたタスクの一覧
          </div>
          <Table>
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
                    <span className={`px-2 py-1 rounded-full text-[10px] flex justify-center font-bold uppercase ${
                      task.status === 'done' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{task.due_date || "未設定"}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button 
                      variant={task.status === "done" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => toggleTaskStatus(task)}
                      className={task.status === "done" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                    >
                      {task.status === "done" ? "完了済み" : "完了にする"}
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => handleOpenDetail(task)}>詳細</Button>
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
          <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>タスクの詳細</DialogTitle>
                <DialogDescription>
                  現在開いているタスクの詳細を表示しています。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <p className="font-bold">タスク名</p>
                  {selectedTask?.title}
                </div>
                <div>
                  <p className="font-bold">内容</p>
                  {selectedTask?.description}
                </div>
                <div>
                  <p className="font-bold">ステータス</p>
                  {selectedTask?.status}
                </div>
                <div>
                  <p className="font-bold">期限</p>
                  {selectedTask?.due_date ?? '未設定'}
                </div>
                {selectedTask?.knowledge_article && (
                  <div className="p-3 bg-slate-100 rounded-md border border-slate-200">
                    <p className="text-xs font-bold text-slate-500 uppercase">関連ナレッジ</p>
                    <a 
                      href={`/knowledge/${(selectedTask as any).knowledge_article.id}`}
                      className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                    >
                      📖 {(selectedTask as any).knowledge_article.title}
                    </a>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-end items-center">
          <Button variant="ghost" onClick={() => navigate("/knowledge")} className="gap-2 hover:opacity-50">
            <ChevronRight className="h-4 w-4" /> ナレッジ一覧へ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App