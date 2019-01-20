import dispatcher from "../dispatcher";
import axios from 'axios';
const server='http://localhost:3000/api';
//const server='http://sanatik.ir/api';

export function createTodo(text) {
  dispatcher.dispatch({
    type: "CREATE_TODO",
    text,
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: "DELETE_TODO",
    id,
  });
}

export function createAgency(data) {
  //console.log(data);
  axios.post(server + '/agencies', JSON.stringify(data), { headers: {'Content-Type': 'application/json', } })
  .then(function (response) {
    dispatcher.dispatch({
      type: "CREATE_AGENCY",
      id: response.id,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function createAdvertisement(data) {

  axios.post(server + '/make_advertisement', JSON.stringify(data), { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + data.token } })
  .then(function (response) {
    dispatcher.dispatch({
      type: "SHOW_ADVERTISEMENT",
      advertisement: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function createTourPackage(data) {
  var form_data = new FormData();

  for ( var key in data ) {
    console.log(key, data[key]);
    form_data.append(key, data[key]);
  }
  console.log(data);
  axios.post(server + '/tour_packages', form_data, { headers: {'Content-Type': 'multipart/form-data', } })
  .then(function (response) {
    dispatcher.dispatch({
      type: "CREATE_TOURPACKAGE",
      tourPackage: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function login(data) {
  var username = data.username
  var password = data.password
  axios.get(server + '/login?username='+ username +'&password='+ password)
  .then(function (response) {
    console.log(response);
    if (response.data.result == 'ERROR'){
      dispatcher.dispatch({
        type: "LOGIN_FAIL",
        error: response.data.error,
      });
    } else {
      dispatcher.dispatch({
        type: "LOGIN_SUCCESS",
        token: response.data.token,
      });
    }

  })
  .catch(function (error) {
    console.log(error);
  });
}


export function sign_up(data) {
  axios.post(server + '/sign_up', data )
  .then(function (response) {
    console.log(response);
    if (response.data.result == 'ERROR'){
      console.log('fail');
      dispatcher.dispatch({
        type: "SIGNUP_FAIL",
        error: response.data.error,
      });
    } else {
      dispatcher.dispatch({
        type: "SIGNUP_SUCCESS",
        token: response.data.token,
      });
    }

  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getAdvertisements(data) {
  axios.get(server + '/advertisements?page='+data.page)
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SHOW_ADVERTISEMENTS",
      advertisements: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getMyAdvertisements(data) {
  axios.get(server + '/my_advertisements', { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + data.token }})
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SHOW_ADVERTISEMENTS",
      advertisements: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function deleteAdvertisement(id, token) {
  axios.get(server + '/delete_advertisement/' + id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "DELETE_ADVERTISEMENT",
      advertisements: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}



export function loadAdvertisements(data) {
  axios.get(server + '/advertisements?page='+data.page)
  .then(function (response) {

    dispatcher.dispatch({
      type: "LOAD_ADVERTISEMENTS",
      advertisements: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function searchAdvertisements(data) {
  axios.get(server + '/advertisements?q='+data.query)
  .then(function (response) {

    dispatcher.dispatch({
      type: "SHOW_ADVERTISEMENTS",
      advertisements: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getAdvertisement(id) {
  axios.get(server + '/advertisement/' + id)
  .then(function (response) {
    console.log(response.data);
    dispatcher.dispatch({
      type: "SHOW_ADVERTISEMENT",
      advertisement: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getProfile(token) {
  axios.get(server + '/profile',  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
  .then(function (response) {
    dispatcher.dispatch({
      type: "SHOW_PROFILE",
      profile: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}


export function reloadTodos() {
  axios("https://talaikis.com/api/quotes/random/").then((response) => {
    console.log("got the data!", response);
    dispatcher.dispatch({type: "RECEIVE_TODOS", todos: [
      {
        id: 8484848484,
        text: response["data"]["author"],
        complete: false
      }
    ]});
  })
}
