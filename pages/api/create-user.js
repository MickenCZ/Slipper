export default async function handler(req, res) {
  console.log(req.body)
  res.status(201).send("Success")
}
    

export const config = {
  api: {
    externalResolver: true,
  },
}