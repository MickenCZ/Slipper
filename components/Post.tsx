import styles from "../styles/Post.module.css"
import Image from "next/image"
import Link from "next/link"
/* eslint-disable jsx-a11y/img-redundant-alt */

function Post(props: {username:string, pfpURL:string, timestamp:number, messageContent:string, likes:number, comments:number, ID:number, displayComments: boolean}) {
  const {username, pfpURL, timestamp, messageContent, likes, comments, ID, displayComments} = props
  const daysSincePost:number = Math.round((Date.now() - timestamp)/1000/60/60/24)
  return (<div className={styles.postContainer}>
    <Image alt="Message user picture" src={pfpURL} width={60} height={60} className={styles.postPicture} ></Image>
    <div className={styles.messageInfo}>
      <Link href={"/users/" + username} className={styles.nameDate}>{username} - {daysSincePost} days ago</Link>
      <div className={styles.message}>{messageContent}</div>
    </div>
    <div className={styles.recCom}>
      {displayComments && <Link href={"/post/" + ID} className={styles.comments}>{comments} comments</Link>}
    </div>
  </div>)
}

export default Post