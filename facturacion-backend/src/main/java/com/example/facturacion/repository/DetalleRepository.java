package com.example.facturacion.repository;

import com.example.facturacion.entity.Detalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository("detalleRepository")
public interface DetalleRepository extends JpaRepository<Detalle, Serializable> {
}
