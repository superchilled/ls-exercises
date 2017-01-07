# 180 - SQL Fundamentals: Easy 1

1. Create a Database

Q: Let's start by creating a database. Create a new database called `animals`.

A: There are a couple of ways to do this.

Using a wrapper function issued from the command line:

```bash
createdb animals
```

Using an SQL statement from within the psql console:

```sql
user=# CREATE DATABASE animals;
```

2. Create a Table

Q: Now that we have an animals database, let's lay the groundwork needed so we can add some data to it.

Make a table called birds. This table should have the following fields:

  * name (string, large enough to hold a 25 character value)
  * age (integer)
  * species (string, large enough to hold a 15 character value)

Make sure to include a primary key as well; that field should be a serial type.

A:

```sql
animals=# CREATE TABLE birds (
  id serial,
  name VARCHAR(25),
  age INT,
  species VARCHAR(15),
  PRIMARY KEY (id)
);
```

3. Insert Data

Q: For this exercise, we'll add some data to our birds table. Add five records to this database so that our data looks like:

```bash
 id |   name   | age | species 
----+----------+-----+---------
  1 | Charlie  |   3 | Finch
  2 | Allie    |   5 | Owl
  3 | Jennifer |   3 | Magpie
  4 | Jamie    |   4 | Owl
  5 | Roy      |   8 | Crow
(5 rows)
```

A:

```sql
animals=# INSERT INTO birds (name, age, species) VALUES
          ('Charlie', 3, 'Finch'),
          ('Allie', 5, 'Owl'),
          ('Jennifer', 3, 'Magpie'),
          ('Jamie', 4, 'Owl'),
          ('Roy', 8, 'Crow');
```

Further Exploration: There is a form of INSERT INTO that doesn't require the column names. How does that form of `INSERT INTO` work, and when would you use it?

You can omit the list of column names if you are inserting data into all the columns in their declared order, or the first **_n_** column names if only **_n_** columns are supplied by the `VALUES` clause.

4. Select Data

Q: Write an SQL statement to query all data that is currently in our birds table.

A:

```sql
animals=# SELECT * FROM birds;
```

5. `WHERE` Clause

Q: In this exercise, let's practice filtering the data we want to query. Using a `WHERE` clause, `SELECT` records for birds under the age of 5.

A: 

```sql
animals=# SELECT * FROM birds WHERE age < 5;

 id |   name   | age | species 
----+----------+-----+---------
  1 | Charlie  |   3 | Finch
  3 | Jennifer |   3 | Magpie
  4 | Jamie    |   4 | Owl
(3 rows)
```

6. Update Data

Q: It seems there was a mistake when we were inserting data in the birds table. One of the rows has a species of 'Crow', but that bird is actually a Raven. Update the birds table so that a row with a species of 'Crow' now reads 'Raven'.

A:

```sql
animals=# UPDATE birds SET species = 'Raven' WHERE species = 'Crow';
```

Further Explorationl:

Oops. Jamie isn't an Owl - he's a Hawk. Correct his information.

```sql
animals=# UPDATE birds SET species = 'Hawk' WHERE name = 'Jamie';
```

7. Delete Data

Q: Write an SQL statement that deletes the record that describes a 3 year-old finch.

A:

```sql
animals=# DELETE FROM birds WHERE age = 3 AND species = 'Finch';
```

8. Add Constraint

Q: 

When we initially created our birds table, we forgot to take into account a key factor: preventing certain values from being entered into the database. For instance, we would never find a bird that is negative n years old. We could have included a constraint to ensure that bad data isn't entered for a database record, but we forgot to do so.

For this exercise, write some code that ensures that only birds with a positive age may be added to the database. Then write and execute an SQL statement to check that this new constraint works correctly.

A: 

```sql
animals=# ALTER TABLE birds
          ADD CONSTRAINT positive_age CHECK (age > 0);
ALTER TABLE
animals=# INSERT INTO birds (name, age, species) VALUES ('Karl', -3, 'Eagle');
ERROR:  new row for relation "birds" violates check constraint "positive_age"
DETAIL:  Failing row contains (6, Karl, -3, Eagle).
```

9. Drop Table

Q: It seems we are done with our `birds` table, and no longer have a need for it in our `animals` database. Write an SQL statement that will drop the `birds` table and all its data from the `animals` database.

A: 

```sql
animals=# DROP TABLE birds;
```

Can also do a check to make sure the table exists before dropping it:

```sql
animals=# DROP TABLE IF EXISTS birds;
```

10. Drop Database

Q: Let's finish things up by dropping the database `animals`. With no tables in it, we don't have much use for it any more. Write an SQL statement or PostgreSQL command to drop the `animals` database.

This couold be done as an SQL command from within the PostgreSQL console:

```sql
animals=# \c karl
karl=# DROP DATABASE animals;
```
(the first line is to switch to another db as you cannot drop the db you are in as it is currently open)


or from the command line:

```bash
dropddb animals
```