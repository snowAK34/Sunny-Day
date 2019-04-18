# Sunny Day application

## Company Overview ##

Our team has built an inventory management database ssytem for a company nammed Sunny Day Groweres. The company is located in Puyallup, WA , that it's sells recreational marijuana products, to other wholesalers, and not directly to retail customers. The Sunny Day website customers are redirected to retail stores which carry Sunny Day retail products. Sunny Day Growers wholesalers on the other hand are each provided a unique login-password in order to view/order Sunny Day's wholesale products.  

Sunny Day Growers maintains two distinct product types in it's database. The first classification of Sunny Day Growers products are prepackaged products that wholesalers customers can purchase and sell directly to their retail customers. The second classification of Sunny Day products are products(i.e joints, budds, vaperizors,etc..) derived from particular varitals/strains of seed(s). A wholesale customer places a purchase order for an end product, derived/grown from the particuar strains of seed(s) along with a requested delivery date. 


## App Summary ##
Sunny Day application is an inventory management system built to specification for a local company, Sunny Day Growers. The company currently uses a stand-alone  Excel spreadsheet to manage their entire inventory of products and seeds. The primary goal of the Sunny Day application is to provide a online inventory database management system , with the ability to perfrom CRUD operations on the inventory today. The inventory system has been designed to also support generation of multiple views(i.e. owner, wholesale and retail customers) of their inventory down the road.


The application supports the following operations/features:
1) Secure passport login - no access to the inventory database/application without Passport authentication.
2) Create new products or seeds - create new inventory
3) Update new products or seeds - update inventory
4) Deleting individual products or seeds - delete existing inventory
5) Low inventory notification - order new inventory


## Built With ##
- Bootstrap
- JQuery
- Passport Authentication
- JavaScript
- AJAX
- Model-View-Controller Framework
- Handlebars
- Sequelize
- EsLint
- Travis
- MySQL
- Heroku
- Materialize
- Flash
- Cookie Parser
- Express

## Authors ## 
- Jean Neils - Product idea, Heroku, back-end, integration-lead
- Stacy - Designer, front-end, integration lead
- Rob Fanfant - Routing, integration, README
- Bret - Passport Authentication, UI low inventory, integration

## Sitemap ##
- Landing section: the starting point and main interaction from the user. A simple  authentication input form is all that's needed from the user. Requests the user to Login using their Email address and Password, otherwise Sign Up with similar credentials. 

- redirect: following succesfull authentication the user is redirected to the inventory page, allowing all database operations on product/seed inventory CREATE/READ/UPDATE/DELETE (CRUD)

- Inventory list box highlights rows contaning low inventory with a different background color.

- Update/Delete/Add section: From the main inventory page there are buttons to add new seeds or products. Selecting an individual item redirects the user to an update form which provides the abliity to furter update that item or delete that item.


### Functionality ###
On first instance, the user is requested to signin. There are three distinct types of authenticated users. They are Owner, Wholesalers, and Retail customers, each of which have their own view into the inventory database. Through the authentication signin process, an Owner has the ability to perform ALL CRUD operations of the companies inventory database, as well as the ability to manage(create/modify/delete) authentication signin accounts. Wholesale users are allowed to view and purchase Sunny Day Growers products and seeds. Retail customers are only allowed to view products and are referred to retail shops where Sunny Day products can be purchased.


## Front End Design ##
This code is responsible for all interaction with Users using the Model View Controller(MVC) framework. Users interact with the front end webpages which are routed to either of two controllers (Product or Seeds) depending on what inventory(Product or Seeds) the User has selected to view. The Controller(s) interface with the approriate Model(s) to query the database for inventory data. Once data is returned from the Model(s) to the Controller, the Controller routes the data back to the User through Views.

### API Details ###
The code is broken into the following ROUTER main functions: 

* Create:
  * router.post("/api/seeds", isAuthenticated, SeedController.addSeed) - Adds a seed to inventory
  * router.post("/api/products",isAuthenticated, ProductController.addProduct) - Adds a product to inventory
 
* Read:
  * router.get("/api/seeds/:seedID", isAuthenticated, SeedController.getAllSeed) - Get all seed inventory from DB
  * router.get("/api/seeds", isAuthenticated, SeedController.getSingleSeed)  - Get indiviual seed detail from DB
  * router.get("/api/product", isAuthenticated, SeedController.getAllProduct) - Get all product inventory from DB
  * router.get("/api/product/:productID", isAuthenticated, SeedController.getSingleProduct) Get individual product detail from DB
  
* Update: 
  * router.put("/api/seeds/:productId", isAuthenticated, ProductController.update) - Update individual product in DB
  * router.put("/api/seeds/:seedId", isAuthenticated, SeedController.update) - Update individual seed in DB
  
* Delete:
  * router.delete("/api/seeds/:seedId", isAuthenticated, SeedController.delete) - Delete individual seed from DB
  * router.delete("/api/product/:productId", isAuthenticated, ProductController.delete) - Delete individual product from DB


### What was learned:###

Stacy???


## Database Design ## 
The database is configured to support Sunny Day Growers MVP requirements. Using mySQL, a database is created named "Budd.DB" containing the following tables - Products and Seeds. The Products tables contains columns required to track products for sale to Sunny Day Growers wholesale customers. The Seeds table is used by Sunny Day Growers to internally track the companies inventory of seeds, none of which will be sold externally.


### Functionality ###
 The database is connected to the front end client using MVC framework. Specifically the database is accessed through calls into the Controller as defined in the CONTROLLER API entry points defined above. In essence, both the Seed and Products tables support full CRUD operation through API(s).

### API Details ***

The code is broken into the following CONTROLLER main functions:

 * Create:
   * static addSeed(req,res) {.models.Seed.findOrCreate()} - Adds a seed to inventory
   * static addProduct(req,res) {.models.Product.findOrCreate()} - Adds a product to inventory 
   
* Read:
  * static getAllSeed(req, res) {models.Seed.findAll()}- Get all seed inventory from DB
  * static getSingleSeed(req,res){models.Seed.getSingleSeed()} - Get indiviual seed detail from DB
  * static getAllProduct(req, res) {models.Product.findAll()}- Get all product inventory from DB
  * static getSingleProduct(req,res){models.Product.getSingleProduct()} - Get indiviual seed detail from DB

* Update: 
  * static update(req,res) {.models.Seed.findOne()} - updates a seed in inventory
  * static update(req,res) {.models.Product.findOne()} - updates a product in inventory

* Delete:
  * static delete(req,res) {.models.Seed.findOne()} - deletes a seed in inventory
  * static delete(req,res) {.models.Product.findOne()} - updates a product in inventory

### What was learned: ###



## Authentication Design ##
Bret???
### Functionality ### 
Entry Points - 

### API Details ***

### What was learned:###
* The ability to incorporate Passport authentication to a project protecting the remaining application web pages from unathorized access. 


# Takeaway
The application is functional as built and meets the initial MVP specified by Sunny Day Growers. More work needs to be done to support/add wholesalers views including checkout and payment.

# Future Development
We would like to incorporate:
- Add in Password confirmation input box during signin
- Handle a duplicate signin within Passport Authentication - currently the application crashes on a duplicate signin. 
- Add additional custom views for retail, as well as wholesale customers
- Integrate Sunny Day app with main website hosted on GoDaddy 
- Checkout/Cart views need to be added, supporting payment method.
- Email and/or database notification once an order has been placed by wholesalers.
- Logging in with the incorrect password is unhandled,displays blank/error page.
- 
