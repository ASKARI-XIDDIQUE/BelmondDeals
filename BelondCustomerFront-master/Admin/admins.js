var currentPage = 1;
$(document).ready(function() {
fetchUsers(currentPage,10);
});


function fetchUsers(pageNumber,pageSize) {
    
    $.ajax({
        url: `${apiUrl}/user/GetAdminData?pageNo=${parseInt(pageNumber)}&pageSize=${pageSize}&InvitationCode=${localStorage.getItem('invitationCode')}`,  // API endpoint to fetch all bookings
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
    
    $('#bookingsTable').empty();
    bookings.response.forEach(function(booking, index) {
        const row = `
            <tr>
                        <td class="amenities">
                            <p>${index +1}</p>      
                        </td>
                        <td class="amenities">
                            <p>${booking.invitationCode}</p>
                        </td>
                        <td class="expiringDate"> 
                            <p>${booking.totalUsers}</p> 
                        </td>
                        <td class="amenities">
                            <p>${booking.totalBookings}</p>
                        </td>
                        <td class="expiringDate"> 
                            <p>${booking.totalWithdraw}</p> 
                        </td>
                        <td class="amenities">
                            <p>${booking.totalCommissionBonus}</p>
                        </td>
                        <td class="amenities">
                            <p>${booking.totalDepositBonus}</p>
                        </td>
                        
                       
                    </tr>

            
        `;
        
        $('#bookingsTable').append(row);
        
       
    });
}