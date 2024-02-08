package com.example.facturacion.repository;


import com.example.facturacion.entity.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository("facturaRepository")
public interface FacturaRepository extends JpaRepository<Factura, Serializable> {

}
