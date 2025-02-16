$(document).ready(function() {
    let currentEditIndex = null;
    let currentEditId = null;
    
    if(localStorage.getItem('userRole')==='Second Admin'){
    document.getElementById('addbookTab').style.display = 'none';
    }


    
    // Fetch and render all bookings from API
    function fetchBookings() {
        $.ajax({
            url: `${apiUrl}/customerPotalPics`,  // API endpoint to fetch all bookings
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
        var timestamp = new Date().getTime(); // Generate a unique timestamp
        var row = ``
        bookings.response.forEach(function(booking, index) {

            row = `
                <tr>
                    <td class="td flex">
                            <div class="imgDiv">
                                <img src="${apiUrlBookingImage+''+booking.imagePath + "?v=" + timestamp}" alt="Apartment Image">
                            </div>
                            <div class="propertyInfo">
                                <span class="name">${booking.imageName}</span>
                                <!-- <p>Currently Free</p> -->
                              
                            </div>
                    </td>
                   
                    
                    <td class="action">
                            
                            <a id="saveBtn" href="detailImageUpdate.html?id=${booking.id}">
                                <i class="uil uil-edit icon"></i>
                            </a>
                           
                           
                    </td>
                    
                </tr>
            `;
            $('#detailImageTable').append(row);
        });
    }

    // Add booking (Create)
    
    // Edit booking (Update)
    function editBooking(id) {
        
        currentEditId = id;
        // $.ajax({
        //     url: `${apiUrl}/BookingInfo/GetById/${id}`,  // API endpoint to fetch the booking by ID
        //     method: 'GET',
        //     success: function(response) {
        //         const booking = response.response.result;
        //         $('#propName').val(booking.name);
        //         $('#propPrice').val(booking.price);
        //         $('#propLocation').val(booking.description);
        //         //$('#imageInput').val(booking.fileName);
        //         $('#saveBtn').css('display','none');
        //         $('#updateBtn').css('display','block');
        //         var myModal = new bootstrap.Modal(document.getElementById('bookingForm'));
        //         myModal.show();
        //     },
        //     error: function(err) {
        //         alert('Error fetching booking details.');
        //     }
        // });
    }

    // Update booking
    async function updateBooking(id,image) {
        const buttons = document.querySelectorAll("#updateBtn");
        buttons.forEach(button => {
          button.classList.add("loading-btn");
        });
        const formData = new FormData();
        formData.append('image', image);
        formData.append('id', id);

       await  $.ajax({
            url: `${apiUrl}/customerPotalPics`,  // API endpoint to update the booking
            method: 'PUT',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                alert('Pic updated successfully.');
                buttons.forEach(button => {
                    button.classList.remove("loading-btn");
                  });
                window.location.href='detailsImage.html'
            },
            error: function(err) {
                buttons.forEach(button => {
                    button.classList.remove("loading-btn");
                  });
                alert('Error updating booking.');
            }
        });
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

    // Update button click event (Update)
    $('#updateBtn').click(function(event) {
        
        event.preventDefault();
        if (validateForm()) {
            // let name = $('#propName').val();
            // let price = $('#propPrice').val();
            // let description = $('#propLocation').val();
            let image = $('#propImage')[0].files[0];  // Get the selected file

            updateBooking(currentEditId,image);
        }
    });

    // Initial fetch of bookings
    var urlParams = new URLSearchParams(window.location.search);
    var param1Value  = parseInt(urlParams.get('id'));
    if(urlParams.size===0){
        fetchBookings();
    }
    

    window.editBooking = editBooking;
});
