-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ABC
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ABC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ABC` DEFAULT CHARACTER SET utf8 ;
USE `ABC` ;

-- -----------------------------------------------------
-- Table `ABC`.`Country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Country` (
  `country_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(45) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`country_id`),
  UNIQUE INDEX `country_id_UNIQUE` (`country_id` ASC) VISIBLE,
  UNIQUE INDEX `country_UNIQUE` (`country` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`City`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`City` (
  `city_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NOT NULL COMMENT 'the citys name',
  `fk_country_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'is a pointer to the country',
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`city_id`),
  UNIQUE INDEX `city_id_UNIQUE` (`city_id` ASC) VISIBLE,
  INDEX `country_id_idx` (`fk_country_id` ASC) VISIBLE,
  CONSTRAINT `fk_city_country`
    FOREIGN KEY (`fk_country_id`)
    REFERENCES `ABC`.`Country` (`country_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Address` (
  `address_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `address1` VARCHAR(45) NOT NULL COMMENT 'is the writen out address',
  `address2` VARCHAR(45) NULL COMMENT 'if there is a second address for the user ',
  `district` VARCHAR(45) NOT NULL COMMENT 'is the district that the user was in',
  `postal_code` VARCHAR(20) NULL COMMENT 'is the zip code ',
  `fk_city_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'is the ppointer to the city of the address',
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  UNIQUE INDEX `address_id_UNIQUE` (`address_id` ASC) VISIBLE,
  INDEX `city_id_idx` (`fk_city_id` ASC) VISIBLE,
  CONSTRAINT `fk_address_city`
    FOREIGN KEY (`fk_city_id`)
    REFERENCES `ABC`.`City` (`city_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Office`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Office` (
  `office_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `office` VARCHAR(45) NOT NULL COMMENT 'is the name of the office',
  `phone_number` VARCHAR(45) NOT NULL COMMENT 'is the phone number to call this office',
  `equipment_contact` VARCHAR(45) NOT NULL,
  `fk_address_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'is a pointer to the address of the office',
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` TINYINT(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`office_id`),
  UNIQUE INDEX `office_id_UNIQUE` (`office_id` ASC) VISIBLE,
  UNIQUE INDEX `phone_number_UNIQUE` (`phone_number` ASC) VISIBLE,
  INDEX `address_id_idx` (`fk_address_id` ASC) VISIBLE,
  UNIQUE INDEX `equipment_contact_UNIQUE` (`equipment_contact` ASC) VISIBLE,
  CONSTRAINT `fk_office_address`
    FOREIGN KEY (`fk_address_id`)
    REFERENCES `ABC`.`Address` (`address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Room` (
  `room_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `room` VARCHAR(45) NOT NULL COMMENT 'is the name of the room ',
  `floor` TINYINT(3) UNSIGNED NOT NULL,
  `fk_office_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'is the office that the room is on',
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` TINYINT(1) NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE INDEX `Room_id_UNIQUE` (`room_id` ASC) VISIBLE,
  INDEX `office_id_idx` (`fk_office_id` ASC) VISIBLE,
  CONSTRAINT `fk_room_office`
    FOREIGN KEY (`fk_office_id`)
    REFERENCES `ABC`.`Office` (`office_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Role` (
  `role_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NOT NULL,
  `c` TINYINT(1) UNSIGNED NOT NULL,
  `r` TINYINT(1) UNSIGNED NOT NULL,
  `u` TINYINT(1) UNSIGNED NOT NULL,
  `d` TINYINT(1) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_id_UNIQUE` (`role_id` ASC) VISIBLE,
  UNIQUE INDEX `role_UNIQUE` (`role` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Account` (
  `account_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL COMMENT 'the username for employee to log into database',
  `password` VARCHAR(45) NOT NULL COMMENT 'password for employee to login',
  `fk_role_id` SMALLINT(5) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC) VISIBLE,
  INDEX `fk_account_role_idx` (`fk_role_id` ASC) VISIBLE,
  UNIQUE INDEX `fk_role_id_UNIQUE` (`fk_role_id` ASC) VISIBLE,
  CONSTRAINT `fk_account_role`
    FOREIGN KEY (`fk_role_id`)
    REFERENCES `ABC`.`Role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Employee` (
  `employee_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL COMMENT 'the first name of employee',
  `last_name` VARCHAR(45) NOT NULL COMMENT 'is the last name of the employee',
  `phone_number` VARCHAR(45) NOT NULL,
  `work_phone_number` VARCHAR(45) NOT NULL COMMENT 'is the work phone number of the employee ',
  `email` VARCHAR(45) NOT NULL COMMENT 'is the email of emplyee',
  `active` TINYINT(1) UNSIGNED NOT NULL COMMENT 'is either 1 or 0\nif it is 1 then the employee is still woring in the company\nif it is 0 then they are no longer working with company',
  `fk_address_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'is the address of the home of the employee',
  `fk_office_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'is the location of where the employee works',
  `fk_account_id` SMALLINT(5) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  INDEX `address_id_idx` (`fk_address_id` ASC) VISIBLE,
  UNIQUE INDEX `phone_number_UNIQUE` (`phone_number` ASC) VISIBLE,
  UNIQUE INDEX `work_phone_number_UNIQUE` (`work_phone_number` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `employee_id_UNIQUE` (`employee_id` ASC) VISIBLE,
  UNIQUE INDEX `fk_account_id_UNIQUE` (`fk_account_id` ASC) VISIBLE,
  INDEX `fk_employee_office_idx` (`fk_office_id` ASC) VISIBLE,
  CONSTRAINT `fk_employee_address`
    FOREIGN KEY (`fk_address_id`)
    REFERENCES `ABC`.`Address` (`address_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_office`
    FOREIGN KEY (`fk_office_id`)
    REFERENCES `ABC`.`Office` (`office_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_employee_account`
    FOREIGN KEY (`fk_account_id`)
    REFERENCES `ABC`.`Account` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Vendor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Vendor` (
  `vendor_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL COMMENT 'is the name of the vendor ',
  `phone` VARCHAR(45) NOT NULL COMMENT 'is the phone number to call the vendor',
  `email` VARCHAR(50) NOT NULL COMMENT 'is the email to email the vendor',
  `fk_address_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'is the pointer to address of the vedor',
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`vendor_id`),
  UNIQUE INDEX `vendor_id_UNIQUE` (`vendor_id` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `address_id_idx` (`fk_address_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `fk_vendor_address`
    FOREIGN KEY (`fk_address_id`)
    REFERENCES `ABC`.`Address` (`address_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Category` (
  `category_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `category_id_UNIQUE` (`category_id` ASC) VISIBLE,
  UNIQUE INDEX `category_UNIQUE` (`category` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Model`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Model` (
  `model_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `model_name` VARCHAR(45) NOT NULL,
  `model_number` VARCHAR(45) NOT NULL,
  `fk_category_id` SMALLINT(5) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`model_id`),
  UNIQUE INDEX `type_id_UNIQUE` (`model_id` ASC) VISIBLE,
  INDEX `fk_model_category_idx` (`fk_category_id` ASC) VISIBLE,
  UNIQUE INDEX `model_number_UNIQUE` (`model_number` ASC) VISIBLE,
  CONSTRAINT `fk_model_category`
    FOREIGN KEY (`fk_category_id`)
    REFERENCES `ABC`.`Category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Lease`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Lease` (
  `lease_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_vendor_id` SMALLINT(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`lease_id`),
  UNIQUE INDEX `lease_id_UNIQUE` (`lease_id` ASC) VISIBLE,
  CONSTRAINT `fk_vendor_id`
    FOREIGN KEY (`fk_vendor_id`)
    REFERENCES `ABC`.`Vendor` (`vendor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Equipment` (
  `equipment_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `serial_number` VARCHAR(45) NOT NULL,
  `active` TINYINT(1) UNSIGNED NOT NULL COMMENT '1 for active 0 for not active.',
  `warranty_end_date` TIMESTAMP NULL COMMENT 'if this is null date is past or warranty is past',
  `fk_lease_id` SMALLINT(5) UNSIGNED NULL,
  `fk_vendor_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'is the id of company that Equipment was bought from',
  `fk_model_id` SMALLINT(5) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`equipment_id`),
  UNIQUE INDEX `equipment_id_UNIQUE` (`equipment_id` ASC) VISIBLE,
  INDEX `vendor_id_idx` (`fk_vendor_id` ASC) VISIBLE,
  INDEX `type_id_idx` (`fk_model_id` ASC) VISIBLE,
  INDEX `lease_id_idx` (`fk_lease_id` ASC) VISIBLE,
  UNIQUE INDEX `serial_number_UNIQUE` (`serial_number` ASC) VISIBLE,
  CONSTRAINT `fk_equipment_vendor`
    FOREIGN KEY (`fk_vendor_id`)
    REFERENCES `ABC`.`Vendor` (`vendor_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_equipment_model`
    FOREIGN KEY (`fk_model_id`)
    REFERENCES `ABC`.`Model` (`model_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_equipment_lease`
    FOREIGN KEY (`fk_lease_id`)
    REFERENCES `ABC`.`Lease` (`lease_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Inventory` (
  `inventory_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fk_equipment_id` SMALLINT(5) UNSIGNED NOT NULL COMMENT 'points to the equipment though the ID',
  `fk_employee_id` SMALLINT(5) UNSIGNED NULL COMMENT 'points to the employee that is useing the equipment\nif null no one is useing it',
  `fk_room_id` SMALLINT(5) UNSIGNED NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  UNIQUE INDEX `inventory_id_UNIQUE` (`inventory_id` ASC) VISIBLE,
  UNIQUE INDEX `equipment_id_UNIQUE` (`fk_equipment_id` ASC) VISIBLE,
  INDEX `employee_id_idx` (`fk_employee_id` ASC) VISIBLE,
  INDEX `room_id_idx` (`fk_room_id` ASC) VISIBLE,
  CONSTRAINT `fk_inventory_equipment`
    FOREIGN KEY (`fk_equipment_id`)
    REFERENCES `ABC`.`Equipment` (`equipment_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_employee`
    FOREIGN KEY (`fk_employee_id`)
    REFERENCES `ABC`.`Employee` (`employee_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_room`
    FOREIGN KEY (`fk_room_id`)
    REFERENCES `ABC`.`Room` (`room_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Reservation` (
  `reservation_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `start_time` TIMESTAMP NOT NULL,
  `end_time` TIMESTAMP NOT NULL,
  `fk_employee_id` SMALLINT(5) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reservation_id`),
  UNIQUE INDEX `reservation_id_UNIQUE` (`reservation_id` ASC) VISIBLE,
  INDEX `employee_id_idx` (`fk_employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservation_employee`
    FOREIGN KEY (`fk_employee_id`)
    REFERENCES `ABC`.`Employee` (`employee_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ABC`.`Reservation_equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ABC`.`Reservation_equipment` (
  `fk_equipment_id` SMALLINT(5) UNSIGNED NOT NULL,
  `fk_reservation_id` SMALLINT(5) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `fk_reservation_id_idx` (`fk_reservation_id` ASC, `fk_equipment_id` ASC) VISIBLE,
  INDEX `fk_reservationEquipment_Equipment_idx` (`fk_equipment_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservationEquipment_reservation`
    FOREIGN KEY (`fk_reservation_id`)
    REFERENCES `ABC`.`Reservation` (`reservation_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reservationEquipment_Equipment`
    FOREIGN KEY (`fk_equipment_id`)
    REFERENCES `ABC`.`Equipment` (`equipment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `ABC`;

DELIMITER $$
USE `ABC`$$
CREATE DEFINER = CURRENT_USER TRIGGER `ABC`.`Inventory_BEFORE_INSERT` BEFORE INSERT ON `Inventory` FOR EACH ROW
BEGIN
	IF(
		(NEW.fk_employee_id is NULL and NEW.fk_room_id is NULL) 
		or 
		(NEW.fk_employee_id is not NULL and NEW.fk_room_id is not NULL)
        )
       then SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid data';
       END IF;
END$$

USE `ABC`$$
CREATE DEFINER = CURRENT_USER TRIGGER `ABC`.`Inventory_BEFORE_UPDATE` BEFORE UPDATE ON `Inventory` FOR EACH ROW
BEGIN
	IF(
		(NEW.fk_employee_id is NULL and NEW.fk_room_id is NULL) 
		or 
		(NEW.fk_employee_id is not NULL and NEW.fk_room_id is not NULL)
        )
       then SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'invalid data';
       END IF;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
