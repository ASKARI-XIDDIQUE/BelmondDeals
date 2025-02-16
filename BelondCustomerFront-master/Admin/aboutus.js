window.onload = function(){
    fetchText()
}
function fetchText() {
    
    $.ajax({
        url: `${apiUrl}/aboutus/1`,  // API endpoint to fetch all bookings
        method: 'GET',
        success: function(response) {
            document.getElementById('update').value = response.response.detail;  // Assuming the response is an array of bookings
        },
        error: function(err) {
            alert('Error fetching text.');
        }
    });
}

function updateTetst(){
    var text = document.getElementById('update').value
    const formData = new FormData();
        formData.append('id', 1);
        formData.append('detail', text);
    $.ajax({
        url: `${apiUrl}/AboutUs`,  // API endpoint to update the booking
        method: 'PUT',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            alert('Text updated successfully.');
            
        },
        error: function(err) {
            alert('Error updating text.');
        }
    });
}