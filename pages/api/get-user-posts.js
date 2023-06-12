import mysql from "mysql2"
import initMiddleware from '../../lib/init-middleware'
import validateMiddleware from '../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
  validateMiddleware([
      check("username").notEmpty().isString().isLength({min:1, max:100}).trim().escape(),
  ], validationResult)
)

export default async function handler(req, res) {
    await validateBody(req, res)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username } = req.body
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    connection.query("SELECT * FROM `posts` WHERE `userName` = '"+username+"'", (error, results, fields) => {
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


//get all posts from one user from DB