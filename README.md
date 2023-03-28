<p align="center">
  <!-- <a href="https://github.com/tokyo-traders/koukan">
    <img src="https://user-images.githubusercontent.com/67497636/217703956-9a1c7261-930a-4fd4-a536-388541d7ed85.png" alt="Logo" width="480" height="250">
  </a> -->

   <p align="center">
    A combat tracker for DnD 5E
    <br/>
    <br/>
    <a href="https://VDSM.onrender.com/">Go to Website</a>

  </p>
</p>

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Deployment](#Deployment)
<!-- * [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license) -->
* [Author](#author)
<!-- * [Acknowledgements](#acknowledgements) -->


## About The Project

This is designed for new and experenced players to have a dynamic and streamed line combat experence while still maintatining that customisation and freedom that DnD creates.
<br/>
How to use it:

Have the dungeon master load Player Character stats into the PC section.
Search which moster from the 5E monster manual you would like to use.
Edit the monster HP to your preference for the encounter.
When its time, select the 'Begin Combat' button.
Input the iniative roles and the app will auto assign intiative order.
From here just play, The app tracks HP and it will rotate through the combat order through the next turn button.


## Built With

The application has been built using React in the frontend. node with Express have been used for the backend.
Finally.
</br>



<table align="center">
  <tr>
    <th>Languages</th>
    <th>Libraries</th>
    <th>Framework</th>
    <th>Database</th>
  </tr>
  <tr>
    <td align="center">
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
    </td>
    <td align="center">
    <a href="https://https://mui.com//" target="_blank" rel="noreferrer"> 
      <img src="https://user-images.githubusercontent.com/67497636/217686777-1302937e-51e8-4d8b-8905-8796c4911b88.png" alt="react" width="40" height="40"/> </a>
    </td>
    <td align="center">
      <a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/django.svg" alt="django" width="40" height="40"/> </a>
    </td>
    <td align="center">
      <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a>
    </td>
  </tr>
  <tr>
    <td align="center">
    <a href="https://www.python.org" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a>
    </td>
    <td align="center">
      <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
    </td>
    <td>
    </td>
    <td>
    </td>
    </tr>
    <tr>
    <td>
    </td>
    <td align="center">
    <a href="https://jwt.io/" target="_blank" rel="noreferrer"> <img src="https://user-images.githubusercontent.com/67497636/217804934-d450c024-a02d-4649-bc7d-d606788afe29.png" alt="jwt" width="70" height="40"/> </a>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
<table>

## Getting Started

If you are a developer and want to use our application, follow the steps below.

### Prerequisites

Download python, it is not needed for the app to run but there are add-ons that require it.
install postgreSQL, if you need help with this follow the guide here: 

### Installation

1. clone the app 
    ```sh 
    git clone https://github.com/coffiey/VDSM
    create migration command
    npm run migrate-create --name=<migration Name>
    ```
2. install all the packages
    ```sh
    useing the postgreSQL terminal create a database for the server to use.
    npm install
    npm run migrate-latest
    ```
3. Create a .env.local file. Add the following to the file:
    ```sh
    DB_USER = [your PSQL username]
    DB_PASSWORD = [your PSQL Password]
    DB_NAME = [your PSQL Database Name]

    NODE_ENV = development
    ```
  
4. start the server:
    ```sh
    cd into working directory
    npm run serve
    (this will start nodemon which allows for hot reloading od the server)
    ```
5. In a new Terminal start the React Virtial DOM
    ```sh
    npX react-scripts start
    (this allows for hot reloading on the frontend)
    ```
  
6. Enjoy the app! Please play around all you want and any bugs you find let me know.

## Deployment

You can find a up to date version of the app already deployed at ###### so feel free to sign up there and enjoy the website there. However if you want to deploy it yourself as a test or to have a private server for you own game I have no problem with doing that. Please just dont try to sell this service, it is against the licencing agreement and also just a bad faith thing to do. But if you just like a fast response time, or a just really really really far away from singapore I want users to have that option.


1. Create a Database Through your deployment 
    ```sh
    save appropriate database Url.
    ```

2. set up Deployment Enviroment Variables
    ```sh
    DB_URL = [Provided by Deployment]
    NODE_ENV = deployment
    ```
3. Run deployment setup command
    ```sh
    npm run build
    (this will install, build and migrate for you)
    ```

 4. start Server
    ```sh
    npm run serve
    (the static build file is served by the root directory of the server, so running the command will load both front and backend.)
    ``` 


## Author
<table align="center">
  <tr>
    <th>
      <a href="https://github.com/Coffiey"> Adam Burrough </a>
    </th>
  </tr>
  <tr>
  <td>
    <a href="https://github.com/Coffiey" target="_blank" rel="noreferrer">
    <img src="https://user-images.githubusercontent.com/67497636/217795795-7a3869b0-6373-4b43-bacf-ed5f08b046ea.jpeg" alt="javascript" width="150" height="150"/> </a>

  </td>
  </tr>
  </table>

<p align="center">
    <h3>Checkout some of my other work.</h3>
    <p>Tokyo Traders</p>
    <a href="https://tokyotraders.onrender.com/">Tokyo Traders Website</a>
    <a href="https://tokyotraders.onrender.com/">Tokyo Traders Git Hub</a>
  </p>
</p>