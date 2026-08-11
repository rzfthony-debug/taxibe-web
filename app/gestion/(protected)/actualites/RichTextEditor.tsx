"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import { ARTICLE_BODY_CSS, stripDocumentWrapper } from "@/lib/article";

type Props = {
  name: string;
  defaultValue?: string;
  onChangeHtml: (html: string) => void;
};

export default function RichTextEditor({ name, defaultValue = "", onChangeHtml }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
    ],
    content: stripDocumentWrapper(defaultValue),
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChangeHtml(editor.getHTML()),
  });

  useEffect(() => {
    onChangeHtml(stripDocumentWrapper(defaultValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL du lien", prev || "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  return (
    <div className="rte-wrap">
      <style>{`
        .rte-wrap { border: 1.5px solid #E2E8F0; border-radius: 8px; overflow: hidden; }
        .rte-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 8px; background: #F8FAFC; border-bottom: 1.5px solid #E2E8F0; }
        .rte-toolbar button { padding: 6px 11px; border-radius: 6px; border: 1px solid transparent; background: white; color: #374151; font-size: 0.76rem; font-weight: 700; cursor: pointer; font-family: inherit; }
        .rte-toolbar button:hover { background: #F1F5F9; }
        .rte-toolbar button.active { background: #0D1525; color: #FFB800; }
        .rte-toolbar .rte-sep { width: 1px; align-self: stretch; background: #E2E8F0; margin: 2px 4px; }
        .rte-content { padding: 16px; min-height: 320px; max-height: 600px; overflow-y: auto; }
        .rte-content .ProseMirror { outline: none; }
        .rte-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder); color: #94A3B8; float: left; height: 0; pointer-events: none;
        }
        ${ARTICLE_BODY_CSS}
      `}</style>

      <div className="rte-toolbar">
        <button type="button" className={editor?.isActive("bold") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleBold().run()}>Gras</button>
        <button type="button" className={editor?.isActive("italic") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleItalic().run()}>Italique</button>
        <button type="button" className={editor?.isActive("heading", { level: 2 }) ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>Titre</button>
        <button type="button" className={editor?.isActive("heading", { level: 3 }) ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>Sous-titre</button>
        <button type="button" className={editor?.isActive("bulletList") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}>Liste</button>
        <button type="button" className={editor?.isActive("orderedList") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}>Liste num.</button>
        <button type="button" className={editor?.isActive("blockquote") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Citation</button>
        <button type="button" className={editor?.isActive("link") ? "active" : ""} onClick={setLink}>Lien</button>
        <span className="rte-sep" />
        <button type="button" onClick={() => editor?.chain().focus().undo().run()}>⟲ Annuler</button>
        <button type="button" onClick={() => editor?.chain().focus().redo().run()}>⟳ Rétablir</button>
      </div>

      <EditorContent editor={editor} className="rte-content article-body" />
      <input type="hidden" name={name} value={editor?.getHTML() ?? defaultValue} readOnly />
    </div>
  );
}
