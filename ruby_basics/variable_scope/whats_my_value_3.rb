# whats_my_value_3.rb

a = 7

def my_value(b)
  a = b
end

my_value(a + 5)
puts a

# This code will print `7` since the local variable `a` is never assigned to any other value
# within its lexical scope (i.e. outside of the `my_value` method)
