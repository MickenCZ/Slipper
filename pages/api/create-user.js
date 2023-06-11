export default async function handler(req, res) {
  console.log(req.body)
}
    

export const config = {
  api: {
    externalResolver: true,
  },
}