-- My first ReadMe
 

Steps to Run the Project
1-- first download the backend project from 
     https://github.com/patialmanoj/BeerProxyApi
     -- > open it in visual studio 2015
     -- > Build the soultion
     -- > You may require nuget package Microsoft.AspNet.WebApi.Cors -Version 5.2.3 for building project
     -- > Run the project --> it will start the server with some url
     --> copy the URL ..  for example it could be http://localhost:50528/
     --> paste it some where . we need this URL while Running UI Project 

2-- UI project
   Download this project https://github.com/patialmanoj/Beer_world
   --> Open the project in Visual studio Code
   --> Open the terminal
   --> Enter -->  npm install 
   --> Go to the file constant.js --> Beer_world/components/common/constant.js
   --> Change the URL constant with copied value
   --> Go to Terminal 
        Enter -->  npm -s start
   -->  Application will be up and running 

--> How to use application
--> Go To Beers Tab
   --> List of Beer will be displayed in table
   --> sorting , pagination , expand functionality provided in table
   --> click on link of any beer --> will open the all description about beer
   --> come back again .. 
      Search a keyword --> table will get filter with that keyword , if present .
        
