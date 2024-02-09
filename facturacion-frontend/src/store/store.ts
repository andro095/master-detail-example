import { configureStore } from "@reduxjs/toolkit";
import { facturaSlice } from "./slices";


export const store = configureStore({
    reducer: {
        factura: facturaSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;