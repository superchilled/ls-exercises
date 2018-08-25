# 180 - SQL Fundamentals: Medium - Many to Many

### Set Up Database

In this set of exercises, we will work with a billing database for a company that provides web hosting services to its customers. The database will contain information about its customers and the services each customer uses. Each customer can have multiple services, and multiple customers can use the same services. Therefore, there will be a many-to-many relationship between the customers and the services. Some customers don't currently have any services, and not every service must be in use by any customers.

Initially, we need to create a `billing` database with a `customers` table and a `services` table. The `customers` table should include the following columns:

  * `id` is a unique numeric customer id that auto-increments and serves as a primary key for this table.
  * `name` is the customer's name. This value is required and may contain names of any length.
  * `payment_token` is a string that is unique to each customer; it is used when contacting the payment processor to identify which customer should be charged for the services used. This value is required and should consist of a string of exactly 8 uppercase alphabetical letters.

The `services` table should include the following columns:

  * `id` is a unique numeric service id that auto-increments and serves as a primary key for this table.
  * `description` is the service description. This value is required and may contain any text.
  * `price` is the yearly service price. It is required, must be greater than or equal to `0.00`, and should be defined as `numeric(10, 2)`.

Once you have created these tables, here is some data that you can enter into them (feel free to enter additional data):

```bash
-- Data for the customers table

id | name          | payment_token
--------------------------------
1  | Pat Johnson   | XHGOAHEQ
2  | Nancy Monreal | JKWQPJKL
3  | Lynn Blake    | KLZXWEEE
4  | Chen Ke-Hua   | KWETYCVX
5  | Scott Lakso   | UUEAPQPS
6  | Jim Pornot    | XKJEYAZA
```

```bash
-- Data for the services table

id | description         | price
---------------------------------
1  | Unix Hosting        | 5.95
2  | DNS                 | 4.95
3  | Whois Registration  | 1.95
4  | High Bandwidth      | 15.00
5  | Business Support    | 250.00
6  | Dedicated Hosting   | 50.00
7  | Bulk Email          | 250.00
8  | One-to-one Training | 999.00
```

Once you have entered the data into your tables, create a join table that associates customers with services and vice versa. Enter some data that shows which services each customer uses as follows:

  * Pat Johnson uses Unix Hosting, DNS, and Whois Registration
  * Nancy Monreal doesn't have any active services
  * Lynn Blake uses Unix Hosting, DNS, Whois Registration, High Bandwith, and Business Support
  * Chen Ke-Hua uses Unix Hosting and High Bandwith
  * Scott Lakso uses Unix Hosting, DNS and Dedicated Hosting
  * Jim Pornot uses Unix Hosting, Dedicated Hosting, and Bulk Email

The customer id in this table should be set such that deleting the corresponding customer record from the `customers` table will automatically delete all rows from the join table that have the corresponding `customer_id`. Do **not** apply this attribute to service id.

#### Approach/Algorithm

Check the PostgreSQL documentation for information on using regular expressions in SQL. You will need this to add a valid CHECK constraint to the `payment_token` column.

Answer:

```bash
createdb billing
psql -d billing
```

```sql
CREATE TABLE customers (
  id serial PRIMARY KEY,
  name TEXT NOT NULL,
  payment_token CHAR(8) UNIQUE NOT NULL CONSTRAINT upper_alpha_eight CHECK (payment_token ~ '^[A-Z]{8}$')
);

CREATE TABLE services (
  id serial PRIMARY KEY,
  description TEXT NOT NULL,
  price numeric(10,2) NOT NULL CONSTRAINT not_negative CHECK (price >= 0.00)
);

INSERT INTO customers VALUES
  (1, 'Pat Johnson', 'XHGOAHEQ'),
  (2, 'Nancy Monreal', 'JKWQPJKL'),
  (3, 'Lynn Blake', 'KLZXWEEE'),
  (4, 'Chen Ke-Hua', 'KWETYCVX'),
  (5, 'Scott Lakso', 'UUEAPQPS'),
  (6, 'Jim Pornot', 'XKJEYAZA');


INSERT INTO services VALUES
  (1, 'Unix Hosting', 5.95),
  (2, 'DNS', 4.95),
  (3, 'Whois Registration', 1.95),
  (4, 'High Bandwidth', 15.00),
  (5, 'Business Support ', 250.00),
  (6, 'Dedicated Hosting', 50.00),
  (7, 'Bulk Email', 250.00),
  (8, 'One-to-one Training', 999.00);

CREATE TABLE customers_services (
  id serial PRIMARY KEY,
  customer_id integer REFERENCES customers(id) ON DELETE CASCADE,
  services_id integer REFERENCES services(id)
);

INSERT INTO customers_services  (customer_id, services_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (3, 1),
  (3, 2),
  (3, 3),
  (3, 4),
  (3, 5),
  (4, 1),
  (4, 4),
  (5, 1),
  (5, 2),
  (5, 6),
  (6, 1),
  (6, 6),
  (6, 7);
```

