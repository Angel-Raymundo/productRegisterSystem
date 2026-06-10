-- DATABASE FOR LEARNING PURPOSES ONLY

create database db_almacen;
use db_almacen;


-- -------------------------prueba --------------------------------------------
create table tbl_ope_persona (
	PersonaId int not null auto_increment primary key,
    Persona_Nombre varchar(100)
);

desc tbl_ope_persona;

call sp_addPersona("Juan martinez perez");

select * from tbl_ope_persona;

SELECT * FROM tbl_ope_persona 
ORDER BY PersonaId DESC 
LIMIT 1;

-- ----------------------------------------------------------------------------

-- ---------------------------------Store------------------------------------

create table tbl_cat_ramMemories(
	idRam integer primary key auto_increment,
    size integer not null
);

create table tbl_cat_brands(
	idBrand integer primary key auto_increment,
    brandName varchar(45) not null
);

create table tbl_cat_graphCards(
	idGraphCard integer primary key auto_increment,
    graphName varchar(30) not null
);

create table tbl_cat_cpus(
	idCpu integer primary key auto_increment,
    cpuName varchar(40) not null,
    cores integer not null
);

create table tbl_cat_hardDisks(
	idDisk integer primary key auto_increment,
    diskStorage integer not null
);

create table tbl_ope_computers(
idComputer integer primary key auto_increment,
computerName varchar(70) not null,
fk_idBrand integer not null,
fk_idGraphCard integer not null,
fk_idDisk integer not null,
fk_idRam integer not null,
fk_idCpu integer not null,
price float not null,
registerDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
computerStatus tinyint(1),
foreign key (fk_idBrand) references tbl_cat_brands(idBrand),
foreign key (fk_idGraphCard) references tbl_cat_graphCards(idGraphCard),
foreign key (fk_idRam) references tbl_cat_ramMemories(idRam),
foreign key (fk_idCpu) references tbl_cat_cpus(idCpu)
);


CREATE TABLE tbl_rel_computer_disks (
    idRelation INT AUTO_INCREMENT PRIMARY KEY,
    fk_idComputer INT NOT NULL,
    fk_idDisk INT NOT NULL,
    
    FOREIGN KEY (fk_idComputer) REFERENCES tbl_ope_computers(idComputer),
    FOREIGN KEY (fk_idDisk) REFERENCES tbl_cat_hardDisks(idDisk)
);
ALTER TABLE tbl_rel_computer_disks
ADD CONSTRAINT unique_computer_disk UNIQUE (fk_idComputer, fk_idDisk);

INSERT INTO tbl_cat_brands (brandName) VALUES
('HP'),
('Dell'),
('Lenovo'),
('Asus'),
('Acer');

INSERT INTO tbl_cat_cpus (cpuName, cores) VALUES
('Intel Core i5-10400', 6),
('Intel Core i7-10700', 8),
('AMD Ryzen 9 5950X', 16);

INSERT INTO tbl_cat_graphCards (graphName) VALUES
('NVIDIA GeForce RTX 3060'),
('NVIDIA GeForce RTX 4070'),
('AMD Radeon RX 6600'),
('AMD Radeon RX 7900 XT'),
('NVIDIA GeForce GTX 1660 Super');

show tables;


-- ---------------Stored Procedures -------------------------
-- ---------------Prueba----------------------------

CREATE DEFINER=root@localhost PROCEDURE sp_addPersona(
_PersonaNombre varchar(100)
)
BEGIN
	insert into tbl_ope_persona values(null,_PersonaNombre);
    SELECT * FROM tbl_ope_persona 
	ORDER BY PersonaId DESC 
	LIMIT 1;
END


CREATE DEFINER=root@localhost PROCEDURE sp_getPersonas(
)
BEGIN
    SELECT * FROM tbl_ope_persona 
	ORDER BY PersonaId asc;
END

-- -----------------Store----------------------------

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getBrands`(
)
BEGIN
    SELECT * FROM tbl_cat_brands
	ORDER BY idBrand asc;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getCpus`(
)
BEGIN
    SELECT * FROM tbl_cat_cpus
	ORDER BY idCpu asc;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getGraphCards`(
)
BEGIN
    SELECT * FROM tbl_cat_graphCards
	ORDER BY idGraphCard asc;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addDisk`(
_DiskStorage integer
)
BEGIN
	insert into tbl_cat_hardDisks values(null,_DiskStorage);
    SELECT * FROM tbl_cat_hardDisks 
	ORDER BY idDisk DESC 
	LIMIT 1;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addRam`(
_RamSize varchar(100)
)
BEGIN
	insert into tbl_cat_ramMemories values(null,_RamSize);
    SELECT * FROM tbl_cat_ramMemories 
	ORDER BY idRam DESC 
	LIMIT 1;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getDisks`(
)
BEGIN
    SELECT * FROM tbl_cat_hardDisks
	ORDER BY idDisk asc;
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getRams`(
)
BEGIN
    SELECT * FROM tbl_cat_ramMemories
	ORDER BY idRam asc;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getPCs`(
)
BEGIN
    SELECT 
        c.idComputer,
        c.computerName,
        b.brandName,
        g.graphName,
        r.size AS ramSize,
        cpu.cpuName,
        cpu.cores,
        c.price,
        c.registerDate,
        c.computerStatus,
        d.idDisk,
        d.diskStorage
    FROM tbl_ope_computers c
    INNER JOIN tbl_cat_brands b ON c.fk_idBrand = b.idBrand
    INNER JOIN tbl_cat_graphCards g ON c.fk_idGraphCard = g.idGraphCard
    INNER JOIN tbl_cat_ramMemories r ON c.fk_idRam = r.idRam
    INNER JOIN tbl_cat_cpus cpu ON c.fk_idCpu = cpu.idCpu
    LEFT JOIN tbl_rel_computer_disks cd ON c.idComputer = cd.fk_idComputer
    LEFT JOIN tbl_cat_hardDisks d ON cd.fk_idDisk = d.idDisk
    ORDER BY c.idComputer;
END

CCREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addPC`(
    _Name VARCHAR(70),
    _IdBrand INT,
    _IdGraph INT,
    _IdRam INT,
    _IdCpu INT,
    _Price FLOAT
)
BEGIN
    INSERT INTO tbl_ope_computers 
    (computerName, fk_idBrand, fk_idGraphCard, fk_idRam, fk_idCpu, price, computerStatus)
    VALUES (_Name, _IdBrand, _IdGraph, _IdRam, _IdCpu, _Price, 1);

    SELECT LAST_INSERT_ID() AS idComputer;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_addRelPcDisk`(
    _IdPC INT,
    _IdDisk INT
)
BEGIN
    INSERT INTO tbl_rel_computer_disks (fk_idComputer, fk_idDisk) 
    VALUES (_IdPC, _IdDisk);

    SELECT LAST_INSERT_ID() AS idRelation;
END;