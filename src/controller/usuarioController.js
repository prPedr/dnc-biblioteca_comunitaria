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

const listarTodosUsuariosController = async (request, response) => {
  try {
    const listarTodosUsuarios = await usuarioServices.listarTodosUsuariosServices()
    response.status(200).send({listarTodosUsuarios})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

const listarUsuarioIdController = async (request, response) => {
  const { id } = request.params

  try {
    const listarUsuarioId = await usuarioServices.listarUsuarioIdServives(id)
    response.status(200).send({listarUsuarioId})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

const listarUsuarioNomeController = async (request, response) => {
  const { nomeUsuario } = request.params

  try {
    const listarUsuarioNome = await usuarioServices.listarUsuarioNomeServices(nomeUsuario)
    response.status(200).send({listarUsuarioNome})
  } catch (err) {
    response.status(400).send(err.message)
  }
}

export default {
  criarUsuarioController,
  listarTodosUsuariosController,
  listarUsuarioIdController,
  listarUsuarioNomeController
}
