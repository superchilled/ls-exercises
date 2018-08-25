# whats_my_value_5.rb

a = "Xyzzy"

def my_value(b)
  b = 'yzzyX'
end

my_value(a)
puts a

# This will print "Xyzzy" since the varaible `a` is not reassigned within its lexical scope.
# The object to which `a` is pointing is passed to the method `my_value` and the local variable
# `b` is assigned to it. `b` is then *reassigned* to the string 'yzzyX' but the string "Xyzzy"
# that was originally passed in to the method is not affected in any way.
# This is effectively the same as saying:
#
# a = "Xyzzy"
# b = a
# b = 'yzzyX'
#
# `a` here is still clearly assigned to "Xyzzy"