### Get Customers With Services

Write a query to retrieve the `customer` data for every customer who currently subscribes to at least one service.

Answer:

```sql
SELECT * FROM customers WHERE id IN (
  SELECT DISTINCT customer_id FROM customers_services
);
```

LS solution uses a join rather than a sub-query:

```sql
SELECT DISTINCT customers.* FROM customers
INNER JOIN customers_services 
        ON customer_id = customers.id;
```

### Get Customers With No Services

Write a query to retrieve the `customer` data for every customer who does not currently subscribe to any services.

Answer:

Sub-query version -

```sql
SELECT * FROM customers WHERE id NOT IN (
  SELECT DISTINCT customer_id FROM customers_services
);
```

Join version -

```sql
SELECT c.* FROM customers c
  LEFT OUTER JOIN customers_services cs ON c.id = cs.customer_id
WHERE cs.services_id IS NULL;
```

Further Exploration

Can you write a query that displays all customers with no services and all services that currently don't have any customers? The output should look like this:

```sql
 id |     name      | payment_token | id |     description     | price
----+---------------+---------------+----+---------------------+--------
  2 | Nancy Monreal | JKWQPJKL      |    |                     |
    |               |               |  8 | One-to-one Training | 999.00
(2 rows)
```

Answer:

You need to use a `FULL OUTER JOIN` for this:

```sql
SELECT c.*, s.* FROM customers c
  FULL OUTER JOIN customers_services cs ON c.id = cs.customer_id
  FULL OUTER JOIN services s ON cs.services_id = s.id
WHERE cs.id IS NULL;
```

### Get Services With No Customers

Using RIGHT OUTER JOIN, write a query to display a list of all services that are not currently in use. Your output should look like this:

```sql
description 
-------------
 One-to-one Training
(1 row)
```

Answer:

```sql
SELECT s.description FROM customers_services cs
  RIGHT OUTER JOIN services s
    ON cs.services_id = s.id
  WHERE cs.services_id IS NULL;
```

### Services for each Customer

Write a query to display a list of all customer names together with a comma-separated list of the services they use. Your output should look like this:

```sql
     name      |                                services                                 
---------------+-------------------------------------------------------------------------
 Pat Johnson   | Unix Hosting, DNS, Whois Registration
 Nancy Monreal | 
 Lynn Blake    | DNS, Whois Registration, High Bandwidth, Business Support, Unix Hosting
 Chen Ke-Hua   | High Bandwidth, Unix Hosting
 Scott Lakso   | DNS, Dedicated Hosting, Unix Hosting
 Jim Pornot    | Unix Hosting, Dedicated Hosting, Bulk Email
(6 rows)
```

Answer:

```sql
SELECT c.name, string_agg(s.description, ', ') AS services
  FROM customers c LEFT OUTER JOIN customers_services cs
    ON c.id = cs.customer_id LEFT OUTER JOIN services s
    ON cs.services_id = s.id
  GROUP BY c.id;
```

#### Further Exploration

Can you modify the above command so the output looks like this?

```sql
     name      |    description     
---------------+--------------------
 Chen Ke-Hua   | High Bandwidth
               | Unix Hosting
 Jim Pornot    | Dedicated Hosting
               | Unix Hosting
               | Bulk Email
 Lynn Blake    | Whois Registration
               | High Bandwidth
               | Business Support
               | DNS
               | Unix Hosting
 Nancy Monreal | 
 Pat Johnson   | Whois Registration
               | DNS
               | Unix Hosting
 Scott Lakso   | DNS
               | Dedicated Hosting
               | Unix Hosting
(17 rows)
```

