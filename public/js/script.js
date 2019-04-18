$(document).ready(function () {
  // hide tables and containing divs on page load
  $("#product-search-result").hide();
  $("#products-table").hide();
  $("#seed-search-result").hide();
  $("#seeds-table").hide();

  // initial searches are run when page is loaded to avoid datatables reinitialization errors
  // ajax get call to grab product information
  $.get("/api/products", function (res) {
    // populate datatable with product information
    $("#products-table").DataTable({
      // flags low inventory (pink if quantity below 50, faded italics at 0)
      createdRow: function (row, data, dataIndex) {
        if (data.quantity < 50 && data.quantity > 0) {
          $(row).addClass("addpink");
          // made italic and half opacity if inentory is equal to 0 or less than 0
        } else if (data.quantity <= 0) {
          $(row).addClass("fade");
        }
      },
      // populate data packet into table (used data object section from datatable docs)
      data: res.data,
      columns: [
        {
          data: "id",
          // creates link to product detail page on item id
          render: function (data, type, row) {
            return '<a href="/update-product/' + data + '">' + data + "</a>";
          }
        },
        { data: "strain" },
        {
          data: 'price',
          // formats price into currency format with $ and two decimal places (and commas if big enough)
          render: $.fn.dataTable.render.number(',', '.', 2, '$')
        },
        { data: "quantity" },
        { data: "packaging" },
        { data: "size" },
        { data: "thc" }
      ]
    });
  });

  // ajax call to grab seed information
  $.get("/api/seeds", function (res) {
    $("#seeds-table").DataTable({
      // adding red to row if qty is low
      createdRow: function (row, data, dataIndex) {
        if (data.quantity < 6 && data.quantity > 0) {
          $(row).addClass("addpink");
          // made italic and half opacity if inentory is equal to 0 or less than 0
        } else if (data.quantity <= 0) {
          $(row).addClass("fade");
        }
      },
      // populate data packet into table (used data object section from datatables docs)
      data: res.data,
      columns: [
        {
          data: "id",
          // creates link on item id to go to item detail page for update/delete
          render: function (data, type, row) {
            return '<a href="/update-seed/' + data + '">' + data + "</a>";
          }
        },
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

  // Search buttons show or hide appropriate tables on button click
  $("#products-btn").on("click", function (event) {
    event.preventDefault();
    $("#seed-search-result").hide();
    $("#seeds-table").hide();
    $("#product-search-result").show();
    $("#products-table").show();
  });

  $("#seeds-btn").on("click", function (event) {
    event.preventDefault();
    $("#product-search-result").hide();
    $("#products-table").hide();
    $("#seed-search-result").show();
    $("#seeds-table").show();
  });

  // directs to form page for adding a new product
  $("#add-product-btn").on("click", function (event) {
    console.log("i got here");
    event.preventDefault();
    // routes to add.handlebars with form to add product
    window.location.assign("/add-product");
  });

  // directs to form page for adding a new seed
  $("#add-seed-btn").on("click", function (event) {
    event.preventDefault();
    // routes to add.handlebars with form to add seed
    window.location.assign("/add-seed");
  });

  // Return to homepage button; used on both update-del pages
  $(".home-btn").on("click", function (event) {
    event.preventDefault();
    // route to home.handlebars
    window.location.assign("/home");
  });

  // ------------------------------------------------------------------
  // Update  buttons for item detail pages
  //==============================================================
  // ============================================================
  //Adding event listeners
  $(document).on("click", "#update-product-btn", editProd)

  function editProd() {

    let price = $('#price').val();
    let quantity = $('#product-quantity').val();
    let id = $(this).data("id");

    let queryUrl = `/api/products/${id}`;

    // AJAX to query url and put data into the database
    $.ajax(queryUrl, {
      method: "PUT",
      data: {
        price: price,
        quantity: quantity
      },
    }).then(window.location.href = "/home");
  };


  //===============================================================

  $(document).on("click", "#update-seed-btn", editSeed)

  function editSeed() {

    let quantity = $('#seed-quantity').val();
    let id = $(this).data("id");

    let queryUrl = `/api/seeds/${id}`;

    // AJAX to query url and put data into the database
    $.ajax(queryUrl, {
      method: "PUT",
      data: {
        quantity: quantity
      },
    }).then(window.location.href = "/home");
  };


  // =========================================================
  //  Delete buttons
  //==========================================================

  // Before running functions for last 2 (delete) buttons: a confirm function!
  function confirmDelete() {
    let deleteCheck = confirm(
      "You are deleting this item from your database.  Are you sure?"
    );
    if (deleteCheck) {
      return true;
    } else {
      return false;
    }
  }

  $("#delete-product-btn").on("click", function (event) {
    event.preventDefault();
    let id = $(this).data("id");
    // add confirm before running delete request!!
    if (confirmDelete()) {
      // delete method ajax call for updating product in database
      let queryUrl = "/api/products/" + id;
      $.ajax(queryUrl, {
        type: "DELETE"
      }).then(window.location.href = "/home");
    };
  });

  $("#delete-seed-btn").on("click", function (event) {
    event.preventDefault();
    let id = $(this).data("id");
    // add confirm before running delete request!!
    if (confirmDelete()) {
      // delete method ajax call for updating product in database
      let queryUrl = "/api/seeds/" + id;
      $.ajax(queryUrl, {
        type: "DELETE"
      }).then(window.location.href = "/home");
    };
  });
});
