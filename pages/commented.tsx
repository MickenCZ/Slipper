import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Posts from "../components/Posts"
import Trending from "../components/Trending"
import Head from 'next/head';
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/nextjs";

type PostT = {
  ID: number,
  pfpURL: string,
  userName: string,
  timePosted: number,
  messageContent: string,
  likes: number,
  comments: number,
}

type CommentT= {
  ID: number,
  pfpURL: string,
  userName: string,
  timePosted: number,
  messageContent: string,
  post_id: number,
}

function Home(props:{posts: PostT[], commentsData: CommentT[]}) {
  const { posts, commentsData } = props
  const { user } = useUser()
  const username = user?.username
  const comments = commentsData.filter(comment => comment.userName == username)
  const commentPostIds = comments.map(comment => comment.post_id)
  const filteredPosts = posts.filter(post => commentPostIds.includes(post.ID))

  return (<>
<SignedIn>
    <Head><title>Slipper</title></Head>
    <main id="main">
      <section id="head">
        <Header />
        <Navbar isCommented={true} isPosts={false} />
      </section>
      <section id="body">
        <Posts posts={filteredPosts} />
        <Trending />
      </section>
    </main>
</SignedIn>
<SignedOut>
        {/* 
          Non-authenticated visitors will be redirected
          to the sign in page.
        */}
        <RedirectToSignIn />
</SignedOut>
</>)
}

export default Home

export async function getServerSideProps() {
  const response1 = await fetch(process.env.URL + "/api/get-posts")
  const postsData = await response1.json()
  const response2 = await fetch(process.env.URL + "/api/get-user-comments")
  const commentsData = await response2.json()
  return {
    props: {
      posts: postsData.posts,
      commentsData: commentsData.comments
    }
  }
}