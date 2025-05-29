import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Gallery from "../components/Gallery";
import Jumbotron from "../components/Jumotron";


export default function Home() {
  const router = useRouter()
  return (
    <>
    <Head>
      <title>Stanisław Laskowski - konserwatysta w Poznaniu</title>
      <link rel="icon" href="/images/favicon.ico" />
      <meta name="description" content="programista. javascript. webdevelopment. react" />
      </Head>

    <div className={styles.homeMain}>
    <div className={styles.gallery}>
    <Gallery/>
    </div>
    <Jumbotron/>
    
    </div>
    </>
  );
}
