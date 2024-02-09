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
        },

        addFactura: (state, { payload } : PayloadAction<Factura>) => {
            state.facturas.push(payload);
        },

        popFactura: (state, { payload } : PayloadAction<number>) => {
            state.facturas = state.facturas.filter(factura => factura.idfactura !== payload);
        }
    }
});

export const { setFacturas, setActiveFactura, addFactura, popFactura } = facturaSlice.actions;