This won't be easy! Hint: you will need to use the [window lag function](https://www.postgresql.org/docs/9.5/static/functions-window.html) together with a [CASE condition](https://www.postgresql.org/docs/9.5/static/functions-conditional.html) in your `SELECT`. To get you started, try this command:

```sql
SELECT customers.name,
       lag(customers.name) 
         OVER (ORDER BY customers.name) 
         AS previous,
       services.description
FROM customers
LEFT OUTER JOIN customers_services 
             ON customer_id = customers.id
LEFT OUTER JOIN services 
             ON services.id = service_id;
```

Examine the relationship between the `previous` column and the rest of the table to get a handle on what `lag` does.

Answer:

```sql
SELECT CASE 
        WHEN c.name = lag(c.name) OVER (ORDER BY c.name) THEN ''
        ELSE c.name
       END AS name, s.description
  FROM customers c LEFT OUTER JOIN customers_services cs
    ON c.id = cs.customer_id LEFT OUTER JOIN services s
    ON cs.services_id = s.id;
```

### Services With At Least 3 Customers

Write a query that displays the description for every service that is subscribed to by at least 3 customers. Include the customer account for each description in the report. The report should look like this:

```sql
 description  | count
--------------+-------
 DNS          |     3
 Unix Hosting |     5
(2 rows)
```

Answer:

```sql
SELECT s.description, count(DISTINCT cs.customer_id)
  FROM services s
    INNER JOIN customers_services cs
      ON s.id = cs.services_id
  GROUP BY s.description
  HAVING count(DISTINCT cs.customer_id) >= 3;
```

### Total Gross Income

Assuming that everybody in our database has a bill coming due, and that all of them will pay on time, write a query to compute the total gross income we expect to receive.

Answer:

```sql
  gross
 --------
 678.50
(1 row)
```

Answer:

```sql
SELECT sum(s.price) AS gross
  FROM services s
    INNER JOIN customers_services cs
      ON s.id = cs.services_id;
```

### Add New Customer

A new customer, 'John Doe', has signed up with our company. His payment token is `EYODHLCN'. Initially, he has signed up for UNIX hosting, DNS, and Whois Registration. Create any SQL statement(s) needed to add this record to the database.

Answer:

```sql
INSERT INTO customers (name, payment_token) VALUES
  ('John Doe', 'EYODHLCN');

INSERT INTO customers_services (customer_id, services_id) VALUES
  (7, 1),
  (7, 2),
  (7, 3);
```

### Hypothetically

The company president is looking to increase revenue. As a prelude to his decision making, he asks for two numbers: the amount of expected income from "big ticket" services (those services that cost more than $100) and the maximum income the company could achieve if it managed to convince all of its customers to select all of the company's big ticket items.

For simplicity, your solution should involve two separate SQL queries: one that reports the current expected income level, and one that reports the hypothetical maximum. The outputs should look like this:

```sql
 sum
--------
 500.00
(1 row)
```

```sql
   sum
---------
 10493.00
(1 row)
```

Answer:

```sql
SELECT sum(s.price)
  FROM services s
    INNER JOIN customers_services cs
      ON s.id = cs.services_id
  WHERE s.price >= 100.00;

SELECT sum(s.price)
  FROM customers c
    CROSS JOIN services s
  WHERE  s.price >= 100.00;
```

#### Further Exploration

This exercise is really contrived: it just shows how hard it is to come up with a possible use case for CROSS JOIN. CROSS JOIN is generally best suited to generating test data rather than production queries.

Can you think of any other situations where a CROSS JOIN might be useful?

Answer:

A CROSS JOIN might be useful for when you want to create a full set of complete data for every possible eventuality based on parameters in two separate tables. [This Stack Overflow thread](http://stackoverflow.com/questions/219716/what-are-the-uses-for-cross-join) suggests a few example use-cases such as:

  * A report of all possible size and colour variations for a clothing range
  * A table that contains a row for every minute in the day
  * A set of standard reports that you want to apply to every month in the year


### Deleting Rows

Write the necessary SQL statements to delete the "Bulk Email" service and customer "Chen Ke-Hua" from the database.

Answer:

```sql
DELETE FROM customers WHERE name = 'Chen Ke-Hua';

DELETE FROM customers_services WHERE services_id = 7;

DELETE FROM services WHERE description = 'Bulk Email'
```
