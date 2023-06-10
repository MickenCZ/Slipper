/* eslint-disable jsx-a11y/img-redundant-alt */
import styles from "../../styles/UserProfile.module.css"
import Header from "../../components/Header"
import Navbar from "../../components/Navbar"
import Image from "next/image"
import { ClerkProvider } from "@clerk/nextjs";

function UserProfile() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;


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
              <Image src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yUW5OM3VtNGhaYlkzb2FzNmxTZEs0d0dWU0guanBlZyJ9" alt="Profile picture of user" id={styles.pfp} width={85} height={85} ></Image>
            </div>
            <div id={styles.stats}>
              <div id={styles.atUserName}>
                @MickenCZ
              </div>
              <div id={styles.followers}>0 Followers</div>
              <div id={styles.follows}>0 Follows</div>
              <button id={styles.followButton}>Follow</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </ClerkProvider>)
}

export default UserProfile