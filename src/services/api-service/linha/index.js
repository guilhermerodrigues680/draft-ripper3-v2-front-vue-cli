import apiInstance from "../apiInstance"

async function getTodasLinhas() {
  try {
    const res = await apiInstance.get('/linhas')
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

export { getTodasLinhas }
