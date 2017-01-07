# 180 - SQL Fundamentals: DML

### Set Up Database

For this set of exercises we'll want to create a new database and some tables to work with. The theme for the exercise is that of a workshop. Create a database to store information and tables related to this workshop.

One table should be called `devices`. This table should have columns that meet the following specifications:

  * Includes a primary key called `id` that is auto-incrementing.
  * A column called `name`, that can contain a String. It cannot be `NULL`.
  * A column called `created_at` that lists the date this device was created. It should be of type `timestamp` and it should also have a default value related to when a device is created.

In the workshop, we have several devices, and each device should have many different parts. These parts are unique to each device, so one device can have various parts, but those parts won't be used in any other device. Make a table called `parts` that reflects the information listed above. Table `parts` should have the following columns that meet the following specifications:

  * An `id` which auto-increments and acts as the primary key
  * A `part_number`. This column should be unique and not null.
  * A foreign key column called `device_id`. This will be used to associate various parts with a device.

Answer:

```sql
CREATE DATABASE workshop;
\c workshop

CREATE TABLE devices (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  created_at timestamp DEFAULT now()
);

CREATE TABLE parts (
  id serial PRIMARY KEY,
  part_number integer UNIQUE NOT NULL,
  device_id integer REFERENCES devices(id)
);
```

### Insert Data for Parts and Devices

Now that we have the infrastructure for our workshop set up, let's start adding in some data. Add in two different devices. One should be named, "Accelerometer". The other should be named, "Gyroscope".

The first device should have 3 parts (this is grossly simplified). The second device should have 5 parts. The part numbers may be any number between 1 and 10000. There should also be 3 parts that don't belong to any device yet.

Answer:

```sql
INSERT INTO devices (name) VALUES
  ('Accelerometer'),
  ('Gyroscope');

INSERT INTO parts (part_number, device_id) VALUES
  (9342, 1),
  (850, 1),
  (2342, 1),
  (5340, 2),
  (3372, 2),
  (7707, 2),
  (342, 2),
  (2343, 2),
  (3421, null),
  (23, null),
  (231, null);
```

### INNER JOIN

Write an SQL query to display all devices along with all the parts that make them up. We only want to display the name of the `devices`. It's `parts` should only display the part_number.

Expected output:

```sql
     name      | part_number
---------------+-------------
 Accelerometer |          12
 Accelerometer |          14
 Accelerometer |          16
 Gyroscope     |          31
 Gyroscope     |          33
 Gyroscope     |          35
 Gyroscope     |          37
 Gyroscope     |          39
(8 rows)
```

NOTE: The part numbers and sequence may vary from those shown above.

Answer:

```sql
SELECT d.name, p.part_number FROM devices d INNER JOIN parts p ON d.id = p.device_id;
```

### SELECT part_number

We want to grab all parts that have a `part_number` that starts with 3. Write a `SELECT` query to get this information. This table may show all attributes of the `parts` table.

Answer:

```sql
SELECT * FROM parts WHERE cast(part_number AS TEXT) LIKE '3%';
```

### Aggregate Functions

Write an SQL query that returns a result table with the name of each device in our database together with the number of parts for that device.

Answer:

```sql
SELECT d.name, count(p.id) AS no_of_parts FROM
  devices d INNER JOIN parts p ON d.id = p.device_id
  GROUP BY d.name;
```

### ORDER BY

In the previous exercise, we had to use a `GROUP BY` clause to obtain the expected output. In that exercise, we used an SQL query like:

```sql
SELECT devices.name AS name, COUNT(parts.device_id) 
FROM devices
JOIN parts ON devices.id = parts.device_id 
GROUP BY devices.name;
```

Now, we want to work with the same query, but we want to guarantee that the devices and the count of their parts are listed in ascending alphabetical order. Alter the SQL query above so that we get a result table that looks like the following.

```
name          | count
--------------+-------
Accelerometer |     3
Gyroscope     |     5
(2 rows)
```

Answer:

```sql
SELECT d.name, count(p.id) AS no_of_parts FROM
  devices d INNER JOIN parts p ON d.id = p.device_id
  GROUP BY d.name
  ORDER BY d.name ASC;
```

### IS NULL and IS NOT NULL

Write two SQL queries:

  * One that generates a listing of parts that currently belong to a device.
  * One that generates a listing of parts that don't belong to a device.

Do not include the id column in your queries.

**Expected Output:**

```sql
part_number | device_id 
------------+-----------
         12 |         1
         14 |         1
         16 |         1
         31 |         2
         33 |         2
         35 |         2
         37 |         2
         39 |         2
(8 rows)
```

```sql
part_number | device_id 
------------+-----------
         50 |          
         54 |          
         58 |        
(3 rows)
```

Answer:

```sql
SELECT part_number, device_id FROM parts WHERE device_id IS NOT NULL;
SELECT part_number, device_id FROM parts WHERE device_id IS NULL;
```

### Oldest Device

Insert one more device into the `devices` table. You may use this SQL statement or create your own.

```sql
INSERT INTO devices (name) VALUES ('Magnetometer');
INSERT INTO parts (part_number, device_id) VALUES (42, 3);
```

Assuming nothing about the existing order of the records in the database, write an SQL statement that will return the name of the oldest device from our `devices` table.


Answer:

```sql
SELECT * FROM devices WHERE created_at IN (SELECT MIN(created_at) FROM devices);
```

LS solution uses `ORDER BY in combination with `LIMIT`:

```sql
SELECT name AS oldest_device
 FROM devices
ORDER BY created_at ASC
LIMIT 1;
```

In fact I believe a sub-query would be preferable for this particular use case. Imagine you have two devices with the same created_at timestamp, if you use a sub-query, both of those devices get returned whereas if you use ORDER BY in combination with LIMIT 1 the fact that those devices both have identical timestamps means that they will actually be ordered by something else (e.g. id) which may not provide you with the full picture.


### UPDATE device_id

We've realized that the last two parts were using for device number 2, "Gyroscope", actually belong to an "Accelerometer". Write an SQL statement that will associate the last two parts from our `parts` table with an "Accelerometer" instead of a "Gyroscope".

Answer:

```sql
UPDATE parts SET device_id = 1 WHERE part_number = 342 OR part_number = 2343;
```

### Delete Accelerometer

Our workshop has decided to not make an Accelerometer after all. Delete any data related to "Accelerometer", this includes the parts associated with an Accelerometer.

```sql
DELETE FROM parts WHERE device_id = 1;
DELETE FROM devices WHERE id = 1;
```

#### Further Exploration

This process may have been a bit simpler if we had initially defined our devices tables a bit differently. We could delete both a device and its associated parts with one SQL statement if that were the case. What change would have to have to be made to table devices to make this possible? Also, what SQL statement would you have to write that can delete both a device and its parts all in one go?

Answer:

When defining the `parts` table, in particular when defining the `device_id` foreign key we could have set `ON DELETE CASCADE`, then we could have just deleted the device entry from the `devices` table and all of the dependent part entries from the `parts` table would also have been deleted.
