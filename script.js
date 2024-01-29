const fetchAll = document.querySelector(".fetch-all");

function createTable(data, headers) {
  const tablEl = document.createElement("table");
  const headerRow = document.createElement("tr");
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  tablEl.appendChild(headerRow);

  data.forEach((rowData) => {
    const row = document.createElement("tr");
    headers.forEach((header) => {
      const cell = document.createElement("td");
      cell.textContent = rowData[header];
      row.appendChild(cell);
    });
    tablEl.appendChild(row);
  });

  const tableContainer = document.querySelector(".table-container");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(tablEl);
  // document.body.insertAdjacentElement("afterend", tablEl);
}

// [userId, id, title, body];

fetchAll.addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      createTable(json, ["userId", "id", "title", "body"]);
    });
  // console.log(json);
});
