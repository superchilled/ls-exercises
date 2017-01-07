# 180 - SQL Fundamentals: DDL

### Create an Extrasolar Planetary Database

For this exercise set, we will be working with the DDL statements to create and modify tables in a database that tracks planets around stars other than our Sun. To get started, first create a postgresql database named "extrasolar", and then create two tables in the database as follows:

`stars` table

  * `id`: a unique serial number that auto-increments and serves as a primary key for this table.
  * `name`: the name of the star,e,g., "Alpha Centauri A". Allow room for 25 characters. Must be unique and non-null.
  * `distance`: the distance in light years from Earth. Define this is a whole number (e.g., 1, 2, 3, etc) that must be non-null and greater than 0.
  * `spectral_type`: the spectral type of the star: O, B, A, F, G, K, and M. Use a one character string.
  * `companions`: how many companion stars does the star have? A whole number will do. Must be non-null and non-negative.

`planets` table

  * `id`: a unique serial number that auto-increments and serves as a primary key for this table.
  `designation`: a single alphabetic character that uniquely identifies the planet in its star system ('a', * 'b', 'c', etc.)
  * `mass`: estimated mass in terms of Jupiter masses; use an integer for this value.

Answer:

```bash
createdb extrasolar
psql -d extrasolar
```

```sql
CREATE TYPE spectral AS ENUM ('O', 'B', 'A', 'F', 'G', 'K', 'M');

CREATE TABLE stars (
  id serial PRIMARY KEY,
  name VARCHAR(25) UNIQUE NOT NULL,
  distance integer NOT NULL CHECK (distance > 0),
  spectral_type spectral,
  companions integer NOT NULL CHECK (companions >= 0)
);

CREATE TABLE planets (
  id serial PRIMARY KEY,
  designation CHAR(1),
  mass integer
);
```

### Relating Stars and Planets

You may have noticed that, when we created the `stars` and `planets` tables, we did not do anything to establish a relationship between the two tables. They are simply standalone tables that are related only by the fact that they both belong to the `extrasolar` database. However, there is no relationship between the rows of each table.

To correct this problem, add a `star_id` column to the `planets` table; this column will be used to relate each planet in the `planets` table to its home star in the `stars` database. Make sure the row is defined in such a way that it is required and must have a value that is present as an `id` in the `stars` database.

Answer:

```sql
ALTER TABLE planets ADD COLUMN star_id INTEGER NOT NULL REFERENCES stars(id);
```

### Increase Star Name Length

Hmm... it turns out that 25 characters isn't enough room to store a star's complete name. For instance, the star "Epsilon Trianguli Australis A" requires 30 characters. Modify the column so that it allows star names as long as 50 characters.

Answer:

```sql
ALTER TABLE stars 
  ALTER COLUMN name TYPE varchar(50);
```

### Stellar Distance Precision

For many of the closest stars, we know the distance from Earth fairly accurately; for instance, Proxima Centauri is roughly 4.3 light years away. Our database, as currently defined, only allows integer distances, so the most accurate value we can enter is 4. Modify the `distance` column in the `stars` table so that it allows fractional light years to any degree of precision required.

Answer:

```sql
ALTER TABLE stars
  ALTER COLUMN distance TYPE decimal;
```

### Check Values in List

The `spectral_type` column in the `stars` table is currently defined as a one-character string that contains one of the following 7 values: `'O'`, `'B'`, `'A'`, `'F'`, `'G'`, `'K'`, and `'M'`. However, there is currently no enforcement on the values that may be entered. Add a constraint to the table `stars` that will enforce the requirement that a row must hold one of the 7 listed values above. Also, make sure that a value is required for this column.

Answer:

If the column was of type `CHAR` you could add a constraint like so:

```sql
ALTER TABLE stars ADD CHECK (spectral_type IN ('O', 'B', 'A', 'F', 'G', 'K', 'M')),
ALTER COLUMN spectral_type SET NOT NULL;
```

