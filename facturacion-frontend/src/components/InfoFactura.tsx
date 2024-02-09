import { Dialog } from "primereact/dialog";
import { useFacturaStore } from "../hooks";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Detalle } from "../models";


export const InfoFactura = () => {

    const { activeFactura, updateActiveFactura } = useFacturaStore();

    const productos = activeFactura?.detalleList;
    
    const onHide = () => {
        updateActiveFactura(null);
    }

    const totalTemplate = (rowData: Detalle) => {
        return `Q. ${rowData.cant * rowData.unitprice}`
    }

    const unitPriceTemplate = (rowData: Detalle) => {
        return `Q. ${rowData.unitprice}`
    }

    return (
        <Dialog 
            header={`Factura #${activeFactura?.idfactura}`}
            visible={activeFactura !== null}
            style={{ width: '50vw' }}
            onHide={onHide}
        >
            <div
                className="grid"
            >
                <div
                    className="flex flex-column gap-2 col-4 align-items-center"
                >
                    <h3>
                        Nombre del Cliente
                    </h3>
                    <p>
                        {activeFactura?.name}
                    </p>
                </div>
                <div
                    className="flex flex-column gap-2 col-4 align-items-center"
                >
                    <h3>
                        Nit
                    </h3>
                    <p>
                        {activeFactura?.nit}
                    </p>
                </div>
                <div
                    className="flex flex-column gap-2 col-4 align-items-center"
                >
                    <h3>
                        Dirección
                    </h3>
                    <p>
                        {activeFactura?.address}
                    </p>
                </div>
                <div
                    className="col-12"
                >
                    <h3>
                        Productos:
                    </h3>
                </div>
                <DataTable
                    className='border-2'
                    value={productos}
                    style={{width: '100%', minWidth: '300px', marginLeft: 'auto', marginRight: 'auto'}}
                >
                    <Column field="codproduct" header="Código del producto"/>
                    <Column field="description" header="Descripción"/>
                    <Column body={unitPriceTemplate} header="Precio Unitario"/>
                    <Column field="cant" header="Cantidad"/>
                    <Column body={totalTemplate} header="Total"/>
                </DataTable>
                <div
                    className="col-12 flex justify-content-end"
                >
                    <h3>
                        Total: Q. {productos?.reduce((acc, curr) => acc + curr.cant * curr.unitprice, 0)}
                    </h3>
                </div>
            </div>
        </Dialog>
    )
}