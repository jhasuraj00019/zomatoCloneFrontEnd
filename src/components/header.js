import React from "react";
import "../components/page2/filter.css";
// import ModalBox from "./loginModal";
import Modal from "react-modal";
import { GoogleLogin } from "react-google-login";
import { withRouter } from "react-router-dom";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    marginRight: "33%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(221 204 172)",
    borderRadius: "10px",
    textAlign: "center",
    // width: "38%",
  },
};
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      isLoggedIn: false,
      signupFormOpens: false,
      loginFormOpen: false,
      username: undefined,
      createAccountInfo: {},
      loginInfo: {},
      // cartModal: false,
      // cartItems: sessionStorage.getItem("cartItems") ? JSON.parse(sessionStorage.getItem("cartItems")) : undefined,
    };
  }

  componentDidMount() {
    if (
      sessionStorage.getItem("fullName") &&
      sessionStorage.getItem("isLoggedIn")
    ) {
      let user = sessionStorage.getItem("fullName");
      let loggedIn = sessionStorage.getItem("isLoggedIn");
      this.setState({ username: user, isLoggedIn: loggedIn });
    }
  }
  modal = (state, value) => {
    this.setState({ [state]: value });
  };

  responseGoogle = (response) => {
    // sessionStorage.setItem("username", );
    console.log("googleResponse>>>>>>>>>>", response);
    this.setState({
      username: response.profileObj.name,
      isLoggedIn: true,
      modalIsOpen: false,
    });

    sessionStorage.setItem("fullName", response.profileObj.name);
    sessionStorage.setItem("isLoggedIn", this.state.isLoggedIn);
    sessionStorage.setItem("email", response.profileObj.email);
  };

  createAccountDetails = (event, state) => {
    const { createAccountInfo } = this.state;
    console.log(typeof state);
    // if (state === "firstName" || state === "lastName") {
    //   // let correct = event.target.value;
    //   // correct = correct.split('')
    //   // correct[0] = correct[0].toUpperCase();
    //   // correct = correct.join("");
    //   // createAccountInfo[state] = correct;
    //   // this.setState({ createAccountInfo: createAccountInfo });
    // } else {
    // }
    createAccountInfo[state] = event.target.value;
    this.setState({ createAccountInfo: createAccountInfo });
  };

  makeAccount = (event) => {
    const { createAccountInfo } = this.state;

    axios({
      method: "POST",
      url: "http://localhost:2022/signup",
      headers: { "Content-Type": "application/json" },
      data: createAccountInfo,
    });
    event.preventDefault();
  };

  checkCredentials = () => {
    let checkingCredentials;
    const { loginInfo } = this.state;

    axios({
      method: "GET",
      url: `http://localhost:2022/getUserByEmail/${loginInfo.email}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        checkingCredentials = response.data.users[0];
        if (checkingCredentials) {
          if (
            loginInfo.email === checkingCredentials.email &&
            loginInfo.password === checkingCredentials.password
          ) {
            this.setState({
              isLoggedIn: true,
              username: checkingCredentials.firstName,
              loginFormOpen: false,
            });
            sessionStorage.setItem("userName", checkingCredentials.firstName);
            sessionStorage.setItem("isLoggedIn", this.state.isLoggedIn);

            sessionStorage.setItem(
              "fullName",
              `${checkingCredentials.firstName} ${checkingCredentials.lastName}`
            );

            sessionStorage.setItem(
              "mobileNumber",
              checkingCredentials.mobileNumber
            );

            sessionStorage.setItem("email", checkingCredentials.email);
            console.log("user logged in");
            // this.modal("loginFormOpen", false);
          } else {
            alert("Wrong Email or Passowrd!");
          }
        } else {
          {
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.tKc2nWoC-ZSBS16lydM5gQAAAA%26pid%3DApi&f=1"
              style={{ height: "80px", width: "80px" }}
            />;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loginChange = (event, state) => {
    const { loginInfo } = this.state;
    loginInfo[state] = event.target.value;
    this.setState({ loginInfo: loginInfo });
  };

  handleLogOut = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("mobileNumber");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("fullName");
    this.setState({ isLoggedIn: false, username: undefined });
  };
  render() {
    const {
      modalIsOpen,
      username,
      isLoggedIn,
      loginFormOpen,
      signupFormOpens,
      // cartModal,
    } = this.state;
    return (
      <div>
        <header>
          <div className="header">
            <div className="logo" onClick={() => this.props.history.push("/")}>
              <p>
                <b>e!</b>
              </p>
            </div>
            {isLoggedIn ? (
              <>
                {/* <span><img src=""/></span> */}
                <div className="accountContainerHeader">
                  {/* <span className="cartContainer">
                    <i className="fa fa-shopping-cart"></i>
                  </span> */}
                  {/* <div id="cartItemCount">0</div> */}
                  <span id="login" className="account">
                    <a href="#">{username}</a>
                  </span>
                  <span id="cAcc" className="account">
                    <a onClick={this.handleLogOut}>Sign-Out</a>
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="accountContainerHeader">
                  <span id="login" className="account">
                    <a onClick={() => this.modal("modalIsOpen", true)}>Login</a>
                  </span>
                  <span id="cAcc" className="account">
                    <a onClick={() => this.modal("signupFormOpens", true)}>
                      Create an account
                    </a>
                  </span>
                </div>
              </>
            )}
          </div>
        </header>

        <div>
          <Modal isOpen={modalIsOpen} style={customStyles}>
            <button
              className="closeModal"
              onClick={() => this.modal("modalIsOpen", false)}
            >
              &#10006;
            </button>
            <h2>Login</h2>
            <div className="loginSiteBox">
              <GoogleLogin
                clientId="266023099289-i7u6a3ar2imjgat2dad6o5t4qoe4faqn.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
                className="googleLogin"
              />

              <button
                className="loginWithCredentials"
                onClick={() => {
                  this.modal("loginFormOpen", true);
                  this.modal("modalIsOpen", false);
                }}
              >
                Login with Your Credentials
              </button>
            </div>
            <div>
              <h4>
                Don't have an accout?{" "}
                <span
                  id="signUpOpt"
                  onClick={() => {
                    this.modal("modalIsOpen", false);
                    this.modal("signupFormOpens", true);
                  }}
                >
                  Sign-Up
                </span>
              </h4>
            </div>
          </Modal>
          <Modal isOpen={loginFormOpen} style={customStyles}>
            <button
              className="closeModal"
              onClick={() => this.modal("loginFormOpen", false)}
            >
              &#10006;
            </button>
            <div>
              <div class="lable">Email</div>
              <input
                type="email"
                class="email"
                onChange={(event) => this.loginChange(event, "email")}
                placeholder="Enter your email"
              />
              <br />
              <div class="lable">Password</div>
              <input
                type="password"
                placeholder="password"
                class="password"
                onChange={(event) => this.loginChange(event, "password")}
              />

              <div class="loginSubmitBtn">
                <button type="submit" onClick={this.checkCredentials}>
                  Submit
                </button>
              </div>
            </div>
          </Modal>
          <Modal isOpen={signupFormOpens} style={customStyles}>
            <button
              className="closeModal"
              onClick={() => this.modal("signupFormOpens", false)}
            >
              &#10006;
            </button>
            <div className="CreatAcc">
              <h3>Create an Account</h3>
            </div>
            <div>
              <form class="formOutline">
                <div id="imgUpload">
                  <div className="lable profilePic">
                    <img src="data:image/jpeg;base64,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" />
                  </div>
                  <label for="uploadImg" id="uploadLable">
                    Upload image
                  </label>
                  <br />
                  <input
                    id="uploadImg"
                    type="file"
                    name="userImg"
                    accept="image/*"
                    hidden
                  />
                </div>

                <div class="lable fnLable">First name</div>
                <input
                  type="text"
                  class="firstName"
                  placeholder="firstname"
                  onChange={(event) =>
                    this.createAccountDetails(event, "firstName")
                  }
                />
                <div class="lable lnLable">Last Name</div>
                <input
                  type="text"
                  class="lastName"
                  placeholder="lastname"
                  onChange={(event) =>
                    this.createAccountDetails(event, "lastName")
                  }
                />
                <br />
                <div class="lable">Mobile Number:</div>
                <input
                  type="tel"
                  class="mobile"
                  placeholder="Mobile No."
                  pattern="[0-9]{10}"
                  onChange={(event) =>
                    this.createAccountDetails(event, "mobileNumber")
                  }
                />
                <div class="lable">Email</div>
                <input
                  type="email"
                  class="email"
                  placeholder="Enter your email"
                  onChange={(event) =>
                    this.createAccountDetails(event, "email")
                  }
                />
                <br />
                <div class="lable">Password</div>
                <input
                  type="password"
                  placeholder="password"
                  class="password"
                  onChange={(event) =>
                    this.createAccountDetails(event, "password")
                  }
                />
                <br />

                <div class="loginSubmitBtn">
                  <div class="loginSubmitBtn">
                    <input type="submit" value="Submit" className="submitBtn" />
                  </div>
                </div>
              </form>
            </div>
          </Modal>
          {/* <Modal isOpen={cartModal} style={customStyles}>
          <button
              className="closeModal"
              onClick={() => this.modal("signupFormOpens", false)}
            >
              &#10006;
            </button>
            cartModal.map() 
            
          </Modal> */}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
