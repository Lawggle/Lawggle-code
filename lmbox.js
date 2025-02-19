$(function () {
  $(".loading").fadeOut();
});
expert = [];
$("#Pros .w-dropdown-link").click(function () {
  pro = $(this).html();
  $("#pro-select").html(this);
  $(this).parent("div").fadeOut();
});
$("#Language .w-dropdown-link").click(function () {
  lang = $(this).html();
  $("#lanText").html(this);
  $("#Language").fadeOut();
});
$("#Expertise .w-dropdown-link").click(function () {
  expert = $(this).html();
  $("#Expertise").html(this);
});
$("#fireSearch .w-dropdown-link").on("click", function () {
  $(".loader").show();
  function test(type, language) {
    var url = $.trim(
      "https://sheet.best/api/sheets/87c02226-b9fc-4f91-a018-ce0fca93e9aa/tabs/Pros/search?Language=*" +
        lang +
        "*&Type of Pro=" +
        pro +
        "&Area of Law=*" +
        expert +
        "*"
    );
    url = url.replace(/ /g, "%20");
    console.log(pro);
    console.log(expert);
    console.log(url);
    console.log(lang);
    console.log(url);
    return $.getJSON(url);
  }
  $.when(test()).then(function (jsonData) {
    if (!("remove" in Element.prototype)) {
      Element.prototype.remove = function () {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }
    mapboxgl.accessToken = "pk.eyJ1IjoibGF3Z2dsZSIsImEiOiJja2RraDU0ZnYwb2lqMnhwbWw2eXVrMjNrIn0.ShD8eyKTv7exWDKR44bSoA";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/lawggle/ckdkhap9e159e1imq6foj0ln5",
      center: [-123.1083712, 49.2565223],
      //zoom: 15,
      scrollZoom: !1,
      attributionControl: !1,
    });
    map.addControl(new mapboxgl.NavigationControl());

    var stores = {
      type: "FeatureCollection",
      features: [],
    };
    for (i = 0; i < jsonData.length; i++)
      stores.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [jsonData[i].Long, jsonData[i].Lat],
        },
        properties: {
          mid: jsonData[i].MID,
          name: jsonData[i]["First Name"],
          plan: jsonData[i]["Membership Type"],
          profile: jsonData[i].Bio,
          lastname: jsonData[i]["Last Name"],
          firm: jsonData[i].Firm,
          //"city": jsonData[i].City,
          type: jsonData[i]["Type of Pro"],
          area: jsonData[i]["Area of Law"],
          image: jsonData[i].Photo,
          language: jsonData[i].Language,
          email: jsonData[i].Email,
          phone: jsonData[i].Phone,
          twitter: jsonData[i].Twitter,
          facebook: jsonData[i].Facebook,
          linkedin: jsonData[i].Linkedin,
          hide: jsonData[i].Hide,
          address: jsonData[i].Address,
        },
      });

    console.log(stores);

    map.on("load", function (e) {
      stores.features.forEach(function (store, i) {
        store.properties.id = i;
      });
      map.addSource("places", {
        type: "geojson",
        data: stores,
      });
      var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Address, city or postal code...",
      });

      document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
      $(".loader").hide();
      buildLocationList(stores);

      addMarkers();

      geocoder.on("result", function (ev) {
        var searchResult = ev.result.geometry;
        var options = {
          units: "kilometers",
        };
        stores.features.forEach(function (store) {
          Object.defineProperty(store.properties, "distance", {
            value: turf.distance(searchResult, store.geometry, options),
            writable: true,
            enumerable: true,
            configurable: true,
          });
        });
        stores.features.sort(function (a, b) {
          if (a.properties.distance > b.properties.distance) {
            return 1;
          }
          if (a.properties.distance < b.properties.distance) {
            return -1;
          }
          return 0; // a must be equal to b
        });
        var listings = document.getElementById("listings");
        while (listings.firstChild) {
          listings.removeChild(listings.firstChild);
        }
        buildLocationList(stores);
        $(".footer-flex-container").addClass("s-build");
        createPopUp(stores.features[0]);
        var activeListing = document.getElementById("listing-" + stores.features[0].properties.id);
        activeListing.classList.add("active");
        var bbox = getBbox(stores, 0, searchResult);
        map.fitBounds(bbox, {
          padding: 100,
        });
      });
    });

    function getBbox(sortedStores, storeIdentifier, searchResult) {
      var lats = [sortedStores.features[storeIdentifier].geometry.coordinates[1], searchResult.coordinates[1]];
      var lons = [sortedStores.features[storeIdentifier].geometry.coordinates[0], searchResult.coordinates[0]];
      var sortedLons = lons.sort(function (a, b) {
        if (a > b) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
      var sortedLats = lats.sort(function (a, b) {
        if (a > b) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
      return [
        [sortedLons[0], sortedLats[0]],
        [sortedLons[1], sortedLats[1]],
      ];
    }

    function addMarkers() {
      stores.features.forEach(function (marker) {
        var el = document.createElement("div");
        el.id = "marker-" + marker.properties.id;
        el.className = "marker";
        new mapboxgl.Marker(el, {
          offset: [0, -23],
        })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
        el.addEventListener("click", function (e) {
          flyToStore(marker);
          createPopUp(marker);
          var activeItem = document.getElementsByClassName("active");
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove("active");
          }
          var listing = document.getElementById("listing-" + marker.properties.id);
          listing.classList.add("active");
        });
      });
    }

    function buildLocationList(data) {
      data.features.forEach(function (store, i) {
        var prop = store.properties;
        var listings = document.getElementById("listings");

        var listing = listings.appendChild(document.createElement("div"));
        listing.id = "listing-" + prop.id;
        listing.className = "item active active-c";
        $("a.dropdown-link").click(function () {
          $(".filtertag").each(function () {
            var value = $(this).html();
            if (value == prop.type) {
              //  listing.className = 'item';
            }
          });
        });
        var link = listing.appendChild(document.createElement("a"));
        link.href = "#";
        link.className = "details";
        link.id = "link-" + prop.id;
        if (prop.image) {
          link.innerHTML = '<div class="i-wrap"><img src="' + prop.image + '" class="l-profile"></div>';
        }
        link.innerHTML +=
          '<a href="profile?profile=' +
          prop.mid +
          '" target="_blank" class="blue l-profile-link"><h4>' +
          prop.name +
          " " +
          prop.lastname +
          "</h4></a>";

        if (prop.firm) {
          link.innerHTML += "<h5>" + prop.firm + "<h5>";
        }

        link.innerHTML += "<span>" + prop.type + "</span>";

        /* Add details to the individual listing. */
        var details = listing.appendChild(document.createElement("div"));
        if (prop.distance) {
          var roundedDistance = Math.round(prop.distance * 100) / 100;
          if (roundedDistance < 100) {
            listing.className = prop.hide + " item active active-d " + prop.plan;
            details.innerHTML += '<p class="l-distance"><strong>' + roundedDistance + " kms away</strong></p>";

            details.innerHTML +=
              '<div class="p-hide"><span class="p-email">' +
              prop.email +
              '</span><span class="p-lang">' +
              prop.language +
              '</span><span class="p-area">' +
              prop.area +
              '</span><span class="p-mid">' +
              prop.mid +
              '</span><span class="p-twitter">' +
              prop.twitter +
              '</span><span class="p-facebook">' +
              prop.facebook +
              '</span><span class="p-linkedin">' +
              prop.linkedin +
              "</span></div>";
          }
        }
        link.addEventListener("click", function (e) {
          for (var i = 0; i < data.features.length; i++) {
            if (this.id === "link-" + data.features[i].properties.id) {
              var clickedListing = data.features[i];
              flyToStore(clickedListing);
              createPopUp(clickedListing);
            }
          }
          var activeItem = document.getElementsByClassName("active");
          if (activeItem[0]) {
            activeItem[0].classList.remove("active");
          }
          this.parentNode.classList.add("active");
        });
      });
    }

    function flyToStore(currentFeature) {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 18,
      });
    }

    function createPopUp(currentFeature) {
      var popUps = document.getElementsByClassName("mapboxgl-popup");
      if (popUps[0]) popUps[0].remove();

      var popup = new mapboxgl.Popup({
        closeOnClick: false,
      })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(
          '<a href="profile?profile=' +
            currentFeature.properties.mid +
            '" target="_blank"><h4>' +
            currentFeature.properties.name +
            " " +
            currentFeature.properties.lastname +
            "</h4></a>" +
            '<div class="content-l"><h5>' +
            currentFeature.properties.address +
            "</h5>" +
            "<span>" +
            currentFeature.properties.type +
            "</span>"
        )
        .addTo(map);
    }
    $("#listings").click(function () {
      map.resize();
    });
    map.on("idle", () => {
      $(".listload").css("visibility", "visible");
      $(".no-results").removeClass("display");
      if (document.querySelector(".active-d") !== null) {
        $(".no-results").removeClass("display");
        // $('.listload').css("visibility","hidden");

        $(".map").css("visibility", "visible");

        var parent = $("#listings");
        var divs = $(".item.recurring");
        while (divs.length) {
          parent.prepend(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }

        //$('.item.recurring a.details').first().one().trigger('tap');

        //$(".item.recurring").prependTo("#listings");
      } else {
        $(".no-results").addClass("display");

        $(".map").css("visibility", "hidden");
      }

      //  $("#listings .item:first").before( $( ".item.exclusive" ) );
      // if(!$('.item.active').length){
      //      $('.no-results').addClass('display');

      //}

      //if(!$('.active-d').length){

      //   $('.no-results').addClass('display');
      //  $('.map').css("visibility","hidden");
      // $('.listload').css("visibility","hidden");
      //   } else {
      // $('.no-results').removeClass('display');
      //   $('.map').css("visibility","visible");
      // $('.listload').css("visibility","hidden");
      //}

      console.log("idle");
      $(".listload").css("visibility", "hidden").delay(2000);
    });
  });
});
$("#Expertise").hide();
$("#Lawyer").click(function () {
  $("#Expertise").delay(500).fadeIn();
  $("#pro-select, #pro-select + .w-dropdown-list").toggleClass("w--open");
  $("#Expertise-2").fadeOut();
});
$("#Expertise-2").fadeOut();
$("#Process").click(function () {
  $("#Expertise-2").delay(500).fadeIn();
  $("#pro-select, #pro-select + .w-dropdown-list").toggleClass("w--open");
  $("#Expertise").fadeOut();
});
$("a.dropdown-link").click(function () {
  $(".l-active").removeClass("l-active");
  $(this).addClass("l-active");
  $(".w-dropdown-list").removeClass("w--open");
});
$("#Expertise .dropdown-link").click(function () {
  $("#Expertise").fadeOut();
  $(".next.button").trigger("tap");
});
$("#Expertise-2 .dropdown-link").click(function () {
  $("#Expertise-2").fadeOut();
  $(".next.button").trigger("tap");
});
$("#Notary, #Immigration, #Paralegal, #Court").click(function () {
  $(".next.button").trigger("tap");
});
$("#fireSearch .w-dropdown-link").click(function () {
  $(this).addClass("l-active");
  $(".next.button").trigger("tap");
  setTimeout(function () {
    $(".next.button").trigger("tap");
  }, 2000);
  // if ($(window).width() < 769) {
  //   $('.next.button').removeClass('gone');
  // }
  $("#fireSearch, #fireSearch + .w-dropdown-list").toggleClass("w--open");
});
$(".w-dropdown-link").click(function () {
  //$('.l-active' ).each(function(){
  var d = $(this).html();
  document.getElementById("selectorTags").innerHTML += "<span class='filtertag'>" + d + "</span>";
});
$(".next.button").on("click", function () {
  $(this).addClass("gone");
});

jQuery(document).ready(function () {
  if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    $("#geocoder").keydown(function () {
      $(".next.button").removeClass("gone");
    });
  } else {
    // NO IOS Device.
  }
});

$("#geocoder").on("select", function () {
  $(".next.button").trigger("tap");
  $(".listload").css("visibility", "visible");
  console.log("tapped");
});

//if ($(window).width() < 769) {

// $('.map-wrap, .map-display').hide();
// $('#listings').click(function() {
//   console.log('clicked');
//   $('.map-wrap, .map-display').show();
//   $(this).hide();
//  });
//  $('.map-display').click(function() {
//    $('.map-wrap, .map-display').hide();
//   $('#listings').show();
//   });
//}
