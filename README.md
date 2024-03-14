
<h1> UCLA CS 35L Web Application: UCLAOutlet </h1>

<h2> How to Install </h2> 

<h4>1) Install NodeJS and Git</h4>

[NodeJS](https://nodejs.org/en/download) </br>
[Git](https://git-scm.com/downloads) </br>


<h4> 2) Clone the repository </h4>

Open your terminal in the desired install folder  </br> 
Run the command `git clone https://github.com/bkiley113/web-app` </br>
Change working directory to the newly cloned *web-app* </br>

<h4> 3) Run the startup script </h4>

From the *web-app* repository,  run the command `npm start` </br> 
When prompted for DB Key, enter your MongoDB connection string. It should look something like this: </br> </br>

    mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majorityenter code here 
</br>
After entering, you will be asked for the email app key for bruinoutlet@gmail.com. Please consult repo owners for a key. </br>
<strong>Please ensure you put the repo key in quotation marks ("") when entering in the terminal.</strong> </br> </br>

You will then be asked for the port you want to run on. Leaving it blank will run the server on <strong>3001</strong>. Keep in mind the frontend runs on <strong>3000</strong>. </br>
The last field is the JWT key. You can choose any string for this, but the longer/more complex the more secure authentication will be. </br> </br>



<h4> Once you submit these values, the web app will build and be ready to use. For any bugs, concerns, or suggestions, please contact bruinoutlet@gmail.com. </h4>
