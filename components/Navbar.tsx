import styles from "../styles/Navbar.module.css"

function Navbar() {
  return <nav id={styles.nav}>
    <div className={styles.navContainer}>
      <div>Posts</div>
      <div className={styles.underLine}></div>
    </div>
    <div className={styles.navContainer}>
      <div>Following</div>
      <div className={styles.underLine}></div>
    </div>
  </nav>
}

export default Navbar