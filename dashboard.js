MemberStack.onReady.then(function (member) {
  var mID = member["id"];
  var Firm = member["firm-name"];
  var membership = member.membership;
  var plan = membership.id;
  var mPlan = membership.name;
  var mEmail = member["email"];
  var mPhone = member["phone"];
  var mName =  member["first-name"] + " " + member["last-name"];
  
  //adding details to the datalayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
   'event': 'login',
   'member_id': mID,
   'member_name': mName,
});
  
  $("#mPlan").text(mPlan);
  $("#mEmail").text(mEmail);
  $("#mPhone").text(mPhone);
  
  console.log(mPlan);
  if (mPlan != "Free Plan") {
    $("#upGrade").hide();
  }
  if (mPlan == ("Free Plan" || "Lawggle Premier" || "Lawggle Premier Annual" || "Lawggle Elite" || "Lawggle Elite Annual" || "Firm Team Member")) {
    $(".firm-adds").hide();
  }

  if (Firm) {
    $("#Firm-2").val(Firm);
  }

  
  fetch("https://sheet.best/api/sheets/87c02226-b9fc-4f91-a018-ce0fca93e9aa/MID/" + mID)
    .then((response) => response.json())
    .then((data) => {
      console.log(mID);
      $.each(data, function (key, value) {
        console.log(value.Hide);
        if (value.Hide == "yes") {
          $(".livecheck").prop("checked", false);
        } else {
          $(".livecheck").prop("checked", true);
        }
        var myFirm = value.Firm;
        $("#firmName").text(myFirm);
        getFM();
      });
    })
    .catch((error) => {
      console.error(error);
    });

  function getFM() {
    var mFirm = $("#firmName").text();
    console.log(mFirm);

    fetch("https://sheet.best/api/sheets/87c02226-b9fc-4f91-a018-ce0fca93e9aa/Firm/" + mFirm)
      .then((response) => response.json())
      .then((data) => {
        $.each(data, function (key, value) {
          name = value["First Name"];
          lname = value["Last Name"];
          $("#fNames").append("<span class='ffn'>" + name + " " + lname + "</span>");
          if (value.Firm) {
            $("#Firm-2").val(value.Firm);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  $("#liveCheck").on("click", function () {
    if ($("input.livecheck").is(":checked")) {
      var pLive = "no";
    } else {
      var pLive = "yes";
    }
    console.log(pLive);

    fetch("https://sheet.best/api/sheets/87c02226-b9fc-4f91-a018-ce0fca93e9aa/MID/" + mID, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Hide: pLive,
      }),
    })
      .then((r) => r.json())
      .then(console.log)
      .catch(console.error);
  });

  const getStats = () => {
    // Get the leads stats
    //   Make API call to google sheet and get leads data
    fetch(`https://sheet.best/api/sheets/87c02226-b9fc-4f91-a018-ce0fca93e9aa/tabs/Leads/MID/${mID}`)
      .then((response) => response.json())
      .then((leads) => {
        $("#active-leads").text(leads.length);
      })
      .catch((error) => {
        console.error(error);
      });

    //   Make API call to google sheet and get boosters data
    fetch(`https://sheet.best/api/sheets/9a50a3e6-171c-4369-a6a0-9f97aa4f56d6/MID/${mID}`)
      .then((response) => response.json())
      .then((campaigns) => {
        $("#total-campaigns").text(campaigns.length);

        let totalResults = 0;
        campaigns.forEach((booster) => {
          totalResults = parseInt(totalResults) + parseInt(booster.Results);
        });

        $("#total-results").text(totalResults);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getStats();
});

$("#addMember").on("click", function () {
  var firm = $("#Firm-2").val();
  var fname = $("#First-Name").val();
  var lname = $("#Last-Name").val();
  var email = $("#Email-5").val();
  var phone = $("#Member-Phone").val();
  var tpw = $("#Password").val();

  var data = {
    firm: firm,
    fname: fname,
    lname: lname,
    email: email,
    phone: phone,
    tpw: tpw,
  };

  $.ajax({
    type: "POST",
    url: "https://hooks.zapier.com/hooks/catch/7845939/ov254pj/",
    data: JSON.stringify(data),
    success: function (data) {
      // console.log(data);
      $(".lottie-animation-22").css("opacity", "1");
      setTimeout(function () {
        //$('.add-members').trigger('click');
        location.reload();
      }, 1500);
    },
    error: function (xhr, status, error) {
      // handle error
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector('input[name="Email"]');
  if (!emailInput) return;

  emailInput.addEventListener("input", () => {
    const isValid = emailInput.checkValidity();
    emailInput.classList[isValid ? "add" : "remove"]("valid");
    emailInput.classList[isValid ? "remove" : "add"]("invalid");
  });
});

function checkPass() {
  var pass1 = document.getElementById("Password");
  var message = document.getElementById("error-nwl");
  var goodColor = "#81dcbb";
  var badColor = "#ef4565";

  if (pass1.value.length > 7) {
    pass1.style.backgroundColor = goodColor;
    //message.style.color = goodColor;
    // message.innerHTML = "character number ok!"
  } else {
    pass1.style.backgroundColor = badColor;
    message.style.color = badColor;
    message.innerHTML = " you need to enter at least 8 digits!";
    return;
  }
}
