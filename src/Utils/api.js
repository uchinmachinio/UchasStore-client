export const baseURL = "https://server.uchas.store";
//fetching user information if they are authenticated for user context,
//if logged in receive userinfo from server otherwise empty obj
export async function fetchUserDataIfAuthenticated() {
  try {
    const res = await fetch(`${baseURL}/user`, {
      credentials: "include",
    });
    if (res.ok) {
      const userData = await res.json();
      return userData;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
////////// PERSONAL DATA ///////////////////
//fetch personal-data of the user
export async function fetchPersonalData() {
  try {
    const res = await fetch(`${baseURL}/personal-data`, {
      credentials: "include",
    });

    if (res.ok) {
      const personalData = await res.json();
      return personalData;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

//update personal data of the user
export async function updatePersonalData(data) {
  try {
    const res = await fetch(`${baseURL}/personal-data`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      return "success";
    } else {
      return "could not update";
    }
  } catch (err) {
    console.log(err);
    return "something went wrong";
  }
}
///////////////////////  PRODUCTS  ////////////////////////////////////
//add new product
export async function uploadNewProduct(data) {
  try {
    const res = await fetch(`${baseURL}/products`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (res.ok) {
      return "success";
    } else {
      return "no response from server";
    }
  } catch (err) {
    console.log(err);
    return "something went wrong";
  }
}
//////get products by page
export async function getProducts(page, cat = "", searchText = "") {
  try {
    const res = await fetch(
      `${baseURL}/products?page=${page}&category=${cat}&searchtext=${searchText}`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}
////// fetch single product
export async function getSingleProduct(id) {
  try {
    const res = await fetch(`${baseURL}/products/${id}`);

    if (res.ok) {
      const product = await res.json();
      return product;
    }
  } catch (err) {
    console.log(err);
  }
}
////// delete single product
export async function deleteSingleProduct(id) {
  try {
    const res = await fetch(`${baseURL}/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
}
/////// AUTH ////////////////////////////////////////////////
//login
export async function logIn(username, password) {
  try {
    const res = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();
    return { response: res, data }; //to get both response status and data
  } catch (err) {
    console.log(err);
  }
}
/// reister
export async function register(username, password, email) {
  try {
    const res = await fetch(`${baseURL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();
    return { response: res, data };
  } catch (err) {
    console.log(err);
  }
}
/////// log out
export async function logOut() {
  try {
    const res = await fetch(`${baseURL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
}
////// CART //////////////////////////////
//get cart
export async function getCart() {
  try {
    const res = await fetch(`${baseURL}/cart`, {
      credentials: "include",
    });

    if (res.ok) {
      const cart = res.json();
      return cart;
    }
  } catch (err) {
    console.log(err);
  }
}
///// save cart
export async function saveCart(items) {
  try {
    const res = await fetch(`${baseURL}/cart`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(items),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

/////////////// UPLOADS /////////////
//// get all uploads
export async function getUploads() {
  try {
    const res = await fetch(`${baseURL}/uploads`, { credentials: "include" });
    if (res.ok) {
      const uploads = res.json();
      return uploads;
    }
  } catch (err) {
    console.log(err);
  }
}

/// ORDERS
/// get all orders

export async function getOrders() {
  try {
    const res = await fetch(`${baseURL}/orders`, { credentials: "include" });
    if (res.ok) {
      const orders = res.json();
      return orders;
    }
  } catch (err) {
    console.log(err);
  }
}
