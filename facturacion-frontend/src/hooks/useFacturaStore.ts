import { useEffect } from "react";
import { Factura } from "../models";
import { setActiveFactura, setFacturas } from "../store/slices";
import { useAppDispatch, useAppSelector } from "./useStore"
import { getFacturas } from "../services";


export const useFacturaStore = () => {
    
    const { activeFactura, facturas } = useAppSelector(state => state.factura);
    const dispatch = useAppDispatch();

    const uploadFacturas = (facturas: Factura[]) => {
        dispatch(setFacturas(facturas))
    }

    const updateActiveFactura = (factura: Factura | null) => {
        dispatch(setActiveFactura(factura))
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
        updateActiveFactura
        
    }
}