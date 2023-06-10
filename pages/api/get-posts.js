import mysql from "mysql2"

export default function handler(req, res) {
  const connection = mysql.createConnection(process.env.DATABASE_URL)
  connection.query("SELECT * FROM `posts`", (error, results, fields) => {
    if (error) throw error;
    connection.end()
    res.status(200).json({
    "posts": results
    })
  })
}

export const config = {
  api: {
    externalResolver: true,
  },
}

//get Posts data from DB