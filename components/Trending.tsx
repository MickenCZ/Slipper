import styles from "../styles/Trending.module.css"

function Trending() {
  return (<aside id={styles.aside}>
    <h1 id={styles.focusHeader}>Daily focus:</h1>
    <p id={styles.focus}>Science and technology</p>

    <h1 id={styles.trending}>Trending</h1>
    <ol id={styles.trendingList}>
      <li>#ChatGPT</li>
      <li>#Nvidia</li>
      <li>#3Dprinting</li>
    </ol>
  </aside>)
}

export default Trending