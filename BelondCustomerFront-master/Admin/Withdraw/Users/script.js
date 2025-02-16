
var currentPage = 1;
$(document).ready(function() {
fetchUsers(currentPage,10);
if(localStorage.getItem('userRole')==='Second Admin'){
    document.getElementById('addNew').style.display = 'none';
}
});

function search(){
    var searchText = document.getElementById('phone').value
    searchList(currentPage,10,searchText)
}

function fetchUsers(pageNumber,pageSize) {
    
    $.ajax({
        url: `${apiUrl}/user/get?pageNo=${parseInt(pageNumber)}&pageSize=${pageSize}&InvitationCode=${localStorage.getItem('invitationCode')}`,  // API endpoint to fetch all bookings
        method: 'GET',
        success: function(response) {
            renderBookings(response);  // Assuming the response is an array of bookings
        },
        error: function(err) {
            alert('Error fetching bookings.');
        }
    });
}

function searchList(pageNumber,pageSize,search) {
    $.ajax({
        url: `${apiUrl}/user/get?pageNo=${parseInt(pageNumber)}&pageSize=${pageSize}&InvitationCode=${localStorage.getItem('invitationCode')}&searchValue=${search}`,  // API endpoint to fetch all bookings
        method: 'GET',
        success: function(response) {
            renderBookings(response);  // Assuming the response is an array of bookings
        },
        error: function(err) {
            alert('Error fetching bookings.');
        }
    });
}

// Render all bookings to the table
function renderBookings(bookings) {
    $('#bookingsTable').empty();
    bookings.response.userData.forEach(function(booking, index) {
        const row = `
            <tr>
                <td class="id">${booking.id}</td>
                <td> <h4>${booking.name}</h4>
                        
                <td class="rentFee">
                            <span class="fees flex"><i class="uil uil-envelope icon"></i>${booking.email}</span>
                        </td>
                        <td>
                            <h4>${booking.statusName}</h4>
                        </td>
                        <td class="status">
                            <div class="allProperties flex align-items-center gap-2">
                                <button type="button" class="px-4 py-2 bg-custom text-white rounded" onclick="submitStatus(${booking.id},2)">Freeze</button>
                                <button type="button" class="px-4 py-2 bg-custom text-white rounded" onclick="submitStatus(${booking.id},1)">Unfreeze</button>
                            </div>
                        </td>
                           <td>
                            <button name="submit" onclick="openBankDetailModal(${booking.id})" class="px-4 py-2 bg-custom text-white rounded"> Edit</button>
                           </td>
                           <td>
                            <a onclick="window.location.href='edituser.html?id=${booking.id}'">
                            <button name="submit" class="px-4 py-2 bg-custom text-white rounded" >Edit</button>
                        </a>
                           </td>
                           <td>${booking.roleName}</td>
                
            </tr>
        `;
        $('#bookingsTable').append(row);
    });
}

async function submitStatus(userId, statusId) {
    try {
        const response = await fetch(apiUrl+'/user/updateStatus/'+userId +'/'+statusId,{
            method: 'PUT'
        });
        if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
        }
        const dat = await response.json();
        dynamicData = dat.response;
        console.log("Response:", dat);
        location.reload()
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function addNewUser(){
    window.location.href="adduser.html"
}

async function getAllCountry() {
    try {
        // showLoader()
    const response = await fetch(apiUrl+'/country');
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    var jsonData = await response.json();
    } catch (error) {
    console.error("Error:", error.message);
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

async function getAllRoles() {
    try {
        // showLoader()
    const response = await fetch(apiUrl+'/role/getAllRoles');
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    var jsonData = await response.json();
    } catch (error) {
    console.error("Error:", error.message);
    }
    var select = document.getElementById("roleBox");

    // Clear existing options
    select.innerHTML = '';

    // Add new options
    jsonData.response.result.forEach(function(item) {
        if (item.name !== "Super Admin") { // ✅ Skip Super Admin
            var option = document.createElement("option");
            option.value = item.id;
            option.text = item.name;
            select.appendChild(option);
        }
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
    var invitationCode = document.getElementById("invitationCode").value.trim();

    // Check if any field is empty
    if (!username || !email || !country || !mobileNumber || !password || !confirmPassword || !invitationCode || !invitationCode) {
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
        var currentCommission = document.getElementById("depositType").value;
        var roleId = document.getElementById("roleBox").value;
        var formData = {
            name: username,
            email: email,
            countryId: parseInt(country),
            phoneNo: mobileNumber,
            password: password,
            confirmPassword: confirmPassword,
            invitationCode: invitationCode,
            roleId: roleId,
            currentCommission: currentCommission,
            isAdmin: true
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
        window.location.href = "user.html"
      }
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Display error message if request fails
      // //alert(error.message);
    }
  }

async function  openBankDetailModal(id){
    
    document.getElementById('modal').classList.remove('hidden');
    try {
        goToSetVal(id)
          const response = await fetch(apiUrl+'/UserBankDetail/getById/'+id);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const dat = await response.json();
        if(dat.response!=null){
          // document.getElementById('uPIId').value = dat.response.upiId;
          document.getElementById('iPSCCode').value = dat.response.ipscCode;
          document.getElementById('bankName').value = dat.response.bankName;
          document.getElementById('bankAccountNo').value = dat.response.accountNo;
          document.getElementById('acountHolderName').value = dat.response.accountHolder;
          // document.getElementById('bankDetailID').value = dat.response.bankDetailId;
        }
        console.log("Response:", dat);
        // Handle the response data here
      } catch (error) {
        console.error("Error:", error.message);
        // Display error message if request fails
        //alert(error.message);
      }
  }

function closeBankDetailModal(){
    document.getElementById('modal').classList.add('hidden');
}

function goToSetVal(id){
    document.getElementById('usrID').value=id;
}

async function updateBank() {
    try {
        document.getElementById('loading').classList.remove('hidden');
      var upiId = '12354';
      var userId = document.getElementById('usrID').value;
      var ipscCode = document.getElementById('iPSCCode').value;
      var bankName = document.getElementById('bankName').value;
      var accountNo = document.getElementById('bankAccountNo').value;
      var accountHolderName = document.getElementById('acountHolderName').value;
          var userData = {
            uPIId : upiId,
            iPSCCode: ipscCode,
            bankName: bankName,
            accountNo: accountNo,
            accountHolder: accountHolderName,
            userId: userId
          }
          const response = await fetch(apiUrl + '/UserBankDetail', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
      if(response.ok){
          goToRemVal()
          document.getElementById('loading').classList.add('hidden');
        window.location.href = 'user.html';
      }
      if (!response.ok) {
        document.getElementById('loading').classList.add('hidden');
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Display error message if request fails
      //alert(error.message);
    }
  }
  function goToRemVal(){
    document.getElementById('usrID').value='';
  }