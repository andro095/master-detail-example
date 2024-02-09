import { Factura } from "../models";
import { instance } from "./axiosService"


export const getFacturas = async () => {
    const response = await instance.get<Factura[]>('/');

    if (response.status !== 200) return null; 

    return response.data;
}