import apiInstance from "../../apiInstance";

async function getOperadoraFinanceiraCllId(brtId, cllId) {
  try {
    const res = await apiInstance.get(`/brt/${brtId}/classificacao/operadora-e-financeira/cll-id/${cllId}`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function postOperadoraFinanceira(brtId, operadoraFinanceira) {
  try {
    const res = await apiInstance.post(`/brt/${brtId}/classificacao/operadora-e-financeira`, operadoraFinanceira)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    
    throw error
  }
}

async function deleteOperadoraFinanceira(brtId, ofiId) {
  try {
    const res = await apiInstance.delete(`/brt/${brtId}/classificacao/operadora-e-financeira/${ofiId}`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error;
  }
}

export { getOperadoraFinanceiraCllId, postOperadoraFinanceira, deleteOperadoraFinanceira }
