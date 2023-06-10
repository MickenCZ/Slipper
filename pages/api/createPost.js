import mysql from "mysql2"
import initMiddleware from '../../lib/init-middleware'
import validateMiddleware from '../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
  validateMiddleware([
      check("messageContent").notEmpty().isString().isLength({min:1, max:69}).trim().escape(),
      check("userName").notEmpty().isString().isLength({min:1, max:100}).trim().escape(),
      check("pfpURL").notEmpty().isString().isLength({min:3, max:500}).trim().blacklist("<>\"'`")
  ], validationResult)
)

export default async function handler(req, res) {
  if (req.method === "POST") {
    await validateBody(req, res)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { pfpURL, userName, messageContent } = req.body
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query("INSERT INTO `posts` (`ID`, `pfpURL`, `userName`, `timePosted`, `messageContent`, `likes`, `comments`) VALUES (NULL, '"+ pfpURL +"', '"+   userName +"', '"+ Date.now() +"', '"+ messageContent +"', '0', '0')", (error, results, fields) => {
    if (error) throw error;
  })

  connection.end()
  res.status(201).send("Success")

  }
  else {
    res.status(404).json({ message: "Request HTTP Method Incorrect." })
  }
}
    

export const config = {
  api: {
    externalResolver: true,
  },
}