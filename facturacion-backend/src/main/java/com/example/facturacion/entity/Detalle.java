package com.example.facturacion.entity;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "detalle")
public class Detalle implements Serializable {

    @Serial
    private static final long serialVersionUID = -1725391982478580632L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "iddetalle")
    private Integer iddetalle;

    @Column(name = "codproduct")
    private Integer codproduct;

    @Column(name = "cant")
    private Integer cant;

    @Column(name = "description")
    private String description;

    @Column(name = "unitprice")
    private Double unitprice;

    @Column(name = "idfactura")
    private Integer idfactura;

    public Integer getIddetalle() {
        return iddetalle;
    }

    public void setIddetalle(Integer iddetalle) {
        this.iddetalle = iddetalle;
    }

    public Integer getCodproduct() {
        return codproduct;
    }

    public void setCodproduct(Integer codproduct) {
        this.codproduct = codproduct;
    }

    public Integer getCant() {
        return cant;
    }

    public void setCant(Integer cant) {
        this.cant = cant;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getUnitprice() {
        return unitprice;
    }

    public void setUnitprice(Double unitprice) {
        this.unitprice = unitprice;
    }

    public Integer getIdfactura() {
        return idfactura;
    }

    public void setIdfactura(Integer idfactura) {
        this.idfactura = idfactura;
    }
}
