import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { GoogleLogin } from "react-google-login";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#e13b20",
    borderRadius: "10px",
  },
};

class ModalBox extends React.Component {
  constructor() {
    super();
    this.state = {
      username: undefined,
      isLoggedIn: false,
    };
  }
    responseGoogle = (response) => {
      this.setState({
        username: response.profileObj.name
          ? response.profileObj.name
          : undefined,
        isLoggedIn: this.state.username !== undefined ? true : false,
      });



      
      console.log(this.state.username, response.profileObj.name);
      sessionStorage.setItem("loggedIn", this.state.isLoggedIn);
      console.log(sessionStorage);
    };
  

  render() {
    const { open } = this.props;
    return (
      <>
        <Modal isOpen={open} style={customStyles}>
          <div>
            <GoogleLogin
              clientId="266023099289-i7u6a3ar2imjgat2dad6o5t4qoe4faqn.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalBox;
