var makeCall = true;

function unselectLawAreas() {
  $.each($("#Area-law option:selected"), function () {
    $(this).prop("selected", false);
  });
}

var lawAreas = document.getElementById("Area-law").options;

const upgradeToPremier = () => {
  $(".upgrade-text").text("Upgrade to Lawggle Premier to unlock this field");
  $(".upgrade-message").css("display", "block");

  setTimeout(() => {
    $(".upgrade-message").css("display", "none");
  }, 2000);
};
const upgradeToElite = () => {
  $(".upgrade-text").text("Upgrade to Lawggle Elite to unlock this field");
  $(".upgrade-message").css("display", "block");

  setTimeout(() => {
    $(".upgrade-message").css("display", "none");
  }, 2000);
};

const checkForContactInfo = (fieldName, fieldValue) => {
  if (fieldValue.match(".com") || fieldValue.match("https") || fieldValue.match("www")) {
    $(".alert-wrap").css("display", "flex");
    $(".alert-msg").text(`${fieldName} cannot contain links`);
    $("#updateLoading").css("opacity", "0");
    makeCall = false;
  }

  var numberMatch1 = fieldValue.match(/[0-9][0-9][0-9].[0-9][0-9][0-9][0-9]/);
  var numberMatch2 = fieldValue.match(/[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/);
  var numberMatch3 = fieldValue.match(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9]/);
  if (numberMatch1 || numberMatch2 || numberMatch3) {
    $(".alert-wrap").css("display", "flex");
    $(".alert-msg").text(`${fieldName} cannot contain contact numbers`);
    $("#updateLoading").css("opacity", "0");
    makeCall = false;
  }
};

// Resets options for Area of Law based on type of profession
$("#Type-law").on("change", function () {
  if (this.value == "Notary" || this.value == "Paralegal" || this.value == "Court Agent") {
    $("#Area-law").prop("required", false);
    $("#Area-law").prop("disabled", true);
    unselectLawAreas();
  } else if (this.value == "Lawyer") {
    $("#Area-law").prop("required", true);
    $("#Area-law").prop("disabled", false);
    for (var i = 0; i < lawAreas.length; i++) {
      unselectLawAreas();
      if (lawAreas[i].text == "Process Server" || lawAreas[i].text == "Skip Tracer") {
        lawAreas[i].style.display = "none";
      } else {
        lawAreas[i].style.display = "block";
      }
    }
  } else if (this.value == "Process Server") {
    $("#Area-law").prop("required", true);
    $("#Area-law").prop("disabled", false);
    for (var i = 0; i < lawAreas.length; i++) {
      unselectLawAreas();
      if (lawAreas[i].textContent == "Process Server" || lawAreas[i].textContent == "Skip Tracer") {
        lawAreas[i].style.display = "block";
      } else {
        lawAreas[i].style.display = "none";
      }
    }
  }
});

