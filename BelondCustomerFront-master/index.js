const toggleIcon =  document.getElementById('toggleNavbaIcon');
const closeNavbar =  document.getElementById('closeNavbar');
const navBar =  document.getElementById('navBar');
const navLinks =  document.querySelectorAll('.navLink');
const header =  document.querySelector('.header');


toggleIcon.onclick = function(){
    navBar.classList.add('show')
}

closeNavbar.onclick = function(){
    navBar.classList.remove('show')
}


navLinks.forEach((nav)=>{
    nav.addEventListener('click', ()=>{
        navBar.classList.remove('show')
    })
})


 
function addBg(){
    if(window.scrollY >= 10){
        header.classList.add('headerBg')
        
    }else{
        header.classList.remove('headerBg')

    }
}
window.addEventListener('scroll', addBg)


 //Review Section Function =======================>
 let featuredSwiper = new Swiper(".swiperSection", {
    loop: true,
    autoplay: true,
    centeredSlide: true,
    spaceBetween: 20,
    keyboard: true,
    mausehold: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    slidePerView: 'auto',

    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
        autoplay: false,
      },
      1240: {
        slidesPerView: 2,
        spaceBetween: 40,
        autoplay: false,
      },
    },
   
  
  });


 //Review Section Function =======================>
 let newsContainer = new Swiper(".newsContainer", {
    loop: true,
    autoplay: true,
    centeredSlide: true,
    spaceBetween: 20,
    keyboard: true,
    mausehold: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    slidePerView: 'auto',

    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      680: {
        slidesPerView: 2,
        spaceBetween: 40,
        autoplay: false,
      },
      940: {
        slidesPerView: 3,
        spaceBetween: 40,
        autoplay: false,
      },
    },
   
  
  });


 //Review Section Function =======================>
 let testimonialSwiper = new Swiper(".testimonialSwiper", {
    loop: true,
    centeredSlide: true,
    spaceBetween: 20,
    autoplay: true,     
    keyboard: true,
    mausehold: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    slidePerView: 'auto',

  });
  function handleSelection(select) {
    if (select.value === "logout") {
        logout();
    }
}
   //Review Section Function =======================>
 let heroSwiper = new Swiper(".heroSectionContainer", {
  speed: 1500,
  effect: 'fade',
  loop: true,
  autoplay: true,
  pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
var treasureAmount;
function checkLogin(){
  if(  localStorage.getItem('token') === null){
    window.location.href = "login/index.html"
  }
}
window.onload= async function(){
    if(  localStorage.getItem('token') === null){
      window.location.href = "login/index.html"
    }
    fetchBookings()
    document.getElementById('userName').innerHTML = localStorage.getItem('userName')
  await getUserTotalCount()
  // fetchBookings()
  getById(localStorage.getItem('userId'))
  checkNormalTreasure(localStorage.getItem('userId'))
 
  // getUserTotalBonus()
}
async function addBooking() {
  try {
    const buttons = document.querySelectorAll("#belmondSubmit");
    buttons.forEach(button => {
      button.classList.add("loading-btn");
    });
    var start1 = document.getElementById('rate-1')
    var start2 = document.getElementById('rate-2')
    var start3 = document.getElementById('rate-3')
    var start4 = document.getElementById('rate-4')
    var start5 = document.getElementById('rate-5')
     if (start1.checked === false && start2.checked === false && start3.checked === false && start4.checked === false && start5.checked === false) {
      showNotification('error',"Please give rating");
     buttons.forEach(button => {
      button.classList.remove("loading-btn");
    });
    //  window.location.href="flight.html"
     return;  // Exit the function if checkId is not set
 }
 var bookingData = {
     userId: localStorage.getItem('userId'),         // Assuming userId is 1 for the example
     placeId: 1   // The selected placeId
 };
   const response = await fetch(apiUrl + '/booking', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(bookingData)
   });

   if (!response.ok) {
     const errorMessage = await response.text();
     throw new Error(errorMessage);
   }
   const data = await response.json();
  //  console.log("Response:", data);
  if(data.success){
    showNotification('success','Your booking has been completed!')
    buttons.forEach(button => {
     button.classList.remove("loading-btn");
    });
    window.location.reload()
    closeModal()
    document.querySelectorAll('input[name="rating"]').forEach((radio) => {
      radio.checked = false;
  });
  
  }
  else{
    showNotification('error', data.response)
  }
   // Handle the response data here
 } catch (error) {
   console.error("Error:", error.ressponse);
   //alert(error.message);
 }
}
function fetchBookings() {
  $.ajax({
      url: `${apiUrl}/BookingInfo/getRandom/${localStorage.getItem('userId')}`,  // API endpoint to fetch all bookings
      method: 'GET',
      success: function(response) {
          renderBookings(response);  // Assuming the response is an array of bookings
      },
      error: function(err) {
          alert('Error fetching bookings.');
      }
  });
}
function renderBookings(bookings) {
  $('#bookingInf').empty();
  var row=``;
  console.log(bookings)
  bookings.response.result.forEach(function(booking, index) {
    
    // if(index <1){
      row += `
          <div class="ticket" id=chk${booking.id} onclick="checkBook(${booking.id})">
                    <div class="ticket-details">
                    <h2>
                    ${booking.name}
                    </h2>
                    <p>
                    Booking Description: ${booking.description}
                    </p>
                    <p>
                    Total Value: ₹${booking.price}.00
                    </p>
                    <p>
                    Date: ${booking.createdDate}
                    </p>
                    </div>
                    <div class="ticket-status">
                    <div class="completed">
                    </div>
                    <div class="ticket-separator">
                    </div>
                    <img alt="Emirates logo" height="80" src="${apiUrlBookingImage}${booking.fileName}" width="80"/>
                    </div>
                </div>
      `;
    // }
      
  });
  $('#bookingInf').append(row);
}

async function getUserTreasure(){
  try {
  const response = await fetch(apiUrl + '/user/checkUserTreasure/'+localStorage.getItem('userId'), {
method: 'GET',
headers: {
  'Content-Type': 'application/json'
},
});
if (!response.ok) {
const errorMessage = await response.text();
throw new Error(errorMessage);
}
const dat = await response.json();
if(dat.response === null){
  // document.getElementById('bankDetail').style.display = 'none'
}else{
  return dat.response
}
} catch (error) {
console.error("Error:", error.message);
}
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
// document.getElementById('totalCont').innerHTML = dat.response
// const totalReserveElement = document.getElementById('totalCont');
// // const tRElement = document.getElementById('totalReserve');
// totalReserveElement.textContent = dat.response;
document.getElementById('bookingCount').innerHTML = dat.response
totalCounting=dat.response;
// var userTreasureResponse = await getUserTreasure()
// if(userTreasureResponse.result.treasureBookingCount === totalCounting && 
//   parseInt(userTreasureResponse.result.treasureAmount)  > 0 
// && parseInt(userTreasureResponse.result.treasureBookingCount)  > 0){
// document.getElementById('treasureAlert').style.display = 'flex';
// document.getElementById('modal1').style.backgroundColor = 'transparent';
// treasureAmount = userTreasureResponse.result.treasureAmount
// }
getUserPaymentRquest(localStorage.getItem('userId'),totalCounting);
if(parseInt(totalCounting) >= parseInt(localStorage.getItem('noOfRAllowed')))
{
  document.getElementById('successBtn').style.display = 'none'
  document.getElementById('completeBAlert').style.display='block';
  document.getElementById('completeBAlert').classList.add('active')
}
// tRElement.textContent = dat.response.result;
console.log("Response:", dat);
} catch (error) {
console.error("Error:", error.message);
}
}
}
function closeModal(){
  const modal = document.getElementById('successModal');
  modal.classList.remove('active');
}
async function getUserPaymentRquest(id,alloReq) {
try { 
const response = await fetch(apiUrl+'/userdeposit/getPaymentRequest/'+parseInt(id));
if (!response.ok) {
const errorMessage = await response.text();
throw new Error(errorMessage);
}
const dat = await response.json();
const totalCountin=dat.response.result?.bookingCount;
// 
  
if(parseInt(alloReq) === parseInt(totalCountin) ){
  //  dat.response.paymentType === 1 ? document.getElementById('commissionLine').innerHTML = 'Business Class with 5x Commission' :
  //  document.getElementById('commissionLine').innerHTML = 'First Class with 10x Commission'
  //  dat.response.paymentType === 1 ? document.getElementById('restrictModalTopic').innerHTML = 'Business Class Ticket' :
  //  document.getElementById('restrictModalTopic').innerHTML = 'First Class Ticket'
  var userTreasureResponse = await getUserTreasure()
    if(userTreasureResponse.result.treasureBookingCount >= alloReq && 
      parseInt(userTreasureResponse.result.treasureAmount)  > 0 
    && parseInt(userTreasureResponse.result.treasureBookingCount)  > 0){
      // alert(localStorage.getItem('isTreasureDone'))
      // localStorage.setItem('isTreasureDone', false)a
    // alert()if(localStorage.getItem('isTreasureDone') !== 'true'){
      document.getElementById('successBtn').style.display = 'none'
      document.getElementById('completeBAlert').style.display='block';
        document.getElementById('treasureAlert').style.display = 'flex';
        document.getElementById('modal1').style.backgroundColor = 'transparent';
        document.getElementById('treasureamount').value = dat.response?.result.payment
    }
    else{
      if(userTreasureResponse.result.isNormal == 1){
        document.getElementById('shotModalText').innerHTML = 'Treasure Box Amount'
      }
      document.getElementById('modal-deposit').style.display = 'flex'
      document.getElementById('successBtn').style.display = 'none'
      document.getElementById('completeBAlert').style.display='block';
      document.getElementById('paymentNeedDeposit').innerHTML = dat.response?.result.payment
    }
// depositForm.classList.add('active');

// document.getElementById('negBalnc').innerHTML = '-₹'+dat.response?.payment
// document.getElementById('balnc').style.display = 'none';
}
else{
// document.getElementById('negBalnc').style.display = 'none'
}
} catch (error) {
console.error("Error:", error.message);
}
}
function closeDepositModal(){
  document.getElementById('modal-deposit').style.display = 'none'
}

