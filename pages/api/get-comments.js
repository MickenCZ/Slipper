import mysql from "mysql2"

export default function handler(req, res) {
  const postID = req.body.postID
  const connection = mysql.createConnection(process.env.DATABASE_URL)
  connection.query("SELECT * FROM `comments` WHERE post_id ="+postID, (error, results, fields) => {
    if (error) throw error;
    connection.end()
    res.status(200).json({
    "comments": results
    })
  })
}

export const config = {
  api: {
    externalResolver: true,
  },
}

//get Posts data from DB