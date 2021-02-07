import apiInstance from "../../apiInstance";

async function getListaClassificaoLinha(brtId) {
  try {
    const res = await apiInstance.get(`/brt/${brtId}/classificacao/classificacao-de-linhas`)
    return res.data
  } catch(error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function postCadastrarClassificacoLinha(brtId, contratoCadastroClassificacaoLinha) {
  try {
    const res = await apiInstance.post(`/brt/${brtId}/classificacao/classificacao-de-linhas`, contratoCadastroClassificacaoLinha)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function postCadastrarClassificacaoVariasLinhas(brtId, contratoCadastroClassificacaoVariasLinhas) {
  try {
    const res = await apiInstance.post(`/brt/${brtId}/classificacao/classificacao-de-linhas/varias`, contratoCadastroClassificacaoVariasLinhas)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

export { getListaClassificaoLinha, postCadastrarClassificacoLinha, postCadastrarClassificacaoVariasLinhas }
