async function SubmitBankDetail(){
    event.preventDefault(); // Prevent default form submission behavior
    var acountHolderName = document.getElementById("acountHolderName").value;
    var accountNo = document.getElementById("bankAccountNo").value ;
    var bankName = document.getElementById("bankName").value ;
    var iPSCCode = document.getElementById("iPSCCode").value;
    var uPIId = '';
    
    
  if(!acountHolderName || !accountNo || !bankName || !iPSCCode){
    alert("Please fill in the form")
    return
  }
  
    // Create JSON object
    var formData = {
      accountHolder: acountHolderName,
      accountNo: accountNo,
      bankName: bankName,
      iPSCCode: iPSCCode,
      uPIId: uPIId,
      userId:localStorage.getItem('userId')
    };
    
   await postDataUserBank(formData);
  
    // Do something with the formData (e.g., send it to server, perform validation)
    console.log(formData);
  };
  async function postDataUserBank(userData) {
    try {
      const buttons = document.querySelectorAll("#belmondSubmit");
    buttons.forEach(button => {
      button.classList.add("loading-btn");
    });
      const response = await fetch(apiUrl + '/UserBankDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        buttons.forEach(button => {
          button.classList.remove("loading-btn");
        });
        throw new Error(errorMessage);
      }
      else{
        const data = await response.json();
        if(data.success){
          localStorage.setItem('userBankDetailId', data.response.bankDetailId)
          buttons.forEach(button => {
            button.classList.remove("loading-btn");
          });
          window.location.href="amountwithdraw.html"
        }
        console.log("Response Bank:", data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }