/* eslint-disable jsx-a11y/img-redundant-alt */
import styles from "../../styles/UserProfile.module.css"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import Image from "next/image"
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";

type UserT = {
  ID: number,
  pfp: string,
  name: string,
  followers: {followers: string[]},
  follows: {follows: string[]},
}

function UserProfile(props: {users: UserT[]}) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const router = useRouter()
  const { users } = props 
  const username = router.query.UserProfile
  const userIndex = users.findIndex(user => user.name == username)
  if (userIndex == -1) {return <div style={{color:"black"}}>Error: User does not exist</div>}
  const user = users[userIndex]

  return (<ClerkProvider publishableKey={clerkPubKey}>
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
              <div id={styles.followers}>{user.followers.followers.length} Followers</div>
              <div id={styles.follows}>{user.follows.follows.length} Follows</div>
              <button id={styles.followButton}>Follow</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </ClerkProvider>)
}

export default UserProfile

export async function getServerSideProps() {
  const response = await fetch(process.env.URL + "/api/get-users")
  const usersData = await response.json()
  return {
    props: {
      users: usersData.users
    }
  }
}