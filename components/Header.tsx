import styles from "../styles/Header.module.css"
import Image from "next/image";
import Link from "next/link";
import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import logo from "../public/logo.png"

function Header() {
  const { signOut } = useClerk()

  return (<header id={styles.header}>
    <Link href={"/"} id={styles.logoContainer}>
      <Image src={logo} alt="Slipper logo" id={styles.img} width={50} height={50} />
      <h1 id={styles.name}>Slipper</h1>
    </Link>
    <SignedOut>
      <Link href="/sign-in" className={styles.loginButton}>Login</Link>
    </SignedOut>
    <SignedIn>
      <button onClick={() => signOut()} className={styles.signOutButton}>Sign out</button>
    </SignedIn>
  </header>)
}

export default Header