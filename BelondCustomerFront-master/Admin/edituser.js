window.onload = function(){
    getAllCountry()
    getAllRoles()
    var urlParams = new URLSearchParams(window.location.search);
      param1Value  = parseInt(urlParams.get('id'));
      getById(param1Value)
}
let selectedRoleId = 0;
let selectedCountryId = 0;
async function getById(id) {
    try {
        const response = await fetch(apiUrl+'/user/getById/'+id);
        if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
        }
        const dat = await response.json();
        dynamicData = dat.response.result;
        console.log("Response:", dat);
        selectedCountryId = dynamicData.countryId
        selectedRoleId = dynamicData.roleId
        setValue(dynamicData);
        // Handle the response data here
      } catch (error) {
        console.error("Error:", error.message);
        // Display error message if request fails
        //alert(error.message);
    }
}
  function setValue(data) {
    document.getElementById('userId').value = data.id;
    document.getElementById('usrName').value = data.name;
    document.getElementById('email').value= data.email;
    document.getElementById('phoneNo').value = data.phoneNo;
    document.getElementById('passwrd').value = data.password;
    document.getElementById('countryBox').value = data.countryId;
    document.getElementById('userRole').value = data.roleId
    document.getElementById('allowedBooking').value = data.allowedNoOfRequest
    if (data.currentCommission === 1) {
        document.getElementById('bonus1').checked = true;
        } else if (data.currentCommission === 2) {
        document.getElementById('bonus2').checked = true;
        }
}
async function getById(id) {
    try {
        const response = await fetch(apiUrl+'/user/getById/'+id);
        if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
        }
        const dat = await response.json();
        dynamicData = dat.response.result;
        console.log("Response:", dat);
        selectedCountryId = dynamicData.countryId
        selectedRoleId = dynamicData.roleId
        setValue(dynamicData);
        // Handle the response data here
      } catch (error) {
        console.error("Error:", error.message);
        // Display error message if request fails
        //alert(error.message);
    }
}
var roleData=[];


async function getAllCountry() {
    try {
      const response = await fetch(apiUrl+'/country');
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      jsonData = await response.json();
      console.log("Response:", jsonData);
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Display error message if request fails
      //alert(error.message);
    }
    var select = document.getElementById("countryBox");
  
      // Clear existing options
      select.innerHTML = '';
  
      // Add new options
      jsonData.response.result.forEach(function(item) {
        var option = document.createElement("option");
        option.value = item.countryId;
        option.text = item.countryName+"--"+item.countryCode;
        if(item.countryId == selectedCountryId){
          option.selected = true
        }
        select.appendChild(option);
      });
  }
  

  async function addUser() {
    try {
      
          var name = document.getElementById('usrName').value;
          var userId = document.getElementById('userId').value;
          var email = document.getElementById('email').value;
          var phoneNo = document.getElementById('phoneNo').value;
          var password = document.getElementById('passwrd').value;
          var roleId = document.getElementById('userRole').value;
          var country = document.getElementById("countryBox").value;
          var AllowedBooking = document.getElementById('allowedBooking').value
          var bonus = document.getElementById('bonus1').checked === true ?  
          document.getElementById('bonus1').value : document.getElementById('bonus2').value
        //   var jsonData = {
        //     "id":userId,
        //       "name": name, 
        //       "email": email,
        //       "roleId": parseInt(roleId),
        //       "phoneNo": phoneNo,
        //       "password": password,
        //       "currentCommission" : bonus
        //   };
          const formData = new FormData()
          formData.append('id', userId)
          formData.append('name', name)
          formData.append('email', email)
          formData.append('roleId', parseInt(roleId))
          formData.append('phoneNo', phoneNo)
          formData.append('password', password)
          formData.append('countryId', country)
          formData.append('currentCommission', bonus)
          formData.append('AllowedBooking', AllowedBooking)
          // Here, you can use 'jsonData' to make your API request
        //   console.log(jsonData);
      const response = await fetch(apiUrl + '/user', {
        method: 'PUT',
        body: formData,
        
      });
      if(response.ok){
        window.location.href = 'premium.html';
      }
      if (!response.ok) {
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
  var roleData=[];
async function getAllRoles() {
  try {
    const response = await fetch(apiUrl+'/role/getAllRoles');
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    roleData = await response.json();
    // console.log("Response:", jsonData);
    // Handle the response data here
  } catch (error) {
    console.error("Error:", error.message);
    // Display error message if request fails
    //alert(error.message);
  }
  var select = document.getElementById("userRole");

    // Clear existing options
    select.innerHTML = '';

    // Add new options
    roleData.response.result.forEach(function(item) {
      var option = document.createElement("option");
      option.value = item.id;
      option.text = item.name;
      if(item.id == selectedRoleId){
        option.selected = true
      }
      select.appendChild(option);
    });
}
  