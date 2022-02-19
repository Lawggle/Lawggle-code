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

// ---------------------------------------------------- Search function starts ----------------------------------------------------

$("#fireSearch .w-dropdown-link").on("click", function () {
  $(".loader").show();
  function test(type, language) {
    var url = $.trim(
      "https://sheet.best/api/sheets/c537b30c-6a62-49e9-bbb7-913b076eee99/tabs/Pros/search?Language=*" +
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
    console.log(lang);
    console.log(url);
    return $.getJSON(url);
  }

  // Once the api returns results
  $.when(test()).then(function (jsonData) {
    console.log("entered when test function");

    if (!("remove" in Element.prototype)) {
      Element.prototype.remove = function () {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }

    // This is the access token of the MapBox api
    mapboxgl.accessToken = "pk.eyJ1IjoibGF3Z2dsZSIsImEiOiJja2RraDU0ZnYwb2lqMnhwbWw2eXVrMjNrIn0.ShD8eyKTv7exWDKR44bSoA";

    // New map gets created here
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/lawggle/ckdkhap9e159e1imq6foj0ln5",
      center: [-123.1083712, 49.2565223],
      // zoom: 1,
      scrollZoom: !1,
      attributionControl: !1,
    });
    map.addControl(new mapboxgl.NavigationControl());

    // Stores object created
    var stores = {
      type: "FeatureCollection",
      features: [],
    };

    // Adding data from the search results into the features in stores object
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
          area: jsonData[i]["Area of Law"],
          //"city": jsonData[i].City,
          type: jsonData[i]["Type of Pro"],
          image: jsonData[i].Photo,
          language: jsonData[i].Language,
          email: jsonData[i].Email,
          phone: jsonData[i].Phone,
          twitter: jsonData[i].Twitter,
          facebook: jsonData[i].Facebook,
          linkedin: jsonData[i].Linkedin,
          instagram: jsonData[i].Instagram,
          rate: jsonData[i]["Hourly Rate"],
          hide: jsonData[i].Hide,
          address: jsonData[i].Address,
          consult: jsonData[i].Consult,
        },
      });

    console.log("These are stores", stores);

    map.on("load", function (e) {
      console.log("Entered map load");
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

      // #geocoder is the field where the user inputs place in the "where are you located step"
      document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
      $(".loader").hide();

      // console.log("Location stores being built 1");
      // buildLocationList(stores);
      // addMarkers();

      // This is where it stops waiting for user location input
      geocoder.on("result", function (ev) {
        console.log("ev is", ev);
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

        // This sorts it in ascending order of distance
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

        // Creating the HTML for the results through this
        console.log("Location stores being built 2");
        buildLocationList(stores);
        addMarkers();

        // Adding popup in the map for the first result
        createPopUp(stores.features[0]);

        // Adding the active listing class to the nearest result
        // var activeListing = document.getElementById("listing-" + stores.features[0].properties.id);
        // activeListing.classList.add("active");
        var bbox = getBbox(stores, 0, searchResult);
        console.log("bbox results is", bbox);
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

    // Markers for the map are added here
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

    // Results HTML is created here
    function buildLocationList(data) {
      console.log("Entered buildLocationList");
      mapIdleCount = 0;

      // Getting the template result
      var templateResult = document.querySelector("#template-result");

      // Running a loop, creating
      data.features.forEach(function (store, i) {
        const resultItem = templateResult.cloneNode(true);

        var prop = store.properties;
        var listings = document.getElementById("listings");

        // Setting the properties/details of the result
        resultItem.id = "listing-" + prop.id;
        resultItem.className = "result-item active-c";

        // Getting the View Profile Button and setting properties
        profileButton = resultItem.querySelector(".view-map-button");
        profileButton.id = "link-" + prop.id;
        profileButton.attr("href", `profile?profile=${prop.mid}`);

        //TODO --------------------------------------- Code for new result above this ---------------------------

        // Appending the result Item
        listings.appendChild(resultItem);
        // var listing = listings.appendChild(document.createElement("div"));
        var listing = document.createElement("div");

        // Add ID to the listing
        listing.id = "listing-" + prop.id;

        // Add actice-c classname
        listing.className = "result-item active-c";
        $("a.dropdown-link").click(function () {
          $(".filtertag").each(function () {
            var value = $(this).html();
            if (value == prop.type) {
              //  listing.className = 'item';
            }
          });
        });

        // This is the link that when clicked changes the location on map and adds active class
        var link = listing.appendChild(document.createElement("a"));
        link.href = "#";
        link.className = "details";

        // #id is added to each link to identify to fly to that position on the map
        link.id = "link-" + prop.id;

        // adding image to prop
        if (prop.image) {
          link.innerHTML = '<div class="i-wrap"><img src="' + prop.image + '" class="l-profile"></div>';
        }

        // This link does nothing since it is enclosed inside another link to change location on map
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
          console.log("prop has distance");
          var roundedDistance = Math.round(prop.distance * 100) / 100;

          // If distance is less than 100 then we add active-d class to it
          if (roundedDistance < 100) {
            // listing.className = prop.hide + " item active active-d " + prop.plan;
            //  removed the active-c class from the listing and replaced with active-d
            listing.className = prop.hide + " result-item active-d " + prop.plan;

            // adding the distance to detail
            details.innerHTML += '<p class="l-distance"><strong>' + roundedDistance + " kms away</strong></p>";

            // This is the link that opens their profile page on a new page
            details.innerHTML +=
              '<a href="profile?profile=' +
              prop.mid +
              '" target="_blank" class="blue l-profile-link">View Profile &#10230;</a>';
          }
        }

        // Event listener added to the link to make it change location on map
        link.addEventListener("click", function (e) {
          for (var i = 0; i < data.features.length; i++) {
            // Finding the features of that listing
            if (this.id === "link-" + data.features[i].properties.id) {
              var clickedListing = data.features[i];
              flyToStore(clickedListing);
              createPopUp(clickedListing);
            }
          }

          // Removing active tag from currently active listing
          var activeItem = document.getElementsByClassName("active");
          if (activeItem[0]) {
            console.log("active item found", activeItem);
            activeItem[0].classList.remove("active");
          }
          // Adding active tag to the clicked active
          this.parentNode.classList.add("active");
        });
      });
    }

    function flyToStore(currentFeature) {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15,
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

    var mapIdleCount = 0;
    map.on("idle", () => {
      if (mapIdleCount < 1) {
        mapIdleCount++;
        console.log("entered map idle", mapIdleCount);
        window.scrollTo(0, 0);
        $(".listload").css("visibility", "visible");
        $(".no-results").removeClass("display");

        //   Checking if there are any active results, class of ".active-d"
        if (document.querySelector(".active-d") !== null) {
          // Remove the no results display
          $(".no-results").removeClass("display");
          // $('.listload').css("visibility","hidden");

          // Show the map
          $(".map").css("visibility", "visible");

          var parent = $("#listings");
          var divs = $(".result-item.recurring");
          while (divs.length) {
            parent.prepend(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
          }

          // Removing active class from the current card
          // var activeItem = document.getElementsByClassName("active");
          // console.log("active item found in map idle", activeItem);
          // activeItem[0].classList.remove("active");
          var firstResult = document.getElementsByClassName("active-d")[0];
          console.log("firstChild clicking on", firstResult);

          //! This is causing map to idle on mobile and show map on first result
          firstResult.querySelector("a").click();
          $(".map-display").click();
          console.log("correcting display for mobile");
          // Map-display is the close button for the map

          //! Hiding the map on mobile after the first time the result is clicked
          // if ($(window).width() < 769) {
          //   $(".map-wrap, .map-display").hide();
          //   $("#listings").show();
          // }

          //$('.item.recurring a.details').first().one().trigger('tap');

          //$(".item.recurring").prependTo("#listings");
        } else {
          //   If there are no active results within 100kms, show the 'no results' div
          $(".no-results").addClass("display");
          // $("#listings").css("display", "none");
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

        $(".listload").css("visibility", "hidden").delay(1000);
        $(".footer-flex-container").addClass("s-build");
      }
    });
  });
});

// ----------------------------------------------------- Search function ends -----------------------------------------------------

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

// Doing only for ios devices
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

if ($(window).width() < 769) {
  // This hides the map for mobile by default
  $(".map-wrap, .map-display").hide();

  // On clicking of the results it show map and hides listings on mobile
  $("#listings").click(function () {
    console.log("clicked on listing in mobile");
    $(".map-wrap, .map-display").show();
    $(this).hide();
  });

  // on clicking the close button on map it hides the map and shows listings
  $(".map-display").click(function () {
    $(".map-wrap, .map-display").hide();
    $("#listings").show();
  });
}
