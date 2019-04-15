$(document).ready(function() {
  // Button event listeners for routes:
  // ------------------------------------------------------------------
  // Homepage search and add buttons (first 4):

  // Search buttons have the function from datatables library to render data in the search table
  $("#products-btn").on("click", function(event) {
    // event.preventDefault();
    // console.log('I clicked heres')
    $.get("/api/products/search", function(data) {
      console.log("=====", data)
      $("#products-table").DataTable({
        // populate data packet into table (use object section from docs)
        data: data,
        columns: [
          { data: data.id},
          { data: "price" },
          { data: "quantity" },
          { data: "packaging" },
          { data: "size" },
          { data: "thc" }
        ]
      });
    });
  });

  $("#seeds-btn").on("click", function(event) {
    event.preventDefault();
    $.get("/home/seed", function(data) {
      $("#seeds-table").DataTable({
        // populate data packet into table (use object section from docs)
        data: data,
        columns: [
          { data: "strain" },
          { data: "type" },
          { data: "quantity" },
          { data: "thc" },
          { data: "cbd" }
        ]
      });
    });
  });

  $("#add-product-btn").on("click", function(event) {
    console.log('i got here')
    // event.preventDefault();
    // routes to add.handlebars with form to add product
    window.location.assign("/add-product");
    // $.get("/add/product");
  });

  $("#add-seed-btn").on("click", function(event) {
    // event.preventDefault();
    // routes to add.handlebars with form to add seed
    window.location.assign("/add-seed");
  });

  // Return to homepage button; used on both update-del pages
  $("#home-btn").on("click", function(event) {
    // event.preventDefault();
    // route to home.handlebars
    window.location.assign("/home");
  });

  // ------------------------------------------------------------------
  // Update and delete buttons for item detail pages (next 4):

  $("#update-product-btn").on("click", function(event) {

    window.location.assign("/update-product");

    // event.preventDefault();
    // let price = $("#price").val().trim();
    // let quantity = $("#product-quantity").val().trim();
    // // put method ajax call for updating product in database
    // let queryUrl = "api/update/product/" + price + "/" + quantity;
    // $.ajax(queryUrl, {
    //   type: "PUT"
    // }).then(
    //   function() {

    //   }
    // );
  });

  $("#update-seed-btn").on("click", function(event) {
    window.location.assign("/update-seed");

    // event.preventDefault();
    // let quantity = $("#seed-quantity").val().trim();
    // // put method ajax call for updating seed in database
    // let queryUrl = "api/update/seed/" + quantity;
    // $.ajax(queryUrl, {
    //   type: "PUT"
    // }).then(
    //   function() {
        
    //   }
    // );
  });

  // Before running functions for last 2 (delete) buttons: a confirm function!
  function confirmDelete() {
    let deleteCheck = confirm("You are deleting this item from your database.  Are you sure?");
    if (deleteCheck) {
      return true;
    } else {
      return false;
    }
  };

  $("#delete-product-btn").on("click", function(event) {
    event.preventDefault();
    // add confirm before running delete request!!
    if (confirmDelete) {
      // delete method ajax call for updating product in database
      let queryUrl = "#";
      $.ajax(queryUrl, {
        type: "DELETE"
      }).then(
        function() {
        }
      );
    };
  });

  $("#delete-seed-btn").on("click", function(event) {
    event.preventDefault();
    // add confirm before running delete request!!
    // if (confirmDelete) {
    //   // delete method ajax call for updating product in database
    //   let queryUrl = "#";
    //   $.ajax(queryUrl, {
    //     type: "DELETE"
    //   }).then(
    //     function() {
          
    //     }
    //   );
    // };
    window.location
  });
});
