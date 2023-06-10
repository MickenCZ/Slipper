import mysql from "mysql2"

export default function handler(req, res) {
  //const errors = validationResult(req)
  //if (!errors.isEmpty()) {res.sendStatus(400)}
  //else {
    const { pfpURL, userName, messageContent } = req.body
  const connection = mysql.createConnection(process.env.DATABASE_URL)
  connection.query("INSERT INTO `posts` (`ID`, `pfpURL`, `userName`, `timePosted`, `messageContent`, `likes`, `comments`) VALUES (NULL, '"+ pfpURL +"', '"+ userName +"', '"+ Date.now() +"', '"+ messageContent +"', '0', '0')", (error, results, fields) => {
    if (error) throw error;
    //console.log(results);
  })

  connection.end()
  res.status(201).send("Success")
  }
//}

export const config = {
  api: {
    externalResolver: true,
  },
}