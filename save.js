// Replace these URLs with your Sheety API URLs
const attendanceUrl = "https://api.sheety.co/3799be735f7a2e68b6fe2b4c3aac95e3/gdAttendance/attendance";
const preferencesUrl = "https://api.sheety.co/3799be735f7a2e68b6fe2b4c3aac95e3/gdAttendance/preferences";

// Add Attendance Row
function addAttendance() {
  const name = document.getElementById('name').value;
  const status = document.getElementById('status').value;

  fetch(attendanceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      attendance: {
        name: name,
        status: status
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    alert('Attendance added!');
    fetchAttendance();
  });
}

// Add Preference Row
function addPreference() {
  const name = document.getElementById('prefName').value;
  const preference = document.getElementById('preference').value;

  fetch(preferencesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      preference: {
        name: name,
        choice: preference
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    alert('Preference added!');
    fetchPreferences();
  });
}

// Fetch Attendance Data
function fetchAttendance() {
  fetch(attendanceUrl)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#attendanceTable tbody');
      tbody.innerHTML = '';
      data.attendance.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.name}</td><td>${row.status}</td>`;
        tbody.appendChild(tr);
      });
    });
}

// Fetch Preferences Data
function fetchPreferences() {
  fetch(preferencesUrl)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#preferencesTable tbody');
      tbody.innerHTML = '';
      data.preferences.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.name}</td><td>${row.choice}</td>`;
        tbody.appendChild(tr);
      });
    });
}

// Load data when page opens
window.onload = function() {
  fetchAttendance();
  fetchPreferences();
}
