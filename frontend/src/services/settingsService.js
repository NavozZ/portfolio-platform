import axios from "axios"
import { API_BASE } from "./apiConfig"

const API = `${API_BASE}/settings`

export const getHeroImage = async () => {
  const response = await axios.get(`${API}/hero-image`)
  return response.data.heroImage
}

export const updateHeroImage = async (file) => {
  const formData = new FormData()
  formData.append("heroImage", file)
  const response = await axios.put(`${API}/hero-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  return response.data
}
