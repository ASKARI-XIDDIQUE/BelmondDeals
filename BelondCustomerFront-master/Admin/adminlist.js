var currentPage = 1;
$(document).ready(function() {
fetchUsers(currentPage,10);
});

function search(){
    var searchText = document.getElementById('phone').value
    searchList(currentPage,10,searchText)
}

function fetchUsers(pageNumber,pageSize) {
    
    $.ajax({
        url: `${apiUrl}/user/getAdminData?pageNo=${parseInt(pageNumber)}&pageSize=${pageSize}&InvitationCode=${localStorage.getItem('invitationCode')}`,  // API endpoint to fetch all bookings
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
        url: `${apiUrl}/user/getAdminData?pageNo=${parseInt(pageNumber)}&pageSize=${pageSize}&InvitationCode=${localStorage.getItem('invitationCode')}&searchValue=${search}`,  // API endpoint to fetch all bookings
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
                        <td class="amenities">
                            <p>${booking.id}</p>      
                        </td>
                        <td class="amenities">
                            <p>${booking.name}</p>
                        </td>
                        <td class="expiringDate"> 
                            <p>${booking.email}</p> 
                        </td>
                        <td class="expiringDate">
                            <i class="uil uil-calendar-alt icon"></i><span class="date">${booking.phoneNo}</span>                            
                        </td>
                        <td>
                            <button class="flex btn bg" onclick="window.location.href='normaldeposit.html?id=${booking.id}'">
                                <i class="uil uil-plus"></i> Add Normal Deposit
                            </button>
                        </td>
                        <td>
                            <button  class="flex btn bg" onclick="window.location.href='premiumdeposit.html?id=${booking.id}'">
                                <i class="uil uil-plus"></i>Add Premium Deposit 
                            </button> 
                        </td>
                    </tr>

            
        `;
        if(booking.roleName === 'Customer'){
        $('#bookingsTable').append(row);
        }
       
    });
}