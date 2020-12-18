import apiInstance from "./api-instance"

/**
 * @param {Date} dataReferencia
 */
async function getViagensClassificadas(dataReferencia) {
  try {
    const onlyDate = dataReferencia.toISOString().substring(0, 10)
    const res = await apiInstance.get(`/classificacao/viagens-classificadas/${onlyDate}`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
  }

  return [];
}

async function getDiasProcessados() {
  try {
    const res = await apiInstance.get('/processamento/dias-processados')
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
  }

  return [];
}

async function getDiaProcessado(dataReferencia) {
  try {
    const onlyDate = dataReferencia.toISOString().substring(0, 10)
    const res = await apiInstance.get(`/processamento/dias-processados/${onlyDate}`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
  }

  return [];
}

export { getViagensClassificadas, getDiasProcessados, getDiaProcessado }
