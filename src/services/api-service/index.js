//import apiInstance from "./apiInstance"
import linha from "./mock-api/classificacao/linhas.json";

async function getTodasLinhas() {
  try {
    //const res = await apiInstance.get('/classificacao/linhas')
    //return res.data
    return linha.linhas;
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

export default {
  getTodasLinhas,
}