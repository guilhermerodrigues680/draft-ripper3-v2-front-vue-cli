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

export { postCadastrarRegra }
