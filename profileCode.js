// Code to generate UUID starts here
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).uuidv4 = e());
})(this, function () {
  "use strict";
  var t,
    e = new Uint8Array(16);
  function o() {
    if (
      !t &&
      !(t =
        ("undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
        ("undefined" != typeof msCrypto &&
          "function" == typeof msCrypto.getRandomValues &&
          msCrypto.getRandomValues.bind(msCrypto)))
    )
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    return t(e);
  }
  var n =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function r(t) {
    return "string" == typeof t && n.test(t);
  }
  for (var i = [], u = 0; u < 256; ++u) i.push((u + 256).toString(16).substr(1));
  return function (t, e, n) {
    var u = (t = t || {}).random || (t.rng || o)();
    if (((u[6] = (15 & u[6]) | 64), (u[8] = (63 & u[8]) | 128), e)) {
      n = n || 0;
      for (var f = 0; f < 16; ++f) e[n + f] = u[f];
      return e;
    }
    return (function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        o = (
          i[t[e + 0]] +
          i[t[e + 1]] +
          i[t[e + 2]] +
          i[t[e + 3]] +
          "-" +
          i[t[e + 4]] +
          i[t[e + 5]] +
          "-" +
          i[t[e + 6]] +
          i[t[e + 7]] +
          "-" +
          i[t[e + 8]] +
          i[t[e + 9]] +
          "-" +
          i[t[e + 10]] +
          i[t[e + 11]] +
          i[t[e + 12]] +
          i[t[e + 13]] +
          i[t[e + 14]] +
          i[t[e + 15]]
        ).toLowerCase();
      if (!r(o)) throw TypeError("Stringified UUID is invalid");
      return o;
    })(u);
  };
});

// Code to generate UUID ends here

// UUID for the lets talk form
var UUID = uuidv4();

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
var url = "https://sheet.best/api/sheets/87c02226-b9fc-4f91-a018-ce0fca93e9aa/Alias/" + profile;

$(".profile-card").css("opacity", "0%");
$(".profile-details").css("display", "none");

$.ajax({ url: url, success: successFunc });

// scrolls to top on clicking contact button
$("#talk").click(function () {
  window.scrollTo(0, 0);
});
$(".profile-contact-button").click(function () {
  window.scrollTo(0, 0);
});

