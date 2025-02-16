async function getAllCountry() {
    try {
        // showLoader()
    const response = await fetch(apiUrl+'/country');
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    var jsonData = await response.json();
    //   hideLoader()
    // Handle the response data here
    } catch (error) {
    console.error("Error:", error.message);
    // Display error message if request fails
    // //alert(error.message);
    }
    var select = document.getElementById("countryBox");

    // Clear existing options
    select.innerHTML = '';

    // Add new options
    jsonData.response.result.forEach(function(item) {
        var option = document.createElement("option");
        option.value = item.countryId;
        option.text = item.countryName+"--"+item.countryCode;
        select.appendChild(option);
    });
}

async function postDataUserRegister(event) {
    try {
        // event.preventdefault()
        const buttons = document.querySelectorAll("#successBtn");

        // Loop through each button and add the class
        buttons.forEach(button => {
          button.classList.add("loading-btn");
        });

        var username = document.getElementById("username").value.trim();
    var email = document.getElementById("email").value.trim();
    var country = document.getElementById("countryBox").value.trim();
    var mobileNumber = document.getElementById("mobileNumber").value.trim();
    var password = document.getElementById("password").value.trim();
    var confirmPassword = document.getElementById("confirmPassword").value.trim();
    var invitationCode = document.getElementById("invitationCode").value.trim();

    // Check if any field is empty
    if (!username || !email || !country || !mobileNumber || !password || !confirmPassword || !invitationCode) {
        alert('Please fill in all fields.');
        buttons.forEach(button => {
            button.classList.remove("loading-btn");
          });
        return; // Stop the function if any field is empty
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert('Password and Confirm Password do not match.');
        buttons.forEach(button => {
            button.classList.remove("loading-btn");
          });
        return; // Stop the function if passwords don't match
    }
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var country = document.getElementById("countryBox").value;
        var mobileNumber = document.getElementById("mobileNumber").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var invitationCode = document.getElementById("invitationCode").value;
        
        var formData = {
            name: username,
            email: email,
            countryId: parseInt(country),
            phoneNo: mobileNumber,
            password: password,
            confirmPassword: confirmPassword,
            invitationCode: invitationCode,
            roleId: 1
        };
      const response = await fetch(apiUrl + '/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      console.log("Response:", data);
    //   successMessage(data.response)
    alert(data.response)
    buttons.forEach(button => {
        button.classList.remove("loading-btn");
      });
      if(data.response == "Created Successfully"){
        window.location.href = "../login/index.html"
      }
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Display error message if request fails
      // //alert(error.message);
    }
  }
  