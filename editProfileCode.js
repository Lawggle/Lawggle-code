MemberStack.onReady.then(function (member) {
  var mID = member["id"];
  var membership = member.membership;
  var plan = membership.id;

  $("#Hourly-rate option:first-child").attr("disabled", "disabled");
  $("#Type-law option:first-child").attr("disabled", "disabled");
  $("#Contingency option:first-child").attr("disabled", "disabled");
  $("#Consult option:first-child").attr("disabled", "disabled");

  if (
    membership.id == "60819c9eab402c0004df28a1" ||
    (membership.id == "60819ccd63974f0004ce1471") | (membership.id == "60819d02f611bf0004395a2a")
  ) {
    $("#Firm").prop("required", true);
  }

  function goToURL() {
    location.href = `${window.location.origin}/profile-dev-2?profile=` + mID;
  }
  $('#liveProfile, a[href="#liveProfile"]').on("click", function () {
    goToURL();
  });

  var url = "https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/MID/" + mID;

  $.ajax({ url: url, success: successFunc });

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
      if (value["Type of Pro"]) {
        $("#Type-law").val(value["Type of Pro"]);
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
      if (value.Associations) {
        $("#Associations").val(value.Associations);
      }
      if (value.Recognitions) {
        $("#Recognitions").val(value.Recognitions);
      }
      if (value.Publications) {
        $("#Publications").val(value.Publications);
      }
      // I dont know how to do these ones
      if (value["Hourly Rate"]) {
        $("#Hourly-rate").val(value["Hourly Rate"]);
      }

      if (value.Contingency) {
        $("#Contingency").val(value.Contingency);
      }
      if (value.Consult) {
        $("#Consult").val(value.Consult);
      }
      if (value["Public Phone"]) {
        $("#Public-phone").val(value["Public Phone"]);
      }
      if (value["Public Email"]) {
        $("#Public-email").val(value["Public Email"]);
      }
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
      if (value.Language) {
        var langValues = value.Language;
        $.each(langValues.split(", "), function (i, e) {
          $("select#Languages-2 option[value='" + e + "']").prop("selected", true);
        });
      }
    });
  }

  if (membership.name != ("Lawggle Exclusive Plus" || "Lawggle Exclusive Plus Yearly")) {
    $("#Public-phone").attr("disabled", "disabled");
    $("#Public-email").attr("disabled", "disabled");
    // $(".public-phone-wrap").hide();
    // $(".public-email-wrap").hide();
    // $(".firm-url-wrap").hide();
  }

  if (membership.name == "Free Plan") {
    $("#Twitter-url").attr("disabled", "disabled");
    $("#Facebook-url").attr("disabled", "disabled");
    $("#Linkedin-url").attr("disabled", "disabled");
    $("#Instagram-url").attr("disabled", "disabled");
    // $(".twitter-profile").hide();
    // $(".facebook-profile").hide();
    // $(".linkedin-profile").hide();
    // $(".instagram-profile").hide();
  }

  $("#profileUpdate").on("click", function () {
    console.log("updated profile button clicked");
    if ($("#wf-form-Contact-Form").valid()) {
      console.log("oh yeah");
      $("#updateLoading").css("opacity", "1");
      var makeCall = true;
      var firm = $("#Firm").val();
      var furl = $("#Firm-url").val();
      var type = $("select#Type-law").val();
      var items = $("select#Area-law").val();
      console.log("items", items);
      if (items.length > 5) {
        if (membership.name != ("Lawggle Exclusive Plus" || "Lawggle Exclusive Plus Yearly")) {
          makeCall = false;
          $(".morethan5").css("display", "flex");
          $("#updateLoading").css("opacity", "0");
        } else {
          makeCall = true;
        }
      } else {
        makeCall = true;
      }
      console.log("make call", makeCall);
      // var items = [];
      //$("select#Area-law option:contains(Law)").prop("selected","selected")

      var area = items.join(", ");
      var address = $("#Address").val();
      var s = $("#Bio").val();
      var bio = s.replace(/\n/g, "<br />");
      console.log(area);

      //var bio = $("#Bio").val();
      var education = $("#Education").val();
      var associations = $("#Associations").val();
      var recognitions = $("#Recognitions").val();
      var publications = $("#Publications").val();
      var rate = $("select#Hourly-rate").val();
      var contingency = $("select#Contingency").val();
      var consult = $("select#Consult").val();
      var phone = $("#Public-phone").val();
      var email = $("#Public-email").val();
      var twitter = $("#Twitter-url").val();
      var facebook = $("#Facebook-url").val();
      var linkedin = $("#Linkedin-url").val();
      var instagram = $("#Instagram-url").val();
      var languageItems = $("select#Languages-2").val();
      var language = languageItems.join(", ");

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
            Firm: firm,
            ["Type of Pro"]: type,
            ["Area of Law"]: area,
            Url: furl,
            Address: address,
            Bio: bio,
            Education: education,
            Associations: associations,
            Recognitions: recognitions,
            Publications: publications,
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

$(".okay-btn").on("click", function () {
  $(".morethan5").hide();
});
