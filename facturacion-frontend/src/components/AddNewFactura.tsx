import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FC, RefObject, useState } from "react";
import { DetallePost, FacturaPost } from "../models";
import { useFacturaStore } from "../hooks";
import { InputNumber } from "primereact/inputnumber";


export const AddNewFactura : FC<AddNewFacturaProps> = ({ visible, onHide, toastRef }) => {

    const { saveFactura } = useFacturaStore();

    const [name, setName] = useState<string>('');
    const [nit, setNit] = useState<string>('');
    const [direccion, setDireccion] = useState<string>('');
    
    const [productos, setProductos] = useState<DetallePost[]>([]);

    const onAddProduct = () => {
        setProductos([...productos, {
            codproduct: 0,
            cant: 0,
            unitprice: 0,
            description: ''
        }])
    }

    const onProductChange = (index: number, key: keyof DetallePost, value: string | number) => {
        const newProductos = [...productos];

        const newProduct : DetallePost = {
            ...newProductos[index],
            [key]: value
        }

        newProductos[index] = newProduct;
        setProductos(newProductos);
    }

    const onProductDelete = (index: number) => {
        const newProductos = [...productos];
        newProductos.splice(index, 1);
        setProductos(newProductos);
    }

    const validateFacturaFields = () => {
        if (!name.trim() || !nit.trim() || !direccion.trim()) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Ingrese todos los campos de la factura'
            });
            return false;
        }

        return true;
    }

    const validateProductos = () => {

        if (productos.length === 0) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Ingrese al menos un producto'
            });

            return false;
        }
        
        for (const producto of productos) {
            if (producto.cant <= 0 || producto.unitprice <= 0 || !producto.description.trim() || !producto.codproduct) {
                toastRef.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Ingrese todos los campos de los productos'
                });

                return false;
            }
        }

        return true;
    }

    const onSave = async () => {
        if (!validateFacturaFields()) return;

        if (!validateProductos()) return;

        const newFactura : FacturaPost = {
            name,
            nit,
            address: direccion,
            detalleList: productos
        }

        console.log(newFactura);

        const saved = await saveFactura(newFactura);

        if (saved) {
            onHide();

            toastRef.current?.show({
                severity: 'success',
                summary: 'Factura Guardada',
                detail: 'La factura se ha guardado correctamente'
            });
        } else {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo guardar la factura'
            });
        }
    }

    return (
        <Dialog
            header="Nueva Factura"
            visible={visible}
            style={{ width: '70vw' }}
            onHide={onHide}
        >
            <div className="grid">
                <div className="col-3 flex flex-column gap-2 align-items-center">
                    <h3>
                        Nombre del Cliente
                    </h3>
                    <InputText
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-3 flex flex-column gap-2 align-items-center">
                    <h3>
                        Nit
                    </h3>
                    <InputText
                        className="w-full"
                        value={nit}
                        onChange={(e) => setNit(e.target.value)}
                    />
                </div>
                <div className="col-6 flex flex-column gap-2 align-items-center">
                    <h3>
                        Dirección
                    </h3>
                    <InputText
                        className="w-full"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                <div className="col-12 flex justify-content-between align-items-center">
                    <h3>
                        Productos:
                    </h3>
                    <Button 
                        label="Agregar Producto"
                        icon="pi pi-plus"
                        onClick={onAddProduct}
                    />
                </div>
                {
                    productos.length === 0 ? (
                        <div
                            className="col-12 flex justify-content-center"
                        >
                            <p>
                                No hay productos
                            </p>
                        </div>
                    ) : (
                        <div
                            className="col-12 flex gap-2"
                        >
                            <div
                                className="w-2 flex justify-content-center"
                            >
                                <h3>
                                    Código del Producto
                                </h3>
                            </div>
                            <div
                                className="w-2 flex justify-content-center"
                            >
                                <h3>
                                    Cantidad
                                </h3>
                            </div>
                            <div
                                className="w-2 flex justify-content-center"
                            >
                                <h3>
                                    Precio Unitario
                                </h3>
                            </div>
                            <div
                                className="w-5 flex justify-content-center"
                            >
                                <h3>
                                    Descripción
                                </h3>
                            </div>
                            <div 
                                className="w-1"
                            />
                        </div>
                    )
                }
                {
                    productos.map((producto, index) => (
                        <div 
                            key={index}
                            className="col-12 flex gap-2"
                        >
                            <div
                                className="w-2 flex"
                            >
                                <InputNumber 
                                    className="w-full"
                                    inputClassName="w-full"
                                    useGrouping={false}
                                    value={producto.codproduct}
                                    onValueChange={(e) => onProductChange(index, 'codproduct', e.value as number)}
                                    placeholder="Código del Producto"
                                />
                            </div>
                            <div
                                className="w-2 flex"
                            >
                                <InputNumber
                                    className="w-full"
                                    inputClassName="w-full"
                                    value={producto.cant}
                                    onValueChange={(e) => onProductChange(index, 'cant', e.value as number)}
                                    placeholder="Cantidad"
                                />
                            </div>
                            <div
                                className="w-2 flex"
                            >
                                <InputNumber 
                                    className="w-full"
                                    inputClassName="w-full"
                                    value={producto.unitprice}
                                    onValueChange={(e) => onProductChange(index, 'unitprice', e.value as number)}
                                    placeholder="Precio Unitario"
                                    mode="currency"
                                    currency="GTQ"
                                    locale="es-GT"
                                />
                            </div>
                            <div
                                className="w-5 flex"
                            >
                                <InputText
                                    className="w-full"
                                    value={producto.description}
                                    onChange={(e) => onProductChange(index, 'description', e.target.value)}
                                    placeholder="Descripción"
                                />
                            </div>
                            <div
                                className="w-1 flex justify-content-center"
                            >
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-danger"
                                    onClick={() => onProductDelete(index)}
                                />
                            </div>
                        </div>
                    ))
                }
                <div
                    className="col-12 flex justify-content-end"
                >
                    <Button
                        label="Guardar"
                        icon="pi pi-save"
                        onClick={onSave}
                    />
                </div>
            </div>
        </Dialog>
    )
}

interface AddNewFacturaProps {
    visible: boolean;
    onHide: () => void;
    toastRef: RefObject<Toast>;
}