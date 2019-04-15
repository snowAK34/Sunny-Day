DROP DATABASE IF EXISTS budd_db;

CREATE DATABASE budd_db;
USE budd_db;

CREATE TABLE seeds (
	id INT NOT NULL AUTO_INCREMENT,
	strain VARCHAR(50) NOT NULL,
    quantity INT(10),
	thc VARCHAR(6),
    cbd VARCHAR(6),
    type VARCHAR(20),
	strain_type VARCHAR(20),
    genetics VARCHAR(250),
    flavor VARCHAR(100),
    feelings VARCHAR(255),
    alleviates  VARCHAR(255),
    date_rec DATE,
    company VARCHAR(100),
    comments VARCHAR(255),
	PRIMARY KEY(id)
);
SELECT * FROM seeds;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	strain VARCHAR(50) NOT NULL,
	price DECIMAL(10,2),
	packaging VARCHAR(20),
    size FLOAT(10),
    quantity INT(10),
	thc VARCHAR(6),
    cbd VARCHAR(6),
    type VARCHAR(20),
	strain_type VARCHAR(20),
    genetics VARCHAR(250),
	flavor VARCHAR(100),
    feelings VARCHAR(255),
    alleviates  VARCHAR(255),
    comments VARCHAR(255),
    PRIMARY KEY(id)
);
SELECT * FROM products;
    