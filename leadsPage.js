MemberStack.onReady.then(function (member) {
  // Get membership ID from memberstack
  var mID = member["id"];

  //   Get the sample row and row container
  var templateRow = document.querySelector("#sample-row");

  // Hiding the sample row
  templateRow.style.display = "none";

  $(".table-wrapper").css("opacity", "0%");

  const rowsWrapper = document.querySelector(".table-data-wrapper");

  //   Make API call to google sheet and get data
  fetch(`https://sheet.best/api/sheets/87c02226-b9fc-4f91-a018-ce0fca93e9aa/tabs/Leads/MID/${mID}`)
    .then((response) => response.json())
    .then((data) => {
      $(".table-wrapper").css("opacity", "100%");
      $(".leads-animation").css("display", "none");
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
          var messageMin = newRow.querySelector(".table-data.message-min");
          var messageMax = newRow.querySelector(".table-data.message-max");
          messageMin.style.display = "block";
          messageMax.style.display = "none";

          messageMin.innerHTML = row["Message"].substring(0, 25) + "...";
          messageMax.innerHTML = row["Message"];

          const moreText = newRow.querySelector(".more-text");
          const lessText = newRow.querySelector(".less-text");

          // Adding event listener on show more button
          newRow.querySelector(".show-more").onclick = function () {
            // If short message is shown
            if (messageMin.style.display == "block") {
              messageMin.style.display = "none";
              messageMax.style.display = "block";

              moreText.style.display = "none";
              lessText.style.display = "block";
            }
            // If full message is shown
            else if (messageMin.style.display == "none") {
              messageMin.style.display = "block";
              messageMax.style.display = "none";

              moreText.style.display = "block";
              lessText.style.display = "none";
            }
          };

          // Adding event listener to delete button
          newRow.querySelector(".delete").onclick = function () {
            newRow.style.display = "none";

            fetch(`https://sheet.best/api/sheets/87c02226-b9fc-4f91-a018-ce0fca93e9aa/tabs/Leads/UUID/${row["UUID"]}`, {
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

          $(".no-leads").hide();
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
