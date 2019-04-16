$(document).ready(function() {
    $("#product-read-result").hide();
    $("#products-read-table").hide();
    $("#seed-read-result").hide();
    $("#seeds-read-table").hide();
  
    // Button event listeners for routes:
    // ------------------------------------------------------------------
    // Homepage search and add buttons (first 4):
  
    // Search buttons have the function from datatables library to render data in the search table
    $("#read-products-btn").on("click", function (event) {
      event.preventDefault();
      console.log('I clicked here')
      $.get("/api/products", function (res) {
        $("#seed-read-result").hide();
        $("#seeds-read-table").hide();
        $("#product-read-result").show();
        $("#products-read-table").show();
        $("#products-read-table").DataTable({
          // populate data packet into table (use object section from docs)
          data: res.data,
          columns: [
            { data: "id" },
            { data: "strain" },
            { data: "price" },
            { data: "quantity" },
            { data: "packaging" },
            { data: "size" },
            { data: "thc" }
          ]
        });
      });
    });
  
    $("#read-seeds-btn").on("click", function (event) {
      event.preventDefault();
      $.get("/api/seeds", function (res) {
        $("#product-read-result").hide();
        $("#products-read-table").hide();
        $("#seed-read-result").show();
        $("#seeds-read-table").show();
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
    });
});
  
  