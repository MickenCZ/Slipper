import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Posts from "../components/Posts"
import Trending from "../components/Trending"
import Head from 'next/head';

type PostT = {
  ID: number,
  pfpURL: string,
  userName: string,
  timePosted: number,
  messageContent: string,
  likes: number,
  comments: number,
}

function Home(props:{posts: PostT[]}) {
  const { posts } = props
  return (<>
    <Head><title>Slipper</title></Head>
    <main id="main">
  <section id="head">
    <Header />
    <Navbar isCommented={false} isPosts={true} />
  </section>
  <section id="body">
    <Posts posts={posts} />
    <Trending />
  </section>
</main>
</>)
}

export default Home

export async function getServerSideProps() {
  const response = await fetch(process.env.URL + "/api/get-posts")
  const postsData = await response.json()
  return {
    props: {
      posts: postsData.posts
    }
  }
}