import apiInstance from "./apiInstance"

async function getTodasLinhas() {
  try {
    const res = await apiInstance.get('/tipo-classificacao-linha/linhas')
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function getTiposLinha() {
  try {
    const res = await apiInstance.get("/tipo-classificacao-linha/tipos-linhas")
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

export default {
  getTodasLinhas,
  getTiposLinha
}