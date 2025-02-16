$(document).ready(function() {
    let currentEditIndex = null;
    let currentEditId = null;
    
    if(localStorage.getItem('userRole')==='Second Admin'){
    document.getElementById('addbookTab').style.display = 'none';
    }


    
    // Fetch and render all bookings from API
    function fetchBookings() {
        $.ajax({
            url: `${apiUrl}/BookingInfo`,  // API endpoint to fetch all bookings
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
        var row = ``
        bookings.response.result.forEach(function(booking, index) {

            row = `
                <tr>
                    <td class="td flex">
                            <div class="imgDiv">
                                <img src="${apiUrlBookingImage+''+booking.fileName}" alt="Apartment Image">
                            </div>
                            <div class="propertyInfo">
                                <span class="name">${booking.name}</span>
                                <!-- <p>Currently Free</p> -->
                               <div>
                                <i class="uil uil-moneybag-alt"></i> 
                                <small>${booking.price}</small>
                               </div>
                            </div>
                    </td>
                    <td class="amenities">
                            
                            <p>${booking.name}</p>
                        </td>
                    <td class="expiringDate">
                            
                        <i class="uil uil-moneybag-alt"></i> 
                        <p>${booking.price}</p>
                        
                    </td>
                    <td class="status">
                        <!-- <span><i class="uil uil-check-circle icon"></i> Clean</span> -->
                        <p>${booking.description}</p>
                        
                    </td>
                    
                    <td class="action">
                            
                            <a id="saveBtn" href="addbooking.html?id=${booking.id}">
                                <i class="uil uil-edit icon"></i>
                            </a>
                            <a id="saveBtn" onclick="deleteBooking(${booking.id})">
                                <i class="uil uil-trash-alt icon"></i>
                            </a>
                           
                    </td>
                    
                </tr>
            `;
            $('#bookingsTable').append(row);
        });
    }

    // Add booking (Create)
    function addBooking(name, price, description, image) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('file', image);
        const buttons = document.querySelectorAll("#saveBtn");
        buttons.forEach(button => {
          button.classList.add("loading-btn");
        });
        $.ajax({
            url: `${apiUrl}/BookingInfo`,  // API endpoint to create a booking
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                alert('Booking created successfully.');
                fetchBookings();  // Refresh the list of bookings
                // $('#formModal')[0].reset();  // Reset the form
                buttons.forEach(button => {
                    button.classList.remove("loading-btn");
                  });
                window.location.href='booking.html'
            },
            error: function(err) {
                buttons.forEach(button => {
                    button.classList.remove("loading-btn");
                  });
                alert('Error creating booking.');
            }
        });
    }

    // Edit booking (Update)
    function editBooking(id) {
        
        $.ajax({
            url: `${apiUrl}/BookingInfo/GetById/${id}`,  // API endpoint to fetch the booking by ID
            method: 'GET',
            success: function(response) {
                const booking = response.response.result;
                $('#propName').val(booking.name);
                $('#propPrice').val(booking.price);
                $('#propLocation').val(booking.description);
                //$('#imageInput').val(booking.fileName);
                $('#saveBtn').css('display','none');
                $('#updateBtn').css('display','block');
                currentEditId = id;
                var myModal = new bootstrap.Modal(document.getElementById('bookingForm'));
                myModal.show();
            },
            error: function(err) {
                alert('Error fetching booking details.');
            }
        });
    }

    // Update booking
    function updateBooking(id, name, price, description, image) {
        const buttons = document.querySelectorAll("#saveBtn");
        buttons.forEach(button => {
          button.classList.add("loading-btn");
        });
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('file', image);
        formData.append('id', id);

        $.ajax({
            url: `${apiUrl}/BookingInfo`,  // API endpoint to update the booking
            method: 'PUT',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                alert('Booking updated successfully.');
                buttons.forEach(button => {
                    button.classList.remove("loading-btn");
                  });
                window.location.href='booking.html'
            },
            error: function(err) {
                buttons.forEach(button => {
                    button.classList.remove("loading-btn");
                  });
                alert('Error updating booking.');
            }
        });
    }

    // Delete booking
    function deleteBooking(id) {
        if (confirm('Are you sure you want to delete this booking?')) {
            $.ajax({
                url: `${apiUrl}/BookingInfo/${id}`,  // API endpoint to delete the booking
                method: 'DELETE',
                success: function(response) {
                    alert('Booking deleted successfully.');
                    fetchBookings();  // Refresh the list of bookings
                },
                error: function(err) {
                    alert('Error deleting booking.');
                }
            });
        }
    }

    // Validate form fields
    function validateForm() {
        let isValid = true;
        if ($('#propImage').val() === '') {
            alert("Booking Image is required.");
            isValid = false;
        }
        if ($('#propName').val() === '') {
            alert("Name is required.");
            isValid = false;
        }
        if ($('#propPrice').val() === '') {
            alert("Price is required.");
            isValid = false;
        }
        if ($('#propLocation').val() === '') {
            alert("Description is required.");
            isValid = false;
        }
        return isValid;
    }

    // Save button click event (Create or Update)
    $('#saveBtn').click(function(event) {
        event.preventDefault();

        if (validateForm()) {
            let name = $('#propName').val();
            let price = $('#propPrice').val();
            let description = $('#propLocation').val();
            let image = $('#propImage')[0].files[0];  // Get the selected file

            addBooking(name, price, description, image);
        }
    });

    // Update button click event (Update)
    $('#updateBtn').click(function(event) {
        
        event.preventDefault();
        if (validateForm()) {
            let name = $('#propName').val();
            let price = $('#propPrice').val();
            let description = $('#propLocation').val();
            let image = $('#propImage')[0].files[0];  // Get the selected file

            updateBooking(currentEditId, name, price, description, image);
        }
    });

    // Initial fetch of bookings
    var urlParams = new URLSearchParams(window.location.search);
    var param1Value  = parseInt(urlParams.get('id'));
    if(urlParams.size===0){
        fetchBookings();
    }
    

    // Expose edit and delete functions to the global scope
    window.editBooking = editBooking;
    window.deleteBooking = deleteBooking;
});
