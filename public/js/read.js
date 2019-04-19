$(document).ready(function () {
  $("#product-read-result").hide();
  $("#products-read-table").hide();
  $("#seed-read-result").hide();
  $("#seeds-read-table").hide();

  $.get("/api/products", function (res) {
    $("#products-read-table").DataTable({
      // populate data packet into table (use object section from docs)
      data: res.data,
      columns: [
        { data: "id" },
        { data: "strain" },
        {
          data: "price",
          render: $.fn.dataTable.render.number(",", ".", 2, "$")
        },
        { data: "quantity" },
        { data: "packaging" },
        { data: "size" },
        { data: "thc" }
      ]
    });
  });
});

$.get("/api/seeds", function (res) {
  $("#seeds-read-table").DataTable({
    // populate data packet into table (use object section from docs)
    data: res.data,
    columns: [
      { data: "id" },
      { data: "strain" },
      { data: "type" },
      { data: "quantity" },
      { data: "thc" },
      { data: "cbd" }
    ]
  });
});

// Button event listeners for routes:
// ------------------------------------------------------------------
// Homepage search and add buttons (first 4):

// Search buttons have the function from datatables library to render data in the search table
$("#read-products-btn").on("click", function (event) {
  event.preventDefault();
  $("#seed-read-result").hide();
  $("#seeds-read-table").hide();
  $("#product-read-result").show();
  $("#products-read-table").show();

  $("#read-seeds-btn").on("click", function (event) {
    event.preventDefault();
    $("#product-read-result").hide();
    $("#products-read-table").hide();
    $("#seed-read-result").show();
    $("#seeds-read-table").show();
  });
});
