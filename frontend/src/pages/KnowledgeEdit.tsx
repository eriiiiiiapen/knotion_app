import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { KnotionEditor } from "../components/editor/KnotionEditor";

export default function KnowledgeEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3002/api/v1/knowledge_articles/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = async () => {
        const response = await fetch(`http://localhost:3002/api/v1/knowledge_articles/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                knowledge_article: { title, content }
            })
        });

        if (response.ok) {
            navigate(`/knowledge/${id}`);
        }
    };

    if (loading) return <div>読み込み中...</div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">記事の編集</h1>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => navigate(-1)}>キャンセル</Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-600" onClick={handleUpdate}>更新する</Button>
                </div>
            </div>
            
            <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold"
            />

            <div className="min-h-[400px]">
                <KnotionEditor content={content} onChange={setContent} />
            </div>
        </div>
    );
}