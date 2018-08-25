# whats_my_value_4.rb

a = "Xyzzy"

def my_value(b)
  b[2] = '-'
end

my_value(a)
puts a

# This code prints 'Xy-zy'. The string "Xyzzy" is passed to the `my_value` method.
# The `[]=` method of String is called on it. Since this method *mutates the caller*
# the object passed in is changed - specifically the character at index `2` of the string
