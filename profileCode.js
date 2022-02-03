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

console.log(profile);

function successFunc(data) {
  console.log(data);
  $(".loading").fadeOut();
  var html = "";
  $.each(data, function (key, value) {
    if (value.Photo) {
      $(".pfimage").html('<img src="' + value.Photo + '">');
    }

    $("h1.heading-17").text(value["First Name"] + " " + value["Last Name"]);
    $("#Pro-Name").val(value["First Name"] + " " + value["Last Name"]);
    $("#Pro-Email").val(value["Email"]);

    html += '<div class="profile-top">';
    html += '<div class="pro-card">';
    html += '<div class="profile-pic">';
    if (value.Photo) {
      html += '<img src="' + value.Photo + '">';
    }
    html += "</div>";
    html += '<div class="pro-details">';
    html += '<div class="pro-name">';
    html += '<h1 class="pro-title">' + value["First Name"] + " " + value["Last Name"] + "</h1>";
    html += "</div>";
    html += '<div class="pro-sub">';
    html += '<h2 class="pro-type">' + value["Type of Pro"] + "</h2>";
    if (value.Firm) {
      html += '<h2 class="pro-firm">' + " &#64 " + value.Firm + "</h2>";
    }
    html += "</div>";
    if (value["Area of Law"]) {
      html += '<div class="pro-block">';
      html += '<h2 class="pro-detail-heading">' + "Practice Areas" + "&#58" + "</h2>";
      html += '<p class="pro-detail-text">' + value["Area of Law"] + "</p>";
      html += "</div>";
    }
    html += '<div class="pro-block">';
    html += '<h2 class="pro-detail-heading">' + "Languages" + "&#58" + "</h2>";
    html += '<p class="pro-detail-text">' + value.Language + "</p>";
    html += "</div>";
    html += '<div class="rates-block">';
    if (value["Hourly Rate"] || value.Contingency || value.Consult) {
      html += '<h2 class="pro-detail-heading">' + "Rates" + "&#58" + "</h2>";
    }
    html += '<div class="rates-wrap">';
    if (value["Hourly Rate"]) {
      html +=
        '<p class="pro-detail-text">' +
        "&#36" +
        Number(value["Hourly Rate"]) +
        "&#46" +
        Number("  ") +
        "&#47" +
        "hour" +
        "</p>";
    }
    if (value.Contingency) {
      html += '<p class="pro-detail-text">' + "Works on Contingency" + "&#63" + "&#58 " + value.Contingency + "</p>";
    }
    if (value.Consult) {
      html += '<p class="pro-detail-text">' + "Free Consultation" + "&#63" + "&#58 " + value.Consult + "</p>";
    }
    html += "</div>";
    html += "</div>";
    html += '<div class="contact-buttons space">';
    html += '<button id="contactMe" type="button" class="button Faq left">contact me</button>';
    html += '<button id="seeMore" type="button" class="button Faq right">see more</button>';
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    html += '<div class="profile-details">';

    if (value.Bio) {
      html += '<div class="bio-block">';
      html += '<h3 class="bio-heading">' + "Bio" + "&#58" + "</h3>";
      html += '<div class="bio-text">';
      html += '<p class="pro-detail-text">' + value.Bio + "</p>";
      html += "</div>";
      html += "</div>";
    }

    if (value.Education) {
      html += '<div class="bio-block">';
      html += '<h3 class="bio-heading">' + "Education" + "&#58" + "</h3>";
      html += '<div class="bio-block-bg">';
      // add items from google sheet cell as separate bulleted list items here
      html += "</div>";
      html += "</div>";
    }

    if (value.Associations) {
      html += '<div class="bio-block">';
      html += '<h3 class="bio-heading">' + "Professional Associations " + "&#38" + " Memberships" + "&#58" + "</h3>";
      html += '<div class="bio-block-bg">';
      // add items from google sheet cell as separate bulleted list items here
      html += "</div>";
      html += "</div>";
    }

    if (value.Recognitions) {
      html += '<div class="bio-block">';
      html += '<h3 class="bio-heading">' + "Recognitions" + "&#58" + "</h3>";
      html += '<div class="bio-block-bg">';
      // add items from google sheet cell as separate bulleted list items here
      html += "</div>";
      html += "</div>";
    }

    if (value.Publications) {
      html += '<div class="bio-block">';
      html += '<h3 class="bio-heading">' + "Publications" + "&#58" + "</h3>";
      html += '<div class="bio-block-bg">';
      // add items from google sheet cell as separate bulleted list items here
      html += "</div>";
      html += "</div>";
    }

    if (value["Public Phone"] || value["Public Email"]) {
      html += '<div class="bio-block outline">';
      html += '<h2 class="contact-heading new">' + "Contact Details" + "&#58" + "</h2>";
      html += '<div class="contact-block">';
    }

    if (value["Public Phone"]) {
      html +=
        '<a href="tel:' +
        value["Public Phone"] +
        '" class="contact-links"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/61b793a8bfa7cec02e24a2cf_tel_icon.svg" alt="tel icon" class="contact-image">' +
        value["Public Phone"] +
        "</a>";
    }

    if (value["Public Email"]) {
      html +=
        '<a href="mailto:' +
        value["Public Email"] +
        '" class="contact-links"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/61b793a8d66025152d9a2e90_email_icon.svg" alt="send email icon" class="contact-image">' +
        value["Public Email"] +
        "</a>";
    }

    if (value["Public Phone"] || (value["Public Email"] && value.Url)) {
      html +=
        '<a href="' +
        value.Url +
        '" class="contact-links" target="_blank"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/61b793a84e478f18f64e2fb4_web_icon.svg" alt="website icon" class="contact-image">' +
        value.Url +
        "</a>";
    }

    if (value["Public Phone"] || value["Public Email"]) {
      html += "</div>";
      html += "</div>";
    }

    html += '<div class="contact-button-wrap">';
    html += '<button id="talk" type="button" class="button talk">contact me&#33</button>';
    html += "</div>";

    html += '<div class="links-block">';
    html += '<ul role="list" class="list w-clearfix w-list-unstyled">';
    html += '<li class="list-item">';
    if (value.Twitter) {
      html +=
        '<a href="' +
        value.Twitter +
        '" class="social-block" target="_blank"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/5ff60355c347a0de7ee9767f_twitter1.svg" alt="" class="social-icon"></a>';
    }
    html += "</li>";
    html += '<li class="list-item">';
    if (value.Facebook) {
      html +=
        '<a href="' +
        value.Facebook +
        '" class="social-block" target="_blank"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/5ff60373c2c2b851a8f9368c_facebook1.svg" alt="" class="social-icon"></a>';
    }
    html += "</li>";
    html += '<li class="list-item">';
    if (value.Linkedin) {
      html +=
        '<a href="' +
        value.Linkedin +
        '" class="social-block" target="_blank"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/5ff6038b5e4963165877455b_linkedin1.svg" alt="" class="social-icon"></a>';
    }
    html += "</li>";
    html += '<li class="list-item">';
    if (value.Instagram) {
      html +=
        '<a href="' +
        value.Instagram +
        '" class="social-block" target="_blank"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/615f3768d91e4184e98914bc_instagram1.svg" alt="" class="social-icon"></a>';
    }
    html += "</li>";
    html += "</ul>";
    html += "</div>";
    html += "</div>";

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

      var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
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

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
    }
    initMap();
  });
  $("#profileWrap").html(html);
  $("#contactMe")
    .click(function () {
      $(".talk-modal").addClass("active");
    })
    .click(function () {
      $("body").css("overflow", "hidden");
    });

  $("#talk")
    .click(function () {
      $(".talk-modal").addClass("active");
    })
    .click(function () {
      $("body").css("overflow", "hidden");
    });

  $("#seeMore").click(function () {
    $("html,body").animate(
      {
        scrollTop: $(".profile-details").offset().top - 70,
      },
      "slow"
    );
  });

  $(".close-wrapper")
    .click(function () {
      $(".talk-modal").removeClass("active");
    })
    .click(function () {
      $("body").css("overflow", "auto");
    });
}

MemberStack.onReady.then(function (member) {});
