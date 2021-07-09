import React from "react";
import Header from "../header";
import Restaurant from "./Restraunts";
// import Filter from "./filter";
import queryString from "query-string";
import axios from "axios";

class Places extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      city: undefined,
      mealtype: undefined,
      cuisine: [],
      lcost: undefined,
      hcost: undefined,
      sort: 1,
      locality: undefined,
    };
  }

  componentDidMount() {
    //Capturing values from the query String

    const qs = queryString.parse(this.props.location.search); // makes json out of the query string passed
    const { location: qsLocation, mealtype: qsMealtype } = qs;

    console.log("query string>>>>>>>>>>>>>", qs);

    //filter api call
    const obj = {
      mealtype: qsMealtype,
      city: qsLocation,
    };

    axios({
      method: "POST",
      url: "https://zomato-clone-backend2.herokuapp.com/filter",
      headers: { "Content-Type": "application/json" },
      data: obj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurant,
          city: qsLocation,
          mealtype: qsMealtype,
        });
      })
      .catch((err) => console.log(err));
  }
  handleCostChange = (lcost, hcost) => {
    const { sort, mealtype, city, cuisine, locality } = this.state;

    const obj = {
      sort: sort,
      mealtype: mealtype,
      city: city,
      lcost: lcost,
      hcost: hcost,
      locality: locality,
      // cuisine: cuisine.length === 0 ? undefined : cuisine,
    };

    axios({
      method: "POST",
      url: "https://zomato-clone-backend2.herokuapp.com/filter",
      headers: { "Content-type": "application/json" },
      data: obj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurant,
          lcost: lcost,
          hcost: hcost,
        });
      })
      .catch((err) => console.log(err));
  };

  handleCuisineChange = (cuisineId) => {
    const { sort, mealtype, city, cuisine, lcost, hcost, locality } =
      this.state;

    if (cuisine.indexOf(cuisineId) === -1) {
      cuisine.push(cuisineId);
    } else {
      let index = cuisine.indexOf(cuisineId);
      cuisine.splice(index, 1);
    }

    const obj = {
      sort: sort,
      mealtype: mealtype,
      city: city,
      cuisine: cuisine.length == 0 ? undefined : cuisineId,
      lcost: lcost,
      hcost: hcost,
      locality: locality,
    };

    axios({
      method: "POST",
      url: "https://zomato-clone-backend2.herokuapp.com/filter",
      headers: { "Content-Type": "application/json" },
      data: obj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurant,
          cuisine: cuisine,
        });
      })
      .catch((err) => console.log(err));
  };

  handleSortChange = (sort) => {
    const { mealtype, city, cuisine, lcost, hcost, locality } = this.state;
    const obj = {
      sort: sort,
      mealtype: mealtype,
      city: city,
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      lcost: lcost,
      hcost: hcost,
      locality: locality,
    };

    axios({
      method: "POST",
      url: "https://zomato-clone-backend2.herokuapp.com/filter",
      headers: { "Content-type": "application/json" },
      data: obj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurant,
          sort: sort,
        });
      })
      .catch((err) => console.log(err));
  };

  handleLocalityChange = (event) => {
    const locality = event.target.value;
    const { mealtype, city, cuisine, lcost, hcost, sort } = this.state;
    const obj = {
      sort: sort,
      mealtype: mealtype,
      city: city,
      cuisine: cuisine.length === 0 ? undefined : cuisine,
      lcost: lcost,
      hcost: hcost,
      locality: locality,
    };

    axios({
      method: "POST",
      url: "https://zomato-clone-backend2.herokuapp.com/filter",
      headers: { "Content-type": "application/json" },
      data: obj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.restaurant,
          locality: locality,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log("this.state>>>>", this.state);
    const { restaurants } = this.state;
    return (
      <React.Fragment>
        <div>
          <Header />
          <main>
            <div className="bcontainer">
              <div className="heading">
                <h2>Restaurants</h2>
              </div>

              {/* <Restaurant restaurants={restaurants} /> */}

              <div className="filter">
                <div id="filterHeading">
                  <h3>Filter/Sort</h3>
                  <h3 id="dropdownSymbol">&#9660;</h3>
                </div>
                <aside className="side">
                  <h5>Filters</h5>

                  <br />
                  <label for="location">Select Location</label>
                  <br />
                  <select
                    id="location"
                    className="sites"
                    onChange={this.handleLocalityChange}
                  >
                    <option value="0">--Locality--</option>
                    {restaurants.map((item) => {
                      return <option>{item.locality}</option>;
                    })}
                  </select>
                  <br />
                  <h6>Cuisines</h6>
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="North Indian"
                    id="NI"
                    onChange={() => this.handleCuisineChange("North Indian")}
                  />
                  <label for="NI">North Indian</label>
                  <br />
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="North Indian"
                    id="SI"
                    onChange={() => this.handleCuisineChange("South Indian")}
                  />
                  <label for="SI">South Indian</label>
                  <br />
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="North Indian"
                    id="chini"
                    onChange={() => this.handleCuisineChange("Chinese")}
                  />
                  <label for="chini">Chinese</label>
                  <br />
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="North Indian"
                    id="ff"
                    onChange={() => this.handleCuisineChange("Fast Food")}
                  />
                  <label for="ff">Fast Food</label>
                  <br />
                  <input
                    type="checkbox"
                    name="cuisine"
                    value="North Indian"
                    id="sf"
                    onChange={() => this.handleCuisineChange("Street Food")}
                  />
                  <label for="sf">Street Food</label>
                  <br />
                  <h6>Cost For Two</h6>
                  <input
                    type="radio"
                    name="cost"
                    value="500"
                    onChange={() => this.handleCostChange(1, 500)}
                  />
                  <label for="500">Less than 500</label>
                  <br />
                  <input
                    type="radio"
                    name="cost"
                    value="less than 1000"
                    onChange={() => this.handleCostChange(500, 1000)}
                  />
                  <label for="f-thou">500 to 1000</label>
                  <br />
                  <input
                    type="radio"
                    name="cost"
                    value="upto 1500"
                    onChange={() => this.handleCostChange(1000, 1500)}
                  />
                  <label for="thou-fifteen">1000 to 1500</label>
                  <br />
                  <input
                    type="radio"
                    name="cost"
                    value="upto 2000"
                    onChange={() => this.handleCostChange(1500, 2000)}
                  />
                  <label for="fifteen-2thou">1500 to 2000</label>
                  <br />
                  <input
                    type="radio"
                    name="cost"
                    value="over 2000"
                    onChange={() => this.handleCostChange(2000, 10000)}
                  />
                  <label for="Over2thou">2000+</label>
                  <br />
                  <h4>Sort</h4>
                  <input
                    id="Dtohigh"
                    type="radio"
                    name="sort"
                    value="Dtohigh"
                    onChange={() => this.handleSortChange(1)}
                  />
                  <label for="D-Up">Price low to high</label>
                  <br />
                  <input
                    type="radio"
                    name="sort"
                    value="Htolow"
                    onChange={() => this.handleSortChange(-1)}
                  />
                  <label for="Htolow" id="Htolow">
                    Price high to low
                  </label>
                  <br />
                </aside>
              </div>
              <Restaurant restaurants={restaurants} />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default Places;
