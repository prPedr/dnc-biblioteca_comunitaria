import jwt from "jsonwebtoken"

const gerarJWT = (id) => {
  return jwt.sign(
    {id},
    "94a480de79ff4efcb3f0e76fbb1964dcf243b2aae63fef41470307001e5e1603",
    {expiresIn: 7200}
  )
}

export default gerarJWT
