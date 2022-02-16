// Adding the leads page

MemberStack.onReady.then(function (member) {
  var mID = member["id"];

  fetch(`https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/tabs/Leads/MID/${mID}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data is", data);
    })
    .catch((error) => {
      console.error(error);
    });
});
