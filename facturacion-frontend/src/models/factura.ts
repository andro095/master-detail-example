import { Detalle } from "./detalle";

export interface Factura {
    idfactura:   number;
    name:        string;
    nit:         string;
    address:     string;
    detalleList: Detalle[];
}