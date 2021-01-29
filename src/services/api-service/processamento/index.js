import apiInstance from "../apiInstance"

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

async function postIniciarProcessamento() {
  try {
    const res = await apiInstance.post('/processamento/iniciar')
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
  }

  return [];
}

async function postPararProcessamento() {
  try {
    const res = await apiInstance.post('/processamento/parar')
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
  }

  return [];
}

export { getDiasProcessados, getDiaProcessado, postIniciarProcessamento, postPararProcessamento }
