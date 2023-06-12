/* eslint-disable jsx-a11y/img-redundant-alt */
import styles from "../styles/Posts.module.css"
import Post from "./Post"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import Image from "next/image";
import anonymous from "../public/anonymous.png"

const URL = "https://slipperapp.vercel.app"

type PostT = {
  ID: number,
  pfpURL: string,
  userName: string,
  timePosted: number,
  messageContent: string,
  likes: number,
  comments: number,
}


function Posts(props:{posts: PostT[]}) {
  const { user } = useUser()
  const [postMessage, setPostMessage] = useState("")
  const [posts, setPosts] = useState<PostT[]>(props.posts)

  return (
    <section id={styles.posts}>
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
              fetch(URL + "/api/createPost", {
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
                }),
              })
              .catch(err => console.error(err))
              location.reload();
              }}>Post</button>
        </SignedIn>
      </div>

     {posts?.map((post: PostT) => {
      return <Post username={post.userName} timestamp={post.timePosted} messageContent={post.messageContent} likes={post.likes} comments={post.comments} pfpURL={post.pfpURL} key={post.ID} />
     })} 
    </section>
  )
}

export default Posts