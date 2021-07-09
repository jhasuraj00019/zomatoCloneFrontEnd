import React from "react";
import "./filter.css";
// import { withRouter } from "react-router-dom";
import Restaurant from "./Restraunts";
import axios from "axios";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      filteredRestaurants: sessionStorage.getItem('restaurants'),
      mealtype: undefined,
      city: undefined,
      cuisine: undefined,
      lcost: undefined,
      hcost: undefined,
      sort: 1,
    };
  }

  componentDidMount() {
    // const {location, mealtype} = this.props
    // this.setState({filteredRestaurants: this.props.restaurants})

    this.handleSortChange = (sort) => {
      const filteredObj = {
        mealtype: this.props.mealtype,
        city: this.props.city,
        sort: sort,
      };
      //calling the filter API for the filtered restaurants
      axios({
        method: "POST",
        url: "https://zomato-clone-backend2.herokuapp.com/filter",
        headers: { "Content-type": "application/json" },
        data: filteredObj,
      }).then((response) => {
        this.setState({
          filteredRestaurants: response.data.restaurant,
          mealtype: this.props.mealtype,
          city: this.props.location,
          sort: sort,
        });
      });
    };
  }
  render() {
    console.log("filteredRestraunts", this.state.filteredRestaurants)
    // this.setState({filteredRestaurants: this.props.restaurants})
    return (
      <React.Fragment>
        <Restaurant restaurants={this.state.filteredRestaurants} />
        {/* <div className="filter">
          <aside className="side">
            <h5>Filters</h5>
            <label for="location">Select Location</label>
            <br />
            <select id="location" className="sites" name="">
              <option value="0">--Location--</option>
              <option value="1">Dadar</option>
              <option value="2">Station Road</option>
              <option value="3">Navi</option>
              <option value="4">Other</option>
            </select>
            <br />

            <h6>Cuisines</h6>
            <input type="checkbox" name="" value="North Indian" id="NI" />
            <label for="NI">North Indian</label>
            <br />

            <input type="checkbox" name="" value="North Indian" id="SI" />
            <label for="SI">South Indian</label>
            <br />

            <input type="checkbox" name="" value="North Indian" id="chini" />
            <label for="chini">Chinese</label>
            <br />

            <input type="checkbox" name="" value="North Indian" id="ff" />
            <label for="ff">Fast Food</label>
            <br />

            <input type="checkbox" name="" value="North Indian" id="sf" />
            <label for="sf">Street Food</label>
            <br />

            <h6>Cost For Two</h6>
            <input type="radio" name="cost" value="500" />
            <label for="500">Less than 500</label>
            <br />

            <input type="radio" name="cost" value="less than 1000" />
            <label for="f-thou">500 to 1000</label>
            <br />

            <input type="radio" name="cost" value="upto 1500" />
            <label for="thou-fifteen">1000 to 500</label>
            <br />

            <input type="radio" name="cost" value="upto 2000" />
            <label for="fifteen-2thou">1500 to 2000</label>
            <br />

            <input type="radio" name="cost" value="over 2000" />
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
        </div> */}
      </React.Fragment>
    );
  }
}

export default Filter;
