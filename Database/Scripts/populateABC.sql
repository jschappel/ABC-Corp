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
        ("123 ABC St", "New Jersey", "08976", 2);
        
select * from address;

use ABC;
select * from address;
