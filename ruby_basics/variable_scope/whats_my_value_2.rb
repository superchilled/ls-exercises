# whats_my_value_2.rb

a = 7

def my_value(a)
  a += 10
end

my_value(a)
puts a

# Line 3: this is local variable initialisation.
# The local variable a is available within the main scope of the program but not from within
# a method unless specifically passed in as an argument to the method.
# http://ruby-doc.org/core-2.3.1/doc/syntax/assignment_rdoc.html
# Here, the variable a is assigned to the integer 7
#
# Lines 5-7: this is method definition. A method definition consists of the def keyword, a
# method name, the body of the method, return value (By default a method returns the last 
# expression that was evaluated in the body of the method), and the end keyword. When called
# the method will execute the body of the method.
# http://ruby-doc.org/core-2.3.1/doc/syntax/methods_rdoc.html
# Here, the method my_value is defined
# 
# Even though the variables used within the `my_value` method and outside of it have the same
# name - `a` - they are actually different variables (i.e. they point to different places in memory).
# this is possible due to local variable scoping rules - i.e. the method cannot access variables
# defined outside of its scope and the top-level scope cannot access local variables defined 
# within in the method.
