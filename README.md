# MERN E-commerce app front-end
This is the front-end code of my full-stack MERN E-commerce website.

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)

## overview
This is not a production level application, it is my personal project built to show what I have learned and further practice, learn and grow as a developer. for clarity, I have decided to create seperate readmes for client and [server](https://github.com/uchinmachinio/UchasStore-server) repositories.

- **Purpose:**
   The client side is responsible for rendering the user interface, facilitating user interactions, and communicating with the [server](https://github.com/uchinmachinio/UchasStore-server) to fetch and display product data.

- **Key Features:**
  - Browse products by category.
  - Add products to the shopping cart.
  - View detailed product information.
  - Seamless navigation with a responsive design.
  - Sorting products by different criteria.
  - Search bar.
  - Pagination.
  - Place an order.
  - Add a product for sale.
  - Register.
  - Modify/Add your personal information.

- **Technology Stack:**
  - Built using React for a modular and efficient UI.
  - Styled with vanilla css for a visually appealing and consistent look.
  - React router.
  - [Imagekit](https://imagekit.io/) third party service,for image optimization and efficient loading/storing.

- **Architecture:**
  - Follows a component-based architecture for modularity and maintainability.
  - Utilizes React context API for efficient state handling.
  - Seaparated Utility function module, for further modularisation and clarity.
 
  ### Insight
    One of the things I would mention about the architecture is that, it could be broken down to smaller components, and I will definitely take that into account for the    
  future, but the reason why I didnt modularise every input and button, is that I didnt really see the point in it initially,I did not expect the project to get this big,     but as it did, I now think it would be a good idea.
    I did not use any state management library, Redux for example,since I was able to achieve the needed functionalities (such as sharing state between multiple components) 
  with Reacts own context API, and while Redux is powerful, I did not see the point in adding additional complexity and boilerplate code in this case.
  
- **User Interface (UI):**
  I kept it simple. I did not want to overcomplicate the UI while also making sure it looks good, I tried using as little media queries as possible to keep the code simple by utilising the css features that allow the browser itself to take care of the responsivness, such as utilising the features of flexbox and grid, using relative values for sizing instead of fixed values, using min-max instead of writing seperate media queries to control the sizing.
    
- **Dependencies:**
  - You can view all of the dependencies in package.json file in the root directory.

- **Interaction with Server:**
  - Makes API calls to the server to fetch product data and handle user actions.

  ## Installation
  You do not need to run this project in you local machine to be able to view it, I hosted it on render so you can just visit https://uchas.store/ , however if you do want to install it it will be quite tedious,because you will need to install both client and server repositories, as well as link them to your own third party services I'm using, since im not sharing my personal env variables, here are the steps:
  
  1.**set up client directory:**
   ```bash
   //Create and Navigate to the Client Directory:
   mkdir client
   cd client
  //Clone the client repo:
   git clone https://github.com/uchinmachinio/UchasStore-client
  //Install dependencies
   npm install
  //change the base url variable in api.js to "http://localhost:4000" // or your preffered port
  //start the client
   npm run dev
   ```
  2.**set up server directory:**
    ```bash
    //Create and Navigate to the Server Directory:
    mkdir server
    cd server
   //Clone the server repo:
    git clone https://github.com/uchinmachinio/UchasStore-server
   //Install dependencies
    npm install
   //set up the env with your respective services, heres the template:
    MONGO_URI=your mongo uri
    SESSION_SECRET=any secret string
    GOOGLE_CLIENT_ID=your client id
    GOOGLE_CLIENT_SECRET=your gogle secret
    IMAGEKIT_URL=your imagekit uri
    IMAGEKIT_PUBLIC_KEY=your imagekit public key
    IMAGEKIT_PRIVATE_KEY=your imagekit private key
    CLIENT_URL="http://localhost:5173" //or your preffered port
    SERVER_URL="http://localhost:4000" //or your preffered port
    STRIPE_TEST_SECRET=your stripe webhook signing key
  //run the server
    node index.js
    ```
## Usage
Do wahtever you want! feel free to click on everything, browse products, sort them,filter them, use search bar, register, add a product to sell!

## License

This project is for educational and personal use only and does not grant any rights for redistribution, modification, or commercial use.

### How to Contribute

While contributions are appreciated, this project is mainly for personal development and learning purposes. Contributions may be accepted at the discretion of the project owner.

## Acknowledgments

This project may use third-party libraries or resources that have their own licenses. Please refer to the respective license files or documentation of those components for more information.
