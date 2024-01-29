import axios from "axios"
import { BASE_URL } from "../constants/api"

export const getReq = async (url: string, page?: number, limit?: number) =>  await axios.get(`${BASE_URL}${url}`, {
    params: {
        page,
        limit,
    },
})
