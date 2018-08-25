# whats_my_value_5.rb

a = 7

def my_value(b)
  b = a + a
end

my_value(a)
puts a

# The output here is an `undefined variable or method` error, since `a` has not
# been defined within the scope of the method.
