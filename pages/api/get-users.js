import mysql from "mysql2"

export default function handler(req, res) {
  const connection = mysql.createConnection(process.env.DATABASE_URL)
  connection.query("SELECT * FROM `users`", (error, results, fields) => {
    if (error) throw error;
    connection.end()
    res.status(200).json({
    "users": results
    })
  })
}

export const config = {
  api: {
    externalResolver: true,
  },
}

//get Users data from DB