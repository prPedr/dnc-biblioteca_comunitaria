import bcrypt from "bcrypt"
import usuarioRepositories from "../repositories/usuarioRepositories.js"

const criarUsuarioServices = async (novoUsuario) => {
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
    throw new Error ("Falha ao litar todos os usuarios")
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

const listarUsuarioNomeServices = async (nomeUsuario) => {
  const listarUsuarioNome = await usuarioRepositories.buscarUsuarioNomeRepositories(nomeUsuario)

  if (!listarUsuarioNome) {
    throw new Error ("Nome de usuario nao encontrado")
  }

  return listarUsuarioNome
}

const listarUsuarioEmailServices = async (email) => {
  const listarUsuarioEmail = await usuarioRepositories.buscarUsuarioEmailRepositories(email)

  if (!listarUsuarioEmail) {
    throw new Error ("E-mail de usuario nao encontrado")
  }

  return listarUsuarioEmail
}

const atualizarUsuarioServices = async (filtro, dadosAtualizados) => {
  let usuarioEncontrado = null

  // Busca o usuário usando as funções existentes de busca
  if (filtro.id) {
    usuarioEncontrado = await usuarioRepositories.buscarUsuarioIdRepositories(filtro.id)
  } else if (filtro.nomeUsuario) {
    usuarioEncontrado = await usuarioRepositories.buscarUsuarioNomeRepositories(filtro.nomeUsuario)
  } else if (filtro.email) {
    usuarioEncontrado = await usuarioRepositories.buscarUsuarioEmailRepositories(filtro.email)
  }

  if (!usuarioEncontrado) {
    throw new Error("Usuario nao encontrado para atualizacao")
  }

  // Se a senha foi enviada no body, gera o hash
  if (dadosAtualizados.senha) {
    dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, 10)
  }

  // Atualiza usando o ID resolvido da busca
  const usuarioAtualizado = await usuarioRepositories.atualizarUsuarioRepositories(
    usuarioEncontrado.id,
    dadosAtualizados
  )

  if (!usuarioAtualizado) {
    throw new Error("Falha ao atualizar o usuario")
  }

  return usuarioAtualizado
}

export default {
  criarUsuarioServices,
  listarTodosUsuariosServices,
  listarUsuarioIdServives,
  listarUsuarioNomeServices,
  listarUsuarioEmailServices,
  atualizarUsuarioServices
}
