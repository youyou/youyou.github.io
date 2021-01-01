func closure_generater(n)
{  
   //函数内的函数可以记住外层的变量,比如n, 称之为[闭包]
   func closure(x)
   {
       return pow( x, n);
   }
   return closure; //函数可以和变量一样当作返回值
}

square = closure_generater(2); //函数也可以作为变量赋值
cube   = closure_generater(3);

print( "3的平方为:", square(3), "3的立方为:", cube(3));