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
  
<<<<<<< HEAD
var type =motor();

while ( type !=='3 phase' && type !=='1 phase' && type !=='dc')
{
   motor();
=======
 var motor = prompt ('Please Enter the type you want to see it (3 phase , 1 phase , dc )');

while ( motor !=='3 phase' && motor !=='1 phase' && motor !=='dc')
{
   motor = prompt ('Please Enter the type you want to see it (3 phase , 1 phase , dc )');
>>>>>>> 3191cc4f7e2f45eae96adc6558cbc11517377a8b
}

var numofmotor = Number (prompt ('How many motor want to show ?'));

for ( i = 1 ; i<=numofmotor ; i++)
{

<<<<<<< HEAD
if (type =='3 phase')
=======
if (motor=='3 phase')
>>>>>>> 3191cc4f7e2f45eae96adc6558cbc11517377a8b

{
  var image ='<img src="https://www.electrical4u.com/wp-content/uploads/What-is-a-3-Phase-Induction-Motor.png" alt ="motor"/>'
  document.write(image);
}

<<<<<<< HEAD
else if (type =='1 phase')
=======
else if (motor=='1 phase')
>>>>>>> 3191cc4f7e2f45eae96adc6558cbc11517377a8b
{
  var image ='<img src="https://image.made-in-china.com/2f0j00waLGCWKrYibQ/Single-Phase-Yc-Electric-Motor-7-5kw-10HP-220V.jpg" alt ="motor"/>'
  document.write(image);
}
<<<<<<< HEAD
else if (type =='dc')
=======
else if (motor=='dc')
>>>>>>> 3191cc4f7e2f45eae96adc6558cbc11517377a8b
{
var image ='<img src="https://www.wellpcb.com/sites/default/files/1_195.jpg" alt ="motor"/>'
  document.write(image);
}

<<<<<<< HEAD
}
=======
}
>>>>>>> 3191cc4f7e2f45eae96adc6558cbc11517377a8b