// async function todayCommissionUser() {
// if(localStorage.getItem('userId') != null){
// try {
// let usrId = localStorage.getItem('userId');
// const response = await fetch(apiUrl+'/Booking/todayBookingCommission/'+usrId);
// if (!response.ok) {
//   const errorMessage = await response.text();
//   throw new Error(errorMessage);
// }
// const data = await response.json();
// console.log("Response:", data);
// const todayCom = document.getElementById('comissionToday');
// todayCom.textContent = '₹'+ data.response;
// // Handle the response data here
// } catch (error) {
// console.error("Error:", error.message);
// // Display error message if request fails
// //alert(error.message);
// }
// }
// }
// async function getPendingAmount(){

// if(localStorage.getItem('userId') != null){
// try {
// let usrId = localStorage.getItem('userId');
// const response = await fetch(apiUrl+'/withdraw/getPendingWithdrawForModal/'+usrId);
// if (!response.ok) {
//   const errorMessage = await response.text();
//   throw new Error(errorMessage);
// }
// const data = await response.json();
// console.log("Response pending withdraw amount:", data);
//     const todayCom = document.getElementById('pendingWithdraw');
//     todayCom.textContent = '₹'+ data.response;
// // Handle the response data here
// } catch (error) {
// console.error("Error:", error.message);
// // Display error message if request fails
// //alert(error.message);
// }
// }
// else {

