# 180 - SQL Fundamentals: Medium - Subqueries and More

### Set Up the Database using `\copy`

This set of exercises will focus on an auction. Create a new database called `auction`. In this database there will be three tables, `bidders`, `items`, and `bids`.

After creating the database, set up the 3 tables using the following specifications:

`bidders`

  * `id` of type SERIAL: this should be a primary key
  * `name` of type text: this should be NOT NULL

`items`

  * `id` of type SERIAL: this should be a primary key
  * `name` of type text: this should be NOT NULL
  * `initial_price` and sales_price: These two columns should both be of type numeric. Each column should be able to hold a number as high as 1000 dollars with 2 decimal points of precision.
  * The `initial_price` represents the starting price of an item when it is first put up for auction. This column should never be NULL.
  * The `sales_price` represents the final price at which the item was sold. This column may be NULL, as it is possible to have an item that was never sold off.

`bids`

  * `id` of type SERIAL: this should be a primary key
  * `bidder_id`, `item_id`: These will be of type integer and should not be NULL. This table connects a bidder with an item and each row represents an individual bid. There should never be a column that has `bidder_id` or `item_id` unknown or NULL. Nor should there ever be a bid that references a nonexistent item or bidder. If the item or bidder associated with a bid is removed, that bid should also be removed from the database.
  * Create your `bids` table so that both `bidder_id` and `item_id` together form a composite index for faster lookup.
  * amount - The amount of money placed for each individual bid by a bidder. This column should be of the same type as `items.initial_price` and have the same constraints.

Finally, use the `\copy` meta-command to import the following files into your `auction` database:

`bidders.csv`

```csv
id, name
1,Alison Walker
2,James Quinn
3,Taylor Williams
4,Alexis Jones
5,Gwen Miller
6,Alan Parker
7,Sam Carter
```

`items.csv`

```csv
id, name, initial_price, sales_price
1,Video Game, 39.99, 70.87
2,Outdoor Grill, 51.00, 83.25
3,Painting, 100.00, 250.00
4,Tent, 220.00, 300.00
5,Vase, 20.00, 42.00
6,Television, 550.00,
```

`bids.csv`

```csv
id, bidder_id, item_id, amount
1,1, 1, 40.00
2,3, 1, 52.00
3,1, 1, 53.00
4,3, 1, 70.87
5,5, 2, 83.25
6,2, 3, 110.00
7,4, 3, 140.00
8,2, 3, 150.00
9,6, 3, 175.00
10,4, 3, 185.00
11,2, 3, 200.00
12,6, 3, 225.00
13,4, 3, 250.00
14,1, 4, 222.00
15,2, 4, 262.00
16,1, 4, 290.00
17,1, 4, 300.00
18,2, 5, 21.72
19,6, 5, 23.00
20,2, 5, 25.00
21,6, 5, 30.00
22,2, 5, 32.00
23,6, 5, 33.00
24,2, 5, 38.00
25,6, 5, 40.00
26,2, 5, 42.00
```

Answer:

```bash
createdb auction
psql -d auction
```

```sql
CREATE TABLE bidders (
  id serial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE items (
  id serial PRIMARY KEY,
  name text NOT NULL,
  initial_price numeric(6,2) NOT NULL CHECK (initial_price BETWEEN 0.01 AND 1000.00),
  sales_price numeric(6,2) CHECK (sales_price BETWEEN 0.01 AND 1000.00)
);

CREATE TABLE bids (
  id serial PRIMARY KEY,
  bidder_id integer NOT NULL REFERENCES bidders(id) ON DELETE CASCADE,
  item_id integer NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  amount numeric(6,2) NOT NULL CHECK (amount BETWEEN 0.01 AND 1000.00)
);

CREATE INDEX bidder_item_ids ON bids (bidder_id, item_id);

\copy bidders FROM 'bidders.csv' WITH HEADER CSV;

\copy items FROM 'items.csv' WITH HEADER CSV;

\copy bids FROM 'bids.csv' WITH HEADER CSV;
```


