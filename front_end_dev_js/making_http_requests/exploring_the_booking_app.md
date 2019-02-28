# Exploring the Booking App

## How many staff are there?

There are 5 staff members:

```javascript
var get_staff = new XMLHttpRequest();
get_staff.open('GET', '/api/staff_members');
get_staff.send();
get_staff.addEventListener('load', function(event) {
  var request = event.target;
  var jsonObj = JSON.parse(request.responseText)
  staffNumber.textContent = String(jsonObj.length);
});
```

## How many students are there?

There are 5 students:

```javascript
var get_students = new XMLHttpRequest();
get_students.open('GET', '/api/students');
get_students.send();
get_students.addEventListener('load', function(event) {
  var request = event.target;
  var jsonObj = JSON.parse(request.responseText)
  studentNumber.textContent = String(jsonObj.length);
});
```

## How many schedules exist?

9 schedules exist:

```javascript
var get_schedules = new XMLHttpRequest();
get_schedules.open('GET', '/api/schedules');
get_schedules.send();
get_schedules.addEventListener('load', function(event) {
  var request = event.target;
  var jsonObj = JSON.parse(request.responseText)
  scheduleNumber.textContent = String(jsonObj.length);
});
```

## How many schedules have bookings?

3 schedules have bookings:

```javascript
var get_schedules = new XMLHttpRequest();
get_schedules.open('GET', '/api/schedules');
get_schedules.send();
get_schedules.addEventListener('load', function(event) {
  var request = event.target;
  var jsonObj = JSON.parse(request.responseText)
  console.log(jsonObj.length);
  scheduleNumber.textContent = String(jsonObj.length);

  var bookedSchedules = jsonObj.filter(function(schedule) {
    if (schedule.student_email === null) {
      return false;
    } else {
      return true;
    }
  });
  scheduleBookings.textContent = String(bookedSchedules.length);
});
```

## Do all staff have schedules?

No, not all staff have schedules:

```javascript
var get_staff = new XMLHttpRequest();
get_staff.open('GET', '/api/staff_members');
get_staff.send();
get_staff.addEventListener('load', function(event) {
  var request = event.target;
  var jsonObj = JSON.parse(request.responseText)
  var numberOfStaff = jsonObj.length;
  staffNumber.textContent = String(numberOfStaff);

  var staffWithSchedules = 0;
  jsonObj.forEach(function(staff) {
    var staffSchedule = new XMLHttpRequest();
    staffSchedule.open('GET', '/api/schedules/' + staff.id);
    staffSchedule.send();
    staffSchedule.addEventListener('load', function(event) {
      var request = event.target;
      var jsonObj = JSON.parse(request.responseText)
      if (jsonObj.length > 0) {
        staffWithSchedules += 1;
      }
      if (staffWithSchedules >= numberOfStaff) {
        scheduleStaff.textContent = 'Yes';
      } else {
        scheduleStaff.textContent = 'No';
      }
    });

  });
});
```

## Did all students book a schedule?

No, not all students booked a schedule:

```javascript
var get_students = new XMLHttpRequest();
get_students.open('GET', '/api/students');
get_students.send();
get_students.addEventListener('load', function(event) {
  var request = event.target;
  var students = JSON.parse(request.responseText)
  studentNumber.textContent = String(students.length);

  var get_schedules = new XMLHttpRequest();
  get_schedules.open('GET', '/api/schedules');
  get_schedules.send();
  get_schedules.addEventListener('load', function(event) {
    var request = event.target;
    var jsonObj = JSON.parse(request.responseText)
    var uniqueBookedStudents = [];

    jsonObj.forEach(function(schedule) {
      var studentEmail = schedule.student_email;
      if (studentEmail !== null && uniqueBookedStudents.indexOf(studentEmail) === -1) {
        uniqueBookedStudents.push(studentEmail);
      }
    });
    console.log(uniqueBookedStudents);
    if (students.length === uniqueBookedStudents.length) {
      allStudentsScheduled.textContent = 'Yes';
    } else {
      allStudentsScheduled.textContent = 'No';
    }
  });
});
```
