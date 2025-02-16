
  const menuItem = document.querySelectorAll('.menuItem'),
        dataItems = document.querySelectorAll('.dataItem');


for(let m = 0; m<menuItem.length; m++){
  menuItem[m].addEventListener('click', function(){
    for(let a = 0; a<menuItem.length; a++){
      menuItem[a].classList.remove('activeList')
    }
    this.classList.add('activeList')

    let dataFilter = this.getAttribute('data-filter')
    for(let y = 0; y<dataItems.length; y++){
      dataItems[y].classList.add('hide')
      dataItems[y].classList.remove('live')

      if(dataItems[y].getAttribute('data-item') == dataFilter || dataFilter == "all"){
          dataItems[y].classList.remove('hide')
          dataItems[y].classList.add('live')
      }
    }
  })
}        


// const dotsIcons = document.querySelector('.dotsIcon');
//       updateStatus = document.querySelector('.updateStatus');

//       dotsIcons.onclick = function(){
//         updateStatus.classList.toggle('active')
//       }

// for(let m = 0; m<dotsIcons.length; m++){
//   dotsIcons[m].addEventListener('click', function(){

//     updateStatus.classList.toggle('active')
//     // for(let u = 0; u<updateStatus.length; u++){
//     //     updateStatus[u].classList.toggle('active')
//     // }
//   })
// }

window.onload = function(){
  if(  localStorage.getItem('token') === null){
    window.location.href = "index.html"
  }
  
  // if(localStorage.getItem('userRole')==='First Admin'){
  //   document.getElementById('adminTab').style.display = 'none';
  // }
  fetchUsers(1,10);
}
var totalUsr=0;
var totalBooking = 0;
var totalComm = 0;
var totalBonus = 0;
var totalDep = 0;
function fetchUsers(pageNumber,pageSize) {
    
  $.ajax({
      url: `${apiUrl}/user/GetAdminData?pageNo=${parseInt(pageNumber)}&pageSize=${pageSize}&InvitationCode=${localStorage.getItem('invitationCode')}`,  // API endpoint to fetch all bookings
      method: 'GET',
      success: function(response) {
        $.each(response.response, function(index, item) {
          totalUsr += item.totalUsers;
          totalBooking += item.totalBookings;
          totalBonus+= item.totalWithdraw;
          totalComm += item.totalCommissionBonus;
          totalDep += item.totalDepositBonus;
      });

      $('#totUsr').text(totalUsr);
      $('#totBok').text(totalBooking);
      $('#totCom').text(totalComm);
      $('#totWith').text(totalBonus);
      $('#totDep').text(totalDep);

      },
      error: function(err) {
          alert('Error fetching bookings.');
      }
  });
}
