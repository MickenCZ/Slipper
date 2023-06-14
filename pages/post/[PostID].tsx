/* eslint-disable jsx-a11y/img-redundant-alt */
import styles from "../../styles/PostID.module.css"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import Head from "next/head"
import Post from "../../components/Post"
import { useRouter } from "next/router";
import { toast } from "react-hot-toast"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import Image from "next/image"
import { Toaster } from "react-hot-toast"
import anonymous from "../../public/anonymous.png"
import { useState } from "react"

type PostT = {
  ID: number,
  pfpURL: string,
  userName: string,
  timePosted: number,
  messageContent: string,
  likes: number,
  comments: number,
}

type CommentT = {
  comment_id: number,
  post_id: number,
  pfpURL: string,
  userName: string,
  timePosted: number,
  messageContent: string,
  likes: number,
}

function PostPage(props:{posts: PostT[], comments: CommentT[]}) {
  const { user } = useUser()
  const [postMessage, setPostMessage] = useState("")
  const { posts } = props
  const router = useRouter()
  const PostID = router.query.PostID
  let thisPost: PostT
  if (PostID && !Array.isArray(PostID)) {thisPost = posts.filter(post => post.ID == parseInt(PostID))[0]}
  else {return null}
  //I know this should be done via a custom query, In a real project I'd do it that way but I am just tired and honestly I should have used a headless CMS instead of mysql planetscale anyway.

  return (<main id={styles.page}>
  <Head><title>Slipper</title></Head>
    <section id={styles.head}>
      <Header />
      <Navbar />
    </section>
    {thisPost && <div id={styles.postContainer}><Post username={thisPost.userName} timestamp={thisPost.timePosted} messageContent={thisPost.messageContent} likes={thisPost.likes} comments={thisPost.comments} pfpURL={thisPost.pfpURL} key={thisPost.ID} ID={thisPost.ID} displayComments={false} /></div>}
    <div><Toaster/></div> {/*Tag for validation errors*/}
      <div id={styles.inputContainer}>
        <SignedOut>
          <Image id={styles.userIcon} alt="Anonymous profile picture" src={anonymous} width={60} height={60} ></Image>
          <input type="text" placeholder="You have to login to post" id={styles.postInput} disabled/>
          <button id={styles.post} className={styles.disabled} >Post</button>
        </SignedOut>
        <SignedIn>
          <Image id={styles.userIcon} alt="Your profile picture" src={user?.imageUrl!} width={60} height={60} ></Image>
          <input type="text" placeholder="What's happening?" id={styles.postInput} onChange={(e) => {setPostMessage(e.target.value)}} />
          <button id={styles.post} type="submit" onClick={

            () => {
              if (postMessage.length > 70) {
                toast.error('Message should be shorter than 70 characters', {
                  position: "bottom-center",
                })
                return false
              }
              if (!postMessage) {
                toast.error('Message shouldn\'t be empty', {
                  position: "bottom-center",
                })
                return false
              }
              fetch("/api/create-comment", {
                method:"POST",
                mode:"cors",
                cache:"no-cache",
                credentials:"same-origin",
                headers:{
                  "Content-Type":"application/json"
                },
                redirect:"follow",
                referrerPolicy:"no-referrer",
                body: JSON.stringify({
                  pfpURL: user?.imageUrl,
                  userName: user?.username,
                  messageContent: postMessage,
                  PostID: parseInt(PostID),
                }),
              })
              .catch(err => console.error(err))
              location.reload();
              }}>Post</button>
        </SignedIn>
      </div>
      {props.comments?.map((comment: CommentT) => {
      return <Post username={comment.userName} timestamp={comment.timePosted} messageContent={comment.messageContent} likes={comment.likes} comments={0} pfpURL={comment.pfpURL} key={comment.comment_id} ID={comment.comment_id} displayComments={false} />
     })} 
    </main>)
}

export default PostPage

export async function getServerSideProps(context:any) {
  const response1 = await fetch(process.env.URL + "/api/get-posts")
  const postsData = await response1.json()
  const response2 = await fetch(process.env.URL + "/api/get-comments", {
    method:"POST",
    mode:"cors",
    cache:"no-cache",
    credentials:"same-origin",
    headers:{
      "Content-Type":"application/json"
    },
    redirect:"follow",
    referrerPolicy:"no-referrer",
    body: JSON.stringify({
      postID: context.query.PostID,
    }),
  })
  const commentsData = await response2.json()
  return {
    props: {
      posts: postsData.posts,
      comments: commentsData.comments
    }
  }
}