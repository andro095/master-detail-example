import { Detalle, DetallePost } from "./detalle";

export interface Factura {
    idfactura:   number;
    name:        string;
    nit:         string;
    address:     string;
    detalleList: Detalle[];
}

export interface FacturaPost extends Omit<Factura, 'idfactura' | 'detalleList'> {
    detalleList: DetallePost[];
}