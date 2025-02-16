$(document).ready(function() {
if(localStorage.getItem('userRole')==='First Admin'){
    document.getElementById('adminTab').style.display = 'none';
    document.getElementById('aboutUsTab').style.display = 'none';
}
if(localStorage.getItem('userRole')==='Second Admin'){
    document.getElementById('adminTab').style.display = 'none';
    document.getElementById('aboutUsTab').style.display = 'none';
    document.getElementById('socialMediaTab').style.display = 'none';
    document.getElementById('dashboardTab').style.display = 'none';
}
});