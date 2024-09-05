function changeTheme () {
  document.getElementById('home-body').style.backgroundColor='#656778'
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

const signInModal = document.getElementById('signInModal')
const signInButton = document.getElementById('signInButton')
const close = document.getElementById('close')
const email = document.getElementById('email')
const password = document.getElementById('password')
const submit = document.getElementById('submit')

signInButton.onclick = function() {
  signInModal.style.display = 'block';
}

close.onclick = function() {
  signInModal.style.display = 'none';
}

submit.addEventListener('click', () => {
  const userEmail = email.value
  alert(userEmail)
  console.log(`E-mail: ${email.value}`);
  const userPassword = password.value
  alert(userPassword)
  console.log('Password:', password.value);
})