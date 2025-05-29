// pages/admin/index.js
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connectToDatabase } from '../../utils/mongodb';

const AdminComments = dynamic(() => import('../../components/AdminComments'), { ssr: false });

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const all = await db.listCollections().toArray();

  // Nazwy do pominięcia
  const ignore = ['posts', 'system.indexes'];

  const commentCollections = all
    .map(c => c.name)
    .filter(name => !ignore.includes(name));

  return { props: { commentCollections } };
}

export default function AdminPage({ commentCollections }) {
  return (
    <>
      <Head>
        <title>Admin panel</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Admin panel
        </h1>

        {commentCollections.map(col => (
          <section key={col} style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{col}</h2>
            <AdminComments collection={col} />
          </section>
        ))}
      </main>
    </>
  );
}
