import { Factura, FacturaPost } from "../models";
import { instance } from "./axiosService"


export const getFacturas = async () => {
    const response = await instance.get<Factura[]>('/');

    if (response.status !== 200) return null; 

    return response.data;
}

export const postFactura = async (factura: FacturaPost) => {
    const response = await instance.post<Factura>('/', factura);

    if (response.status !== 200) return null; 

    return response.data;
}

export const deleteFactura = async (id: number) => {
    const response = await instance.delete(`/${id}`);

    return response.status === 200;
}