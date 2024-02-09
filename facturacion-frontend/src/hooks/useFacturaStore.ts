import { useEffect } from "react";
import { Factura, FacturaPost } from "../models";
import { useAppDispatch, useAppSelector } from "./useStore"
import { getFacturas, postFactura } from "../services";
import { deleteFactura } from '../services/facturaService';
import { addFactura, popFactura, setActiveFactura, setFacturas } from "../store";


export const useFacturaStore = () => {
    
    const { activeFactura, facturas } = useAppSelector(state => state.factura);
    const dispatch = useAppDispatch();

    const uploadFacturas = (facturas: Factura[]) => {
        dispatch(setFacturas(facturas))
    }

    const updateActiveFactura = (factura: Factura | null) => {
        
        dispatch(setActiveFactura(factura))
    }

    const saveFactura = async (factura: FacturaPost) => {
        const newFactura = await postFactura(factura);

        if (newFactura) {
            dispatch(addFactura(newFactura));
            return true;
        }

        return false;
    }

    const removeFactura = async (id: number) => {
        const deleted = await deleteFactura(id);

        if (deleted) {
            dispatch(popFactura(id))
        }

        return deleted;
    }

    useEffect(() => {
        const initFacturas = async () => {
            const facturas = await getFacturas();

            if (facturas) {
                uploadFacturas(facturas);
            }
        };

        initFacturas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        // Properties
        activeFactura,
        facturas,

        // Methods
        uploadFacturas,
        updateActiveFactura,
        saveFactura,
        removeFactura
    }
}