$(document).ready(function () {
  const url = "http://0.0.0.0:5001/api/v1/status/";
  $.get(url, function (response) {
    if (response.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    data: "{}",
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      $("section.places").append(
        data.map((place) => {
          return `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
                  <div class="number_rooms">${place.number_rooms}Bedrooms</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="user">
                  <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                </div>
                <div class="description">
                  ${place.description}
                </div>
        </article>`;
        })
      );
    },
  });

  const amenities = {};
  $("input[type=checkbox]").change(function () {
    if ($(this).is(":checked")) {
      amenities[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete amenities[$(this).attr("data-id")];
    }
    $(".amenities H4").text(Object.values(amenities).join(", "));
  });

  $("button").click(() => {
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      contentType: "application/json",
      dataType: "json",
      success: function (data) {
        $("section.places").empty();
        $("section.places").append(
          data.map((place) => {
            return `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms}Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="user">
                    <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
          </article>`;
          })
        );
      },
    });
  });
});
