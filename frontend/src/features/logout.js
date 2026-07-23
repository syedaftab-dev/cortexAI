import api from '../utils/axios.js'

async function logout() {
  try {
    const {data} = await api.get("/api/auth/logout")
    
  } catch (error) {
    console.log(error)
  }
}

export default logout