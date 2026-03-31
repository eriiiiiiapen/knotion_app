import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Plus, BookOpen, Clock } from "lucide-react";

interface KnowledgeArticle {
  id: number;
  title: string;
  content: string;
  status: string;
  updated_at: string;
}

export default function KnowledgeList() {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3002/api/v1/knowledge_articles")
      .then((res) => res.json())
      .then((json) => {
        setArticles(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">労務ナレッジ一覧</h1>
          <p className="text-muted-foreground">社内の規定や手続きのルールを管理します。</p>
        </div>
        <Button asChild className="bg-slate-900 text-white hover:bg-slate-600">
          <Link to="/knowledge/new">
            <Plus className="mr-2 h-4 w-4" /> 新規記事作成
          </Link>
        </Button>
      </header>

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md cursor-pointer transition-shadow flex flex-col">
              <CardHeader className="flex-1">
                <div className="flex items-center justify-end mb-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.status}
                  </span>
                </div>
                <CardTitle className="leading-tight mb-2 line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  {new Date(article.updated_at).toLocaleDateString()} 更新
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 pb-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/knowledge/${article.id}`}>表示する</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {articles.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500">まだ記事がありません。新しいナレッジを追加してください</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}