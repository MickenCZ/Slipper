import {encode} from 'html-entities';
import mysql from "mysql2"

export default async function handler(req, res) {
  const pfp = encode(req.body.data.image_url)
  const username = encode(req.body.data.username)
  const followers = JSON.stringify([])
  const follows = JSON.stringify([])
  const connection = mysql.createConnection(process.env.DATABASE_URL)
  connection.query("INSERT INTO `users` (`ID`, `pfp`, `name`, `followers`, `follows`) VALUES (NULL, '"+pfp+"', '"+username+"', '"+followers+"', '"+follows+"')", (error, results, fields) => {
  if (error) throw error;
})
  connection.end()
  res.status(201).send("Success")
}