Since the column in my table is already of a custom type - `spectral` there is no need to add the `IN constraint, just the `NOT NULL`:

```sql
ALTER TABLE stars
 ALTER COLUMN spectral_type SET NOT NULL;
 ```

### Enumerated Types

In the previous exercise, we added a CHECK constraint to the stars table to enforce that the value stored in the spectral_type column for each row is valid. In this exercise, we will use an alternate approach to the same problem.

PostgreSQL provides what is called an enumerated data type; that is, a data type that must have one of a finite set of values. For instance, a traffic light can be red, green, or yellow: these are enumerate values for the color of the currently lit signal light.

Modify the stars table to remove the CHECK constraint on the spectral_type column, and then modify the spectral_type column so it becomes an enumerated type that restricts it to one of the following 7 values: `'O'`, `'B'`, `'A'`, `'F'`, `'G'`, `'K'`, and `'M'`.

Answer:

The column in my `stars` table is already of this type, however if it was of an `CHAR` type the following would change it:

```sql
CREATE TYPE spectral AS ENUM ('O', 'B', 'A', 'F', 'G', 'K', 'M');

ALTER TABLE stars DROP CONSTRAINT spectral_type_check,
  ALTER COLUMN spectral_type TYPE spectral USING spectral_type::spectral;
```

### Planetary Mass Precision



We will measure Planetary masses in terms of the mass of Jupiter. As such, the current data type of `integer` is inappropriate; it is only really useful for planets as large as Jupiter or larger. These days, we know of many extrasolar planets that are smaller than Jupiter, so we need to be able to record fractional parts for the mass. Modify the `mass` column in the `planets` table so that it allows fractional masses to any degree of precision required. In addition, make sure the mass is required and positive.

While we're at it, also make the `designation` column required.

Answer:

```sql
ALTER TABLE planets
  ALTER COLUMN mass TYPE decimal,
  ALTER COLUMN mass SET NOT NULL,
  ADD CHECK (mass > 0.0),
  ALTER COLUMN designation SET NOT NULL;
```

### Add a Semi-Major Axis Column

Add a `semi_major_axis` column for the semi-major axis of each planet's orbit; the semi-major axis is the average distance from the planet's star as measured in astronomical units (1 AU is the average distance of the Earth from the Sun). Use a data type of numeric, and require that each planet have a value for the `semi_major_axis`.

Answer:

```sql
ALTER TABLE planets
  ADD COLUMN semi_major_axis numeric NOT NULL;
```

If the table already had data, you would need to add the column without the constraint, update the relevant data for that column for each row and then add the constraint:

```sql
ALTER TABLE planets
  ADD COLUMN semi_major_axis numeric;

UPDATE planets SET semi_major_axis = 0.04 WHERE designation = 'b';
UPDATE planets SET semi_major_axis = 40 WHERE designation = 'c';

ALTER TABLE planets ALTER COLUMN semi_major_axis SET NOT NULL;
```

### Add a Moons Table

Someday in the future, technology will allow us to start observing the moons of extrasolar planets. At that point, we're going to need a `moons` table in our `extrasolar` database. For this exercise, your task is to add that table to the database. The table should include the following data:

  * `id`: a unique serial number that auto-increments and serves as a primary key for this table.
  * `designation`: the designation of the moon. We will assume that moon designations will be numbers, with the first moon discovered for each planet being moon 1, the second moon being moon 2, etc. The designation is required.
  * `semi_major_axis`: the average distance in kilometers from the planet when a moon is farthest from its corresponding planet. This field must be a number greater than 0, but is not required; it may take some time before we are able to measure moon-to-planet distances in extrasolar systems.
  * `mass`: the mass of the moon measured in terms of Earth Moon masses. This field must be a numeric value greater than 0, but is not required.

Make sure you also specify any foreign keys necessary to tie each moon to other rows in the database.

```sql
CREATE TABLE moons (
  id serial PRIMARY KEY,
  designation INTEGER NOT NULL CHECK (designation > 0),
  semi_major_axis DECIMAL CHECK (semi_major_axis > 0.0),
  mass DECIMAL CHECK (mass > 0.0),
  planet_id INTEGER REFERENCES planets(id) NOT NULL
);
```

### Delete the Database

Delete the `extrasolar` database. Use the psql console -- don't use the terminal level commands.

```sql
\c karl

DROP DATABASE extrasolar;
```