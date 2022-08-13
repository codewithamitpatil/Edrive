
<br />
<p align="center">
  <a href="hhttps://amitfoundation.herokuapp.com/">
    <img src="logo2.png" alt="Logo" width="280" height="180">
  </a>

  <h1 align="center">Api Bucket Apis 1.0</h1>

  <p align="center">
    <br />
    Developed By : Amit Gujar Patil
    <br />  <br />  
     <br />
  
 <a href="https://documenter.getpostman.com/view/11617094/UVyn1JVn">Api Documentation</a>
    <br />

  </p>
</p>


## Architecture 

![Screenshot (342)](https://user-images.githubusercontent.com/62344675/184499021-6b5c6440-b8db-4cd1-ab94-a7adb90de2f3.png)


## Data Flow

> Main Server  =>  Routes =>  Controllers =>  Services => Model    
> Main Server  <=  Routes <=  Controllers <=  Services <= Model    



## What I Did In This Repo ???

This is an EDRIVE a place where you can store your documents .<br/>
This project is built on Microservice Architecture Along with all best practises.<br/>



<br>
Custom Logger - Genrate the logs with winston and morgan and collecting this logs into files and AWS CLOUD WATCH<br>
Tracer - Genrate traces with opentracing and and montior this traces in jaeger ui<br>
Monitor - To monitor application i use express monitior<br><br>
Messagin Queue - To achive pub sub mechanism i have used RabitMQ
Nodemailer - To Send Mails with beautiful mail templates for various user actions.
JWT - To achive authriozation among ditributed services.
AMAZON S3 BUCKET - to store user files securely.


I have created an full  fledged  authentication and authriozation <br/>
User can upload files , download files as well as delete and see all the files <br/>
I implement Global Error Handler with exception email notifier <br/>
I implement Rate Limiter <br/>
I had do clean code with clean folder structure </br> 

In react i have persist the login.
create some custom hook to get access of private apis.



## API Documentation


[Postman api documentation](https://documenter.getpostman.com/view/11617094/UVyn1JVn)




