import bcrypt from "bcrypt"
import usuarioRepositories from "../repositories/usuarioRepositories.js"

const criarUsuarioSevices = async (novoUsuario) => {
  const buscarUsuarioNome = await usuarioRepositories.buscarUsuarioNomeRepositories(novoUsuario.nomeUsuario)
  if (buscarUsuarioNome) {
    throw new Error ("Nome de usuario ja cadastrado")
  }

  const buscarUsuarioEmail = await usuarioRepositories.buscarUsuarioEmailRepositories(novoUsuario.email)
  if (buscarUsuarioEmail) {
    throw new Error ("Endereco de email ja cadastrado")
  }

  const senhaHash = await bcrypt.hash(novoUsuario.senha, 10)

  const criarUsuario = await usuarioRepositories.criarUsuarioRepositories({
    ...novoUsuario,
    senha : senhaHash
  })

  if (!criarUsuario) {
    throw new Error ("Falha ao criar o usuario")
  }

  return criarUsuario
}

const listarTodosUsuariosServices = async () => {
  const listarTodosUsuarios = await usuarioRepositories.listarTodosUsuariosRepositories()

  if (!listarTodosUsuarios) {
    throw new Error ("Falha ao litar todos os usuarios.")
  }

  return listarTodosUsuarios
}

const listarUsuarioIdServives = async (id) => {
  const listarUsuarioId = await usuarioRepositories.buscarUsuarioIdRepositories(id)

  if (!listarUsuarioId) {
    throw new Error ("ID de usuario nao encontrado")
  }

  return listarUsuarioId
}

export default {
  criarUsuarioSevices,
  listarTodosUsuariosServices,
  listarUsuarioIdServives
}
