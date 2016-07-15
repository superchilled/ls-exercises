# Reading Documentation 2

1. Methods Without Arguments

*How would you use String#upcase to create an uppercase version of the string "xyz"?*

According to teh documentation at:

[http://ruby-doc.org/core-2.3.1/String.html#method-i-upcase](http://ruby-doc.org/core-2.3.1/String.html#method-i-upcase)

you could simply call `upcase` on the `"xyz"` string object istself:

```ruby
"xyz".upcase # => "XYZ"
```

The documetntion states that this:

> Returns a copy of str with all lowercase letters replaced with their uppercase counterparts. 

2. Required Arguments

*Assume you have this Array:*

```ruby
a = %w(a b c d e)
```

*How would you use Array#insert to insert the numbers 5, 6, and 7 between the elements with values 'c' and 'd'?*

According to the documentation for `Array#insert`:

[ruby-doc.org/core-2.3.1/Array.html#method-i-insert](http://ruby-doc.org/core-2.3.1/Array.html#method-i-insert)

the method 

> Inserts the given values before the element with the given index.

The signature for the method `insert(index, obj...) → ary` indicates that we need to pass two arguments to the method - the index of the object in the array before which we want to insert the elements, and the elements (one or more) themselves. The modified array is returned from the method.

The method call in this case would look like this:

```ruby
a.insert(3, 5, 6, 7)
```

3. Optional Arguments

*Assume you have the following code:*

```ruby
s = 'abc def ghi,jkl mno pqr,stu vwx yz'
puts s.split.inspect
puts s.split(',').inspect
puts s.split(',', 2).inspect
```

*What will each of the 3 puts statements print?*

To ascertain this we need to look at the `split` instance method of the `String` class (since 'abc def ghi,jkl mno pqr,stu vwx yz' is an instance of `String` and `split` is being called on it).

The documentation for `String#split` is avaialable here:

[ruby-doc.org/core-2.3.1/String.html#method-i-split](http://ruby-doc.org/core-2.3.1/String.html#method-i-split)

The signature `split(pattern=$;, [limit]) → anArray` suggests that an array is returned and that there are two optional arguments - `pattern` (which has a default set to `nil` if no argument is passed and `[limit]`).

Since in the first example no argument is passed this is equivalent to the value of pattern being set to`nil`. The documentation states the following:

> If pattern is nil, the value of $; is used. If $; is nil (which is the default), str is split on whitespace as if `' '` were specified.

We can therefore expect the result of the first method call to be an array with the array objects being substrings from the string with whitespace as the delimiter.

```ruby
s = 'abc def ghi,jkl mno pqr,stu vwx yz'
puts s.split.inspect # => ['abc', 'def', 'ghi,jkl', 'mno', 'pqr,stu', 'vwx', 'yz']
```

The second example passes one argument to the method call; this will be assigned to the `pattern` parameter of the `split` method. The argument passed is `','` which is a string. The documentation states:

> If pattern is a String, then its contents are used as the delimiter when splitting str.

So we would expect the second method call to return an array with containing substrings of the strng with ',' as the delimiter:

```ruby
s = 'abc def ghi,jkl mno pqr,stu vwx yz'
puts s.split(',').inspect # => ['abc def ghi', 'jkl mno pqr', 'stu vwx yz']
```

The third example passes two arguments to the method call; the first will be assigned to the `pattern` parameter of the `split` method and the second to the `limit` parameter. The first argument passed is `','` the same as for the previous example. The second is the integer `2`. The documentation states re `limit`:

> If the limit parameter is omitted, trailing null fields are suppressed. If limit is a positive number, at most that number of fields will be returned (if limit is 1, the entire string is returned as the only entry in an array). If negative, there is no limit to the number of fields returned, and trailing null fields are not suppressed.

We would therefore expect the return value to be an array of **two** substrings delimited on the first instance in the string of the `pattern` argument - in this case `','`:

```ruby
s = 'abc def ghi,jkl mno pqr,stu vwx yz'
puts s.split(',').inspect # => ['abc def ghi', 'jkl mno pqr,stu vwx yz']
```

4. Optional Arguments Redux

*Assume you have the following code:*

```ruby
require 'date'

puts Date.new
puts Date.new(2016)
puts Date.new(2016, 5)
puts Date.new(2016, 5, 13)
```

*What will each of the 4 puts statements print?*

To ascertain this we need to look at the documentation for the `new` class method of the `Date` class. Date is in the Standard Library API rather than the Core API. The documentation for `Date::new` is available here:

[ruby-doc.org/stdlib-2.3.1/libdoc/date/rdoc/Date.html#method-c-new](http://ruby-doc.org/stdlib-2.3.1/libdoc/date/rdoc/Date.html#method-c-new)

The signature `new([year=-4712[, month=1[, mday=1[, start=Date::ITALY]]]]) → date` indicates a `date` object will be returned and that the method call has four optional arguments with default values.

The optional arguments are `year` (defaulting to `-4712`), `month` (defaulting to `1`), `mday` (which is the day of the month - defaulting to `1`) and `start` (which denotes the day of calendar reform - defaulting to `Date::ITALY`).

Given this we can expect the following to be returned by the example method calls:

```ruby
require 'date'

puts Date.new               # => '-4712-01-01'
puts Date.new(2016)         # => '2016-01-01'
puts Date.new(2016, 5)      # => '2016-05-01'
puts Date.new(2016, 5, 13)  # => '2016-05-13'
```

5. Mandatory Blocks

The `Array#bsearch` method is used to search ordered `Array`s more quickly than `#find` and `#select` can. Assume you have the following code:

a = [1, 4, 8, 11, 15, 19]

How would you search this `Array` to find the first element whose value exceeds `8`?

According to the documentation for the `bsearch` instance method of `Array` class:

[ruby-doc.org/core-2.3.1/Array.html#method-i-bsearch](http://ruby-doc.org/core-2.3.1/Array.html#method-i-bsearch)

there are two modes - a 'find-minimum' mode and a 'find-any' mode. Since in this example we want to identify the *first* element which matches the condition we would use the 'find-minimum' mode. for either mode we must pass a block as an argument ot the method; for the 'find-minimum' mode that block must return a boolean (true or false).

For this example the block would could look like this:

```ruby
a = [1, 4, 8, 11, 15, 19]

a.bsearch { |number| number > 8 } # => 11
```

6. Multiple Signatures

*What do each of these puts statements output?*

```ruby
a = %w(a b c d e)
puts a.fetch(7)
puts a.fetch(7, 'beats me')
puts a.fetch(7) { |index| index**2 }
```

Since we know that `a` is being assigned to an array object (the `%w` notation is shorthand for array creation) we need to look at the `fetch` instance method of `Array` class.

`Array#fetch` is available under the Core API documentation, here:

[http://ruby-doc.org/core-2.3.1/Array.html#method-i-fetch](http://ruby-doc.org/core-2.3.1/Array.html#method-i-fetch)

There are three different signatures given in the documentation

`fetch(index) → obj`

`fetch(index, default) → obj`

`fetch(index) { |index| block } → obj`

All three require an `index` argument to be passed to the method. The documentation states that `fetch`:

> Tries to return the element at position index, but throws an IndexError exception if the referenced index lies outside of the array bounds.

It further states:

> This error can be prevented by supplying a second argument, which will act as a default value.

Regarding the passing of a block (which is effectively an additional default argument to the method) it states:

> Alternatively, if a block is given it will only be executed when an invalid index is referenced. Negative values of index count from the end of the array.

Given this information we can expect the following values to be returned from the three examplew:

```ruby
a = %w(a b c d e)
puts a.fetch(7)                       # => Exception - Index Error (since there indices only go up to 4)
puts a.fetch(7, 'beats me')           # => 'beats me' (since there index only goes up to 4 default is returned)
puts a.fetch(7) { |index| index**2 }  # => 49 (since index is out of bounds, the block is invoked)
```

7. Keyword Arguments

*What does this code print?*

```ruby
5.step(to: 10, by: 3) { |value| puts value }
```

According to the entry for Keyword Arguments in the documentation on the methods page under the syntax section:

[ruby-doc.org/core-2.3.1/doc/syntax/methods_rdoc.html#label-Keyword+Arguments](http://ruby-doc.org/core-2.3.1/doc/syntax/methods_rdoc.html#label-Keyword+Arguments)

Keyword Arguments are similar to Positional Arguments with default values (in terms of syntax they effectively work as hash key/value pairs using symbols for the keys).

Understanding this, and looking at the signatures:

`step(by: step, to: limit) {|i| block } → self`

`step(by: step, to: limit) → an_enumerator`

`step(limit=nil, step=1) {|i| block } → self`

`step(limit=nil, step=1) → an_enumerator`

for the `step` instance method of `Numeric` class, the documentation for which can be seen here:

[ruby-doc.org/core-2.3.1/Numeric.html#method-i-step](http://ruby-doc.org/core-2.3.1/Numeric.html#method-i-step)

we can ascertain that the value associated with the `by` keyword is assigned to the `step` parameter and the value associated with the `to` keyword is assigned to the `limit` parameter.

There is an additional argument which is the block.

According to the documentation, the `step` method:

> Invokes the given block with the sequence of numbers starting at num, incremented by step (defaulted to 1) on each call.

Based on this we would expect the code in the example to return:

```ruby
5.step(to: 10, by: 3) { |value| puts value } # => 5, 8
```

since the starting point is `5`, this is incremented by `3` at each `step` until the value is greater than the `limit` of `10` at which point the loop finishes).

8. Parent Class

*Use irb to run the following code:*

```ruby
s = 'abc'
puts s.public_methods.inspect
```

*You should find that it prints a list of all of the public methods available to the String s; this includes not only those methods defined in the String class, but also methods that are inherited from Object (which inherits other methods from the BasicObject class and the Kernel module). That's a lot of methods.*

The `public_methods` instance method is a method of the `Object` class. The documetnation for it is available here:

[ruby-doc.org/core-2.3.1/Object.html#method-i-public_methods](http://ruby-doc.org/core-2.3.1/Object.html#method-i-public_methods)

The documentation states that `public_methods`:

> Returns the list of public methods accessible to obj. If the all parameter is set to false, only those methods in the receiver will be listed.

Since `String` class inherits from `Object` class (`String` is a subclass of `Object`) any instances of `String` have the `public_methods` instance method of `Object` avaialble to them

According to the signature for `public_methods`:

`public_methods(all=true) → array`

an array is returned, and since calling `puts` on an array ooutputs each element on a separate line, calling `inspect` in this example actually outputs the array itself.

9. 
Included Modules

*Use irb to run the following code:*

```ruby
a = [5, 9, 3, 11]
puts a.min
```

*Find the documentation for the `#min` method and modify the above program to print the two smallest values in the `Array`.*

The documentation for the `min` method is available on the page for the `Enumerable` module (under the Core API):

[ruby-doc.org/core-2.3.1/Enumerable.html#method-i-min](http://ruby-doc.org/core-2.3.1/Enumerable.html#method-i-min)

`Enumerable` is a module rather than a class so `Array` cannot *inherit* from it as it could do a class but the `Enumerable` module is *included* in the `Array` class and so its instance methods are available to `Array` objects` - including the `min` method.

According to (one of) the signature(s) for `min`:

`min(n) → array`

and to the documentation:

> If the n argument is given, minimum n elements are returned as an array.

in order to return the two smallest values from the `Array` we would need to modify the method call as follows:

```ruby
a = [5, 9, 3, 11]
puts a.min(2) # => 3, 5
```

10. Down the Rabbit Hole

*Sometimes, the documentation is going to leave you scratching your head.*

*In a very early assignment at Launch School, you are tasked with writing a program that loads some text messages from a YAML file. We do this with `YAML::load_file:`*

```ruby
require 'yaml'
MESSAGES = YAML.load_file('calculator_messages.yml')
```

*Find the documentation for YAML::load_file.*

The documentation for the `load_file` class method of `YAML` class is available under the Standard Library API, though not the most recent version of the docs. If you try to navigate there from stdlib-2.3.1 then the method is not listed on teh page for `YAML`, but a search will bring it up in the page for `YAML` under stdlib-1.8.6.

[ruby-doc.org/stdlib-1.8.6/libdoc/yaml/rdoc/YAML.html#method-c-load_file](http://ruby-doc.org/stdlib-1.8.6/libdoc/yaml/rdoc/YAML.html#method-c-load_file)

Within the current standard library it is also available under the `Psych` class:

[ruby-doc.org/stdlib-2.3.1/libdoc/psych/rdoc/Psych.html#method-c-load_file](http://ruby-doc.org/stdlib-2.3.1/libdoc/psych/rdoc/Psych.html#method-c-load_file)
