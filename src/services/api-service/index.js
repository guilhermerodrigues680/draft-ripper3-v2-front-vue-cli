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

async function postCadastrarTipoLinha(contratoCadastroTipoLinha) {
  try {
    const res = await apiInstance.post("/tipo-classificacao-linha/tipos-linhas", contratoCadastroTipoLinha)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function postCadastrarClassificacoLinha(contratoCadastroClassificacaoLinha) {
  try {
    const res = await apiInstance.post("/tipo-classificacao-linha/classificacao-linhas", contratoCadastroClassificacaoLinha)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function postCadastrarRegra(contratoCadastroRegra) {
  try {
    const res = await apiInstance.post("/classificacao/regras-de-classificacao", contratoCadastroRegra)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

export default {
  getTodasLinhas,
  getTiposLinha,
  postCadastrarTipoLinha,
  postCadastrarClassificacoLinha,
  postCadastrarRegra
}