import mysql from "mysql2"

export default async function handler(req, res) {
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query("SELECT * FROM comments", (error, results, fields) => {
    if (error) throw error;
    connection.end()
    res.status(200).json({
      "comments": results
    })
  })
}

//get all posts from one user from DB