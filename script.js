console.log("abcd");
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database'; 
// Initialize Firebase (ADD YOUR OWN DATA)

const firebaseConfig = {
    apiKey: "AIzaSyDtX4OWk4DBn5f_APfGcwiwI6qMXBCKfhk",
    authDomain: "myfireapp-8d543.firebaseapp.com",
    databaseURL: "https://myfireapp-8d543-default-rtdb.firebaseio.com",
    projectId: "myfireapp-8d543",
    storageBucket: "myfireapp-8d543.appspot.com",
    messagingSenderId: "484285304427",
    appId: "1:484285304427:web:54c53464c02f04a4646b2e"
  };

  firebase.initializeApp(firebaseConfig);

  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
  
  // Listen for form submit
  document.getElementById('signupForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var firstName = getInputVal('firstName');
    var lastName = getInputVal('lastName');
    var phonenumber = getInputVal('phonenumber');
    var email = getInputVal('email');
    var password = getInputVal('password');
  
    console.log(firstName,lastName,phonenumber,email,password);
    // Perform validation
    const firstNameValid = validateFirstName(firstName);
    const lastNameValid = validateLastName(lastName);
    const phoneNumberValid = validatePhoneNumber(phonenumber);
    const emailValid = validateEmail(email);
    const passwordValid=validatePassword(password);

    //display error
    displayError('firstNameError',firstNameValid,'Please enter a valid firstname')
    displayError('lastNameError',lastNameValid,'Please enter a valid lastname')
    displayError('phoneNumberError',phoneNumberValid,'Please entre a valid phonenumber')
    displayError('emailError',emailValid,'Please enter a valid email')
    displayError('passWordError',passwordValid,'Please enter a valid password')

    // Send message values to Firestore
    if(firstNameValid && lastNameValid &&  phoneNumberValid && emailValid && passwordValid){
        console.log(firstName,lastName,phonenumber,email,password);
        saveMessage(firstName,lastName,phonenumber,email,password); 
    }   
  }
  
  // Function to get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(firstName, lastName, phonenumber, email,password){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      firstName: firstName,
      lastName:lastName,
      phonenumber:phonenumber,
      email:email,
      password:password
    })
    .then(()=>{
        // Show alert
        document.querySelector('.alert').style.display = 'block';
  
        // Hide alert after 3 seconds
        setTimeout(function(){
          document.querySelector('.alert').style.display = 'none';
        },7000);
      
        // Clear form
        document.getElementById('signupForm').reset();
    })
  }

  // Login form submission
    document.getElementById('loginForm').addEventListener('submit', (e) => {
     e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            document.getElementById('successMessage').textContent = `Logged in as ${user.email}`;
            document.getElementById('logoutButton').style.display = 'block';
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById('loginErrorMessage').textContent = errorMessage;
        });
    });

    // Logout button click event
    document.getElementById('logoutButton').addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                document.getElementById('successMessage').textContent = 'Logged out';
                document.getElementById('logoutButton').style.display = 'none';
                document.getElementById('loginEmail').value = '';
                document.getElementById('loginPassword').value = '';
            })
            .catch((error) => {
                const errorMessage = error.message;
                document.getElementById('loginErrorMessage').textContent = errorMessage;
            });
    });

    // User state change listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            document.getElementById('successMessage').textContent = `Logged in as ${user.email}`;
            document.getElementById('logoutButton').style.display = 'block';
        } else {
            // User is signed out
            document.getElementById('successMessage').textContent = 'Logged out';
            document.getElementById('logoutButton').style.display = 'none';
        }
    });

  //Validation functions
  function validateFirstName(firstName){
        return firstName;
  }

  function validateLastName(lastName){
        return lastName;
  }

  function validatePhoneNumber(phonenumber){
        const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phonenumber);
  }

  function validateEmail(email){
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
  }

  function validatePassword(password){
        return password.length >= 3;
  }

  //Function to display error messages
  function displayError(errorElementId,isValid,errorMessage){
        const errorElement = document.getElementById(errorElementId);
        if (!isValid) {
            errorElement.textContent = errorMessage;
        } else {
            errorElement.textContent = '';
        }
  }
