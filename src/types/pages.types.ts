export interface CreatePage {
    pageName: string
    pagePath: string
    pageURI: string
    meta?: string
}

export interface CreatePageResponse {
    message: string
    ok: boolean
    result: PageI[]
}

export interface PageI {
    createdAt: string
    idPage: number
    meta: string
    pageName: string
    pagePath: string
    pageURI: string
    updatedAt: string
}