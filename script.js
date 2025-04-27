document.addEventListener('DOMContentLoaded', loadRecords);

function addRecord() {
  const name = document.getElementById('name').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const grade = parseFloat(document.getElementById('grade').value);

  if (name === '' || subject === '' || isNaN(grade) || grade < 0 || grade > 100) {
    alert("Please enter valid information.");
    return;
  }

  const student = { name, subject, grade };
  let records = JSON.parse(localStorage.getItem('records')) || [];
  records.push(student);
  localStorage.setItem('records', JSON.stringify(records));
  
  appendRecord(student);
  clearInputs();
}

function appendRecord({ name, subject, grade }) {
  const table = document.getElementById('recordTable');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${subject}</td>
    <td>${grade}</td>
    <td><button class="delete-btn" onclick="deleteRecord(this)">Delete</button></td>
  `;
  table.appendChild(row);
}

function loadRecords() {
  const records = JSON.parse(localStorage.getItem('records')) || [];
  records.forEach(record => appendRecord(record));
}

function deleteRecord(btn) {
  const row = btn.parentElement.parentElement;
  const name = row.cells[0].textContent;
  const subject = row.cells[1].textContent;
  const grade = parseFloat(row.cells[2].textContent);

  let records = JSON.parse(localStorage.getItem('records')) || [];
  records = records.filter(r => !(r.name === name && r.subject === subject && r.grade === grade));
  localStorage.setItem('records', JSON.stringify(records));

  row.remove();
}

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('subject').value = '';
  document.getElementById('grade').value = '';
}
