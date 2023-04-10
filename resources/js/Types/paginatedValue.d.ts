interface link{
    url:null|string
    active:boolean
    label:string
}
export interface paginatedValue<T> {
    current_page: number
    data: T
    first_page_url: string
    from:number
    last_page: number
    last_page_url: string
    links:link[]
    next_page_url: string
    path:string
    to:number
    total:number
}