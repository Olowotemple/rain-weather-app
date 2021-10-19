# Rain

Discover accurate, real-time weather information for your city.
![A capture from the Rain weather app](./images/misc.png)

## Available Scripts

In the project directory (root), you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## How the App Works

- On every inital render, the user is greeted with fiften (15) most populous cities in the world (sorted alphabetically), these cities could be removed by user to clean up the page, as shown below:
  ![Homepage](./images/homepage.png)

-User can search for a city by typing the name of the city in the search space provided.

-Clicking on a city takes user to a details page that gives the user even more weather information for that city, shown below:
![Details page](./images/detailsPage.png)

- On the details page,

  - User can add a city to a list of favourites using the blue button next to the city name as shown below:
    ![Add city to favourites](./images/addToFavourites.png)

  - User can remove a city from your list of favourites using the red button next to the city name as shown below:
    ![Remove city from favourites](./images/removeFromFavourites.png)

  - User can add, edit and remove notes for a particular city, shown below:
    ![Add, edit and remove notes](./images/addEditRemoveNotes.png)

- A User's list of favourited cities (sorted alphabetically) shows up just below the search area on the homepage, show below:
  ![View favourites](./images/viewFavourites.png)

- Clicking on a favourited city takes user to the details page with current weather information and notes for that city, as shown above in No. 3.
