import { ClerkProvider } from '@clerk/nextjs';
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Posts from "../components/Posts"
import Trending from "../components/Trending"
import Head from 'next/head';

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

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
  return (<ClerkProvider publishableKey={clerkPubKey}>
    <Head><title>Slipper</title></Head>
    <main id="main">
  <section id="head">
    <Header />
    <Navbar />
  </section>
  <section id="body">
    <Posts posts={posts} />
    <Trending />
  </section>
</main>
</ClerkProvider>)
}

export default Home

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/get-posts")
  const postsData = await response.json()
  return {
    props: {
      posts: postsData.posts
    }
  }
}