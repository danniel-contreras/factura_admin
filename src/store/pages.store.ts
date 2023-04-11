import {defineStore} from "pinia"
import { CreatePage, PageI } from "../types/pages.types"
import { create_page, get_all_pages } from "../services/pages.service"
import {toast} from "vue3-toastify"

export const UsePagesStore = defineStore("pages",{
    state:()=>({
        pages: [] as PageI[]
    }),
    actions:{
        async CreatePage(values:CreatePage){
            const result = await create_page(values)

            if(result.ok){
                toast.success("Se guardo correctamente")
            }else{
                toast.error("Error al guardar la pagina")
            }
        },
        async GetAllPages(){
            const result = await get_all_pages()
            if(result.pages && result.pages.length > 0){
                this.pages = result.pages
            }else{
                this.pages = []
            }
        }
    }
})