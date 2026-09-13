import db from "../config/database.js"

db.run(
  `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeUsuario TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      fotoPerfil TEXT
    )
  `
)

const criarUsuarioRepositories = (novoUsuario) => {
  return new Promise((resolve, reject) => {
    const { nomeUsuario, email, senha, fotoPerfil } = novoUsuario

    db.run(
      `
        INSERT INTO usuarios (nomeUsuario, email, senha, fotoPerfil)
        VALUES (?, ?, ?, ?)
      `,

      [nomeUsuario, email, senha, fotoPerfil],

      function(err) {
        if (err) {
          reject(err)
        } else {
          resolve({
            id : this.lastID,
            Mensagem : `Usuario ${nomeUsuario} criado.`
          })
        }
      }
    )
  })
}

const listarTodosUsuariosRepositories = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT id, nomeUsuario, email, fotoPerfil
        FROM usuarios
      `,

      (err, linhaTodos) => {
        if (err) {
          reject(err)
        } else {
          resolve(linhaTodos)
        }
      }
    )
  })
}

const buscarUsuarioIdRepositories = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT id, nomeUsuario, email, fotoPerfil
        FROM usuarios
        WHERE id = ?
      `,

      [id],

      (err, linhaId) => {
        if (err) {
          reject(err)
        } else {
          resolve(linhaId)
        }
      }
    )
  })
}

const buscarUsuarioNomeRepositories = (nomeUsuario) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT id, nomeUsuario, email, fotoPerfil
        FROM usuarios
        WHERE nomeUsuario = ?
      `,

      [nomeUsuario],

      (err, linhaNome) => {
        if (err) {
          reject(err)
        } else {
          resolve(linhaNome)
        }
      }
    )
  })
}

const buscarUsuarioEmailRepositories = (email) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT id, nomeUsuario, email, fotoPerfil
        FROM usuarios
        WHERE email = ?
      `,

      [email],

      (err, linhaEmail) => {
        if (err) {
          reject(err)
        } else {
          resolve(linhaEmail)
        }
      }
    )
  })
}

const atualizarUsuarioRepositories = (id, dadosAtualizados) => {
  return new Promise((resolve, reject) => {
    const { nomeUsuario, email, senha, fotoPerfil } = dadosAtualizados

    db.run(
      `
        UPDATE usuarios
        SET 
          nomeUsuario = COALESCE(?, nomeUsuario),
          email = COALESCE(?, email),
          senha = COALESCE(?, senha),
          fotoPerfil = COALESCE(?, fotoPerfil)
        WHERE id = ?
      `,

      [nomeUsuario, email, senha, fotoPerfil, id],
      
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({
            id,
            Mensagem: "Usuario atualizado com sucesso."
          })
        }
      }
    )
  })
}

export default {
  criarUsuarioRepositories,
  listarTodosUsuariosRepositories,
  buscarUsuarioIdRepositories,
  buscarUsuarioNomeRepositories,
  buscarUsuarioEmailRepositories,
  atualizarUsuarioRepositories
}
