import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BlogMeta } from "../lib/site_metadata";
import { PostMeta } from "../types/post";

import styles from "./BlogLayout.module.scss";

type BlogLayoutProps = {
  meta: PostMeta;
  pageMeta?: BlogMeta;
  children: ReactNode | ReactNode[];
};

export default function BlogLayout({
  meta,
  pageMeta,
  children,
}: BlogLayoutProps) {
  const router = useRouter();

  let headTitle = meta.title;
  let headDescription = meta.description;

  if (pageMeta) {
    headTitle = `${meta.title} - ${pageMeta.title}`;
    headDescription = pageMeta.description;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={headDescription}></meta>
        <title>{headTitle}</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{meta.title}</h1>
          <h2>{meta.description}</h2>
        </header>

        <nav className={styles.navbar}>
          {router.pathname != "/blog" ? backButton() : mainPageButton()}
        </nav>

        <main>{children}</main>
      </div>
    </>
  );
}

function backButton() {
  return <Link href={"/blog"}>{"< Back to all articles"}</Link>;
}

function mainPageButton() {
  return <Link href={"/"}>{"< Back to main page"}</Link>;
}
