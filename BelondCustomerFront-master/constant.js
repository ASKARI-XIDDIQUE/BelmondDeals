function showNotification(type, message) {
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');

  // Set the notification message
  notificationText.textContent = message;

  // Set the notification type (success or error)
  notification.className = `notification ${type}`;

  // Adjust width based on text length
  const textWidth = notificationText.offsetWidth;
  notification.style.width = `${textWidth + 60}px`; // Add padding

  // Show the notification
  notification.classList.add('show');

  // Hide the notification after 2 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function getFormattedDate(incomingDate){
  const inputDate = incomingDate;
  const date = new Date(inputDate);
  const formattedDate = date.toISOString().split('T')[0];
  const time = date.toISOString().split('T')[1].split('.')[0];
  return formattedDate + ' ' + time
}

