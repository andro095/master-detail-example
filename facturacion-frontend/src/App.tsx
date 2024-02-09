


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
import { useFacturaStore } from "./hooks";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
        

import { Button } from 'primereact/button';
import { Factura } from './models';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { AddNewFactura, InfoFactura } from './components';



function App() {

  const { facturas, removeFactura, updateActiveFactura } = useFacturaStore();

  const toast = useRef<Toast>(null);
  const [newVisible, setNewVisible] = useState<boolean>(false);

  const onNewFactura = () => {
    setNewVisible(true);
  }

  const onRemoveFactura = async (id: number) => {
    const deleted = await removeFactura(id);

    if (deleted) {
      toast.current?.show({severity: 'success', summary: 'Factura eliminada', detail: 'La factura ha sido eliminada correctamente'});
    } else {
      toast.current?.show({severity: 'error', summary: 'Error', detail: 'No se ha podido eliminar la factura'});
    }
  }
  
  const deleteButton = (rowData: Factura) => {
    return (
      <div 
        className="flex gap-2"
      >
        <Button
          icon="pi pi-book"
          onClick={() => updateActiveFactura(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity='danger'
          onClick={() => onRemoveFactura(rowData.idfactura)}
        />
      </div>
    )
  }

  const totalTemplate = (rowData: Factura) => {
    const total = rowData.detalleList.reduce((acc, curr) => acc + curr.cant * curr.unitprice, 0);
    
    return `Q. ${total}`
  }

  

  return (
    <div
      className='flex flex-column justify-content-center align-items-center h-full'
    >
      <h1
        className='font-bold mb-4'
      >
        Maestro Detalle: Facturación
      </h1>
      <Toast ref={toast} />
      <Button 
        label='Agregar Factura'
        icon='pi pi-plus'
        className='mb-4'
        onClick={onNewFactura}
      />
      <DataTable
        className='border-2'
        value={facturas}
        style={{width: '60%', minWidth: '300px', marginLeft: 'auto', marginRight: 'auto'}}
      >
        <Column field='idfactura' header="No. Factura"/>
        <Column field='name' header="Nombre del Cliente"/>
        <Column field='nit' header="Nit del Cliente"/>
        <Column header="Total" body={totalTemplate} />
        <Column body={deleteButton} />
      </DataTable>
      <InfoFactura />
      <AddNewFactura 
        visible={newVisible}
        onHide={() => setNewVisible(false)}
        toastRef={toast}
      />
    </div>
  )
}

export default App
