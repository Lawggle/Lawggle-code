var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

var profile = getUrlParameter("profile");

var url = "https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/MID/" + profile;

$.ajax({ url: url, success: successFunc });

function successFunc(data) {
  //  console.log(data);

  //Redirect to 404 page if no valid profile found
  if (data.length == 0) {
    window.location.href = `${window.location.origin}/404`;
  }

  $(".loading").fadeOut();
  $.each(data, function (key, value) {
    if (value.Photo) {
      $(".profile-image").attr("src", value.Photo);
    }

    $(".profile-name").text(value["First Name"] + " " + value["Last Name"]);
    if (value.Pronouns) {
      $(".pronouns-text").text(`(${value.Pronouns})`);
    } else {
      $(".pronouns-text").remove();
    }
    $(".profile-type").text(value["Type of Pro"]);

    if (value.Firm) {
      $(".profile-firm").text(value.Firm);
    } else {
      $(".at-symbol").remove();
      $(".profile-firm").remove();
    }

    if (value["Area of Law"]) {
      $(".practice-areas-text").text(value["Area of Law"]);
    }

    $(".languages-text").text(value.Language);

    if (value["Hourly Rate"]) {
      $(".rate-per-hour").text(value["Hourly Rate"]);
    } else {
      $(".rate-per-hour").text("Undisclosed");
      $(".per-hour").remove();
    }

    if (value.Contingency) {
      $(".contingency-text").text(value.Contingency);
    }
    if (value.Consult) {
      $(".free-consult-text").text(value.Consult);
    }

    // Starting with profile details
    if (value.Bio) {
      $(".bio-detail-text").html(value.Bio);
    }

    if (value.Education) {
      $(".education-text").html(value.Education);
    } else {
      $("#education-block").remove();
    }

    if (value.Associations) {
      $(".associations-text").html(value.Associations);
    } else {
      $("#associations-block").remove();
    }

    if (value.Recognitions) {
      $(".recognitions-text").html(value.Recognitions);
    } else {
      $("#recognitions-block").remove();
    }

    if (value.Publications) {
      $(".publications-text").html(value.Publications);
    } else {
      $("#publications-block").remove();
    }

    //Changing text and href of contact details or hiding them if no value is present
    if (value["Membership Type"] != "free" && (value["Public Phone"] || value["Public Email"] || value.Url)) {
      if (value["Public Phone"]) {
        $("#contact-mobile").text(value["Public Phone"]);
        $("#profile-mobile").attr("href", `tel:+${value["Public Phone"]}`);
      } else {
        $("#profile-mobile").remove();
      }

      if (value["Public Email"]) {
        $("#contact-emailid").text(value["Public Email"]);
        $("#profile-email").attr(
          "href",
          `mailto:${value["Public Email"]}?subject=Hey%20there%2C%20I%20found%20your%20profile%20on%20Lawggle`
        );
      } else {
        $("#profile-email").remove();
      }

      if (value.Url) {
        $("#contact-website").text(value.Url);
        $("#profile-website").attr("href", value.Url);
      } else {
        $("#profile-website").remove();
      }
    } else {
      $("#contact-details").remove();
    }

    // Adding urls to social icons or hiding them if url not present
    if (value["Membership Type"] != "free" && (value.Twitter || value.Facebook || value.Linkedin || value.Instagram)) {
      if (value.Twitter) {
        $("#twitter-url").attr("href", value.Twitter);
      } else {
        $("#twitter-url").remove();
      }
      if (value.Facebook) {
        $("#facebook-url").attr("href", value.Facebook);
      } else {
        $("#facebook-url").remove();
      }
      if (value.Linkedin) {
        $("#linkedin-url").attr("href", value.Linkedin);
      } else {
        $("#linkedin-url").remove();
      }
      if (value.Instagram) {
        $("#instagram-url").attr("href", value.Instagram);
      } else {
        $("#instagram-url").remove();
      }
    } else {
      $("#social-icons").remove();
    }

    $(".profile-contact-button").click(function () {
      $("profile-wrap").css("overflow", "hidden");
    });

    $(".close-talk-modal").click(function () {
      $("profile-wrap").css("overflow", "auto");
    });

    // Adding member name and email to talk modal form
    $("#Pro-Name").val(value["First Name"] + " " + value["Last Name"]);
    $("#Pro-Email").val(value["Email"]);

    // Initialize and add the map
    function initMap() {
      // The location of Uluru
      var address = value.Address;

      var map = new google.maps.Map(document.getElementById("map"), {
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoom: 15,
      });

      var geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        {
          address: address,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
            });
            map.setCenter(results[0].geometry.location);
            infowindow.open(map, marker);
            marker.addListener("click", function () {
              infowindow.open(map, marker);
            });
          }
        }
      );

      if (screen.width > 480) {
        var contentString =
          '<div id="content">' +
          '<div id="bodyContent">' +
          "<h4>" +
          value["First Name"] +
          " " +
          value["Last Name"] +
          "<h4>" +
          "<h5>" +
          value.Firm +
          "<h5>" +
          "<p>" +
          value.Address +
          "</p>" +
          "</div>" +
          "</div>";
      } else {
        var contentString =
          '<div id="content">' + "<h5>" + value["First Name"] + " " + value["Last Name"] + "</h5>" + "</div>";
      }

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
    }
    initMap();
  });
  //    $('#profileRight').html(html);
}

MemberStack.onReady.then(function (member) {});
