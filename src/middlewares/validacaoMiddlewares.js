const validacao = (schema) => (request, response, next) => {
  const resultado = schema.safeParse(request.body)

  if (!resultado.success) {
    const errosFormatados = resultado.error.issues.map((erro) => ({
      campo: erro.path[0],
      mensagem: erro.message
    }))

    return response.status(400).json({
      Mensagem: "Erro de validação",
      Detalhes: errosFormatados
    })
  }

  request.body = resultado.data
  next()
}

export default validacao
