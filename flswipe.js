// when document is fully loaded
//test update
$(document).ready(function () {
  $(".map-s").hide();
  var target = $(".footer-flex-container").get(0);

  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // do stuff when
      // `attributes` modified
      $(".p-hide").hide();
      var swiper = document.getElementsByClassName("slist")[0];
      $("#listings .item.active-d").each(function (i) {
        simg = $(this).find(".i-wrap img").attr("src");
        sname = $(this).find("h4").text();
        sfullname = $(this).find(".firstname").text() + "-" + $(this).find(".last").text();
        stype = $(this).find("a span").text();
        sfirm = $(this).find("h5").text();
        sdist = $(this).find("p strong").text();
        sid = $(this).attr("id");
        slang = $(this).find("span.p-lang").text();
        sprac = $(this).find("span.p-area").text();
        stwit = $(this).find("span.p-twitter").text();
        sface = $(this).find("span.p-facebook").text();
        slinked = $(this).find("span.p-linkedin").text();
        semail = $(this).find("span.p-email").text();
        if ($(this).hasClass("recurring")) {
          stop = "stop";
        } else {
          stop = "normal";
        }

        smid = $(this).find("span.p-mid").text();
        $(this).click(function (e) {
          e.preventDefault();
          slideno = $(this).index();
          console.log(slideno);

          console.log(sname);
          $(".slist").slick("slickGoTo", slideno);
        });

        var swipe = swiper.appendChild(document.createElement("div"));
        swipe.className = "s-item active " + stop;

        var profile = swipe.appendChild(document.createElement("div"));
        profile.innerHTML =
          '<div class="columns-8 w-row"><div class="s-profile-image w-col w-col-6" style="background-image: url(' +
          simg +
          ')" ><div class="s-icons"><a href="mailto:' +
          semail +
          '" target="_blank"><div class="s-icon-wrap grow-big granimate"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/6164c280a1c7f55f931c37b0_cicon.svg" loading="lazy" width="40" alt="" class="s-chat"></div></a><div data-w-id="0bb5a390-b262-7d0c-f8ef-94ac5759ee1d" class="s-icon-wrap thumbs"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/6186e3ad36ecec1ba64d4342_thumb.svg" loading="lazy" width="38" alt=""></div><div class="s-icon-wrap remove"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/5f6f7d26c770f2860fac8791_close-icon.svg" loading="lazy" width="40" alt="grey X symbol" class="s-map remove"></div></div></div><div class="column-18 w-col w-col-6"><div class="s-details"><div class="s-profile-heading">' +
          sname +
          ', <span class="s-type-law">' +
          stype +
          "</span></div><div>" +
          sfirm +
          '</div><div class="s-distance" data-p="' +
          sid +
          '"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/5e851a1cf6f6eda0543cecfe_mapbox-icon.png" loading="lazy" width="30" alt="map checkpoint" class="s-icon"><div>' +
          sdist +
          '</div></div><div class="s-secondary-heading">Practice Areas:</div><div id="pArea">' +
          sprac +
          '</div><div class="s-secondary-heading">Languages:</div><div id="pLang">' +
          slang +
          '</div><div class="social-links-container s-bio"><a href="' +
          stwit +
          '" target="_blank" class="social-block w-inline-block" tabindex="0"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/5ff60355c347a0de7ee9767f_twitter1.svg" alt="Twitter logo" class="social-icon"></a><a href="' +
          sface +
          '" target="_blank" class="social-block w-inline-block" tabindex="0"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/5ff60373c2c2b851a8f9368c_facebook1.svg" alt="Facebook Logo" class="social-icon"></a><a href="' +
          slinked +
          '" target="_blank" class="social-block w-inline-block" tabindex="0"><img src="https://uploads-ssl.webflow.com/5e5dd661bbf5f1863333707a/5ff6038b5e4963165877455b_linkedin1.svg" alt="LinkedIn Logo" class="social-icon"></a></div><div class="view-prof"><a href="legal-professionals/' +
          sfullname +
          '" target="_blank" class="l-profile-link">See More</a></div</div>';
      });

      $(".s-item.stop").prependTo(".slist");

      var pWrap = document.getElementsByClassName("s-profile-wrap")[0];
      $(".s-distance").click(function () {
        $(".map-s").show();
        dp = $(this).attr("data-p");

        //vp = document.getElementById(dp);
        //$('#' + dp).find('a.details').trigger('click');
        pclick = $("#" + dp)
          .find("a.details")
          .attr("id");

        document.getElementById(pclick).click();

        pWrap.style.zIndex = -1;
      });

      $(".close-s-map").click(function () {
        $(".map-s").hide();
        $(".slist").slick("slickGoTo", slideno);
        pWrap.style.zIndex = 3;
      });

      $(".remove").click(function () {
        if ($(".slick-slide").length > 1) {
          $(this).closest(".slick-slide").remove();
          if ($(this).closest($(".slick-slide").is(".slick-slide:last"))) {
            $(".slist").slick("slickPrev");
          }
        } else {
          $("#quickQuestion").show();
        }
      });

      //jQuery('.slick-active').last()

      $(".slist").slick({
        slide: ".s-item",
        dots: false,
        speed: 300,
        infinite: false,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        touchThreshold: 100,
        responsive: [
          {
            // landscape
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            // mobile portrait
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

      $(".slider-prev").click(function () {
        $(".slist").slick("slickPrev");
      });

      $(".slider-next").click(function () {
        $(".slist").slick("slickNext");
      });
    });
  });

  $(".slist").on("beforeChange", function () {});
  $(".slist").on("afterChange", function () {
    $(".s-chat").animate(
      {
        width: 70,
      },
      500
    );
    $(".s-chat").animate(
      {
        width: 40,
      },
      500
    );
  });

  // configuration of the observer:
  var config = {
    attributes: true,
  };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);

  //$(".footer-flex-container").addClass("test-1")
});
