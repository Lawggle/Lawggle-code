MemberStack.onReady.then(function (member) {
  // Get membership ID from memberstack
  var mID = member["id"];

  //   Get the sample row and row container
  var templateRow = document.querySelector("#sample-row");

  const rowsWrapper = document.querySelector(".table-data-wrapper");

  //   Make API call to google sheet and get data
  fetch(`https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/tabs/Leads/MID/${mID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data is", data);

      //   Run loop on returned results and render inside row container
      data.forEach((row, index) => {
        //   Create copy of sample row
        const newRow = templateRow.cloneNode(true);
        //   Replace data with row from sheet
        newRow.querySelector(".data-number").innerHTML = index;

        // Adding event listener on show more button
        newRow.querySelector(".show-more").onclick = function () {
          newRow.querySelector(".message-min").style.display = "none";
          newRow.querySelector(".message-max").style.display = "block";
          this.style.display = "none";
        };

        rowsWrapper.appendChild(newRow);
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // Hiding the sample row
  templateRow.style.display = "none";
});
