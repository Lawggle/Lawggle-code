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
      var count = 0;
      //   Run loop on returned results and render inside row container
      data.forEach((row) => {
        // Only render if row is not deleted i.e hidden
        if (row.Hide != "TRUE" && row["Lead Verified"] == "yes") {
          count++;
          //   Create copy of sample row
          const newRow = templateRow.cloneNode(true);

          //   Replace data with row from sheet
          newRow.querySelector(".data-number").innerHTML = count;
          newRow.querySelector(".data-name").innerHTML = row["Sender Name"];
          newRow.querySelector(".data-date").innerHTML = row["Date Submitted"];
          newRow.querySelector(".data-email").innerHTML = row["Sender Email"];
          newRow.querySelector(".data-phone").innerHTML = row["Sender Phone"];
          var messageMin = newRow.querySelector(".message-min");
          var messageMax = newRow.querySelector(".message-max");

          messageMin.innerHTML = row["Message"].substring(0, 25) + "...";
          messageMax.innerHTML = row["Message"];

          const moreText = newRow.querySelector(".more-text");
          const lessText = newRow.querySelector(".less-text");

          // Adding event listener on show more button
          newRow.querySelector(".show-more").onclick = function () {
            if (messageMin.style.display == "block") {
              messageMin.style.display = "none";
              messageMax.style.display = "block";

              moreText.style.display = "none";
              lessText.style.display = "block";
            } else if (messageMin.style.display == "none") {
              messageMin.style.display = "block";
              messageMax.style.display = "none";

              moreText.style.display = "block";
              lessText.style.display = "none";
            }
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
