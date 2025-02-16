async function addCommission() {
    try {
        const buttons = document.querySelectorAll("#successBtn");
    buttons.forEach(button => {
      button.classList.add("loading-btn");
    });
      var urlParams = new URLSearchParams(window.location.search);
      param1Value  = parseInt(urlParams.get('id'));
      var depositAmount = document.getElementById('commissionAmount').value;
      var userId = param1Value;
          var jsonData = {
            "commissionAmount":depositAmount,
            "userId": parseInt(userId), 
          };
          const formData = new FormData()
          formData.append('amount', depositAmount)
          formData.append('userId', parseInt(userId))
          formData.append('isCommission', true)
          console.log(jsonData);
      const response = await fetch(apiUrl + '/userbonus', {
        method: 'POST',
        body: formData,
        
      });
      if(response.ok){
        buttons.forEach(button => {
            button.classList.remove("loading-btn");
          });
        window.location.href = 'commision.html';
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
  