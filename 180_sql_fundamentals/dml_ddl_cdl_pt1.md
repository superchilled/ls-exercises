# 180 - SQL Fundamentals: DML/DDL/DCL

### Part 1

Question:

SQL consists of 3 different sublanguages. For example, one of these sublanguages is called the Data Control Language (DCL) component of SQL. It is used to control access to a database; it is responsible for defining the rights and roles granted to individual users. Common SQL DCL statements include:


```sql
GRANT
REVOKE
```

Name and define the remaining 2 sublanguages, and give at least 2 examples of each.

Answer:

DDL - Data Definition Language

It is responsible for defining the structure of a database and its tables - i.e. the *schema*.

Common SQL DDL statements include:

```sql
CREATE
ALTER
DROP
```

DML - Data Manipulation Language

It is responsible for querying and manipulating the contents of a database - i.e. the actual data

Common SQL DML statements include:

```sql
SELECT
INSERT INTO
UPDATE
DELETE
```

### Part 2

Question:

Does the following statement use the Data Definition Language (DDL) or the Data Manipulation Language (DML) component of SQL?

```sql
SELECT column_name FROM my_table;
```

Answer:

This uses the Data Manipulation Language (DML) as it is interacting with (in this case reading) the *actual data* in the database.


### Part 3

Question:

Does the following statement use the DDL or DML component of SQL?

```sql
CREATE TABLE things (
  id serial PRIMARY KEY,
  item text NOT NULL UNIQUE,
  material text NOT NULL
);
```

Answer:

This uses the Data Definition Language (DDL) component of SQL - it is creating a table within the database and therefore acting to define the *structure* of the database.


### Part 4

Question:

Does the following statement use the DDL or DML component of SQL?

```sql
ALTER TABLE things
DROP CONSTRAINT things_item_key;
```

Answer:

Again this is part of the Data Definition Language (DDL) component of SQL. The statement is acting to change the way the `things` table is *defined* by removing (or `DROP`ing) the `things_item_key` constraint.


### Part 5

Question:

Does the following statement use the DDL or DML component of SQL?

```sql
INSERT INTO things VALUES (3, 'Scissors', 'Metal');
```

Answer:

This uses the Data Manipulation Language (DML) component of SQL. The statment is dealing with *actual data* - in this case adding (or `INSERT`ing) some values into the `things` table.


### Part 6

Question:

Does the following statement use the DDL or DML component of SQL?

```sql
UPDATE things
SET material = 'plastic'
WHERE item = 'Cup';
```

Answer:

This statement uses the Data Manipulation Language (DML) component of SQL. Again it is dealing with actual data - modifying (or `UPDATE`ing) a specific set of values within the `things` table.


### Part 7

Question:

Does the following statement use the DDL or DML component of SQL?

```sql
\d things
```

Answer:

This is part of the Data Definition Language (DDL) component of SQL. It returns the definition for the `things` table rather than any actual data.

Strictly speaking though it is not an SQL command - it is a `psql` console command - and so probably wouldn't be considered part of the `DDL` sub-language.


### Part 8

Question:

Does the following statement use the DDL or DML component of SQL?

```sql
DELETE FROM things WHERE item = 'Cup';
```

Answer:

This statement uses the Data Manipulation Language (DML) component of SQL. It is dealing with *actual data* in this case deleting some data from the `things` table.


### Part 9

Question:

Does the following statement use the DDL or DML component of SQL?

```sql
DROP DATABASE xyzzy;
```

Answer:

This is part of the Data Definition Language (DDL) component of SQL. It is dealing with the *structure* of the database - in this case destroying (or `DROP`ing) the entire `xyzzy` database.

However, it could also be considered to be acting on *actual data* since in destroying the database it is also deleting all of the data in it - from that point of view it could also be considered part of the Data Manipulation Language component of SQL.


### Part 10

Question:

Does the following statement use the DDL or DML component of SQL?

```sql
CREATE SEQUENCE part_number_sequence;
```

Answer:

This could be considered to be part of both `Data Definition Language (DDL) and Data Manipulation Language (DML). The sequence that is created contains *actual data* - in this case it will be sequential integers - but the sequence is also used as part of the structure within the database - e.g. it can be used to create keys for an id column.