### Conditional Subqueries: IN

Write a SQL query that shows all items that have had bids put on them. Use the logical operator IN for this exercise, as well as a subquery.

Here is the expected output:

```sql
 Bid on Items  
---------------
 Video Game
 Outdoor Grill
 Painting
 Tent
 Vase
(5 rows)
```

Answer:

```sql
SELECT name AS "Bid on Items" FROM items WHERE items.id IN (SELECT item_id FROM bids);
```


### Conditional Subqueries: NOT IN

Write a SQL query that shows all items that have not had bids put on them. Use the logical operator NOT IN for this exercise, as well as a subquery.

Here is the expected output:

```sql
 Not Bid On 
------------
 Television
(1 row)
```

Answer:

```sql
SELECT name AS "Not Bid On" FROM items WHERE items.id NOT IN (SELECT DISTINCT item_id FROM bids);
```


### Conditional Subqueries: EXISTS

Write a SELECT query that returns a list of names of everyone who has bid in the auction. While it is possible (and perhaps easier) to do this with a JOIN clause, we're going to do things differently: use a subquery with the EXISTS clause instead. Here is the expected output:

```sql
      name
-----------------
 Alison Walker
 James Quinn
 Taylor Williams
 Alexis Jones
 Gwen Miller
 Alan Parker
(6 rows)
```

Answer:

```sql
SELECT name FROM bidders
WHERE EXISTS (SELECT 1 FROM bids WHERE bids.bidder_id = bidders.id);
```

