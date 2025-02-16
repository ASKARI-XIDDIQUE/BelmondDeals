window.onload = function() {
          
    getUserPoints()
            
        }
function getUserPoints() {
    if(localStorage.getItem('userId') != null){
        var id = localStorage.getItem('userId')
        return fetch(apiUrl + '/user/getById/' + id)
          .then(response => {
            if (!response.ok) {
              return response.text().then(errorMessage => {
                throw new Error(errorMessage);
              });
            }
            return response.json();
          })
          .then(dat => {
                // Set the score input value dynamically from the API response
                document.getElementById('points').innerHTML = dat.response.result.userPoints;
                document.getElementById('points1').innerHTML = dat.response.result.userPoints;
                // document.getElementById('points').innerHTML = dat.response.result.userPoints;uttb
                // document.querySelectorAll("points").forEach(element => {
                //     element.value =  dat.response.result.userPoints;  // Set the value for each matching element
                // });
 // Parse totalCounting as integer
          })
          .catch(error => {
            console.error("Error:", error.message);
            //alert(error.message); // Display error message if request fails
            throw error; // Re-throw the error to propagate it
          });
    }
}

