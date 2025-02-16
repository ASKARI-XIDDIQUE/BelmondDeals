window.onload = function(){
    if(  localStorage.getItem('token') === null){
        window.location.href = "login/index.html"
      }
    getUserTotalCount()
    
    // document.getElementById('username').innerHTML = localStorage.getItem('userName')
}


async function getUserTotalCount() {
if(localStorage.getItem('userId') != null){
try {

  const response = await fetch(apiUrl+'/booking/totalCount/'+localStorage.getItem('userId'));
if (!response.ok) {
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
const dat = await response.json();

var totalCounting=dat.response.result;
getUserPaymentRquest(localStorage.getItem('userId'),totalCounting);

// tRElement.textContent = dat.response.result;
console.log("Response:", dat);
} catch (error) {
console.error("Error:", error.message);
}
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
 document.getElementById('availableBal').innerHTML = '-₹'+dat.response.payment
 
    if(dat.response.payment === 0){
      getUserTotalBalance()
    }
}
else{
  // document.getElementById('availableBal').innerHTML = '₹'+dat.response?.payment
  // if(dat.response === null || dat.response.payment === 0){
    getUserTotalBalance()
  // }
}
} catch (error) {
console.error("Error:", error.message);
}
}

async function getUserTotalBalance() {
if(localStorage.getItem('userId') != null){
try {
  let usrId = localStorage.getItem('userId');
  const response = await fetch(apiUrl+'/user/getUserTotalCommission/'+usrId);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  const data = await response.json();
  console.log("Response:", data);
  const availableBalnc = document.getElementById('availableBal');
  availableBalnc.textContent = '₹'+ data.response;
  totalNewAvailBalanc = data.response;
  
  // Handle the response data here
} catch (error) {
  console.error("Error:", error.message);
  // Display error message if request fails
  //alert(error.message);
}
}
}

async function withdrawApi(withdrawData) {
try {
  const buttons = document.querySelectorAll("#belmondSubmit");
    buttons.forEach(button => {
      button.classList.add("loading-btn");
    });
const response = await fetch(apiUrl + '/withdraw', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(withdrawData)
});

if (!response.ok) {
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

const data = await response.json();
if(data.response === "Please enter bank details" ){
    showNotification('error',data.response)
}
else if(data.response === "You cannot apply for withdraw twice"){
    showNotification('error', data.response)
}
else if(data.response === "You cannot withdraw more than balance amount"){
    showNotification('error', data.response)
}
else if(data.response == "You cannot withdraw until your reach at destination booking"){
    showNotification('error', data.response)
}
else if(data.response===null){
    showNotification('error',"You already requested for withdraw")
}else{
//   withdrawForm.classList.remove('active');
window.location.href="details.html"
  getUserTotalBalance()
//   getPendingAmount()
}
console.log("Response:", data);
// Handle the response data here
} catch (error) {
console.error("Error:", error.message);
// Display error message if request fails
buttons.forEach(button => {
  button.classList.remove("loading-btn");
});
showNotification(error.message);
}
}

async function Withdraw() {
event.preventDefault();
//   showLoader();
var withdrawAmount = document.getElementById("withdrawAmount").value;
const availableBalnc = document.getElementById('availableBal').innerHTML.replace(/₹/g, "");;
if(availableBalnc < withdrawAmount ){
  showNotification('error',"you cannot withdraw more than the available balance")
  return
}
//availableBalnc.textContent = '₹'+ data.response;
if( withdrawAmount < 500){
// alert("you can withdraw minimumm 500 OR your balance is less");
// hideLoader();
showNotification('error',"you can withdraw minimumm of 500");
return
}
else
{
// showLoader();
// Create JSON object
var formData = {
commissionAmount: withdrawAmount,
  userId: localStorage.getItem('userId'),
  userBankDetailId : localStorage.getItem('userBankDetailId')
  };
  await withdrawApi(formData);
  
//   setTimeout(function() {
// }, 5000);
}
// Do something with the formData (e.g., send it to server, perform validation)

};