See [documentation for](https://www.postgresql.org/docs/9.6/static/functions-subquery.html) sql `EXISTS` clause.

#### Further Exploration

More often than not, we can get an equivalent result by using a `JOIN` clause, instead of a subquery. Can you figure out a `SELECT` query that uses a `JOIN` clause that returns the same output as our solution above?

```sql
SELECT DISTINCT b.name FROM bidders b
  INNER JOIN bids bs
    ON b.id = bs.bidder_id;
```


### Conditional Subqueries: ANY, SOME, ALL

This exercise will be a bit longer than the previous ones, but the logical operators we'll cover are all closely related.

Write an SQL query that returns the names of all items that have bids of less than 100 dollars. To accomplish this, use an ANY clause, along with a subquery.

Expected Output:

```sql
 Highest Bid Less Than 100 Dollars
----------------------------------
 Video Game
 Outdoor Grill
 Vase
(3 rows)
```

Finally, write the same query, but use an ALL clause. You shouldn't have to use any JOINs to finish this exercise.

Expected Output:

```sql
 Highest Bid Less Than 100 Dollars
----------------------------------
 Video Game
 Outdoor Grill
 Vase
 Television
(4 rows)
```

Answer:

`ANY/ SOME`

```sql
SELECT name AS "Highest Bid Less Than 100 Dollars" FROM items
  WHERE 100.00 > ANY (SELECT amount FROM bids WHERE items.id = bids.item_id);
```

`ALL`

```sql
SELECT name AS "Highest Bid Less Than 100 Dollars" FROM items
  WHERE 100.00 > ALL (SELECT amount FROM bids WHERE items.id = bids.item_id);
```

#### Further Exploration

There is a way to get the same result table back using ALL for this exercise. How would you go about doing this? Note that the answer lies in the previous exercises for this set.

```sql
SELECT name AS "Highest Bid Less Than 100 Dollars" FROM items
  WHERE 100.00 > ALL 
    (SELECT amount FROM bids WHERE items.id = bids.item_id)
  AND items.id IN
    (SELECT DISTINCT item_id FROM bids);
```

### Query From a Virtual Table

For this exercise, we'll make a slight departure from how we've been using subqueries. So far we have used subqueries to filter our results using a WHERE clause. In this exercise, we will build that filtering into the table that we will query. Write an SQL query that finds the largest number of bids from any individual bidder.

For this exercise, you must use a subquery to generate a result table (or virtual table), and then query that table for the largest number of bids.

Your output should look like this:

```sql
  max
------
    9
(1 row)
```

Answer:

```sql
SELECT MAX(bidcount.count) FROM 
  (SELECT count(bidder_id) FROM bids GROUP BY bidder_id) AS bidcount;
```


### Scalar Subqueries

For this exercise, use a scalar subquery to determine the number of bids on each item. The entire query should return a table that has the `name` of each item along with the number of bids on an item.

Here is the expected output:

```sql
    name      | count
--------------+-------
Video Game    |     4
Outdoor Grill |     1
Painting      |     8
Tent          |     4
Vase          |     9
Television    |     0
(6 rows)
```

Answer:

```sql
SELECT name, (SELECT count(id) FROM bids WHERE bids.item_id = items.id) FROM items;
```

#### Further Exploration

If we wanted to get an equivalent result, without using a subquery, then we would have to use a `LEFT OUTER JOIN`. Can you come up with the equivalent query that uses a `JOIN` clause?

```sql
SELECT i.name, count(b.id) FROM items i
  LEFT OUTER JOIN bids b
    ON i.id = b.item_id
  GROUP BY i.name;
```


### Row Comparison

We want to check that a given item is in our database. There is one problem though: we have all of the data for the item, but we don't know the id number. Write an SQL query that will display the id for the item that matches all of the data that we know, but does not use the `AND` keyword. Here is the data we know:

`'Painting', 100.00, 250.00`

Answer:

```sql
SELECT id FROM items WHERE ROW('Painting', 100.00, 250.00) = ROW(name, initial_price, sales_price);
```


### EXPLAIN

For this exercise, let's explore the `EXPLAIN` PostgreSQL statement. It's a very useful SQL statement that lets us analyze the efficiency of our SQL statements. More specifically, use `EXPLAIN` to check the efficiency of the query statement we used in the exercise on `EXISTS`:

```sql
SELECT name FROM bidders
WHERE EXISTS (SELECT 1 FROM bids WHERE bids.bidder_id = bidders.id);
```

First use just `EXPLAIN`, then include the `ANALYZE` option as well. For your answer, list any SQL statements you used, along with the output you get back, and your thoughts on what is happening in both cases.

#### Algorithm/Approach

We briefly mention `EXPLAIN` in our SQL Book at the end of the last section of the chapter linked above. Here is the documentation for the `EXPLAIN` statement. Note, that there is no `EXPLAIN` statement in the SQL standard, but it is implemented in other RDBMSs.

Also, keep in mind that when using `ANALYZE`, the sql statement gets executed. When not using `ANALYZE`, the SQL statement isn't executed. Be careful when using `EXPLAIN` on a SQL statement that alters data or database schema.

Answer:

PostgreSQL devises a *query plan* for each query it receives. The `EXPLAIN` statement can be used to see what query plan the PostgreSQL planner has devised for any query, by default this is output as `text` but other output options (json, YAML, XML) are available.

The structure of the query plan is a tree of `plan nodes`. For queries that require joining, sorting or aggreagation there will be additional nodes above the basic scan nodes. The ouput of `EXPLAIN` has one line for each node in the plan tree, showing the basic node type plus the cost estimates that the planner made for the execution of that plan node. The very first line (the summary line for the topmost node) has the estimated total execution cost for the plan.

```sql
EXPLAIN
SELECT name FROM bidders
WHERE EXISTS (SELECT 1 FROM bids WHERE bids.bidder_id = bidders.id);
                                QUERY PLAN                                
--------------------------------------------------------------------------
 Hash Join  (cost=33.38..62.84 rows=635 width=32)
   Hash Cond: (bidders.id = bids.bidder_id)
   ->  Seq Scan on bidders  (cost=0.00..22.70 rows=1270 width=36)
   ->  Hash  (cost=30.88..30.88 rows=200 width=4)
         ->  HashAggregate  (cost=28.88..30.88 rows=200 width=4)
               Group Key: bids.bidder_id
               ->  Seq Scan on bids  (cost=0.00..25.10 rows=1510 width=4)
(7 rows)
```

  * In this response we can see that the top-most line is for teh final joining of the table data with the sub-query data. 
  * The cost indicates a 'start-up cost' -- `33.38` -- (which is the time expended before the output phase can begin) and a total cost -- `62.84` -- which is the total time to output all the data.
  * We also are given the number of ros to be output and the width (which represents the number of bytes for a line of data)
  * Below this is the detail of the condition for joining the tables
  * The other nodes below represent the individual parts of the overall query with their respecive cost estimates, rows and width

```sql
EXPLAIN ANALYZE
SELECT name FROM bidders
WHERE EXISTS (SELECT 1 FROM bids WHERE bids.bidder_id = bidders.id);
                                                     QUERY PLAN                                                      
---------------------------------------------------------------------------------------------------------------------
 Hash Join  (cost=33.38..62.84 rows=635 width=32) (actual time=0.567..0.571 rows=6 loops=1)
   Hash Cond: (bidders.id = bids.bidder_id)
   ->  Seq Scan on bidders  (cost=0.00..22.70 rows=1270 width=36) (actual time=0.304..0.305 rows=7 loops=1)
   ->  Hash  (cost=30.88..30.88 rows=200 width=4) (actual time=0.236..0.236 rows=6 loops=1)
         Buckets: 1024  Batches: 1  Memory Usage: 9kB
         ->  HashAggregate  (cost=28.88..30.88 rows=200 width=4) (actual time=0.229..0.232 rows=6 loops=1)
               Group Key: bids.bidder_id
               ->  Seq Scan on bids  (cost=0.00..25.10 rows=1510 width=4) (actual time=0.214..0.216 rows=26 loops=1)
 Planning time: 5.054 ms
 Execution time: 0.688 ms
(10 rows)
```

  * This returns the same data as without using `ANALYZE` and also some additional data
    * The actual start-up and overall time taken for the query and each part of the query (in milliseconds)
    * The actual rows, but not the actual width
    * In addition it shows the number of loops for the sub-plans. In some plans it is possible for a sub-plan to be executed more than once - this is identified by the number of loops.
    * The overall Planning time and Execution time.

### Comparing SQL Statements

In this exercise, we'll use `EXPLAIN ANALYZE` to compare the efficiency of two SQL statements. These two statements are actually from the "Query From a Virtual Table" exercise in this set. In that exercise, we stated that our subquery-based solution:

```sql
SELECT MAX(bid_counts.count) FROM
  (SELECT COUNT(bidder_id) FROM bids GROUP BY bidder_id) AS bid_counts;
```

was actually faster than the simpler equivalent without subqueries:

```sql
SELECT COUNT(bidder_id) AS max_bid FROM bids
  GROUP BY bidder_id
  ORDER BY max_bid DESC
  LIMIT 1;
```

In this exercise, we will demonstrate this fact.

Run `EXPLAIN ANALYZE` on the two statements above. Compare the planning time, execution time, and the total time required to run these two statements. Also compare the total "costs". Which statement is more efficient and why?

Answer:

```sql
EXPLAIN ANALYZE
SELECT MAX(bid_counts.count) FROM
  (SELECT COUNT(bidder_id) FROM bids GROUP BY bidder_id) AS bid_counts;
                                                  QUERY PLAN                                                   
---------------------------------------------------------------------------------------------------------------
 Aggregate  (cost=37.15..37.16 rows=1 width=8) (actual time=0.037..0.037 rows=1 loops=1)
   ->  HashAggregate  (cost=32.65..34.65 rows=200 width=4) (actual time=0.031..0.032 rows=6 loops=1)
         Group Key: bids.bidder_id
         ->  Seq Scan on bids  (cost=0.00..25.10 rows=1510 width=4) (actual time=0.008..0.013 rows=26 loops=1)
 Planning time: 0.106 ms
 Execution time: 0.084 ms
(6 rows)
```

```sql
EXPLAIN ANALYZE
SELECT COUNT(bidder_id) AS max_bid FROM bids
  GROUP BY bidder_id
  ORDER BY max_bid DESC
  LIMIT 1;
                                                     QUERY PLAN                                                      
---------------------------------------------------------------------------------------------------------------------
 Limit  (cost=35.65..35.65 rows=1 width=4) (actual time=0.052..0.053 rows=1 loops=1)
   ->  Sort  (cost=35.65..36.15 rows=200 width=4) (actual time=0.052..0.052 rows=1 loops=1)
         Sort Key: (count(bidder_id)) DESC
         Sort Method: top-N heapsort  Memory: 25kB
         ->  HashAggregate  (cost=32.65..34.65 rows=200 width=4) (actual time=0.031..0.032 rows=6 loops=1)
               Group Key: bidder_id
               ->  Seq Scan on bids  (cost=0.00..25.10 rows=1510 width=4) (actual time=0.008..0.011 rows=26 loops=1)
 Planning time: 0.109 ms
 Execution time: 0.096 ms
(9 rows)
```

The *planning time* for both queries was almost identical -- `0.109ms` for the non-sub-query version vs `0.106ms` for the sub-query version. There is, however, a difference in the *execution time* for both -- `0.096ms` for the non-sub-query version vs `0.084ms` for the sub-query version.

the majority of this difference can be accounted for by the `Sort` child node of the non-sub-query version which takes `0.052ms` to execute.

#### Further Exploration

We mentioned earlier that using a scalar subquery was faster than using an equivalent `JOIN` clause. Determining that `JOIN` statement was part of the "Further Exploration" for that exercise. For this "Further Exploration", compare the times and costs of those two statements. The SQL statement that uses a scalar subquery is listed below.

Scalar Subquery:

```sql
SELECT name,
(SELECT COUNT(item_id) FROM bids WHERE item_id = items.id)
FROM items;
```

Answer:

```sql
EXPLAIN ANALYZE
SELECT name,
(SELECT COUNT(item_id) FROM bids WHERE item_id = items.id)
FROM items;
                                                 QUERY PLAN                                                  
-------------------------------------------------------------------------------------------------------------
 Seq Scan on items  (cost=0.00..174.49 rows=6 width=13) (actual time=0.032..0.083 rows=6 loops=1)
   SubPlan 1
     ->  Aggregate  (cost=28.89..28.91 rows=1 width=4) (actual time=0.010..0.010 rows=1 loops=6)
           ->  Seq Scan on bids  (cost=0.00..28.88 rows=8 width=4) (actual time=0.004..0.007 rows=4 loops=6)
                 Filter: (item_id = items.id)
                 Rows Removed by Filter: 22
 Planning time: 0.123 ms
 Execution time: 0.124 ms
(8 rows)
```

```sql
EXPLAIN ANALYZE
SELECT i.name, count(b.id) FROM items i
  LEFT OUTER JOIN bids b
    ON i.id = b.item_id
  GROUP BY i.name;
                                                     QUERY PLAN                                                     
--------------------------------------------------------------------------------------------------------------------
 HashAggregate  (cost=32.57..32.63 rows=6 width=13) (actual time=0.077..0.080 rows=6 loops=1)
   Group Key: i.name
   ->  Hash Right Join  (cost=1.14..32.35 rows=45 width=13) (actual time=0.037..0.054 rows=27 loops=1)
         Hash Cond: (b.item_id = i.id)
         ->  Seq Scan on bids b  (cost=0.00..25.10 rows=1510 width=8) (actual time=0.003..0.006 rows=26 loops=1)
         ->  Hash  (cost=1.06..1.06 rows=6 width=13) (actual time=0.023..0.023 rows=6 loops=1)
               Buckets: 1024  Batches: 1  Memory Usage: 9kB
               ->  Seq Scan on items i  (cost=0.00..1.06 rows=6 width=13) (actual time=0.007..0.009 rows=6 loops=1)
 Planning time: 0.224 ms
 Execution time: 0.157 ms
(10 rows)
```

The Planning time with the scalar sub query is significantly less although the execution time is vary similar.
