import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Factura } from '../../models';

interface FacturaState {
    facturas: Factura[];
    activeFactura: Factura | null;
}

const initialState : FacturaState = {
    facturas: [],
    activeFactura: null
};

export const facturaSlice = createSlice({
    name: 'factura',
    initialState,
    reducers: {
        setFacturas: (state, { payload } : PayloadAction<Factura[]>) => {
            state.facturas = payload;
        },

        setActiveFactura: (state, { payload } : PayloadAction<Factura | null>) => {
            state.activeFactura = payload;
        }
    }
});

export const { setFacturas, setActiveFactura } = facturaSlice.actions;