"use strict";
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"),{
        types: ["geocode"]
    }),
    autocomplete.addListener("place_changed", fillInAddress)
}
function fillInAddress() {
    var e = autocomplete.getPlace();
    for (var t in componentForm)
        document.getElementById(t).value = "",
        document.getElementById(t).disabled = !1;
    for (var i = 0; i < e.address_components.length; i++) {
        var n = e.address_components[i].types[0];
        if (componentForm[n]) {
            var o = e.address_components[i][componentForm[n]];
            document.getElementById(n).value = o
        }
    }
}
function geolocate() {
    navigator.geolocation && navigator.geolocation.getCurrentPosition(function(e) {
        var t = {
            lat: e.coords.latitude,
            lng: e.coords.longitude
        }
          , i = new google.maps.Circle({
            center: t,
            radius: e.coords.accuracy
        });
        autocomplete.setBounds(i.getBounds())
    })
}
$(function() {
    var e = $(window);
    e.TDPageEvents(),
    $(".owl-carousel.slideshow").owlCarousel({
        loop: !0,
        center: !0,
        smartSpeed: 1e3,
        items: !0,
        nav: !0,
        navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
        responsive: {
            0: {
                dots: !1
            },
            992: {
                dots: !0
            }
        }
    }),
    $(".owl-carousel.features").owlCarousel({
        loop: !1,
        margin: 0,
        responsiveClass: !0,
        nav: !0,
        navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
        responsive: {
            0: {
                items: 2,
                dots: !1
            },
            321: {
                items: 2,
                dots: !1
            },
            767: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    }),
    $(".owl-carousel.related").owlCarousel({
        loop: !1,
        margin: 0,
        responsiveClass: !0,
        nav: !0,
        navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
        responsive: {
            0: {
                items: 2,
                dots: !1
            },
            321: {
                items: 2,
                dots: !1
            },
            767: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    }),
    $(".owl-carousel.banner-brands").owlCarousel({
        loop: !1,
        margin: 0,
        responsiveClass: !0,
        nav: !0,
        navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
        responsive: {
            0: {
                items: 2,
                dots: !1
            },
            321: {
                items: 2,
                dots: !1
            },
            767: {
                items: 2,
                dots: !1
            },
            994: {
                items: 3,
                dots: !0
            },
            1200: {
                items: 3
            }
        }
    }),
    $(".owl-carousel.latest-on-blog").owlCarousel({
        loop: !1,
        margin: 0,
        responsiveClass: !0,
        nav: !0,
        navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
        responsive: {
            0: {
                items: 2,
                dots: !1
            },
            321: {
                items: 2,
                dots: !1
            },
            767: {
                items: 3,
                dots: !1
            },
            1200: {
                items: 3,
                nav: !0,
                dots: !0
            }
        }
    }),
    $(".owl-carousel.brands").owlCarousel({
        loop: !1,
        margin: 0,
        responsiveClass: !0,
        nav: !0,
        navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">'],
        responsive: {
            0: {
                items: 2,
                nav: !1,
                dots: !1
            },
            321: {
                items: 2,
                nav: !1,
                dots: !1
            },
            767: {
                items: 3,
                nav: !1,
                dots: !1
            },
            1200: {
                items: 4,
                nav: !0,
                dots: !0
            }
        }
    }),
    $(".btn-material").ripple(),
    $(".timer").TDTimer(),
    $(".parallax").TDParallax(),
    $(".parallax-block").TDParallax(),
    $(".price-slider").each(function() {
        var e = $(this)
          , t = e.find(".range")
          , i = e.find(".amoutn .first")
          , n = e.find(".amoutn .last")
          , o = e.data();
        t.slider({
            range: !0,
            min: 0,
            max: o.priceMax,
            values: [o.priceFirst, o.priceLast],
            slide: function(e, t) {
                i.val(o.priceCurr + t.values[0]),
                n.val(o.priceCurr + t.values[1])
            }
        }),
        i.val(o.priceCurr + t.slider("values", 0)),
        n.val(o.priceCurr + t.slider("values", 1))
    }),
    $(".nav-vrt").each(function() {
        var e = $(this)
          , t = e.find("li");
        t.on("click", function(e) {
            var i = $(this);
            i.find(".sub-nav").length && (e.preventDefault(),
            i.hasClass("active") ? t.removeClass("active") : (t.removeClass("active"),
            i.addClass("active")))
        })
    }),
    $(".shop-items-set").each(function() {
        var e = $(this)
          , t = e.find(".pagination-block")
          , i = t.find(".swither .cols")
          , n = t.find(".swither .rows");
        i.hasClass(".active") && e.removeClass("shop-items-full"),
        i.on("click", function() {
            e.removeClass("shop-items-full"),
            n.removeClass("active"),
            i.addClass("active")
        }),
        n.on("click", function() {
            e.addClass("shop-items-full"),
            i.removeClass("active"),
            n.addClass("active")
        })
    }),
    $(".fix-height").each(function() {
        var t = $(this);
        e.on("load resize", function() {
            var e = t.parent().find(".get-height").height();
            t.css({
                height: e
            })
        })
    }),
    $(".item-gallery").each(function() {
        function n(e) {
            var i = e.item.index;
            t.data("owl.carousel").to(i, 100, !0)
        }
        function o(e) {
            var t = e.item.count - 1
              , n = Math.round(e.item.index - e.item.count / 2 - .5);
            0 > n && (n = t),
            n > t && (n = 0),
            i.find(".owl-item").removeClass("current").eq(n).addClass("current"),
            i.data("owl.carousel").to(n, 100, !0)
        }
        var e = $(this)
          , t = e.find(".image")
          , i = e.find(".image-nav");
        t.owlCarousel({
            items: 1,
            slideSpeed: 2e3,
            nav: !1,
            autoplay: !1,
            dots: !1,
            loop: !0,
            responsiveRefreshRate: 200,
            navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">']
        }).on("changed.owl.carousel", o),
        i.on("initialized.owl.carousel", function() {
            i.find(".owl-item").eq(0).addClass("current")
        }).owlCarousel({
            items: 3,
            dots: !1,
            nav: !0,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 1,
            responsiveRefreshRate: 100,
            navText: ['<span class="arrow-left icofont icofont-curved-left">', '<span class="arrow-right icofont icofont-curved-right">']
        }).on("changed.owl.carousel", n).on("click", ".owl-item", function(e) {
            e.preventDefault();
            var i = $(this)
              , n = i.index();
            t.data("owl.carousel").to(n, 300, !0)
        })
    })
});
var placeSearch, autocomplete, componentForm = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name"
};
