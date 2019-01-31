import dispatcher from "../dispatcher";
import axios from 'axios';
//const server='http://localhost:3000/api';
const server='http://sanatik.ir/api';
//const server='http://sanatik.ir:3000/api';

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

export function getCategories(id) {
  axios.get(server + '/categories?parent_id='+id)
  .then(function (response) {
    dispatcher.dispatch({
      type: "SHOW_CATEGORIES",
      categories: response.data.categories,
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

export function editAdvertisement(data) {
  console.log(data);
  axios.post(server + '/edit_advertisement', JSON.stringify(data), { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + data.token } })
  .then(function (response) {
    dispatcher.dispatch({
      type: "EDIT_ADVERTISEMENT",
      advertisement: response.data,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function createMessage(text, id ,token, room) {
  var data = {content: text, room_id: room}
  axios.post(server + '/new_message/'+id, JSON.stringify(data), { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
  .then(function (response) {
    if (response.data.message) {
      dispatcher.dispatch({
        type: "NEW_MESSAGE",
        message: response.data.message,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}


export function getMessages(id ,token, room, page) {
  axios.get(server + '/messages/'+id+'?room_id='+room+'&page='+page, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
  .then(function (response) {
    if (response.data.messages) {
      dispatcher.dispatch({
        type: "ROOM_MESSAGES",
        data: response.data,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
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

export function adminGroupedMessages(token) {
  axios.get(server + '/admin_grouped_messages', { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
  .then(function (response) {
    console.log(response);
    if (response.data.result) {
      dispatcher.dispatch({
        type: "ADMIN_GROUP_MESSAGES",
        data: response.data,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getRooms(id, token) {
  axios.get(server + '/rooms/'+id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
  .then(function (response) {
    if (response.data.result) {
      dispatcher.dispatch({
        type: "ROOMS",
        data: response.data,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function getUserRooms(id, token) {
  axios.get(server + '/user_advert_room/'+id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
  .then(function (response) {
    if (response.data.result) {
      dispatcher.dispatch({
        type: "ADVERT_ROOM",
        data: response.data,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function roomSeen(room_id, token) {
  if (room_id) {
    axios.get(server + '/seen/'+room_id, { headers: {'Content-Type': 'application/json', 'Authorization': "bearer " + token } })
    .then(function (response) {
      if (response.data.result) {
        dispatcher.dispatch({
          type: "SEEN",
          data: response.data,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
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
