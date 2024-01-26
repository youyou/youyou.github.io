// 对象可以包含各种类型的成员变量, 使用Object()函数来创建对象, 对象的成员变量用.或者[]来访问

cat = Object();

cat["name"] = "Kitty";

func miao()
{
   //函数被赋值给对象作为成员变量时，可以使用self访问该对象
   print( self.name + ":", "喵！");
}
cat.say = miao;

cat.say();