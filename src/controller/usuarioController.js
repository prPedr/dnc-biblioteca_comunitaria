import usuarioServices from "../services/usuarioServices.js"

const criarUsuarioController = async (request, response) => {
  const novoUsuario = request.body

  try {
    const criarUsuario = await usuarioServices.criarUsuarioSevices(novoUsuario)
    response.status(201).send({criarUsuario})
  } catch (err) {
    response.status(404).send(err.message)
  }
}

export default {
  criarUsuarioController
}
