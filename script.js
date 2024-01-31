const fetchAllButton = document.querySelector(".fetch-all-button");
const openCreateFormButton = document.querySelector(".create-button");
const saveRowDataBtn = document.querySelector(".save-button");
const formContainer = document.querySelector(".form-hidden");
const inputField = document.querySelector(".input");
var tableContainer = document.querySelector(".table-container");

const createHeaderRow = (tablEl, headers) => {
  headers = headers.sort((a, b) => a - b);
  const headerRow = document.createElement("tr");
  headerRow.classList.add("table-header");

  // add columns to header row
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  tablEl.appendChild(headerRow);
  return;
};

// creating table with rows and columns
function createTable(headers) {
  if (!document.querySelector(".main-table")) {
    const tablEl = document.createElement("table");
    tablEl.classList.add("main-table");

    tableContainer.innerHTML = "";
    tableContainer.appendChild(tablEl);

    if (!document.querySelector(".table-header")) {
      createHeaderRow(tablEl, headers);
    }
  }

  return;
}

const addRowsToTable = (rows) => {
  if (!rows.length) return;

  const tablEl = document.querySelector(".main-table");

  rows.forEach((rowData, i) => {
    // create row
    const row = document.createElement("tr");
    const values = Object.values(rowData);

    if (i === 0) {
      console.log("VALUES: ", rowData);
      console.log("VALUES: ", values);
    }

    // add columns to row
    values.forEach((val) => {
      const cell = document.createElement("td");
      cell.textContent = val;
      row.appendChild(cell);
    });

    // add row to table
    tablEl.appendChild(row);
  });

  return;
};

/**
 * Click event handlers
 */
fetchAllButton.addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      createTable(Object.keys(json[0]));
      addRowsToTable(json);
    });
});

openCreateFormButton.addEventListener("click", function (e) {
  e.preventDefault();

  formContainer.classList.remove("form-hidden");
  document.getElementById("id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("body").value = "";

  return;
});

saveRowDataBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.add("form-hidden");

  const idField = Number(document.getElementById("id").value);
  const titleField = document.getElementById("title").value;
  const bodyField = document.getElementById("body").value;

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
      createTable(Object.keys(json));
      addRowsToTable([json]);
    });
});
