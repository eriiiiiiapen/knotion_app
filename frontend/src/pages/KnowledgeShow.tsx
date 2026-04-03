import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { KnotionEditor } from "../components/editor/KnotionEditor";
import { ChevronLeft, Edit } from "lucide-react";

interface KnowledgeArticle {
    id: number;
    title: string;
    content: string;
}

export default function KnowledgeShow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<KnowledgeArticle | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3002/api/v1/knowledge_articles/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not Found");
                return res.json();
            })
            .then((data) => setArticle(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!article) return <div className="p-10 text-center">読み込み中...</div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 space-y-6">
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={() => navigate("/knowledge")} className="gap-2">
                <ChevronLeft className="h-4 w-4" /> 一覧へ戻る
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                    <Link to={`/knowledge/${article.id}/edit`}>
                        <Edit className="h-4 w-4" /> 編集する
                    </Link>
                </Button>
            </div>

            <h1 className="text-3xl font-bold border-b pb-4">{article.title}</h1>

            <div className="prose max-w-none">
                <KnotionEditor 
                    content={article.content} 
                    onChange={() => {}} 
                    editable={false} 
                />
            </div>
        </div>
    );
}