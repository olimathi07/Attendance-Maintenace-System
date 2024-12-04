document.addEventListener('DOMContentLoaded', function() {
    const staffLoginForm = document.querySelector('form[action="/staff_login"]');
    if (staffLoginForm) {
      staffLoginForm.addEventListener('submit', function(event) {
        const staffEmail = document.getElementById('staffEmail').value.trim();
        const staffPassword = document.getElementById('staffPassword').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailPattern.test(staffEmail)) {
          event.preventDefault();  
          alert('Please enter a valid email address.');
        } else if (staffPassword.length < 6) {
          event.preventDefault();
          alert('Password must be at least 6 characters long.');
        }
      });
    }
    const studentLoginForm = document.querySelector('form[action="/student_login"]');
    if (studentLoginForm) {
      studentLoginForm.addEventListener('submit', function(event) {
        const studentRollNumber = document.getElementById('studentRollNumber').value.trim();
        const studentPassword = document.getElementById('studentPassword').value.trim();
        if (studentRollNumber === "") {
          event.preventDefault(); 
          alert('Please enter your roll number.');
        } else if (studentPassword.length < 6) {
          event.preventDefault();
          alert('Password must be at least 6 characters long.');
        }
      });
    }
  });
  