<h1>Weather App</h1>

<h2><u>Overview</u></h2>
<p>WeatherApp is a simple application that provides a 6-day weather forecast for any location. The app fetches weather data using the Tomorrow.io API and uses the OpenCageData API for geocoding (converting location names into geographical coordinates).
</p>

<h2>Features</h2>
<ul>
  <li>Displays a 6-day weather forecast for a given city or location provided by tommrow.io API.</li>
  <li>Provides detailed information such as temperature, weather conditions, and wind speed</li>
  <li>Auto-complete location search using OpenCageData geocoding API.</li>
  <li>A dynamic weather background for the appropriate weather conditions.</li>
</ul>

<h2><u>Setup Instructions</u></h2>
<h3>Prerequisites</h3>
<p> In order to successfully set this project up all you will need is to register for the tomorrow.io and OpenCageData and edit the ` API_KEY ` and `ACCESS_KEY` variables with the appropriate API keys.</p>
<h3><u>Obtain API Key from OpenCageData</u></h3>
<ol>
  <li>Visit the <a href = "https://opencagedata.com/"> OpenCageData website and sign up. </a></li>
  <li>Once you have signed up, go to the dashboard <a href="https://opencagedata.com/dashboard"> https://opencagedata.com/dashboard</a>.</li>
  <li>Go to the GeoCoding API tab and copy the API key from there.</li>
  <li>From there you will go to the script.js file and add your API code to the ACCESS_CODE variable.</li>
</ol>

<h3><u>Obtain API Key from Tommrow.io</u></h3>
<ol>
  <li>Go to the <a href = "https://www.tomorrow.io/"> tommrow.io website and create an account. </a></li>
  <li>Once you have created your account, go to the dashboard <a href = "https://www.tomorrow.io/"> https://www.tomorrow.io/</a>.</li>
  <li>Copy the API key from the dashboard.</li>
  <li>From there you will go to the script.js file and add your API code to the API_KEY variable.</li>
</ol>

<h2>Running the App</h2>
<p>You will also have to use the <a href = "https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer"> live server extension</a> in visual code to locally run the server.Once the app is running, you can access it by going to the address http://localhost:5550 and http://127.0.0.1:5550.Enter the name of a city in the search bar, and the 6-day forecast for the appropriate location will be displayed.</p>



