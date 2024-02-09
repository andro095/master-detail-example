export interface Detalle {
    iddetalle:   number;
    codproduct:  number;
    cant:        number;
    description: string;
    unitprice:   number;
    idfactura:   number;
}

export type DetallePost = Omit<Detalle, 'iddetalle' | 'idfactura'>;