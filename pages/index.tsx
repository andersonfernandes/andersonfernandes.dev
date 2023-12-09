import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";

import styles from "../styles/Home.module.scss";

type SocialLinkProps = {
  href: string;
  title: string;
  icon: ReactNode;
};
const SocialLink = ({ href, title, icon }: SocialLinkProps) => (
  <Link href={href} title={title} target="_blank">
    {icon}
  </Link>
);

const socialLinks: SocialLinkProps[] = [
  {
    href: "mailto:fernandesanderson14@gmail.com",
    title: "fernandesanderson14@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    href: "https://github.com/andersonfernandes/",
    title: "Github",
    icon: <FaGithub />,
  },
  {
    href: "https://br.linkedin.com/in/andersonfernandes12",
    title: "Linkedin",
    icon: <FaLinkedin />,
  },
];

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
        {socialLinks.map((props) => (
          <SocialLink key={props.title} {...props} />
        ))}
      </div>

      <div className={styles.blog}>
        <Link href="/blog" title="Blog">
          Blog
        </Link>
      </div>
    </div>
  );
}
