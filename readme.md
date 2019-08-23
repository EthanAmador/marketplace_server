# marketplace_server

developed in **NodeJs** With **Express**

It connects to a mongo database located on the following server https://cloud.mongodb.com/

# collections
 - Category: store product categories. It does not have a user interface, therefore it is necessary to create through PostMan, using the following request. 
    
    
        POST /category HTTP/1.1
        Host: localhost:8080
        Content-Type: application/json
        Cache-Control: no-cache
        {
	        "name":"Category 1",
	        "description": "Description category"
        }
 
   
    


 - Products: store product information, if you have a graphical interface
 - shoppingCart: store shopping cart. 

 ## Modes of use

1. clone the project
2. get latest version
3. download dependencies **npm i**
4. execute command **node index.js** in folder project
5. run with [http://localhost:8080](http://localhost:3000/)