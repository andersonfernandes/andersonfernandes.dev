import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <link href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <title>Anderson Fernandes - Software Engineer</title>
      </Head>

      <Image
        src="/img/profile.jpg"
        alt="Profile Image"
        width="150"
        height="150"
        className={styles['profile-img']}
      />

      <h1>Anderson Fernandes</h1>
      <h2>Software Engineer</h2>

      <div className={styles.about}>
        <p>I'm a Software Developer and Information Systems student at the Federal Institute of Alagoas.</p>
        <p>Currently working at <a href="https://clevertech.biz/" target="_BLANK">Clevertech</a>.</p>
      </div>

      <div className={styles.social}>
        <a href="mailto:fernandesanderson14@gmail.com" title="fernandesanderson14@gmail.com" target="_blank">
          <i className="icon-envelope"></i>
        </a>

        <a href="https://github.com/andersonfernandes/" title="Github" target="_blank">
          <i className="icon-github"></i>
        </a>

        <a href="https://twitter.com/andersonf00" title="Twitter" target="_blank">
          <i className="icon-twitter"></i>
        </a>

        <a href="https://br.linkedin.com/in/andersonfernandes12" title="Linkedin" target="_blank">
          <i className="icon-linkedin"></i>
        </a>
      </div>

      
      <div className={styles.blog}>
        <a href="/blog" title="Blog">
          Blog
        </a>
      </div>
    </div>
  )
}