// }

// }  
// async function getUserTotalBalance() {
// if(localStorage.getItem('userId') != null){
// try {
// let usrId = localStorage.getItem('userId');
// const response = await fetch(apiUrl+'/user/getUserTotalCommission/'+usrId);
// if (!response.ok) {
//   const errorMessage = await response.text();
//   throw new Error(errorMessage);
// }
// const data = await response.json();
// console.log("Response:", data);
// const todayCom = document.getElementById('balnc');
// todayCom.textContent = '₹'+ data.response;
// //   const availableBalnc = document.getElementById('availableBal');
// //   availableBalnc.textContent = '₹'+ data.response;
// totalNewAvailBalanc = data.response;

// // Handle the response data here
// } catch (error) {
// console.error("Error:", error.message);
// // Display error message if request fails
// //alert(error.message);
// }
// }
// } 
// const closeModal = document.getElementById('closeSuccessModal');
// closeModal.addEventListener('click', () => {
//   modal.classList.remove('active');
// });
// const modal = document.getElementById('successModal');
// modal.addEventListener('click', () => {
//   modal.classList.add('active');
// });
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
      localStorage.setItem('noOfRAllowed', dynamicData?.allowedNoOfRequest) 
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Display error message if request fails
      //alert(error.message);
  }
}
function openModal(){
  
  const modal = document.getElementById('successModal');
  modal.classList.add('active');
}
function logout(){
  localStorage.clear()
  window.location.href = "login/index.html"
}
document.getElementById('treasureBox1').addEventListener('click',async function() {
  this.classList.add('open');
  var isCstPremium = await isPremium(localStorage.getItem('userId'))
  if(!isCstPremium){
    await treasureDone('0')
  }
  else{
    document.getElementById('treasureMessage').innerHTML = "Congratulation! you got treasure box you need to deposit " + document.getElementById('treasureamount').value
    localStorage.setItem('isTreasureDone', true)
      // Add particle effects
      await treasureDone('1')
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
          const x = (Math.random() - 0.5) * 200; // Random horizontal movement
          const y = (Math.random() - 0.5) * 200; // Random vertical movement
          particle.style.setProperty('--x', `${x}px`);
          particle.style.setProperty('--y', `${y}px`);
          particle.style.animation = 'particle 1s ease-out';
      });
  
      // Close the treasure box after 2 seconds
      setTimeout(() => {
          this.classList.remove('open');
          document.getElementById('treasureAlert').style.display = 'none';
  
      }, 4000); // 2000 milliseconds = 2 seconds
  }
});
document.getElementById('treasureBox2').addEventListener('click',async function() {
  this.classList.add('open');
  
  var isCstPremium = await isPremium(localStorage.getItem('userId'))
  if(!isCstPremium){
    await treasureDone('0')
  }
  else{
  document.getElementById('treasureMessage').innerHTML = "Congratulation! you got treasure box you need to deposit " + document.getElementById('treasureamount').value
  localStorage.setItem('isTreasureDone', true)
    // Add particle effects
    await treasureDone('1')
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const x = (Math.random() - 0.5) * 200; // Random horizontal movement
        const y = (Math.random() - 0.5) * 200; // Random vertical movement
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        particle.style.animation = 'particle 1s ease-out';
    });

    // Close the treasure box after 2 seconds
    setTimeout(() => {
        this.classList.remove('open');
        document.getElementById('treasureAlert').style.display = 'none';
    }, 4000); // 2000 milliseconds = 2 seconds
  }
});
document.getElementById('treasureBox3').addEventListener('click',async function() {
  this.classList.add('open');
  var isCstPremium = await isPremium(localStorage.getItem('userId'))
  if(!isCstPremium){
    await treasureDone('0')
  }
  else{
  document.getElementById('treasureMessage').innerHTML = "Congratulation! you got treasure box you need to deposit " + document.getElementById('treasureamount').value
  localStorage.setItem('isTreasureDone', true)
    // Add particle effects
    await treasureDone('1')
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const x = (Math.random() - 0.5) * 200; // Random horizontal movement
        const y = (Math.random() - 0.5) * 200; // Random vertical movement
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        particle.style.animation = 'particle 1s ease-out';
    });

    // Close the treasure box after 2 seconds
    setTimeout(() => {
        this.classList.remove('open');
        document.getElementById('treasureAlert').style.display = 'none';
    }, 4000); // 2000 milliseconds = 2 seconds
  }
});

