window.onload = async function(){
  getUserTotalBonus()
     getUserTotalCount()
     todayCommissionUser()
     getPendingAmount()
     getImages()
    //  getUserTotalBalance()
    
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
      document.getElementById('totalCont').innerHTML = dat.response
      const totalReserveElement = document.getElementById('totalCont');
      // const tRElement = document.getElementById('totalReserve');
      totalReserveElement.textContent = dat.response;
      totalCounting=dat.response;
      // var userTreasureResponse = await getUserTreasure()
      // if(userTreasureResponse.result.treasureBookingCount === totalCounting && parseInt(userTreasureResponse.result.treasureAmount)  > 0 
      // && parseInt(userTreasureResponse.result.treasureBookingCount)  > 0){
      //   document.getElementById('treasureAlert').style.display = 'flex';
      //   document.getElementById('modal1').style.backgroundColor = 'transparent';
      //   treasureAmount = userTreasureResponse.result.treasureAmount
      // }
      getUserPaymentRquest(localStorage.getItem('userId'),totalCounting);
      if(parseInt(totalCounting) >= parseInt(localStorage.getItem('noOfRAllowed')))
        {
          document.getElementById('withdrawBtn').style.display = 'block'
        //   document.getElementById('completeBAlert').style.display='block';
        //   document.getElementById('completeBAlert').classList.add('active')
        }
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
      const totalCountin=dat.response?.result?.bookingCount;
      if(parseInt(alloReq) === parseInt(totalCountin) ){
        //   dat.response.paymentType === 1 ? document.getElementById('commissionLine').innerHTML = 'Business Class with 5x Commission' :
        //    document.getElementById('commissionLine').innerHTML = 'First Class with 10x Commission'
        //    dat.response.paymentType === 1 ? document.getElementById('restrictModalTopic').innerHTML = 'Business Class Ticket' :
        //    document.getElementById('restrictModalTopic').innerHTML = 'First Class Ticket'
        //    document.getElementById('modal-deposit').style.display = 'flex'
        //        document.getElementById('slide').style.display = 'none'
        //    document.getElementById('completeBAlert').style.display='block';
        //    document.getElementById('paymentNeedDeposit').innerHTML = dat.response?.payment
        // depositForm.classList.add('active');
        document.getElementById('balnc').style.display = 'none';
        document.getElementById('negBalnc').style.display = 'block'
        document.getElementById('negBalnc').innerHTML = '-₹'+dat.response?.result.payment
      }
      else{
        getUserTotalBalance()
        // document.getElementById('negBalnc').style.display = 'none'
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  async function todayCommissionUser() {
    if(localStorage.getItem('userId') != null){
      try {
        let usrId = localStorage.getItem('userId');
        const response = await fetch(apiUrl+'/Booking/todayBookingCommission/'+usrId);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("Response:", data);
        const todayCom = document.getElementById('comissionToday');
        todayCom.textContent = '₹'+ data.response.result;
        // Handle the response data here
      } catch (error) {
        console.error("Error:", error.message);
        // Display error message if request fails
        //alert(error.message);
      }
    }
  }
  async function getPendingAmount(){
    
    if(localStorage.getItem('userId') != null){
      try {
        let usrId = localStorage.getItem('userId');
        const response = await fetch(apiUrl+'/withdraw/getPendingWithdrawForModal/'+usrId);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log("Response pending withdraw amount:", data);
                const todayCom = document.getElementById('pendingWithdraw');
                todayCom.textContent = '₹'+ data.response;
        // Handle the response data here
      } catch (error) {
        console.error("Error:", error.message);
        // Display error message if request fails
        //alert(error.message);
      }
    }
    else {
  
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
        const todayCom = document.getElementById('balnc');
        todayCom.textContent = '₹'+ data.response;
      //   const availableBalnc = document.getElementById('availableBal');
      //   availableBalnc.textContent = '₹'+ data.response;
        totalNewAvailBalanc = data.response;
        
        // Handle the response data here
      } catch (error) {
        console.error("Error:", error.message);
        // Display error message if request fails
        //alert(error.message);
      }
    }
  } 
  
  async function getUserTreasure() {
      try {
          const response = await fetch(apiUrl + '/user/checkUserTreasure/' + localStorage.getItem('userId'), {
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
          if (dat.response === null) {
              // document.getElementById('bankDetail').style.display = 'none'
          } else {
              return dat.response
          }
      } catch (error) {
          console.error("Error:", error.message);
      }
  }

  async function getUserTotalBonus() {
    if(localStorage.getItem('userId') != null){
    try {
        const response = await fetch(apiUrl+'/userDeposit/GetUserTrialBalance/'+localStorage.getItem('userId'));
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const dat = await response.json();
      const totalReserveElement = document.getElementById('totalBonus');
      totalReserveElement.textContent = '₹'+ dat.response.result;
      console.log("Response:", dat);
      
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
    
  }


  async function getImages() {
    try {
        const response = await fetch(apiUrl + '/customerPotalPics', {
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
        if (dat.response !== null) {
          var timestamp = new Date().getTime(); // Generate a unique timestamp
            $("[id='sliderImage1']").attr("src", apiUrlBookingImage + '/newslider/image/img1.webp' + "?v=" + timestamp);
            $("[id='sliderImage2']").attr("src", apiUrlBookingImage + '/newslider/image/img2.webp' + "?v=" + timestamp);
            $("[id='sliderImage3']").attr("src", apiUrlBookingImage + '/newslider/image/img3.webp'+ "?v=" + timestamp);
            $("[id='sliderImage4']").attr("src", apiUrlBookingImage + '/newslider/image/img4.webp' + "?v=" + timestamp);

        } 
    } catch (error) {
        console.error("Error:", error.message);
    }
}
