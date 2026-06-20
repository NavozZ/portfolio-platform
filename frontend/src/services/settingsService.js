import axios from "axios"

const API = `${import.meta.env.VITE_API_URL}/settings`

export const getHeroImage = async () => {
  const response = await axios.get(`${API}/hero-image`)
  return response.data.heroImage
}

export const updateHeroImage = async (heroImage) => {
  const response = await axios.put(`${API}/hero-image`, { heroImage })
  return response.data
}
