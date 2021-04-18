function userName()
{
 var name = prompt ('Welcome to my page , Please Enter Your Name !!');
 return name;
}

alert ('Welcome  ' + userName());


 var age = prompt ( 'Please Enter Your Age  !!');


 if (age>=15)
 {
   alert (' WELCOME :)'  );
 }

 else
  {
   
  alert ('This content is dangerous , and we are not responsible for any injury caused by a wrong use of the content ....!!! ')

  }

function motor()
{
    var m = prompt ('Please Enter the type you want to see it (3 phase , 1 phase , dc )');
    return m;
}
  

var type =motor();

while ( type !=='3 phase' && type !=='1 phase' && type !=='dc')
{
  type= motor();

}

var numofmotor = Number (prompt ('How many motor want to show ?'));

for ( i = 1 ; i<=numofmotor ; i++)
{

if (type =='3 phase')

{
  var image ='<img src="https://www.electrical4u.com/wp-content/uploads/What-is-a-3-Phase-Induction-Motor.png" alt ="motor"/>'
  document.write(image);
}

else if (type =='1 phase')

{
  var image ='<img src="https://image.made-in-china.com/2f0j00waLGCWKrYibQ/Single-Phase-Yc-Electric-Motor-7-5kw-10HP-220V.jpg" alt ="motor"/>'
  document.write(image);
}

else if (type =='dc')


{
var image ='<img src="https://www.wellpcb.com/sites/default/files/1_195.jpg" alt ="motor"/>'
  document.write(image);
  
}


}



