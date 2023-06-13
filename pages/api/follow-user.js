import mysql from "mysql2"
import initMiddleware from '../../lib/init-middleware'
import validateMiddleware from '../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
  validateMiddleware([
      check("followedProfile").notEmpty().isString().isLength({min:1, max:100}).trim().escape(),
      check("clerkUser").notEmpty().isString().isLength({min:1, max:100}).trim().escape(),
  ], validationResult)
)


export default async function handler(req, res) {
    await validateBody(req, res)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
  
  const { followedProfile, clerkUser } = req.body
  const connection = mysql.createConnection(process.env.DATABASE_URL)
  connection.query("UPDATE users SET followers = JSON_ARRAY_APPEND (liked_Ids, '$', 'thingIwannPush') WHERE name = 'userNameThingy'", (error, results, fields) => {
    if (error) throw error;
    connection.end()
    res.status(201).send("Success")
  })
}