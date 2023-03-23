<p align="center">
  <a href="https://github.com/tokyo-traders/koukan">
    <img src="https://user-images.githubusercontent.com/67497636/217703956-9a1c7261-930a-4fd4-a536-388541d7ed85.png" alt="Logo" width="480" height="250">
  </a>

   <p align="center">
    A combat tracker for DnD 5E
    <br/>
<!--     <br/>
    <a href="https://github.com/tokyo-traders/koukan"><strong>Explore the docs »</strong></a>
    <br/> -->
    <br/>
    <a href="https://VDSM.onrender.com/">Go to deployed version >>></a>

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
* [Authors](#authors)
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




## Getting Started

If you are a developer and want to use our application, follow the steps below.

### Prerequisites

Download python, it is not needed for the app to run but there are add-ons that require it.
install postgreSQL, if you need help with this follow the guide here: 

### Installation

1. clone the app 
    ```sh 
    git clone https://github.com/coffiey/VDSM
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
    npm react-scripts start
    (this allows for hot reloading on the frontend)
    ```
  
6. Enjoy the app! Please play around all you want and any bugs you find let me know.

### Deployment

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