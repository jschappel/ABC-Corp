-- countries
insert into
country(country)
	values("United States"),
			("Canada"),
            ("Mexico"),
            ("England"),
            ("Ireland"),
            ("Portugal");

select * from country;

-- cities
insert into
city(city, fk_country_id)
	values(
    "Toms River",
    (select country_id from country
		where country = "United States")
        ),
        (
    "South Orange",
    (select country_id from country
		where country = "United States")
        ),
        (
    "Westfield",
    (select country_id from country
		where country = "United States")
        ),
        (
    "Manhattan",
    (select country_id from country
		where country = "United States")
        ),
        (
    "Toronto",
    (select country_id from country
		where country = "Canada")
        ),
        (
    "Lisbon",
    (select country_id from country
		where country = "Portugal")
        ),
        (
    "Dublin",
    (select country_id from country
		where country = "Ireland")
        );
        
update City
	set city = "Braga"
    where city_id = 6;
    
update City
	set city = "Ashtown"
    where city_id = 7;

select * from city;

-- addresses
insert into 
address(address1, district, postal_code, fk_city_id)
values("1236 steeplechase Ct", "New Jersey", "08755", 1),
		("Seton Hall St", "New Jersey", "08976", 2),
        ("12 Hello World Ave", "New Jersey", "09876", 3),
        ("99 Best Database Ever St", "New York", "08990", 4),
        ("Go Raptors Ave", "Ontario", "68768", 5),
        ("Homeland of Ronaldo St", "Lisbon", "45334", 6),
        ("St Pattys Day St", "Dublin", "45334", 7),
        ("57 South Orange Ave", "New Jersey", "08976", 2),
        ("123 ABC St", "New Jersey", "08976", 2),
        ("702 Shadowlawn Drive", "New Jersey", "07090", 3);
        
        
select * from address;

use ABC;
select * from address;

INSERT INTO vendor(name, phone, email, fk_address_id)
VALUES ("Vendor1", "908-888-7777", "vendor1@gmail.com", 1),
		("Vendor2", "908-888-8888", "vendor2@gmail.com", 2),
        ("Vendor3", "908-888-9999", "vendor3@gmail.com", 3),
        ("Vendor4", "908-888-6666", "vendor4@gmail.com", 4);
        
INSERT INTO category(category)
VALUES ("Phone"),
		("Desktop"),
        ("Laptop"),
        ("Projector");
SELECT * FROM category;


INSERT INTO model(model_name, model_number, fk_category_id)
VALUES ("MacBook Pro 2012","MD101xx/A MD102xx/A",3),
		("MacBook Air 2018","A1932 (EMC 3184)", 3),
        ("IPhone 6s","A1633", 1),
        ("Epson VS250","VS250",4),
        ("HP Spectre x360","SD2017846 MD102xx/A",3),
        ("Pixel 3a","F67463", 1),
        ("Galaxy s9","S48627", 1),
        ("Dell Inspiron","Z57022",2);

        
INSERT INTO Office(office, phone_number, equipment_contact, fk_address_id, active)
VALUES ("Office 1", "908-555-6677", "908-333-4422", 2, 1),
		("Office 2", "908-676-4499", "908-888-9900", 3, 1),
        ("Office 3", "908-324-7722", "908-444-2233", 4, 0);
        
INSERT INTO room(room, floor, fk_office_id, active)
VALUES("1A", 1, 1, 1), ("1B", 1, 1, 1),("1C", 1, 1, 1),
		("2A", 2, 1, 1), ("2B", 2, 1, 1),("2C", 2, 1, 1),
        
        ("1A", 1, 2, 1), ("1B", 1, 2, 1),("1C", 1, 2, 1),
        ("2A", 2, 2, 1), ("2B", 2, 2, 1),("2C", 2, 2, 0);
        
INSERT INTO lease(start_date, end_date, fk_vendor_id) 
VALUES ("2013-08-05 18:19:03", "2016-08-05 18:19:03", 1),
		("2017-08-05 18:19:03", "2020-08-05 18:19:03",1),
        ("2016-08-05 18:19:45", "2019-08-05 18:19:23",2);
INSERT INTO role(role, c, r, u, d)
VALUES ("root", 1, 1, 1, 1),
		("user", 0, 1, 0, 0);
        
        
INSERT INTO employee(first_name, last_name, phone_number, work_phone_number, email, active, fk_address_id, fk_office_id, fk_account_id)
VALUES ("Joshua", "Schappel", "9083708410", "9087891882", "jmschappel12@gmail.com", 1, 10, 1, 1),
		("Dana", "Riback", "8628994666", "9086757746", "d.riback@gmail.com", 1, 9, 1, 2),
        ("Sam", "Schappel", "9086675463", "9807785564", "sammySchappel@gmail.com", 1, 10, 2, 3);
       
        
INSERT INTO equipment(serial_number, active, warranty_end_date, fk_lease_id, fk_vendor_id, fk_model_id, fk_room_id, fk_employee_id)
VALUES ("EAnxMyEu", 1, "2019-08-05 18:19:23", 2, 1, 1, null, null),
		("FEav4eVQ", 1, "2019-08-05 18:19:23", 2, 1, 1, null, null),
		("UjPLHCsS", 1, "2019-08-05 18:19:23", 2, 1, 1, 1, 1),
		("7cKWUyNC", 1, "2019-08-05 18:19:23", 2, 1, 1, 1, 1),
        ("xZ8mSVb5", 1, "2019-08-05 18:19:23", 3, 2, 2, 2, 1),
        
        ("s45Xy4572", 1, "2019-10-05 18:19:23", 3, 2, 5, 2, 1),
        ("au67T32W", 1, "2019-10-05 18:19:23", 3, 2, 6, 2, 1),
        ("yt6732D3", 1, "2019-10-05 18:19:23", 3, 2, 7, 2, 1),
        ("pt75E3E1", 1, "2019-10-05 18:19:23", 3, 2, 8, 2, 1),
        
        ("eMnogAz9", 1, "2019-08-05 18:19:23", 3, 2, 3, 3, 3),
        ("3QoqNm2B", 1, "2019-08-05 18:19:23", 3, 2, 4, 2, 2),
        ("wH56uxHE", 1, "2019-08-05 18:19:23", 3, 2, 3, 3, 3);