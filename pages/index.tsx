import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Anderson Fernandes - Software Engineer</title>
      </Head>

      <Image
        src="/img/profile.jpg"
        alt="Profile Image"
        width="150"
        height="150"
        className={styles["profile-img"]}
      />

      <h1>Anderson Fernandes</h1>
      <h2>Software Engineer</h2>

      <div className={styles.about}>
        <p>
          I'm a Software Developer and Information Systems student at the
          Federal Institute of Alagoas.
        </p>
        <p>
          Currently working at{" "}
          <Link href="https://clevertech.biz/" target="_BLANK">
            Clevertech
          </Link>
          .
        </p>
      </div>

      <div className={styles.social}>
        <Link
          href="mailto:fernandesanderson14@gmail.com"
          title="fernandesanderson14@gmail.com"
          target="_blank"
        >
          <i className="icon-envelope"></i>
        </Link>

        <Link
          href="https://github.com/andersonfernandes/"
          title="Github"
          target="_blank"
        >
          <i className="icon-github"></i>
        </Link>

        <Link
          href="https://br.linkedin.com/in/andersonfernandes12"
          title="Linkedin"
          target="_blank"
        >
          <i className="icon-linkedin"></i>
        </Link>
      </div>

      <div className={styles.blog}>
        <Link href="/blog" title="Blog">
          Blog
        </Link>
      </div>
    </div>
  );
}
