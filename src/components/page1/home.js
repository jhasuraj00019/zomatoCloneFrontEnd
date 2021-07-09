import React from "react";
import Wallpaper from "./pagetop";
import QuickSearch from "./quicksearch";
import axios from "axios";

class Home extends React.Component {
  navigate = () => {
    this.props.history.push("/places");
    console.log(this.props.history);
  };

  constructor() {
    super();
    this.state = {
      locations: [],
      mealTypes: [],
    };
  }

  componentDidMount() {
    sessionStorage.removeItem("locationId");
    //Api  Calls are made through the "Axios" package;

    //1.Wallpaper API calls
    axios({
      method: "GET",
      url: "https://zomato-clone-backend2.herokuapp.com/locations",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => this.setState({ locations: response.data.locations }))
      .catch();

    //2. QuickSearch API Call

    axios({
      method: "GET",
      url: "https://zomato-clone-backend2.herokuapp.com/mealtypes",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => this.setState({ mealTypes: response.data.mealtypes }))
      .catch();
  }

  render() {
    const { locations, mealTypes } = this.state;
    return (
      <React.Fragment>
        <Wallpaper ddLocations={locations} />
        <QuickSearch quicksearch={mealTypes} />

        <button onClick={this.navigate}>Navigate</button>
      </React.Fragment>
    );
  }
}

export default Home;
