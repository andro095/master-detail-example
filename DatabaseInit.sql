CREATE DATABASE facturacion;

CREATE TABLE IF NOT EXISTS facturacion.factura  (
	idfactura int NOT NULL AUTO_INCREMENT,
	name varchar(100),
	nit varchar(100),
	address varchar(100),
	PRIMARY KEY (idfactura)
);

CREATE TABLE IF NOT EXISTS facturacion.detalle (
	iddetalle int NOT NULL AUTO_INCREMENT,
	codproduct int,
	cant int,
	description varchar(100),
	unitprice double,
	idfactura int,
	PRIMARY KEY (iddetalle),
    FOREIGN KEY (idfactura) REFERENCES facturacion.factura(idfactura)
);

CREATE USER 'spuser'@'%' IDENTIFIED BY 'spuser';

GRANT ALL ON facturacion.* TO 'spuser'@'%';