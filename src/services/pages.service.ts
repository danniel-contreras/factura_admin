import { CreatePage, CreatePageResponse, PageI } from "../types/pages.types";
import axios from "axios"
import { API_URL } from "../utils/constants";

export const create_page = async (values: CreatePage) => {
    try {
        const result = await axios.post<CreatePageResponse>(API_URL + "/pages", values)
        return result.data
    } catch (error) {
        return { ok: false }
    }
}

export const get_all_pages = async () => {
    const result = await axios.get<{ pages: PageI[] }>(API_URL + "/pages")
    return result.data;
}