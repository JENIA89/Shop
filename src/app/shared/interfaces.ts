export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
}

export interface Product {
    type: string
    title: string
    photo: string
    info: string
    price: string
    date: Date
    id?: string
}

export interface fbCreateResponse {
    name: string
}

export interface Order {
    name: string,
    phone: string,
    address: string,
    payment: string,
    orders: Array<any>,
    price: number,
    date: Date,
    id?: string
}