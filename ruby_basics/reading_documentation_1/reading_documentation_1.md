# Reading Documentation 1

1. Where to Find Documentation

*Where can you find the most complete Ruby documentation?*

The best place to find documentation is:

[ruby-doc.org/](http://ruby-doc.org/)

Although this documentation is not *official* it is actively maintained by the Ruby community. It contains sections on the core API, the standard library and information on the Ruby language.

The core API consists of allthe classes and modules that are available to a Ruby program without having to use `require` - e.g. `Object`, `String`, `Array` and `Hash` classes.

[ruby-doc.org/core-2.3.1/](http://ruby-doc.org/core-2.3.1/)

The standard library API consists of classes and modules that are provided by the Ruby distribution but need to be specifically imported into a program using the `require` keyword. Such classes include `Set`, `Date`, `JSON` and `YAML`, and modules include `Singleton` and `Find`.

[ruby-doc.org/stdlib-2.3.1/](http://ruby-doc.org/stdlib-2.3.1/)

With regards to the Ruby language, there isn't a specific section for this but there is a [Getting Started](http://ruby-doc.org/gettingstarted/) section which has links to some useful resources.


2. while Loops

*Locate the description of the while loop in the ruby documentation.*

Information on while loops is available on the 'Control Expressions' page in the 'Syntax' section of the Core API documentation:

[http://ruby-doc.org/core-2.3.1/doc/syntax/control_expressions_rdoc.html#label-while+Loop](http://ruby-doc.org/core-2.3.1/doc/syntax/control_expressions_rdoc.html#label-while+Loop)

3. Return Value of while

*Using the ruby documentation, determine what value a while loop returns.*

According to the documentation the *result* (i.e. the return value) of a `while` loop is `nil` unless `break` is used to supply a value.

4. Return Value of break

*In the previous exercise, you learned that the while loop returns nil unless break is used. Locate the documentation for break, and determine what value break sets the return value to for the while loop.*

According to the documentation for the `break` statement:

[http://ruby-doc.org/core-2.3.1/doc/syntax/control_expressions_rdoc.html#label-break+Statement](http://ruby-doc.org/core-2.3.1/doc/syntax/control_expressions_rdoc.html#label-break+Statement)

`break` returns a value if a value is supplied to it, e.g.

```ruby
a = 0

while true do
  p a
  a += 1

  break a + 3 if a < 10 # a + 3 = 4 at the point the loop breaks so break will return 4
end
```

`break` here will return `4`. 

If no value is supplied to `break` it will return `nil` (though this isn't specifically stated in the documentation)

5. Large Numbers

*Using the ruby documentation, determine how you can write large numbers in a way that makes them easier to read.*

On the **literals** page under the [syntax section](http://ruby-doc.org/core-2.3.1/doc/syntax_rdoc.html) of the Core API docuemntation there is an entry for 'Numbers':

[ruby-doc.org/core-2.3.1/doc/syntax/literals_rdoc.html#label-Numbers](http://ruby-doc.org/core-2.3.1/doc/syntax/literals_rdoc.html#label-Numbers)

which gives the following example:

```ruby
1234
1_234
``` 

and states:

> These numbers have the same value, 1,234. The underscore may be used to enhance readability for humans. You may place an underscore anywhere in the number.

6. Symbol Syntax

*Using the ruby documentation, determine how you would write a Symbol that represents your name. We aren't looking for a String; we want a Symbol, which is one of ruby's datatypes.*

Again ths information is in the **literals** page under the 'syntax' section:

[ruby-doc.org/core-2.3.1/doc/syntax/literals_rdoc.html#label-Symbols](ruby-doc.org/core-2.3.1/doc/syntax/literals_rdoc.html#label-Symbols)

It states:

> You may reference a symbol using a colon: `:my_symbol`.

It further states:

> You may also create symbols by interpolation.

giving the examples:

```ruby
:"my_symbol1"
:"my_symbol#{1 + 1}"
```

There is also information on Symbol syntax in the section on the Symbol class (in the Core API docs):

[http://ruby-doc.org/core-2.3.1/Symbol.html](http://ruby-doc.org/core-2.3.1/Symbol.html)

7. Default Arguments in the Middle

*Consider the following method and a call to that method:*

```ruby
def my_method(a, b = 2, c = 3, d)
  p [a, b, c, d]
end

my_method(4, 5, 6)
```
*Use the ruby documentation to determine what this code will print.*

There are two relevant sections of the [syntax]() section of the Core API documentation, the page on defining methods, specifically the entries for Arguments:

[ruby-doc.org/core-2.3.1/doc/syntax/methods_rdoc.html#label-Arguments](http://ruby-doc.org/core-2.3.1/doc/syntax/methods_rdoc.html#label-Arguments)

and default values:

[ruby-doc.org/core-2.3.1/doc/syntax/methods_rdoc.html#label-Default+Values](http://ruby-doc.org/core-2.3.1/doc/syntax/methods_rdoc.html#label-Default+Values)

and also the page on calling methods, again specifically the entry for Default Positional Arguments:

[ruby-doc.org/core-2.3.1/doc/syntax/calling_methods_rdoc.html#label-Default+Positional+Arguments](http://ruby-doc.org/core-2.3.1/doc/syntax/calling_methods_rdoc.html#label-Default+Positional+Arguments)

This last entry in particular is useful in answering this question in that it states the following:

> When the method defines default arguments you do not need to supply all the arguments to the method. Ruby will fill in the missing arguments in-order.

> Ruby fills in the missing arguments from left to right. Ruby allows default values to appear in the middle of positional arguments.

Given these facts we would expect the following to be returned:

```ruby
[4, 5, 3, 6]
```

The reason for this is that the non-default parameters are assigned to the arguments first, according to position - so `a` is assigned to `4` and `d` is assigned to `6`. This is possible because the default parameters **must** be contiguous (i.e. grouped together) so ruby knows that the first argument and last argument from the method call can be assigned to `a` and `d` respectively according to position and the remaining argument (or arguments if there are more than one) is assigned to the 'default parameter group' each argument being assigned to a paremeter from left to right within that group, default values being applied to any remaining parameter without a argument.

8. String Class

*Locate and open the class documentation for the `String` class.*

The documentation for `String` class can be found under the Core API documentation ate:

[ruby-doc.org/core-2.3.1/String.html](http://ruby-doc.org/core-2.3.1/String.html)

9. Right Justifying Strings

*

Use the ruby documentation for the `String` class to determine which method can be used to right justify a `String` object.
*

A method to right justify and `String` object would be an instance method. IN the list of methods in the documentation for `String` this method would be prepended by a `#` in order to identify it as an instance method rathr than a class method (which are prepended in Ruby docuemtnation by `::`).

The particular emthod to right justify a `String` object would be `rjust`, the documentation for which can be found at:

[ruby-doc.org/core-2.3.1/String.html#method-i-rjust](http://ruby-doc.org/core-2.3.1/String.html#method-i-rjust)

10. Class and Instance Methods

*Locate the ruby documentation for methods `File::path` and `File#path`. How are they different?*

The documentation for both methods is on the page for the `File` class under the Core API. 

The `File::path` documentation is here:

[http://ruby-doc.org/core-2.3.1/File.html#method-c-path](http://ruby-doc.org/core-2.3.1/File.html#method-c-path)

and the `File#path` documentation is here:

[http://ruby-doc.org/core-2.3.1/File.html#method-i-path](http://ruby-doc.org/core-2.3.1/File.html#method-i-path)

The differ in that the first is a class method and the second an instance method. They also differ in their implementation - the class method returns a string representation of the file path; the instance method returns the pathname used to create a file object (as a string).
