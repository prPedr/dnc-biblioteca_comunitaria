import bcrypt from "bcrypt"
import usuarioRepositories from "../repositories/usuarioRepositories.js"

const criarUsuarioServices = async (novoUsuario) => {
  const buscarUsuarioNome = await usuarioRepositories.buscarUsuarioNomeRepositories(novoUsuario.nomeUsuario)
  if (buscarUsuarioNome) {
    throw new Error ("Nome de usuario ja cadastrado.")
  }

  const buscarUsuarioEmail = await usuarioRepositories.buscarUsuarioEmailRepositories(novoUsuario.email)
  if (buscarUsuarioEmail) {
    throw new Error ("E-mail ja cadastrado")
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

export default {
  criarUsuarioServices
}
