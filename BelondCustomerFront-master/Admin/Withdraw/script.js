window.onload = function(){
    getPending()
  }
  async function getPendingSearch() {
        const phone = document.getElementById('searchPhone').value.trim();
        const tbody = document.querySelector('#dynamicTable tbody');
        if (phone !== "") {
        try {
            const response = await fetch(apiUrl+'/withdraw/search/'+phone);
            if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
            }
            tbody.innerHTML='';
            const dat = await response.json();
            dynamicData = dat.response;
            console.log("Response:", dat);
            
            generateTableRows(dynamicData);
            // Handle the response data here
        } catch (error) {
            console.error("Error:", error.message);
            // Display error message if request fails
            // //alert(error.message);
        }
    }else{
        tbody.innerHTML='';
        getPending()
    }
        
    }
  async function getPending() {
        try {
            const response = await fetch(apiUrl+'/withdraw/getPendingWithdraw/123/Admin');
            if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
            }
            const dat = await response.json();
            dynamicData = dat.response;
            console.log("Response:", dat);
            
            generateTableRows(dynamicData);
            // Handle the response data here
        } catch (error) {
            console.error("Error:", error.message);
            // Display error message if request fails
            // //alert(error.message);
        }
    }

  function generateTableRows(data) {
            const tbody = document.querySelector('#dynamicTable tbody');
            data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="id">${index + 1}</td>
                     <td class="allProperties flex">
                            <div class="info">
                                <span class="name">${item.userName}</span>
                            </div>
                    </td>
                    <td class="eDate">
                            <span class="date flex"><i class="uil uil-schedule icon"></i> ${item.accountHolder} | ${item.accountNo} | ${item.bankName} | ${item.ipscCode}</span>
                    </td>
                    <td class="rentFee">
                            <span class="fees flex"><i class="uil uil-usd-circle icon"></i>${item.commissionAmount}</span>
                        </td>
                    <td class="occupancy">
                            <span class="occ flex">${item.phoneNo}</span>
                        </td>
                    <td class="action">
                            <a id="belmondSubmit" onclick="submitStatus(${item.withdrawId},${item.userId},'Active', ${item.bankDetailId===null?0:item.bankDetailId})">
                                <i class="uil-check-circle icon"></i>
                            </a>
                        </td>
                        <td class="action">
                            <a id="belmondSubmit" onclick="submitStatus(${item.withdrawId},${item.userId},'Rejected', ${item.bankDetailId===null?0:item.bankDetailId})">
                                <i class="uil uil-trash-alt icon"></i>
                            </a>
                        </td>
                    
                `;
                tbody.appendChild(row);
            });
        }
        async function submitStatus(withdrawId,usrId,stats,bankDetailId) {
        try {
            const buttons = document.querySelectorAll("#belmondSubmit");
    buttons.forEach(button => {
      button.classList.add("loading-btn");
    });
            const response = await fetch(apiUrl+'/withdraw/withDrawApproval/'+withdrawId+'/'+usrId+'/'+stats+'/'+bankDetailId);
            if (!response.ok) {
                const errorMessage = await response.json();
                const match = errorMessage.match(/\(([^)]+)\)/);
                if (match && match[1]) {
                    alert(match[1]);
                    window.location.reload()
                } else {
                    throw new Error("An unexpected error occurred");
                }
            }
            const dat = await response.json();
            const match = JSON.stringify(dat).match(/\(([^)]+)\)/);
                if (match && match[1]) {
                    alert(match[1]);
                    buttons.forEach(button => {
                        button.classList.remove("loading-btn");
                      });
                }
            console.log(dat);
            // getPending();
            buttons.forEach(button => {
                button.classList.remove("loading-btn");
              });
              window.location.reload()
        } catch (error) {
            console.error("Error:", error.message);
        }
        
    }

    function formatDate(dateTime) {
        let dateed = new Date(dateTime);
    
        // Custom format: YYYY-MM-DD HH:MM:SS
        let customFormattedDate = dateed.getFullYear() + '-' +
                                  ('0' + (dateed.getMonth() + 1)).slice(-2) + '-' + 
                                  ('0' + dateed.getDate()).slice(-2) + ' ' + 
                                  ('0' + dateed.getHours()).slice(-2) + ':' + 
                                  ('0' + dateed.getMinutes()).slice(-2) + ':' + 
                                  ('0' + dateed.getSeconds()).slice(-2);
    
        return customFormattedDate;
    }