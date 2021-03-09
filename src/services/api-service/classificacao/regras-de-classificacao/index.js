import apiInstance from "../../apiInstance";

async function postCadastrarRegra(brtId, contratoCadastroRegra) {
  try {
    const res = await apiInstance.post(`/brt/${brtId}/classificacao/regras-de-classificacao`, contratoCadastroRegra)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function getViagensClassificacao(brtId) {
  try {
    const res = await apiInstance.get(`/brt/${brtId}/classificacao/regras-de-classificacao`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function deleteViagemClassificada(brtId, id) {
  try {
    const res = await apiInstance.delete(`/brt/${brtId}/classificacao/regras-de-classificacao/${id}`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

export { postCadastrarRegra, getViagensClassificacao, deleteViagemClassificada }
