import 'bootstrap/dist/css/bootstrap.css';
import "../styles/globals.css";
import { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
  },[])

  return (
    <>
      <Head>
       <title>Stanisław Laskowski front-end developer</title>
      </Head>
      
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;