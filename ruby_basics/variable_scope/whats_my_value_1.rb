# whats_my_value_1.rb

a = 7

def my_value(b)
  b += 10
end

my_value(a)
puts a


# Line 3: this is local variable initialisation.
# The local variable a is available within the main scope of the program but not from within
# a method unless specifically passed in as an argument to the method.
# http://ruby-doc.org/core-2.3.1/doc/syntax/assignment_rdoc.html
# Here, the variable a is assigned to the integer 7.
#
# Lines 5-7: this is method definition. A method definition consists of the def keyword, a
# method name, the body of the method, return value (By default a method returns the last 
# expression that was evaluated in the body of the method), and the end keyword. When called
# the method will execute the body of the method.
# http://ruby-doc.org/core-2.3.1/doc/syntax/methods_rdoc.html
# Here, the method my_value is defined.
# 
# The method call 'my_value(a)' passes the local variable 'a' as an argument to the 'my_value'
# method. At this point the method parameter 'b' (whch is effectively a local variable contained
# within the scope of the method) is assigned to 'a' and therefore to the integer '7'. Passing the 
# local variable as an argument in this way is effectively the same as doing the following:
#
# a = 7
# b = a
#
# The method then reassigns the local variable 'b' to a different value. The reason for this is that
#
# b += 10 
#
# is shorthand for b = b + 10
#
# the '=' sign here is assignment, so 'b' is now assigned to a new value which is 17 (7 + 10).
# The value of 'a' is not affected when 'b' is reassigned so when 'puts' is called on 'a' the
# program outputs the string '7' (a string is output rather than an integer because 'puts' calls 
# 'to_s' on the object)
