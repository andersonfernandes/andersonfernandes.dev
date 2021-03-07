import Head from 'next/head'

export default function BlogLayout({ meta, children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={ meta.description }></meta>
        <title>{ meta.title }</title>
      </Head>

      <main>
        { children }
      </main>
    </>
  )
}
