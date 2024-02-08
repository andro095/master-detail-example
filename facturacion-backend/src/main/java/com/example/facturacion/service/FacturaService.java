package com.example.facturacion.service;


import com.example.facturacion.entity.Detalle;
import com.example.facturacion.entity.Factura;
import com.example.facturacion.repository.DetalleRepository;
import com.example.facturacion.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/factura")
@CrossOrigin
public class FacturaService {


    @Autowired
    FacturaRepository facturaRepository;

    @Autowired
    DetalleRepository detalleRepository;

    @GetMapping(path = "/")
    public List<Factura> getFacturas(){
        return facturaRepository.findAll();
    }

    @PostMapping(path = "/")
    public Factura saveFactura(@RequestBody Factura factura){
        List<Detalle> detalles = factura.getDetalleList();
        factura.setDetalleList(null);

        facturaRepository.save(factura);

        for(Detalle detalle : detalles){
            detalle.setIdfactura(factura.getIdfactura());
        }

        detalleRepository.saveAll(detalles);

        factura.setDetalleList(detalles);
        return factura;

    }

    @DeleteMapping(path = "/{id}")
    public void deleteFactura(@PathVariable("id") Integer id) {
        Optional<Factura> factura = facturaRepository.findById(id);

        if (factura.isPresent()) {
            detalleRepository.deleteAll(factura.get().getDetalleList());
            facturaRepository.delete(factura.get());
        }
    }
}
