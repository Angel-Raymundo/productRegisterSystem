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
registerDate DATETIME,
computerStatus tinyint(1),
foreign key (fk_idBrand) references tbl_cat_brands(idBrand),
foreign key (fk_idGraphCard) references tbl_cat_graphCards(idGraphCard),
foreign key (fk_idDisk) references tbl_cat_hardDisks(idDisk),
foreign key (fk_idRam) references tbl_cat_ramMemories(idRam),
foreign key (fk_idCpu) references tbl_cat_cpus(idCpu)
);

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