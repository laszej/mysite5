import { connectToDatabase } from '../../utils/mongodb';
import Head from 'next/head';
import Comments from '../../components/Comments';

export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const posts = await db.collection('posts').find({}, { projection: { slug: 1 } }).toArray();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const post = await db.collection('posts').findOne({ slug: params.slug });

  if (!post) return { notFound: true };

  // 🔧 Upewniamy się, że wszystkie dane są serializowalne
  return {
    props: {
      post: {
        ...post,
        _id: post._id.toString(), // ⬅ najważniejsze
        date: post.date ? post.date.toString() : new Date().toISOString(), // jeśli masz `date`, też może być typu `Date`
      }
    },
    revalidate: 60,
  };
}

export default function Article({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content.slice(0, 150)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.slice(0, 150)} />
      </Head>
      <div style={{ padding: '5%' }}>
        <p>{new Date(post.date).toLocaleDateString()}</p>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <hr className="my-10" />
        <Comments collection={post.title} />
      </div>
    </>
  );
}
