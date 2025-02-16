var currentPage = 1;
$(document).ready(function() {
fetchUsers(currentPage,10);
// getById(localStorage.getItem('userId'))
});
var customerType;

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
function addUserPoints() {
  
  var userId = document.getElementById('usrID').value
  var points = parseInt(document.getElementById('points').value)
  if(points > 100 || points < 0){
   alert('Please enter points between 0 and 100')
   return
  }
  var response = fetch(apiUrl + '/user/points/' + userId + '/' + points , {
    method: 'PUT'
  });
  togglePoint()
if(response.ok){
        goToRemVal()
      window.location.reload()
    }
	    if (!response.ok) {
      const errorMessage = response.text();
      throw new Error(errorMessage);
    }
}
// Render all bookings to the table
function renderBookings(bookings) {
    $('#bookingsTable').empty();
    bookings.response.userData.forEach(function(booking, index) {
        const row = `
            <tr>
                        <td class="id">${booking.id}</td>
                        <td onclick="openAmountModal(${booking.id})"> <h4>${booking.name}</h4>
                        </td>
                        <td class="rentFee">
                            <span class="fees flex"><i class="uil uil-envelope icon"></i>${booking.email}</span>
                        </td>
                        <td>
                            <h4>${booking.invitationCode}</h4>
                          </td>
                        <td class="sDate">
                            <span class="date flex"><i class="uil uil-phone icon"></i>${booking.phoneNo}</span>   
                        </td>
                        <td>
                            <button  class="btn bg flex" onclick="toggleModal(),goToSetVal(${booking.id}),isTreasure(${false})"> Restrict </button>
                            <p>${booking.userTotalBookingCount} | <i onclick="getRequest(${booking.id}),goToSetVal(${booking.id})">${booking.depositPayment}</i> </p>
                        </td>
                        <td>
                          <button name="submit" class="btn bg flex" onclick="reset(${booking.id})"> Reset</button>
                          </td>
                           <td>
                            <button type="button" onclick="goToSetVal(${booking.id}), togglePoint()" name="submit" class="btn bg flex">Add </button>
                          </td>
                           <td>
                            <button name="submit" class="btn bg flex" onclick="toggleModal(),goToSetVal(${booking.id}), isTreasure(${true})"> Add</button>
                           </td>
                           <td>
                            <button name="submit" class="btn bg flex" onclick="toggleTreasureModal(),goToSetVal(${booking.id})"> Add</button>
                           </td>
                           <td>
                            <button name="submit" class="btn bg flex" onclick="toggleBookingValueModal(),goToSetVal(${booking.id}),fetchUserInitialVal(${booking.id})"> Add</button>
                           </td>
                           <td>
                           <td>${booking.isLogin === true ? 'Online':'Offline'}</td>
                         </td>
                    </tr>
        `; //<td>
        //     <button name="submit" class="btn bg flex"> View </button>
        //    </td>
        //    
        //    
        // <td>
        //                     <button name="submit" class="btn bg flex"> Add </button>
        //                    </td>
        //                    <td>
        //                     <button name="submit" class="btn bg flex"> Add </button>
        //                    </td>
        if(booking.roleName === 'Customer'){
            $('#bookingsTable').append(row);
        }
    });
}
function goToSetVal(id){
    
    document.getElementById('usrID').value=id;
}
async function reset(id) {
  return fetch(apiUrl + '/user/resetUser/' + id)
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorMessage => {
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
    .then(dat => {
      window.location.reload()
    })
    .catch(error => {
      console.error("Error:", error.message);
      //alert(error.message); 
      throw error; 
    });
}
function getPendingAmount(){
    var pending1 = document.getElementById('pendingAmount1')
    var pending2 = document.getElementById('pendingAmount2')
    var pending3 = document.getElementById('pendingAmount3')
    var pending4 = document.getElementById('pendingAmount4')
    var pending5 = document.getElementById('pendingAmount5')
    var pending6 = document.getElementById('pendingAmount6')
    if(pending1.checked === true){
      document.getElementById('pendingAmount1').value = getRandomValueInRange(39000, 42000)
    }
    else if(pending2.checked === true){
      document.getElementById('pendingAmount2').value = getRandomValueInRange(99000, 112000)
    }
    else if(pending3.checked === true){
      document.getElementById('pendingAmount3').value = getRandomValueInRange(312000, 318000)
    }
    else if(pending4.checked === true){
      document.getElementById('pendingAmount4').value = getRandomValueInRange(612000, 718000)
    }
   
  }
  function getCommissionAmount(){
    var pending1 = document.getElementById('commissionAmount1')
    var pending2 = document.getElementById('commissionAmount2')
    var pending3 = document.getElementById('commissionAmount3')
    var pending4 = document.getElementById('commissionAmount4')
    var pending5 = document.getElementById('commissionAmount5')
    var pending6 = document.getElementById('commissionAmount6')
    if(pending1.checked === true){
      document.getElementById('commissionAmount1').value = getRandomValueInRange(5000, 7000)
    }
    else if(pending2.checked === true){
      document.getElementById('commissionAmount2').value = getRandomValueInRange(9000, 12000)
    }
    else if(pending3.checked === true){
      document.getElementById('commissionAmount3').value = getRandomValueInRange(21000, 27000)
    }
    else if(pending4.checked === true){
      document.getElementById('commissionAmount4').value = getRandomValueInRange(41000, 47000)
    }
   
  }
  function getRandomValueInRange(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async function addDeposit() {
    try {
      const buttons = document.querySelectorAll("#paymentModal");
      const button = document.querySelectorAll("#paymentModalDelete");
    // Loop through each button and add the class
    buttons.forEach(button => {
      button.classList.add("loading-btn");
    });
    button.forEach(button => {
      button.classList.add("loading-btn");
    });
      if($("#paymentModal").html() === 'Update'){
        const formData = new FormData()
        var userId = document.getElementById('usrID').value;
        var paymentRequestId = document.getElementById('userPaymentRequestId').value 
        var pendingAmountId = document.getElementById('pendingAmountId').value
        var commissionAmountId = document.getElementById('commissionAmountId').value
        var bookingCount = document.getElementById('bookingCount').value;
        var depositAmount = document.getElementById('payment').value;
        var pendingAmount = document.getElementById('pendingAmount1').checked === true ? document.getElementById('pendingAmount1').value : 
        document.getElementById('pendingAmount2').checked === true ? document.getElementById('pendingAmount2').value :
        document.getElementById('pendingAmount3').checked === true ? document.getElementById('pendingAmount3').value :
        document.getElementById('pendingAmount4').checked === true ? document.getElementById('pendingAmount4').value :
        document.getElementById('pendingAmount5').checked === true ? document.getElementById('pendingAmount5').value :
        document.getElementById('pendingAmount6').checked === true ? document.getElementById('pendingAmount6').value :
        alert('Please select atleast on option for pending amount');
var commissionAmount = document.getElementById('commissionAmount1').checked === true ? document.getElementById('commissionAmount1').value : 
          document.getElementById('commissionAmount2').checked === true ? document.getElementById('commissionAmount2').value :
          document.getElementById('commissionAmount3').checked === true ? document.getElementById('commissionAmount3').value :
          document.getElementById('commissionAmount4').checked === true ? document.getElementById('commissionAmount4').value :
          document.getElementById('commissionAmount5').checked === true ? document.getElementById('commissionAmount5').value :
          document.getElementById('commissionAmount6').checked === true ? document.getElementById('commissionAmount6').value :
          alert('Please select atleast on option for commission amount');
          // formData.append('payment', depositAmount)
            formData.append('userId', parseInt(userId))
            formData.append('totalCount',parseInt(bookingCount))
            formData.append('commissionAmount',commissionAmount)
            formData.append('commissionAmountId',parseInt(commissionAmountId))
            formData.append('depositAmount',depositAmount)
            formData.append('paymentRequestId',parseInt(paymentRequestId))
            formData.append('pendingAmount',pendingAmount)
            formData.append('pendingAmountId',parseInt(pendingAmountId))
            $.ajax({
              url: `${apiUrl}/UserBonus`,  // API endpoint to update the booking
              method: 'PUT',
              data: formData,
              contentType: false,
              processData: false,
              success: function(response) {
                buttons.forEach(button => {
                  button.classList.add("loading-btn");
                });
                button.forEach(button => {
                  button.classList.remove("loading-btn");
                });
                  alert('Booking updated successfully.');
                  window.location.href = "premium.html"
              },
              error: function(err) {
                  alert('Error updating booking.');
              }
          });
      }
      else{
        var depositAmount = document.getElementById('payment').value;
        var userId = document.getElementById('usrID').value;
        var bookingCount = document.getElementById('bookingCount').value;
        var pendingAmount = document.getElementById('pendingAmount1').checked === true ? document.getElementById('pendingAmount1').value : 
                            document.getElementById('pendingAmount2').checked === true ? document.getElementById('pendingAmount2').value :
                            document.getElementById('pendingAmount3').checked === true ? document.getElementById('pendingAmount3').value :
                            document.getElementById('pendingAmount4').checked === true ? document.getElementById('pendingAmount4').value :
                            document.getElementById('pendingAmount5').checked === true ? document.getElementById('pendingAmount5').value :
                            document.getElementById('pendingAmount6').checked === true ? document.getElementById('pendingAmount6').value :
                            alert('Please select atleast on option for pending amount');
        var commissionAmount = document.getElementById('commissionAmount1').checked === true ? document.getElementById('commissionAmount1').value : 
                              document.getElementById('commissionAmount2').checked === true ? document.getElementById('commissionAmount2').value :
                              document.getElementById('commissionAmount3').checked === true ? document.getElementById('commissionAmount3').value :
                              document.getElementById('commissionAmount4').checked === true ? document.getElementById('commissionAmount4').value :
                              document.getElementById('commissionAmount5').checked === true ? document.getElementById('commissionAmount5').value :
                              document.getElementById('commissionAmount6').checked === true ? document.getElementById('commissionAmount6').value :
                              alert('Please select atleast on option for commission amount');
        var paymentType = document.getElementById('type1').checked === true ? document.getElementById('type1').value : 
                    document.getElementById('type2').checked === true ? document.getElementById('type2').value :
                    alert('Please select one of the checkbox');  
                    if(pendingAmount === undefined || commissionAmount === undefined || paymentType === undefined){
                      return;
                    }
            const formData = new FormData()
            formData.append('payment', depositAmount)
            formData.append('userId', parseInt(userId))
            formData.append('bookingCount',bookingCount)
            formData.append('commissionAmount',commissionAmount)
            formData.append('pendingPayment',pendingAmount)
            formData.append('paymentType',parseInt(paymentType))
            // Here, you can use 'jsonData' to make your API request
            const response = await fetch(apiUrl + '/userdeposit/createUserPaymentRequest', {
            method: 'POST',
            body: formData,
          
        });
        if(response.ok){
          buttons.forEach(button => {
            button.classList.add("loading-btn");
          });
          
          var isTreasure = localStorage.getItem('isTreasure')
          if(isTreasure == "true"){
            addTreasureAmount(bookingCount,commissionAmount, userId)
          }
            goToRemVal()
          window.location.href = 'premium.html';
        }
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        // Handle the response data here
      }
    } 
    catch (error) {
      buttons.forEach(button => {
        button.classList.add("loading-btn");
      });
      console.error("Error:", error.message);
      // Display error message if request fails
      //alert(error.message);
    }
  }
  function goToRemVal(){
    document.getElementById('usrID').value=null;
  }
  async function addTreasureAmount(restrict,amount, userId) {
    // var userId = document.getElementById('usrID').value
    // var points = parseInt(document.getElementById('treasureAmount').value)
    // var restrict = parseInt(document.getElementById('restrictBookingCount').value)
    var premium = 1
    var response =await fetch(apiUrl + '/user/updateTreasure/' + userId + '/' + amount +'/'+ restrict + '/' + premium, {
      method: 'PUT'
    });
  if(response.ok){
          goToRemVal()
        window.location.reload()
      }
        if (!response.ok) {
        const errorMessage = response.text();
        throw new Error(errorMessage);
      }
  }
  function isTreasure(isTreasure){
    localStorage.setItem('isTreasure', isTreasure)
  }
 async function getRequest(userId){
  document.getElementById('paymentModalDelete').style.display = 'block'
  $.ajax({
    url: `${apiUrl}/userbonus/getUserPaymentReqeuest/${userId}`,  // API endpoint to fetch all bookings
    method: 'GET',
    success: function(response) {
      if(response.response.totalCount != null){
        toggleModal()
        document.getElementById('bookingCount').value = response.response.totalCount
        document.getElementById('payment').value = response.response.depositAmount
        document.getElementById('userPaymentRequestId').value = response.response.paymentRequestId
        const ranges = [
          { id: "pendingAmount1", min: 39000, max: 42000 },
          { id: "pendingAmount2", min: 99000, max: 112000 },
          { id: "pendingAmount3", min: 312000, max: 318000 },
          { id: "pendingAmount4", min: 612000, max: 718000 }
      ];
  
      // Loop through the ranges to find the correct one
      for (let range of ranges) {
          if (parseFloat(response.response.pendingAmount) >= range.min && parseFloat(response.response.pendingAmount) <= range.max) {
              document.getElementById(range.id).checked = true;
              break; // Stop checking after the first match
          }
      }
      commissionAmount = parseFloat(response.response.commissionAmount);
    const commissionRanges = [
        { id: "commissionAmount1", min: 5000, max: 7000 },
        { id: "commissionAmount2", min: 9000, max: 12000 },
        { id: "commissionAmount3", min: 21000, max: 27000 },
        { id: "commissionAmount4", min: 41000, max: 47000 }
    ];
    for (let range of commissionRanges) {
        if (parseFloat(response.response.commissionAmount) >= range.min && parseFloat(response.response.commissionAmount) <= range.max) {
            document.getElementById(range.id).checked = true;
            break; // Stop checking after the first match
        }
    }
    document.getElementById('userPaymentRequestId').value = response.response.paymentRequestId
    document.getElementById('pendingAmountId').value = response.response.pendingAmountId
    document.getElementById('commissionAmountId').value = response.response.commissionAmountId
    
    document.getElementById('type1').checked = true
    $("#paymentModal").html("Update");
      }// Assuming the response is an array of bookings
    },
    error: function(err) {
        alert('Error fetching bookings.');
    }
});
  }
async function deletePaymentRequest(){
  const buttons = document.querySelectorAll("#paymentModalDelete");
  const button = document.querySelectorAll("#paymentModal");
  // Loop through each button and add the class
  buttons.forEach(button => {
    button.classList.add("loading-btn");
  });
  button.forEach(button => {
    button.classList.add("loading-btn");
  });
  const formData = new FormData()
  var userId = document.getElementById('usrID').value;
  var paymentRequestId = document.getElementById('userPaymentRequestId').value 
  var pendingAmountId = document.getElementById('pendingAmountId').value
  var commissionAmountId = document.getElementById('commissionAmountId').value
  var bookingCount = document.getElementById('bookingCount').value;
  var depositAmount = document.getElementById('payment').value;
  var pendingAmount = document.getElementById('pendingAmount1').checked === true ? document.getElementById('pendingAmount1').value : 
  document.getElementById('pendingAmount2').checked === true ? document.getElementById('pendingAmount2').value :
  document.getElementById('pendingAmount3').checked === true ? document.getElementById('pendingAmount3').value :
  document.getElementById('pendingAmount4').checked === true ? document.getElementById('pendingAmount4').value :
  document.getElementById('pendingAmount5').checked === true ? document.getElementById('pendingAmount5').value :
  document.getElementById('pendingAmount6').checked === true ? document.getElementById('pendingAmount6').value :
  alert('Please select atleast on option for pending amount');
var commissionAmount = document.getElementById('commissionAmount1').checked === true ? document.getElementById('commissionAmount1').value : 
    document.getElementById('commissionAmount2').checked === true ? document.getElementById('commissionAmount2').value :
    document.getElementById('commissionAmount3').checked === true ? document.getElementById('commissionAmount3').value :
    document.getElementById('commissionAmount4').checked === true ? document.getElementById('commissionAmount4').value :
    document.getElementById('commissionAmount5').checked === true ? document.getElementById('commissionAmount5').value :
    document.getElementById('commissionAmount6').checked === true ? document.getElementById('commissionAmount6').value :
    alert('Please select atleast on option for commission amount');
    // formData.append('payment', depositAmount)
      formData.append('userId', parseInt(userId))
      formData.append('totalCount',parseInt(bookingCount))
      formData.append('commissionAmount',commissionAmount)
      formData.append('commissionAmountId',parseInt(commissionAmountId))
      formData.append('depositAmount',depositAmount)
      formData.append('paymentRequestId',parseInt(paymentRequestId))
      formData.append('pendingAmount',pendingAmount)
      formData.append('pendingAmountId',parseInt(pendingAmountId))

        $.ajax({
          url: `${apiUrl}/UserBonus/deletePaymentRequest`,  // API endpoint to update the booking
          method: 'PUT',
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
            buttons.forEach(button => {
              button.classList.remove("loading-btn");
            });
            button.forEach(button => {
              button.classList.remove("loading-btn");
            });
              alert('Booking deleted successfully.');
              window.location.href = "premium.html"
          },
          error: function(err) {
            buttons.forEach(button => {
              button.classList.remove("loading-btn");
            });
            button.forEach(button => {
              button.classList.remove("loading-btn");
            });
              alert('Error updating booking.');
          }
      });
}
async function openAmountModal(userId){
  toggle()
  document.getElementById('todayCommission').innerHTML = '' 
  document.getElementById('totalCommission').innerHTML = ''
  document.getElementById('pendingAmount').innerHTML = ''
  const totalCommission = await getUserTotalCount(userId);
  const pendingWithdrawAmount = await getpendingwithdrawamount(userId);
  const todayCommission = await todayBookingCommission(userId);
  document.getElementById('todayCommission').innerHTML = todayCommission 
  document.getElementById('totalCommission').innerHTML = totalCommission
  document.getElementById('pendingAmount').innerHTML = pendingWithdrawAmount
}
async function getUserTotalCount(userId) {
  try {    
        const response = await fetch(apiUrl+'/booking/totalCount/'+userId);
        if(!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const dat = await response.json();
      var totalCounting=dat.response.result;
      return getUserPaymentRquest(userId,totalCounting);
    } catch (error) {
      console.error("Error:", error.message);
  }
}
async function getUserPaymentRquest(id,alloReq) {
  try { 
      const response = await fetch(apiUrl+'/userdeposit/getPaymentRequest/'+parseInt(id));
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    const dat = await response.json();
    const totalCountin=dat.response?.bookingCount;
    if(parseInt(alloReq) === parseInt(totalCountin) ){
     return '-'+dat.response?.result?.payment
    }
    else{
       if(dat.response == null || dat.response.payment === 0) {
        return getUserTotalCommission(id)
       }  
       else{
        return getUserTotalCommission(id) 
      } 
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
function getpendingwithdrawamount(id) {
  return fetch(apiUrl + '/withdraw/getpendingwithdrawamount/' + id)
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorMessage => {
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
    .then(dat => {
      const pendingAmount = dat.response;
      return parseInt(pendingAmount, 10); // Parse totalCounting as integer
    })
    .catch(error => {
      console.error("Error:", error.message);
      //alert(error.message); // Display error message if request fails
      throw error; // Re-throw the error to propagate it
    });
}
function todayBookingCommission(id) {
  return fetch(apiUrl + '/booking/todayBookingCommission/' + id)
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorMessage => {
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
    .then(dat => {
      const todayCommission = dat.response?.result;
      return parseInt(todayCommission, 10); // Parse totalCounting as integer
    })
    .catch(error => {
      console.error("Error:", error.message);
      //alert(error.message); // Display error message if request fails
      throw error; // Re-throw the error to propagate it
    });
}
function getUserTotalCommission(id) {

  return fetch(apiUrl + '/user/getUserTotalCommission/' + id)
    .then(response => {
      if (!response.ok) {
        return response.text().then(errorMessage => {
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
    .then(dat => {
      const totalCommission = dat.response;
      return parseInt(totalCommission, 10); // Parse totalCounting as integer
    })
    .catch(error => {
      console.error("Error:", error.message);
      //alert(error.message); // Display error message if request fails
      throw error; // Re-throw the error to propagate it
    });
}
async function addNormalTreasureAmount() {
  
      const buttons = document.querySelectorAll("#normalModal");
    // Loop through each button and add the class
    buttons.forEach(button => {
      button.classList.add("loading-btn");
    });
  var userId = document.getElementById('usrID').value
  var points = parseInt(document.getElementById('treasureAmount').value)
  var restrict = parseInt(document.getElementById('restrictBookingCount').value)
  var normal = 0
  var response =await fetch(apiUrl + '/user/updateTreasure/' + userId + '/' + points +'/'+ restrict + '/' + normal, {
    method: 'PUT'
  });
if(response.ok){
        goToRemVal()
        buttons.forEach(button => {
          button.classList.remove("loading-btn");
        });
      window.location.reload()
    }
	    if (!response.ok) {
        buttons.forEach(button => {
          button.classList.remove("loading-btn");
        });
      const errorMessage = response.text();
      throw new Error(errorMessage);
    }
}

async function addUserBookingValueAmount() {
  
  const buttons = document.querySelectorAll("#normalModal");
// Loop through each button and add the class
buttons.forEach(button => {
  button.classList.add("loading-btn");
});
var userId = document.getElementById('usrID').value
var initVal = parseInt(document.getElementById('initialAmount').value)
var endVal = parseInt(document.getElementById('endingAmount').value)
var normal = 0
var response =await fetch(apiUrl + '/user/updateInitialVal/' + userId + '/' + initVal +'/'+ endVal, {
method: 'PUT'
});
if(response.ok){
    goToRemVal()
    buttons.forEach(button => {
      button.classList.remove("loading-btn");
    });
  window.location.reload()
}
  if (!response.ok) {
    buttons.forEach(button => {
      button.classList.remove("loading-btn");
    });
  const errorMessage = response.text();
  throw new Error(errorMessage);
}
}

function fetchUserInitialVal(usrId) {
    
  $.ajax({
      url: `${apiUrl}/user/userInitialValue/`+usrId,  // API endpoint to fetch all bookings
      method: 'GET',
      success: function(response) {
          debugger // Assuming the response is an array of bookings
          document.getElementById('initialAmount').value = response.response.initialValue;
          document.getElementById('endingAmount').value = response.response.endingValue;
      },
      error: function(err) {
          alert('Error fetching bookings.');
      }
  });
}

