import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "./page3.css";
import Header from "../header";
import queryString from "query-string";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    background: "rgb(255 255 255)",
    // backgroundColor: "rgb(112, 51, 56)",
    // backgroundColor: "#6e6563",
    // backgroundColor: "rgb(84 43 64)",
    borderRadius: "10px",
    overflow: "hidden",
    // color: "white",
  },

  // content2: {
  //   top: "50%",
  //   left: "50%",
  //   right: "auto",
  //   bottom: "auto",
  //   marginRight: "-50%",
  //   transform: "translate(-50%, -50%)",
  //   backgroundColor: "#6e6563",
  //   borderRadius: "10px",
  // },
};

class details extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      restId: "",
      galleryModalIsOpen: false,
      placeOrderModal: false,
      addressModalIsOpen: false,
      menuItems: [],
      subTotal: 0,
      order: [],
      name: undefined,
      mobileNumber: undefined,
      address: undefined,
      email: undefined,
      cartItems: [],
      totalItems: 0,
      cartOpen: false,
    };
  }

  componentDidMount() {
    const user = sessionStorage.getItem("fullName");
    const mobileNumber = sessionStorage.getItem("mobileNumber");
    const email = sessionStorage.getItem("email");

    if (user) {
      this.setState({ name: user });
    }
    if (mobileNumber) {
      this.setState({ mobileNumber: mobileNumber });
    }
    if (email) {
      this.setState({ email: email });
    }

    const qs = queryString.parse(this.props.location.search);
    const restId = qs.restaurant;
    this.setState({ restId: restId });
    console.log(restId);

    axios({
      method: "GET",
      url: `https://zomato-clone-backend2.herokuapp.com/restaurantById/${restId}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) =>
        this.setState({
          restaurant: response.data.restaurant[0],
        })
      )
      .catch((err) => console.log(err));
  }

  handleModal = (state, value) => {
    const { menuItems, subTotal } = this.state;
    this.setState({ [state]: value });
    if (state === "placeOrderModal" && value === true) {
      this.setState({ menuItems: this.state.restaurant.menu });
      console.log("menuItems", this.state.menuItems);
    }
    if (state === "addressModalIsOpen" && value === true && subTotal !== 0) {
      const order = menuItems.filter((item) => item.qty !== 0);
      this.setState({ order: order });
    }
  };

  handleChange = (event, state) => {
    this.setState({ [state]: event.target.value });
  };

  isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  isObj = (val) => {
    return typeof val === "object";
  };

  stringifyValue = (val) => {
    if (this.isObj(val) && !this.isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  };

  buildForm = ({ action, params }) => {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", this.stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  };

  post = (details) => {
    const form = this.buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  getData = (data) => {
    return fetch(`https://zomato-clone-backend2.herokuapp.com/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  payment = () => {
    const { subTotal, email, name, restId, order } = this.state;
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      //Payment API
      this.getData({ amount: subTotal, email: email }).then((response) => {
        var information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: response,
        };
        this.post(information);
      });
    } else {
      alert("Email is not valid");
    }

    const toUpdate = {
      RestaurantId: restId,
      userId: name,
      items: order,
      amount: subTotal,
    };

    axios({
      method: "POST",
      url: "https://zomato-clone-backend2.herokuapp.com/updateOrder",
      headers: { "Content-Type": "application/json" },
      data: toUpdate,
    });
  };

  addItems = (index, operationType) => {
    let { cartItems, totalItems } = this.state;
    totalItems = 0;
    let total = 0;
    const menuItems = [...this.state.menuItems];
    const item = menuItems[index];
    if (operationType == "add") {
      item.qty++;
    } else {
      item.qty--;
    }
    menuItems[index] = item;
    menuItems.map((item) => {
      totalItems += item.qty;
      total += item.qty * item.food_price;
    });

    cartItems = menuItems.filter((item) => item.qty != 0);
    console.log("cartItems", cartItems);

    this.setState({
      menuItems: menuItems,
      subTotal: total,
      cartItems: cartItems,
      totalItems: totalItems,
    });
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  render() {
    console.log("Name>>>>>>>>>>>", this.state.name);
    const {
      restaurant,
      galleryModalIsOpen,
      placeOrderModal,
      addressModalIsOpen,
      menuItems,
      subTotal,
      cartItems,
      totalItems,
      cartOpen,
    } = this.state;

    let toShow = cartOpen ? cartItems : menuItems;

    return (
      <div>
        <Header />
        <div class="content">
          <div class="wallpaper">
            <img
              src={restaurant && restaurant.thumb ? restaurant.thumb : null}
            />
            <button
              class="gallerybtn"
              onClick={() => this.handleModal("galleryModalIsOpen", true)}
            >
              Click to see image Gallery
            </button>
          </div>
          <h1>{restaurant && restaurant.name ? restaurant.name : null}</h1>
          <button
            class="placeOrderbtn"
            onClick={() => this.handleModal("placeOrderModal", true)}
          >
            Place Online Order
          </button>
        </div>

        <div className="tabBlock">
          <Tabs className="tabs">
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Contact</Tab>
            </TabList>

            <TabPanel>
              <>
                <h3>About</h3>
                <h5>Cuisine</h5>
                <h4>
                  {restaurant && restaurant.Cuisine
                    ? restaurant.Cuisine.map((item) => ` ` + item)
                    : null}
                </h4>
              </>
            </TabPanel>
            <TabPanel>
              <h3>Phone Number</h3>
              <p>883939390</p>

              <h3>{restaurant && restaurant.name ? restaurant.name : null}</h3>
              <p>
                {restaurant && restaurant.address ? restaurant.address : null}
              </p>
            </TabPanel>
          </Tabs>
        </div>

        <Modal isOpen={galleryModalIsOpen} style={customStyles}>
          <div className="itemContainer">
            <button
              className="closeModal"
              onClick={() => this.handleModal("galleryModalIsOpen", false)}
            >
              &#10006;
            </button>
            <div>
              <Carousel showThumbs={false}>
                {restaurant && restaurant.images
                  ? restaurant.images.map((images) => {
                      return (
                        <div>
                          <img src={images} height="20%" width="20%" />
                        </div>
                      );
                    })
                  : null}
              </Carousel>
            </div>
          </div>
        </Modal>

        <Modal isOpen={placeOrderModal} style={customStyles}>
          <div className="itemContainer">
            <button
              className="closeModal"
              onClick={() => this.handleModal("placeOrderModal", false)}
            >
              &#10006;
            </button>
            <div id="modalTop">
              <div id="cart">
                <span
                  id="cartItems"
                  onClick={() =>
                    this.setState({ cartOpen: cartOpen ? false : true })
                  }
                >
                  {cartOpen ? `Menu` : "Cart"}
                </span>
                {cartOpen ? (
                  <span id="back">&larr;</span>
                ) : (
                  <span id="cartQty"> {totalItems}</span>
                )}
              </div>
              <h1>{restaurant && restaurant.name ? restaurant.name : null}</h1>
            </div>
            <div className="menuContainer">
              {toShow.length > 0 ? (
                toShow.map((menu, index) => {
                  return (
                    <>
                      <div className="placeOrder">
                        <div className="itemInfo">
                          <img
                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ykGTylT_JhcI7Mn6kB-nIgHaFE%26pid%3DApi&f=1"
                            height="27px"
                            width="27px"
                          />

                          {cartOpen ? (
                            <h2>
                              {menu.food_name} &#10799; {menu.qty}
                            </h2>
                          ) : (
                            <h2>{menu.food_name}</h2>
                          )}
                          <b>Rs.{menu.food_price}</b>
                          <p>{menu.food_description}</p>
                        </div>
                        <div className="itemBtns">
                          <img src={menu.food_image} />
                          <br />
                          {menu.qty === 0 ? (
                            <div id="firstBtnContainer">
                              <button
                                className="firstAddBtn"
                                onClick={() => this.addItems(index, "add")}
                              >
                                Add
                              </button>
                            </div>
                          ) : cartOpen ? null : (
                            <div id="btns">
                              <button
                                className="addBtn"
                                onClick={() => this.addItems(index, "subtract")}
                              >
                                &#8722;
                              </button>
                              <div className="itemsToOrder">{menu.qty}</div>
                              <button
                                className="minusBtn"
                                onClick={() => this.addItems(index, "add")}
                              >
                                &#43;
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <hr id="itemhr"/> */}
                    </>
                  );
                })
              ) : (
                <>
                  <div className="noItems">No items found</div>
                </>
              )}
            </div>
            {}
          </div>
          <div className="total">
            <h2 id="subTotal">Subtotal: {subTotal}</h2>
            <button
              id="payBtn"
              disabled={!subTotal}
              onClick={() => {
                this.handleModal("addressModalIsOpen", true);
                this.handleModal("placeOrderModal", false);
              }}
            >
              Pay Now
            </button>
          </div>
        </Modal>

        <Modal isOpen={addressModalIsOpen} style={customStyles}>
          <div className="itemContainer">
            <button
              className="closeModal"
              onClick={() => this.handleModal("addressModalIsOpen", false)}
            >
              &#10006;
            </button>
            <div
              id="return"
              onClick={() => {
                this.setState({
                  addressModalIsOpen: false,
                  placeOrderModal: true,
                });
              }}
            >
              {/* &larr; */}
              &larr; Go back
            </div>
            <br />
            <h2 className="restName">
              {restaurant && restaurant.name ? restaurant.name : null}
            </h2>
            {/* <div>
            <span
              class="glyphicon glyphicon-shopping-cart"
              style="font-size:36px"
            ></span>
          </div> */}
            <div className="lables">Name</div>
            <input
              className="addressModalInput"
              type="text"
              placeholder="Enter your Name"
              value={sessionStorage.getItem("fullName")}
              onChange={(event) => this.handleChange(event, "name")}
            />

            <div className="lables">Email</div>
            <input
              className="addressModalInput"
              type="tel"
              placeholder="Enter your Email"
              value={sessionStorage.getItem("email")}
              onChange={(event) => this.handleChange(event, "email")}
            />
            <div className="lables">Mobile Number</div>
            <input
              className="addressModalInput"
              type="tel"
              pattern="[0-9]{3}[0-9]{2}[0-9]{3}"
              value={sessionStorage.getItem("mobileNumber")}
              placeholder="Enter your Mobile Number"
              onChange={(event) => this.handleChange(event, "mobileNumber")}
            />
            <div className="lables">Address</div>
            <textarea
              className="addressModalInput addressField"
              type="text"
              placeholder="Enter your Address"
              onChange={(event) => this.handleChange(event, "address")}
            />
            <br />
          </div>
          <div className="amount">
            <div id="money">Amount: {subTotal}</div>
            <button className="proceedBtn" onClick={this.payment}>
              Proceed
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default details;
