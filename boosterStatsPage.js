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
  fetch(`https://sheet.best/api/sheets/9a50a3e6-171c-4369-a6a0-9f97aa4f56d6/MID/${mID}`)
    .then((response) => response.json())
    .then((data) => {
      $(".table-wrapper").css("opacity", "100%");
      $(".leads-animation").css("display", "none");
      console.log("data is", data);
      var count = 0;
      //   Run loop on returned results and render inside row container
      data.forEach((row) => {
        // Only render if row is set to show "yes"
        if (row.Show == "yes") {
          count++;
          //   Create copy of sample row
          const newRow = templateRow.cloneNode(true);

          //   Replace data with row from sheet
          newRow.querySelector(".data-date").innerHTML = row.Active;
          newRow.querySelector(".data-duration").innerHTML = row.Duration;
          newRow.querySelector(".data-campaign").innerHTML = row.Booster;
          newRow.querySelector(".data-impressions").innerHTML = row.Impressions;
          newRow.querySelector(".data-results").innerHTML = row.Results;
          newRow.querySelector(".data-ctr").innerHTML = row.CTR;
          newRow.querySelector(".data-cpr").innerHTML = row.CPR;
        

          // Showing the sample row
          newRow.style.display = "flex";
          rowsWrapper.appendChild(newRow);

          $(".no-stats").hide();
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
 });
