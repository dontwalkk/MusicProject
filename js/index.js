function changeTheme () {
  document.getElementById('home-body').style.backgroundColor='#656778'
  // document.getElementsByClassName('header-container').style.backgroundColor='#101220'
  var elements = document.getElementsByClassName('header-container'); // get all elements
  var headerContent=document.getElementsByClassName('header-content')
	for(var i = 0; i < elements.length; i++){
    console.log(i)
		elements[i].style.backgroundColor = "#101220";
    headerContent[i].style.backgroundColor = "#838597";
    headerContent[i].style.color = "white";
	}
  document.getElementById('nav-bar').style.backgroundColor='#565869'
}