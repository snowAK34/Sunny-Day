
module.exports = function productValidation(request, response, next) {
  var {
    strain, price,quantity
  } = request.body;
  
  var casted_price = parseFloat(price)
  var casted_quantity = parseInt(quantity)
  console.log("====", request.body)

  const specialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  const error = [];

  const requestMethod = request.route.methods;

  if (requestMethod.post) {
    if (!strain || strain.trim() === '') {
      error.push('strain cannot be empty');
    }

    if (specialChar.test(strain)) {
      error.push('Invalid strain');
    }

    if( typeof strain === 'boolean' || typeof strain !== 'string') {
      error.push('strain must be a string');
    }

    if (!price) {
      error.push('price cannot be found ');
    }

    if( typeof casted_price === 'boolean' || typeof casted_price === 'string') {
      error.push('price must be an integer or float');
    }

    if (!quantity) {
      error.push('quantity cannot be found');
    }

    if( typeof casted_quantity === 'boolean' || typeof casted_quantity === 'string') {
      error.push('quantity must be an integer');
    }


  if(requestMethod.patch){
    if(strain){
      if (strain.trim() === ''){
        error.push('you cannot update strain with empty value');
      }
      if (specialChar.test(strain)) {
        error.push('Invalid strain');
      }
    }
  }
  if (error.length === 0) {
    return next();
  }
  return response.status(400).json({
    status: 'failed',
    message: error,
  });
}
}
