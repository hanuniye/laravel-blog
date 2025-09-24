import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

type Props = {
    value: string;
    onChange: (val: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML()); // store HTML
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value]);

    return (
        <div className="rounded-md border p-2">
            {/* Toolbar */}
            <div className="mb-2 flex flex-wrap gap-2">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="rounded border px-2 py-1">
                    Bold
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="rounded border px-2 py-1">
                    Italic
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className="rounded border px-2 py-1">
                    Strike
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="rounded border px-2 py-1">
                    Bullet List
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="rounded border px-2 py-1">
                    Numbered List
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="rounded border px-2 py-1">
                    H2
                </button>
            </div>
            <EditorContent editor={editor} className="prose min-h-[150px] max-w-none" />
        </div>
    );
}
