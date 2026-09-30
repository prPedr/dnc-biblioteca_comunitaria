const validacao = (schema, alvo = "body") => (request, response, next) => {
  const resultado = schema.safeParse(request[alvo])

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

  request[alvo] = resultado.data
  next()
}

export default validacao