MemberStack.onReady.then(function (member) {
  var mID = member["id"];
  var membership = member.membership;
  var plan = membership.id;
  var mPlan = membership.name;

  // Links View live profile button to the profile page
  function goToURL() {
    location.href = `${window.location.origin}/profile?profile=` + mID;
  }
  $('#liveProfile, a[href="#liveProfile"]').on("click", function () {
    goToURL();
  });

  // Makes firm required if membership is of type firm
  console.log(mPlan);
  if (mPlan == ("Firm 5" || "Firm 10" || "Firm 15" || "Firm Unlimited" || "Firm Team Member")) {
    $("#Firm").prop('required', true);
  }

  var url = "https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/MID/" + mID;

  $.ajax({ url: url, success: successFunc });

  // Runs on successfully loading data from google sheet
  function successFunc(data) {
    console.log(data);
    $(".loading").fadeOut();
    $.each(data, function (key, value) {
      if (value.Photo) {
        $("#dashboardPic, #profilePic").css("background-image", "url(" + value.Photo + ")");
        //$("#profilePic").removeAttr("src").attr('src', value.Photo  '?' + Math.random());
      }
      if (value.Firm) {
        $("#Firm").val(value.Firm);
      }
      if (value.Url) {
        $("#Firm-url").val(value.Url);
      }
      if (value.Pronouns) {
        $("#pronouns-field").val(value.Pronouns);
      }
      if (value["Type of Pro"]) {
        $("#Type-law").val(value["Type of Pro"]);

        if (
          value["Type of Pro"] == "Notary" ||
          value["Type of Pro"] == "Paralegal" ||
          value["Type of Pro"] == "Court Agent"
        ) {
          $("#Area-law").prop("required", false);
          $("#Area-law").prop("disabled", true);
          unselectLawAreas();
        } else if (value["Type of Pro"] == "Lawyer") {
          $("#Area-law").prop("required", true);
          $("#Area-law").prop("disabled", false);
          for (var i = 0; i < lawAreas.length; i++) {
            if (lawAreas[i].text == "Process Server" || lawAreas[i].text == "Skip Tracer") {
              lawAreas[i].style.display = "none";
            } else {
              lawAreas[i].style.display = "block";
            }
          }
        } else if (value["Type of Pro"] == "Process Server") {
          $("#Area-law").prop("required", true);
          $("#Area-law").prop("disabled", false);
          for (var i = 0; i < lawAreas.length; i++) {
            if (lawAreas[i].textContent == "Process Server" || lawAreas[i].textContent == "Skip Tracer") {
              lawAreas[i].style.display = "block";
            } else {
              lawAreas[i].style.display = "none";
            }
          }
        }
      }
      if (value["Area of Law"]) {
        var values = value["Area of Law"];
        $.each(values.split(", "), function (i, e) {
          $("select#Area-law option[value='" + e + "']").prop("selected", true);
        });
      }
      if (value.Address) {
        $("#Address").val(value.Address);
      }
      if (value.Bio) {
        $("#Bio").val(value.Bio);
      }
      if (value.Education) {
        $("#Education").val(value.Education);
      }
      if (value["Education-2"]) {
        $("#Education-2").val(value["Education-2"]);
      }
      if (value["Education-3"]) {
        $("#Education-3").val(value["Education-3"]);
      }
      if (value.Associations) {
        $("#Associations").val(value.Associations);
      }
      if (value["Associations-2"]) {
        $("#Associations-2").val(value["Associations-2"]);
      }
      if (value["Associations-3"]) {
        $("#Associations-3").val(value["Associations-3"]);
      }
      if (value.Recognitions) {
        $("#Recognitions").val(value.Recognitions);
      }
      if (value["Recognitions-2"]) {
        $("#Recognitions-2").val(value["Recognitions-2"]);
      }
      if (value["Recognitions-3"]) {
        $("#Recognitions-3").val(value["Recognitions-3"]);
      }
      if (value.Publications) {
        $("#Publications").val(value.Publications);
      }
      if (value["Publications-2"]) {
        $("#Publications-2").val(value["Publications-2"]);
      }
      if (value["Publications-3"]) {
        $("#Publications-3").val(value["Publications-3"]);
      }
      if (value["Hourly Rate"]) {
        $("#Hourly-rate").val(value["Hourly Rate"]);
      }
      if (value.Contingency) {
        $("#Contingency").val(value.Contingency);
      }
      if (value.Consult) {
        $("#Consult").val(value.Consult);
      }

      if (membership.name == ("Lawggle Elite" || "Lawggle Elite Annual")) {
        if (value["Public Phone"]) {
          $("#Public-phone").val(value["Public Phone"]);
        }
        if (value["Public Email"]) {
          $("#Public-email").val(value["Public Email"]);
        }
      } else {
        $("#Public-phone").attr("disabled", "disabled");
        $("#Public-phone").attr("placeholder", "Upgrade to Lawggle Elite");
        $("#Public-email").attr("disabled", "disabled");
        $("#Public-email").attr("placeholder", "Upgrade to Lawggle Elite");
      }

      if (membership.name == "Free Plan") {
        $("#Twitter-url").attr("disabled", "disabled");
        $("#Facebook-url").attr("disabled", "disabled");
        $("#Linkedin-url").attr("disabled", "disabled");
        $("#Instagram-url").attr("disabled", "disabled");
        $("#Twitter-url").attr("placeholder", "Upgrade to Lawggle Premier");
        $("#Facebook-url").attr("placeholder", "Upgrade to Lawggle Premier");
        $("#Linkedin-url").attr("placeholder", "Upgrade to Lawggle Premier");
        $("#Instagram-url").attr("placeholder", "Upgrade to Lawggle Premier");
      } else {
        if (value.Twitter) {
          $("#Twitter-url").val(value.Twitter);
        }
        if (value.Facebook) {
          $("#Facebook-url").val(value.Facebook);
        }
        if (value.Linkedin) {
          $("#Linkedin-url").val(value.Linkedin);
        }
        if (value.Instagram) {
          $("#Instagram-url").val(value.Instagram);
        }
      }

      if (value.Language) {
        var langValues = value.Language;
        $.each(langValues.split(", "), function (i, e) {
          $("select#Languages-2 option[value='" + e + "']").prop("selected", true);
        });
      }
    });
  }

  // Runs on clicking the "Update Profile" button
  $("#profileUpdate").on("click", function () {
    console.log("updated profile button clicked");
    if ($("#wf-form-Contact-Form").valid()) {
    }
    $("#updateLoading").css("opacity", "1");
    makeCall = true;
    var firm = $("#Firm").val();
    if (
      !firm &&
      mPlan == ("Firm 5" || "Firm 10" || "Firm 15" || "Firm Unlimited" || "Firm Team Member")
    ) {
      makeCall = false;
      $(".alert-wrap").css("display", "flex");
      $(".alert-msg").text("Please enter your firm name");
      $("#updateLoading").css("opacity", "0");
    }
    var furl = $("#Firm-url").val();
    var type = $("select#Type-law").val();
    if (type == "") {
      makeCall = false;
      $(".alert-wrap").css("display", "flex");
      $(".alert-msg").text("Please select your profession type");
      $("#updateLoading").css("opacity", "0");
    }
    var items = $("select#Area-law").val();
    // Checks if number of areas selected is more than 5 or none
    if (items.length > 5) {
      if (membership.name != ("Lawggle Elite" || "Lawggle Elite Annual")) {
        makeCall = false;
        $(".alert-wrap").css("display", "flex");
        $(".alert-msg").text(
          "Please select 5 or less Areas of Expertise or upgrade to Lawggle Elite Membership to increase limits"
        );
        $("#updateLoading").css("opacity", "0");
      }
    } else if (items.length == 0) {
      makeCall = false;
      $(".alert-wrap").css("display", "flex");
      $(".alert-msg").text("Please select at least one Area of Expertise");
      $("#updateLoading").css("opacity", "0");
    }
    var pronouns = $("select#pronouns-field").val();
    var area = items.join(", ");

    var languageItems = $("select#Languages-2").val();
    if (languageItems.length == 0) {
      makeCall = false;
      $(".alert-wrap").css("display", "flex");
      $(".alert-msg").text("Please select at least one language");
      $("#updateLoading").css("opacity", "0");
    }
    var language = languageItems.join(", ");

    var address = $("#Address").val();
    if (address == "") {
      makeCall = false;
      $(".alert-wrap").css("display", "flex");
      $(".alert-msg").text("Please enter your address");
      $("#updateLoading").css("opacity", "0");
    }

    var bioValue = $("#Bio").val();
    if (bioValue == "") {
      makeCall = false;
      $(".alert-wrap").css("display", "flex");
      $(".alert-msg").text("Please enter your bio");
      $("#updateLoading").css("opacity", "0");
    }
    checkForContactInfo("Bio", bioValue);
    var bio = bioValue.replace(/\n/g, "<br />");

    //var bio = $("#Bio").val();
    var education = $("#Education").val();
    var edTwo = $("#Education-2").val();
    var edThree = $("#Education-3").val();
    var associations = $("#Associations").val();
    var assocTwo = $("#Associations-2").val();
    var assocThree = $("#Associations-3").val();
    var recognitions = $("#Recognitions").val();
    var recogTwo = $("#Recognitions-2").val();
    var recogThree = $("#Recognitions-3").val();
    var publications = $("#Publications").val();
    var pubTwo = $("#Publications-2").val();
    var pubThree = $("#Publications-3").val();
    var rate = $("select#Hourly-rate").val();
    var contingency = $("select#Contingency").val();
    var consult = $("select#Consult").val();
    var phoneValue = $("#Public-phone").val();
    var phone = "";
    // Check if phone number is formatted properly
    if (phoneValue.length) {
      var phoneTemp = phoneValue.replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll("+", "");
      phone = phoneTemp.trim();
      if (phone.length != 10) {
        $(".alert-msg").text("Please enter your 10 digit phone number without any dashes, brackets or spaces");
        $(".alert-wrap").css("display", "flex");
        $("#updateLoading").css("opacity", "0");
        makeCall = false;
      }
    }
    var email = $("#Public-email").val();
    var twitter = $("#Twitter-url").val();
    var facebook = $("#Facebook-url").val();
    var linkedin = $("#Linkedin-url").val();
    var instagram = $("#Instagram-url").val();

    function successFuncp(data) {
      $("#updateLoading").css("opacity", "0");
      $("#updateSuccess").css("display", "block");
      $("#updateSuccess").trigger("click");
      console.log(data);
    }

    if (makeCall) {
      fetch("https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/MID/" + mID, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          Pronouns: pronouns,
          Firm: firm,
          ["Type of Pro"]: type,
          ["Area of Law"]: area,
          Url: furl,
          Address: address,
          Bio: bio,
          Education: education,
          ["Education-2"]: edTwo,
          ["Education-3"]: edThree,
          Associations: associations,
          ["Associations-2"]: assocTwo,
          ["Associations-3"]: assocThree,
          Recognitions: recognitions,
          ["Recognitions-2"]: recogTwo,
          ["Recognitions-3"]: recogThree,
          Publications: publications,
          ["Publications-2"]: pubTwo,
          ["Publications-3"]: pubThree,
          ["Hourly Rate"]: rate,
          Contingency: contingency,
          Consult: consult,
          ["Public Phone"]: phone,
          ["Public Email"]: email,
          Twitter: twitter,
          Facebook: facebook,
          Linkedin: linkedin,
          Instagram: instagram,
          Language: language,
        }),
      })
        .then((data) => {
          // The response comes here
          console.log(data);
          successFuncp(data);
        })
        .catch((error) => {
          // Errors are reported there
          console.log(error);
        });
    }
  });

  var singleWidget = uploadcare.SingleWidget("[role=uploadcare-uploader]");

  singleWidget.onChange(function (file) {
    $("#updateLoadingPh").css("opacity", "1");
    if (file) {
      file.done(function (info) {
        console.log(info.cdnUrl);
        phUpdate = info.cdnUrl;

        var urlph = "https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/MID/" + mID;

        function successFuncph(data) {
          console.log(data);
          $("#updateLoadingPh").css("opacity", "0");
          $("#dashboardPic, #profilePic").css("background-image", "url(" + info.cdnUrl + ")");
        }

        var paramsph = { Photo: phUpdate };
        $.ajax({ type: "PATCH", url: urlph, data: paramsph, success: successFuncph });
      });
    }
  });
});

$(document).ready(function () {
  $("#wf-form-Contact-Form").validate();
});

// Enables multiple option select for desktop
$("select#Area-law, select#Languages-2")
  .mousedown(function (e) {
    if (screen.width > 991) {
      e.preventDefault();

      var select = this;
      var scroll = select.scrollTop;

      e.target.selected = !e.target.selected;

      setTimeout(function () {
        select.scrollTop = scroll;
      }, 0);

      $(select).focus();
    }
  })
  .mousemove(function (e) {
    e.preventDefault();
  });

// Hides alert messages after clicking on okay
$(".okay-btn").on("click", function () {
  $(".alert-wrap").hide();
});

// Disabling the first select option "Select one.." for all the dropdowns
$("#Hourly-rate option:first-child").attr("disabled", "disabled");
$("#Type-law option:first-child").attr("disabled", "disabled");
$("#Contingency option:first-child").attr("disabled", "disabled");
$("#Consult option:first-child").attr("disabled", "disabled");