// This function runs when the API returns successfully
function successFunc(data) {
  //  console.log(data);

  //Redirect to 404 page if no valid profile found
  if (data.length == 0) {
    window.location.href = `${window.location.origin}/404`;
  }

  $(".loading").fadeOut();

  // Nest everything isnide Memberstack function to have access to the membership type

  $.each(data, function (key, value) {
    $(".profile-card").css("opacity", "100%");
    $(".profile-details").css("display", "block");
    $(".profile-animation").css("display", "none");

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

    if (value["Type of Pro"] == ("Notary" || "Paralegal" || "Court Agent")) {
      $("#areas-block").css("display", "none");
    }

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
      $("#ed-text").html(value.Education);
    } else {
      $("#education-block").remove();
    }
    if (value["Education-2"]) {
      $("#ed-text2").html(value["Education-2"]);
    } else {
      $("#ed-list2").remove();
    }
    if (value["Education-3"]) {
      $("#ed-text3").html(value["Education-3"]);
    } else {
      $("#ed-list3").remove();
    }

    if (value.Associations) {
      $(".associations-text").html(value.Associations);
    } else {
      $("#associations-block").remove();
    }
    if (value["Associations-2"]) {
      $("#assoc-text2").html(value["Associations-2"]);
    } else {
      $("#assoc-list2").remove();
    }
    if (value["Associations-3"]) {
      $("#assoc-text3").html(value["Associations-3"]);
    } else {
      $("#assoc-list3").remove();
    }

    if (value.Recognitions) {
      $("#recog-text").html(value.Recognitions);
    } else {
      $("#recognitions-block").remove();
    }
    if (value["Recognitions-2"]) {
      $("#recog-text2").html(value["Recognitions-2"]);
    } else {
      $("#recog-list2").remove();
    }
    if (value["Recognitions-3"]) {
      $("#recog-text3").html(value["Recognitions-3"]);
    } else {
      $("#recog-list3").remove();
    }

    if (value.Publications) {
      $("#pub-text").html(value.Publications);
    } else {
      $("#publications-block").remove();
    }
    if (value["Publications-2"]) {
      $("#pub-text2").html(value["Publications-2"]);
    } else {
      $("#pub-list2").remove();
    }
    if (value["Publications-3"]) {
      $("#pub-text3").html(value["Publications-3"]);
    } else {
      $("#pub-list3").remove();
    }

    //Changing text and href of contact details or hiding them if no value is present
    if (
      value["Membership Plan ID"] == ("622f65c8a07083000430a478" || "622f65f78974290004fd136c") &&
      (value["Public Phone"] || value["Public Email"] || value.Url)
    ) {
      if (value["Public Phone"]) {
        var match = value["Public Phone"].match(/^(\d{3})(\d{3})(\d{4})$/);
        var contactNumber = "(" + match[1] + ") " + match[2] + "-" + match[3];
        $("#profile-mobile").attr("href", `tel:+1${value["Public Phone"]}`);
        $("#contact-mobile").text(contactNumber);
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

        if (!value.Url.startsWith("https")) {
          var webUrl = `https://${value.Url}`;
        } else {
          var webUrl = value.Url;
        }

        $("#profile-website").attr("href", webUrl);
      } else {
        $("#profile-website").remove();
      }
    } else {
      $("#contact-details").remove();
    }

    // Adding urls to social icons or hiding them if url not present
    if (
      value["Membership Plan ID"] != "5ef284eb9eddae000437af3a" &&
      (value.Twitter || value.Facebook || value.Linkedin || value.Instagram)
    ) {
      if (value.Twitter) {
        if (!value.Twitter.startsWith("https")) {
          var twitterUrl = `https://${value.Twitter}`;
        } else {
          var twitterUrl = value.Twitter;
        }
        $("#twitter-url").attr("href", twitterUrl);
      } else {
        $("#twitter-url").remove();
      }
      if (value.Facebook) {
        if (!value.Facebook.startsWith("https")) {
          var facebookUrl = `https://${value.Facebook}`;
        } else {
          var facebookUrl = value.Facebook;
        }
        $("#facebook-url").attr("href", facebookUrl);
      } else {
        $("#facebook-url").remove();
      }
      if (value.Linkedin) {
        if (!value.Linkedin.startsWith("https")) {
          var linkedinUrl = `https://${value.Linkedin}`;
        } else {
          var linkedinUrl = value.Linkedin;
        }
        $("#linkedin-url").attr("href", linkedinUrl);
      } else {
        $("#linkedin-url").remove();
      }
      if (value.Instagram) {
        if (!value.Instagram.startsWith("https")) {
          var instagramUrl = `https://${value.Instagram}`;
        } else {
          var instagramUrl = value.Instagram;
        }
        $("#instagram-url").attr("href", instagramUrl);
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
    $("#Pro-First-Name").val(value["First Name"]);
    $("#Pro-Last-Name").val(value["Last Name"]);
    $("#Pro-Email").val(value["Email"]);
    $("#Pro-MID").val(value["MID"]);
    $("#Pro-Types").val(value["Membership Type"]);
    $("#Pro-Plan-ID").val(value["Membership Plan ID"]);
    $("#UUID").val(UUID);
    
    //adding pro name to data layer for tracking in GA4
    var pName = value["First Name"] + " " + value["Last Name"]
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'profile_view',
            'member_name': pName
           });
    
    // Initialize and add the map
    function initMap() {
      // The location of Uluru
      var address = value.Address + " " + value.City + " " + value.Province  + " " + value["Postal Code"];

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
}
