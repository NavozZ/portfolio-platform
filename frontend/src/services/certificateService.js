import axios from "axios"

const API = `${import.meta.env.VITE_API_URL}/certificates`

export const getCertificates = async () => {
    const response = await axios.get(API)
    return response.data
}

export const getCertificateById = async (id) => {
    const response = await axios.get(`${API}/${id}`)
    return response.data
}

export const createCertificate = async (data) => {
    const response = await axios.post(API, data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

export const updateCertificate = async (id, data) => {
    const response = await axios.put(`${API}/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}

export const deleteCertificate = async (id) => {
    await axios.delete(`${API}/${id}`)
}