// async function getUserTotalBonus() {
//   if(localStorage.getItem('userId') != null){
//   try {
//       const response = await fetch(apiUrl+'/userDeposit/GetUserTrialBalance/'+localStorage.getItem('userId'));
//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(errorMessage);
//     }
//     const dat = await response.json();
//     const totalReserveElement = document.getElementById('totalBonus');
//     totalReserveElement.textContent = '₹'+ dat.response.result;
//     console.log("Response:", dat);
    
//     // Handle the response data here
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }
  
// }

async function checkNormalTreasure(id){
  var isCstPremium = await isPremium(id)
  if(!isCstPremium){
        var treasure =await getUserTreasure()
        if(treasure.result.treasureAmount != null){
          const response = await fetch(apiUrl+'/booking/totalCount/'+localStorage.getItem('userId'));
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const dat = await response.json();
        if(dat.response == treasure.result.treasureBookingCount){
          document.getElementById('treasureAlert').style.display = 'flex'
          document.getElementById('treasureMessage').innerHTML = "Congratulation! you got treasure box reward " + treasure.result.treasureAmount
          treasureAmount = treasure.result.treasureAmount
        }
        }
      }
}

async function isPremium(id){
  const response =await fetch(apiUrl+'/userbonus/isPremium?id='+id);
      if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
      }
      var data = await response.json()
      return data.response.result
}

async function treasureDone(isNormal) {
  var userId = localStorage.getItem('userId')
  var points = 0
  var restrict = 0
  var response =await fetch(apiUrl + '/user/updateTreasure/' + userId + '/' + points +'/'+ restrict +'/' + isNormal, {
    method: 'PUT'
  });
if(response.ok){
  try {
   
   param1Value  = localStorage.getItem('userId');
   var depositAmount = treasureAmount
   var userId = param1Value;
       
       var jsonData = {
         "depositAmount":depositAmount,
         "userId": parseInt(userId), 
       };
       const formData = new FormData()
       formData.append('amount', depositAmount)
       formData.append('userId', parseInt(userId))
       formData.append('isDeposit', true)
    //  formData.append('isNormalCustomer', true)
       
       // Here, you can use 'jsonData' to make your API request
       console.log(jsonData);
   const response = await fetch(apiUrl + '/userbonus', {
     method: 'POST',
     body: formData,
   });
   if(response.ok){
    setTimeout(() => {
      // this.classList.remove('open');
      document.getElementById('treasureAlert').style.display = 'none';

  }, 2000);
   }
   if (!response.ok) {
     const errorMessage = await response.text();
     throw new Error(errorMessage);
   }
 } catch (error) {
   console.error("Error:", error.message);
 }
    }
}