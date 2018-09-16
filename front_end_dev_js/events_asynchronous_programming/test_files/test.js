// document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#red').addEventListener('click', track(function() {
    document.body.style.background = 'red';
  }));

  document.querySelector('#blue').addEventListener('click', track(function() {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));

  document.querySelector('#orange').addEventListener('click', track(function() {
    document.body.style.background = 'orange';
  }));

  document.querySelector('#green').addEventListener('click', track(function() {
    document.body.style.background = 'green';
  }));
// });
