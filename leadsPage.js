MemberStack.onReady.then(function (member) {
  // Get membership ID from memberstack
  var mID = member["id"];

  //   Get the sample row and row container
  var templateRow = document.querySelector("#sample-row");

  // Hiding the sample row
  templateRow.style.display = "none";

  const rowsWrapper = document.querySelector(".table-data-wrapper");

  //   Make API call to google sheet and get data
  fetch(`https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/tabs/Leads/MID/${mID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data is", data);

      //   Run loop on returned results and render inside row container
      data.forEach((row, index) => {
        // Only render if row is not deleted ie hidden
        if (!row.Hide) {
          //   Create copy of sample row
          const newRow = templateRow.cloneNode(true);

          //   Replace data with row from sheet
          newRow.querySelector(".data-number").innerHTML = index + 1;
          newRow.querySelector(".data-name").innerHTML = row["Pro Name"];
          newRow.querySelector(".data-date").innerHTML = row["Date Submitted"];
          newRow.querySelector(".data-email").innerHTML = row["Sender Email"];
          newRow.querySelector(".message-min").innerHTML = row["Message"].substring(0, 25) + "...";
          newRow.querySelector(".message-max").innerHTML = row["Message"];

          // Adding event listener on show more button
          newRow.querySelector(".show-more").onclick = function () {
            newRow.querySelector(".message-min").style.display = "none";
            newRow.querySelector(".message-max").style.display = "block";
            this.style.display = "none";
          };

          // Adding event listener to delete button
          newRow.querySelector(".delete").onclick = function () {
            newRow.style.display = "none";

            fetch(`https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/tabs/Leads/UUID/${row["UUID"]}`, {
              method: "PATCH",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Hide: "true",
              }),
            })
              .then((r) => r.json())
              .then(console.log)
              .catch(console.error);
          };

          // Showing the sample row
          newRow.style.display = "flex";
          rowsWrapper.appendChild(newRow);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
