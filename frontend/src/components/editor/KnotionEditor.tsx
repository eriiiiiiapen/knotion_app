import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from "@/components/ui/button"

interface Props {
  content: string;
  onChange: (content: string) => void;
  editable?: boolean;
}

export const KnotionEditor = ({ content, onChange, editable = true }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] p-4 border rounded-md bg-white',
      },
    },
  })

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {editable && (
        <div className="flex gap-2 p-1 bg-slate-200 rounded-t-md border-x border-t">
          <Button 
            variant="ghost" size="sm" 
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-slate-300 rounded' : ''}
          >
            B
          </Button>
          <Button 
            variant="ghost" size="sm" 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading') ? 'bg-slate-300 rounded' : ''}
          >
            H2
          </Button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}