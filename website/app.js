/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
// Ekaterinburg was chosen as an example
const apiKey = '&appid=25cdc6f3c757f5895f5314302b642266&q=Ekaterinburg&units=metric';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
const zipCode = document.getElementById('zip').value;
const userResponse =  document.getElementById('feelings').value;

//A null check for zip so that the API would not call if the zip is undefined or null
if (!zipCode) {
  alert('zipCode is underfined');
} else if (zipCode == 0){
  alert('zipCode is null');
} else {
  console.log('zipCode is fine');
}

const getWeatherData = async (baseURL, zipCode, apiKey)=>{
  const res = await fetch(baseURL + zipCode + apiKey)
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

getWeatherData(baseURL, zipCode, apiKey)
  .then(function(data) {
  // To display detailed weather data in Ekaterinburg in the console
  console.log(data);
  postData('/add', {date: d, temperature: data.main.temp, userResponse: userResponse})
  })
  .then(
  updateUI()
  )
};

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  console.log(data);
  const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  }catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
}

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = 'Date: ' + allData.date;
    document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temperature + ' C';
    document.getElementById('content').innerHTML = 'Feeling: ' + allData.userResponse;

  }catch(error){
    console.log("error", error);
  }
}