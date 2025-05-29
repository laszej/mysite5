import dynamic from "next/dynamic";

const PostEditor = dynamic(() => import("../../components/PostEditor"), { ssr: false });

export default function AdminEditorPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dodaj artykuł</h2>
      <PostEditor />
    </div>
  );
}