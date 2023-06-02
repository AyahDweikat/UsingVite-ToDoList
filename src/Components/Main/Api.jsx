export default function fetchData(){
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://todolist-backend-app-nodb.onrender.com/getTasks', requestOptions)
    .then((response) => response.json())
  }