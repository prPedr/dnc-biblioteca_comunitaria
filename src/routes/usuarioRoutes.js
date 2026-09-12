import { Router } from "express"
import usuarioController from "../controller/usuarioController.js"

const router = Router()

router.post(
  "/usuarios",
  usuarioController.criarUsuarioController
)

router.get(
  "/usuarios",
  usuarioController.listarTodosUsuariosController
)

router.get(
  "/usuarios/id/:id",
  usuarioController.listarUsuarioIdController
)

router.get(
  "/usuarios/nomeUsuario/:nomeUsuario",
  usuarioController.listarUsuarioNomeController
)

export default router
