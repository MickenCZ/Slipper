/* eslint-disable jsx-a11y/img-redundant-alt */
import styles from "../../styles/UserProfile.module.css"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import Image from "next/image"
import Head from "next/head"
import Post from "../../components/Post"
import { useRouter } from "next/router";

type UserT = {
  ID: number,
  pfp: string,
  name: string,
  followers: string[],
  follows: string[],
}

type PostT = {
  ID: number,
  pfpURL: string,
  userName: string,
  timePosted: number,
  messageContent: string,
  likes: number,
  comments: number,
}


function UserProfile(props: {users: UserT[], posts:PostT[]}) {

  const router = useRouter()
  let { users, posts } = props 
  posts = props.posts.slice(0).reverse()
  const username = router.query.UserProfile
  const userIndex = users.findIndex(user => user.name == username)
  if (userIndex == -1) {return <div style={{color:"black"}}>Error: User does not exist</div>}
  const user = users[userIndex]

  return (<>
    <Head><title>{user.name + " - Slipper"}</title></Head>
    <main id={styles.main}>
      <section id={styles.head}>
        <Header />
        <Navbar />
      </section>
      <section id={styles.bodySection}>
        <div id={styles.content}>
          <div id={styles.info}>
            <div id={styles.pictureContainer}>
              <Image src={user.pfp} alt="Profile picture of user" id={styles.pfp} width={85} height={85} ></Image>
            </div>
            <div id={styles.stats}>
              <div id={styles.atUserName}>
                {user.name}
              </div>  
            </div>

          </div>
        
          {posts.map((post: PostT) => {
      return <Post username={post.userName} timestamp={post.timePosted} messageContent={post.messageContent} likes={post.likes} comments={post.comments} pfpURL={post.pfpURL} key={post.ID} ID={post.ID} displayComments={true} />
     })} 
        </div>
      </section>
    </main>
    </>)
}

export default UserProfile

export async function getServerSideProps(context:any) {
  const usersResponse = await fetch(process.env.URL + "/api/get-users")
  const usersData = await usersResponse.json()
  const postsResponse = await fetch(process.env.URL + "/api/get-user-posts", {
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
      username: context.query.UserProfile,
    }),
  })
  const postsData = await postsResponse.json()
  return {
    props: {
      users: usersData.users,
      posts: postsData.posts,
    }
  }
}