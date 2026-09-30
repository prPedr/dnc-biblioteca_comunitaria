import { Router } from "express"
import usuarioController from "../controller/usuarioController.js"
import validacaoMiddlewares from "../middlewares/validacaoMiddlewares.js"
import schemas from "../schema/usuarioSchema.js"

const router = Router()

router.post(
  "/usuarios",
  validacaoMiddlewares(schemas.usuarioSchema, "body"),
  usuarioController.criarUsuarioController
)

router.get(
  "/usuarios",
  usuarioController.listarTodosUsuariosController
)

router.get(
  "/usuarios/id/:id",
  validacaoMiddlewares(schemas.idParamSchema, "params"),
  usuarioController.listarUsuarioIdController
)

router.get(
  "/usuarios/nomeUsuario/:nomeUsuario",
  usuarioController.listarUsuarioNomeController
)

router.get(
  "/usuarios/email/:email",
  usuarioController.listarUsuarioEmailController
)

router.patch(
  "/usuarios/id/:id",
  validacaoMiddlewares(schemas.idParamSchema, "params"),
  validacaoMiddlewares(schemas.atualizarUsuarioSchema, "body"),
  usuarioController.atualizarUsuarioController
)

router.patch(
  "/usuarios/nomeUsuario/:nomeUsuario",
  validacaoMiddlewares(schemas.atualizarUsuarioSchema),
  usuarioController.atualizarUsuarioController
)

router.patch(
  "/usuarios/email/:email",
  validacaoMiddlewares(schemas.atualizarUsuarioSchema),
  usuarioController.atualizarUsuarioController
)

router.delete(
  "/usuarios/id/:id",
  validacaoMiddlewares(schemas.idParamSchema, "params"),
  usuarioController.excluirUsuarioController
)

router.delete(
  "/usuarios/nomeUsuario/:nomeUsuario",
  usuarioController.excluirUsuarioController
)

router.delete(
  "/usuarios/email/:email",
  usuarioController.excluirUsuarioController
)

export default router
