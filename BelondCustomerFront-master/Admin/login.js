async function login() {
    // Prevent default behavior of the <a> tag
    // event.preventDefault();
    
    const buttons = document.querySelectorAll("#successBtn");

    // Loop through each button and add the class
    buttons.forEach(button => {
      button.classList.add("loading-btn");
    });
    // Fetch input values
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    // Log values to check if they're fetched
    console.log("Email:", email, "Password:", password);

    // Validate inputs
    if (!email || !password) {
        showNotification('error',"Please enter both email and password");
        buttons.forEach(button => {
            button.classList.remove("loading-btn");
          });
        return;
    }
    var formData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch(apiUrl + '/User/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const data = await response.json();

        if (data.response != null) {
            if (data.success && (data.response.roleName !== 'Customer')) {
                // Handle successful login
                showNotification('success','Login Successfully!');
                localStorage.setItem('userId', data.response.id);
                localStorage.setItem('userName', data.response.name);
                localStorage.setItem('noOfRAllowed', data.response.allowedNoOfRequest);
                localStorage.setItem('token', data.response.token)
                localStorage.setItem('invitationCode', data.response.invitationCode)
                localStorage.setItem('userRole', data.response.roleName)
                
                window.location.href = "dashboard.html";
            } else {
                buttons.forEach(button => {
                    button.classList.remove("loading-btn");
                  });
                  showNotification('error','Invalid Username or Password');
            }
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}