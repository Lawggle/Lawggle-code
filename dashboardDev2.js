MemberStack.onReady.then(function (member) {
  var mID = member["id"];
  var Firm = member["firm-name"];
  var membership = member.membership;
  var plan = membership.id;
  console.log(plan);
  if (membership == "5ef284eb9eddae000437af3a") {
    $("#upGrade").show();
  }
  if (plan == "5ef284eb9eddae000437af3a") {
    $(".firm-adds").hide();
  }
  if (plan == "60751a3a98f9250004560db2") {
    $(".firm-adds").hide();
  }
  if (plan == "620dc1ac75db6000046809db") {
    $(".firm-adds").hide();
  }
  if (plan == "620dc1f66ee4e4000493deba") {
    $(".firm-adds").hide();
  }
  if (plan == "620dd7f584b4320004530679") {
    $(".firm-adds").hide();
  }
  if (plan == "620dd81e87772e0004fa3d94") {
    $(".firm-adds").hide();
  }

  if (Firm) {
    $("#Firm-2").val(Firm);
  }

  fetch("https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/MID/" + mID)
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

    fetch("https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/Firm/" + mFirm)
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

    fetch("https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/MID/" + mID, {
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
