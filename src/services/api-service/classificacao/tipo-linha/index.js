import apiInstance from "../../apiInstance";

async function getTiposLinha(brtId) {
  try {
    const res = await apiInstance.get(`/brt/${brtId}/classificacao/tipos-de-linha`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function postCadastrarTipoLinha(brtId, contratoCadastroTipoLinha) {
  try {
    const res = await apiInstance.post(`/brt/${brtId}/classificacao/tipos-de-linha`, contratoCadastroTipoLinha)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function deleteTipoLinha(brtId, tipoLinhaId) {
  try {
    const res = await apiInstance.delete(`/brt/${brtId}/classificacao/tipos-de-linha/${tipoLinhaId}`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error;
  }
}

export { getTiposLinha, postCadastrarTipoLinha, deleteTipoLinha }