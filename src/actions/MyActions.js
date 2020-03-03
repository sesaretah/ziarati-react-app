import dispatcher from "../dispatcher";
import axios from 'axios';
//const server='http://localhost:3000/api';
const server='http://95.156.255.115/api';
//const server='http://sanatik.ir:3000/api';

export function getCategory(id) {
  axios.get(server + '/category/'+id)
  .then(function (response) {
    dispatcher.dispatch({
      type: "SHOW_CATEGORY",
      categories: response.data.category,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}



export function updateFCM(token, uuid) {
  window.FirebasePlugin.getToken(function (fcm_token) {
    console.log(fcm_token);
    axios.get(server + '/update_token?fcm_token='+fcm_token + '&device_uuid='+uuid, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
    .then(function (response) {
      console.log(response);
      if (response.data.result) {
        dispatcher.dispatch({
          type: "TOKEN_UPDATED",
          data: response.data,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  });
}

export function groupedMessages(token) {
  axios.get(server + '/grouped_messages', { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
  .then(function (response) {
    if (response.data.result) {
      dispatcher.dispatch({
        type: "GROUP_MESSAGES",
        data: response.data,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}




export function getAllUnseens(token) {
  if (token) {
    axios.get(server + '/all_unseens', { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
    .then(function (response) {
      if (response.data.result) {
        dispatcher.dispatch({
          type: "ALL_UNSEENS",
          data: response.data,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
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

export function getBlogs(data) {
  axios.get(server + '/blogs?page='+data.page)
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SHOW_BLOGS",
      blogs: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getTourPackages(data) {
  axios.get(server + '/tour_packages?page='+data.page)
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SHOW_TOURPACKAGES",
      tourPackages: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getTour(id) {
  axios.get(server + '/tour/'+id)
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SHOW_TOUR",
      tour: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getBlog(id) {
  axios.get(server + '/blog/'+id)
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SHOW_BLOG",
      blog: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}


export function getTourPackage(id) {
  axios.get(server + '/tour_package/' + id)
  .then(function (response) {
    dispatcher.dispatch({
      type: "SHOW_TOURPACKAGE",
      tourPackage: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function createReservation(data) {
axios.post(server + '/reservation', data,  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + data.token }} )
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "CREATE_RESERVATION",
      result: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getReservations(id, token) {
axios.get(server + '/tour_reservations/'+id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }} )
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "ALL_RESERVATIONS",
      result: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getVerifiedReservations(id, token) {
axios.get(server + '/verified_reservations/'+id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }} )
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "ALL_RESERVATIONS",
      result: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getMyReservations(token) {
axios.get(server + '/my_reservations', { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }} )
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "MY_RESERVATIONS",
      result: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}



export function getMyPins(token) {
  axios.get(server + '/my_pins',  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
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



export function makePin(id, device, token) {
  axios.get(server + '/make_pin/'+id+'?device_id='+device,  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "CREATE_PIN",
      pin: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function unPin(id, device, token) {
  axios.get(server + '/unpin/'+id+'?device_id='+device,  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    if (response.data.result){
      dispatcher.dispatch({
        type: "UNPINNED",
        pin: response.data,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function pinned(id, device, token) {
  axios.get(server + '/pinned/'+id+'?device_id='+device,  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    //console.log(response);
    if (response.data.result){
      dispatcher.dispatch({
        type: "CREATE_PIN",
        pin: response.data,
      });
    }

  })
  .catch(function (error) {
    console.log(error);
  });
}

export function liked(id, device, token) {
  axios.get(server + '/liked/'+id+'?device_id='+device,  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    if (response.data.result){
      dispatcher.dispatch({
        type: "LIKE",
        likes: response.data.likes,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function like(id, device, token) {
  axios.get(server + '/like/'+id+'?device_id='+device,  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    if (response.data.result){
      dispatcher.dispatch({
        type: "LIKE",
        likes: response.data.likes,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function dislike(id, device, token) {
  axios.get(server + '/dislike/'+id+'?device_id='+device,  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    if (response.data.result){
      dispatcher.dispatch({
        type: "DISLIKE",
        likes: response.data.likes,
      });
    }
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



export function deleteReservation(passenger_id, tour_id ,token) {
  axios.get(server + '/delete_reservation/'+ tour_id + '?passenger_id=' + passenger_id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "ALL_RESERVATIONS",
      result: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function verfiyReservation(tour_id ,token) {
  axios.get(server + '/verify_reservation/'+ tour_id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "RESERVATIONS_VERIFIED",
      result: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}



export function deletePhoto(id, token) {
  axios.get(server + '/delete_photo/' + id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token }})
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "DELETE_PHOTO",
      photos: response.data,
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

export function getAdvertisement(id, token) {
  axios.get(server + '/advertisement/' + id,  { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
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
  console.log(token);
  axios.get(server + '/profile',  { headers: {'Authorization': 'Bearer ' + token } })
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SHOW_PROFILE",
      profile: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getProvinces(token) {
  console.log(token);
  axios.get(server + '/provinces')
  .then(function (response) {
    console.log(response);
    dispatcher.dispatch({
      type: "SHOW_PROVINCES",
      provinces: response.data.provinces,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}
