import axios from "axios"
import { API_BASE } from "./apiConfig"

const API = `${API_BASE}/achievements`

export const getAchievements = async () => {
    const response = await axios.get(API)
    return response.data
}

export const getAchievementById = async (id) => {
    const response = await axios.get(`${API}/${id}`)
    return response.data
}

export const createAchievement = async (data) => {
    const response = await axios.post(API, data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

export const updateAchievement = async (id, data) => {
    const response = await axios.put(`${API}/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

export const deleteAchievement = async (id) => {
    await axios.delete(`${API}/${id}`)
}
