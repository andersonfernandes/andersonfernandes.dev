import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { SiteMetadata } from "../../lib/getSiteMetadata";
import { PostMeta } from "../../types/post";

import styles from "./BlogLayout.module.scss";

type Props = {
  meta: PostMeta;
  pageMeta?: SiteMetadata;
  children: ReactNode | ReactNode[];
};

const BackButton = () => <Link href={"/blog"}>{"< Back to all articles"}</Link>;
const MainPageButton = () => <Link href={"/"}>{"< Back to main page"}</Link>;

export default function BlogLayout({ meta, pageMeta, children }: Props) {
  const router = useRouter();

  const headTitle = pageMeta ? `${meta.title} - ${pageMeta.title}` : meta.title;
  const headDescription = pageMeta ? pageMeta.description : meta.description;

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
          {router.pathname != "/blog" ? <BackButton /> : <MainPageButton />}
        </nav>

        <main>{children}</main>
      </div>
    </>
  );
}
