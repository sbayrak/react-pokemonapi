 First, I would like to thank to Jason Rivera and pokeapi.co

In App.js, as states I have pokemonData, nextUrl, prevUrl, loading. In useEffect hook, Im fetching data with axios asyncrounsly. 'response' variable in fetchData(), returns 'name' and 'url's. I need to fetch again in order to get the actual data from those urls. So after setting states of 'nextUrl' and 'prevUrl' I pass related array of objects and await a response from loadingPokemon2. What loadingPokemon2 does is, getting those datas, split name and urls, and sending a request to each url and store datas into 'pokemonDatas' after that we set the state of 'pokemonData' with 'pokemonDatas' at the end of the function to cause re-render. So up to this point we are done with useEffect hook.

After that we have 2 buttons; prev and next right above 'grid-container' div inside return. When we click on one of them, 'next' or 'prev' function fires based on the button you pressed. What each function does is, simply sets loading state to true, fetch next url's data with axios, send returning datas to 'loadingPokemon2()' setting nextUrl and prevUrl again and setting loading back to false.  

You may reach to website that I deployed on Firebase.
## https://react-pokemonapi.web.app/



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


