### Schema
DROP DATABASE IF EXISTS budd_db;
CREATE DATABASE budd_db;
USE budd_db;

CREATE TABLE seeds (
	id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(20) NOT NULL,
	strain VARCHAR(50) NOT NULL,
	strain_type VARCHAR(20) NOT NULL,
    genetics VARCHAR(250),
    thc VARCHAR(6),
    cbd VARCHAR(6),
    flavor VARCHAR(100),
    feelings VARCHAR(255),
    alleviates  VARCHAR(255),
    date DATE,
	PRIMARY KEY(id)
);

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(20) NOT NULL,
	strain VARCHAR(50) NOT NULL,
	packaging VARCHAR(20) NOT NULL,
    size FLOAT(10) NOT NULL,
    price DECIMAL(13,2) NOT NULL,
    unit_size VARCHAR(20) NOT NULL,
	thc VARCHAR(6),
    cbd VARCHAR(6),
	strain_type VARCHAR(20) NOT NULL,
    genetics VARCHAR(250),
	flavor VARCHAR(100),
    feelings VARCHAR(255),
    alleviates  VARCHAR(255),
	PRIMARY KEY(id)
);

    