const fetchAll = document.querySelector(".fetch-all-button");
const createBtn = document.querySelector(".create-button");
const saveBtn = document.querySelector(".save-button");
const formContainer = document.querySelector(".form-hidden");
const inputField = document.querySelector(".input");
var tableContainer = document.querySelector(".table-container");
const newTable = document.querySelector(".new-table");
const tablEl = document.createElement("table");

const headerRow = document.createElement("tr");
["userId", "id", "title", "body"].forEach((headerText) => {
  const th = document.createElement("th");
  th.textContent = headerText;
  headerRow.appendChild(th);
});
tablEl.appendChild(headerRow);

//new data from user
const newData = function () {
  var idField = Number(document.getElementById("id").value);
  var titleField = document.getElementById("title").value;
  var bodyField = document.getElementById("body").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: titleField,
      body: bodyField,
      userId: idField,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      // const result = Object.keys(json).map((key) => [key, json[key]]);
      // console.log("create newdata");
      // createTable([json], ["userId", "id", "title", "body"]);
      // document.body.appendChild(newTable);
      tablEl.insertAdjacentElement("afterbegin");
      console.log(json);
    });
};

// creating table with rows and columns
function createTable(data, start = false) {
  tablEl.classList.add("my-class");

  data.forEach((rowData) => {
    const row = document.createElement("tr");
    headers.forEach((header) => {
      const cell = document.createElement("td");
      cell.textContent = rowData[header];
      row.appendChild(cell);
    });
    tablEl.appendChild(row);
  });

  if (!tableContainer.innerHTML.length) tableContainer.innerHTML = "";
  // tableContainer.appendChild(tablEl);
  tableContainer.insertAdjacentElement("afterbegin", tablEl);
  // console.log("create table");
}

fetchAll.addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      createTable(json, ["userId", "id", "title", "body"]);
      console.log("fetch all button pressedd");
      console.log(json);
    });
});

createBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.remove("form-hidden");
  document.getElementById("id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("body").value = "";
  console.log(" create button clicked");
});

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.add("form-hidden");
  newData();
  // tableContainer.appendChild(newTable);
  // console.log("saved");
});

// Creating new function for  new data

// function addData(data,headers){
//   const tableEl1 = document.querySelector('.my-class');
//   const headerRow = document.createElement("tr");
//   headers.forEach((headerText) => {
//     const th = document.createElement("th");
//     th.textContent = headerText;
//     headerRow.appendChild(th);
//   });
//   tablEl.appendChild(headerRow);

//   data.forEach((rowData) => {
//     const row = document.createElement("tr");
//     headers.forEach((header) => {
//       const cell = document.createElement("td");
//       cell.textContent = rowData[header];
//       row.appendChild(cell);
//     });
//     tablEl.appendChild(row);
//   });

//   // tableContainer.innerHTML = "";
//   tableContainer.appendChild(tablEl);
//   // console.log("create ta

// }
