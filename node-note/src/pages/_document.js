import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
      <Html lang="en">
        <Head />
        <title>Node-Note</title>
        <meta name="keyword" content="node,notetaking,noteapp,forcedirected,force-directed,node-note,nodenote"></meta>
        <meta name="description" content='A note taking web app that able to do node visuzlization'></meta>
        <link rel="icon" href="../public/nodenoteicon.ico" type="image/x-icon"/>
        {/* <link rel="icon" href="D:\AdComProject_Sunny\node-note\public\vercel.svg" /> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
  )
}
