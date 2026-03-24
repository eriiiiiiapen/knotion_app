import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { KnotionEditor } from "../components/editor/KnotionEditor";

export default function KnowledgeCreate() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSave = async () => {
        const response = await fetch("http://localhost:3002/api/v1/knowledge_articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                knowledge_article: { title, content, status: "published" }
            })
        })

        if(response.ok){
            navigate("/knowledge");
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">ナレッジ記事の作成</h1>
                <Button className="border border-black hover:bg-gray-200" onClick={handleSave}>保存する</Button>
            </div>
            
            <Input 
                placeholder="記事のタイトル（例：住所変更手続きについて）" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold"
            />

            <div className="min-h-[400px]">
                <KnotionEditor content={content} onChange={setContent} />
            </div>
        </div>
    )
}