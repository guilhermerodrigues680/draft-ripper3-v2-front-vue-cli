import apiInstance from "../apiInstance"

async function getTodosBRTRipper() {
  try {
    const res = await apiInstance.get(`/brt`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

async function getBRTRipper(brtId) {
  try {
    const res = await apiInstance.get(`/brt/${brtId}`)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error;
  }
}

async function postCadastrarBRTRipper(brtRipper) {
  try {
    const res = await apiInstance.post(`/brt`, brtRipper)
    return res.data
  } catch (error) {
    console.error('Ocorreu um erro')
    console.error(error)
    throw error
  }
}

export { getTodosBRTRipper, getBRTRipper, postCadastrarBRTRipper }
