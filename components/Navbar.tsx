import styles from "../styles/Navbar.module.css"
import Link from "next/link"

function Navbar(props: {isPosts: boolean, isCommented : boolean}) {
  return <nav id={styles.nav}>
    <div className={styles.navContainer}>
      <Link href="/" >Posts</Link>
      {props.isPosts ? <div className={styles.underLine}></div> : <div className={styles.underLineDeactivated}></div>}
    </div>
    <div className={styles.navContainer}>
      <Link href="/commented" >Commented</Link>
      {props.isCommented ? <div className={styles.underLine}></div> : <div className={styles.underLineDeactivated}></div>}
    </div>
  </nav>
}

export default Navbar