// pages/artykuly/index.js
import Link from "next/link";
import { connectToDatabase } from "../../utils/mongodb";

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find().sort({ _id: -1 }).toArray();

  const simplifiedPosts = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    _id: post._id.toString(),
  }));

  return {
    props: {
      posts: simplifiedPosts,
    },
  };
}

export default function AllPosts({ posts }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lista artykułów</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/artykuly/${post.slug}`}>
              <strong>{post.title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
