import React from "react";
import "./filter.css";
import { withRouter } from "react-router-dom";

class Restaurant extends React.Component {
  handleNavigate = (restid) => {
    this.props.history.push(`/details?restaurant=${restid}`);
  };

  // handlePagination= (page) => {
  //   const { sort, mealtype, city, cuisine, lcost, hcost, locality } = this.state;
  //   const obj = {
  //     page: page,
  //     sort: sort,
  //     mealtype: mealtype,
  //     city: city,
  //     cuisine: cuisine.length === 0 ? undefined : cuisine,
  //     lcost: lcost,
  //     hcost: hcost,
  //     locality: locality,
  //   };

  //   axios({
  //     method: "POST",
  //     url: "http://localhost:2022/filter",
  //     headers: { "Content-type": "application/json" },
  //     data: obj,
  //   })
  //     .then((response) => {
  //       this.setState({
  //         restaurants: response.data.restaurant,

  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }

  render() {
    const { restaurants } = this.props;
    console.log(restaurants);
    return (
      <React.Fragment>
        <div className="foodplaces">
          {/* if(restaurants){
            
          }
          else{
            <div><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YGjR-Qh83FmCo07giciS7wHaHa%26pid%3DApi&f=1"/></div>
            } */}

          {restaurants && restaurants.length > 0 ? (
            restaurants.map((item) => {
              return (
                <div
                  className="place"
                  onClick={() => this.handleNavigate(item._id)}
                >
                  <div className="restaurantimg">
                    <img
                      src={item.thumb}
                      alt="img"
                      width="90px"
                      height="90px"
                    />
                  </div>
                  <div className="restaurants">
                    <h4>{item.name}</h4>
                    <p>{item.city_name}</p>
                    <address className="address">{item.address}</address>
                  </div>
                  <span className="foodType">
                    <table>
                      <tbody>
                        <tr>
                          <th>CUISINES:</th>
                          <td>
                            {item.Cuisine.map((cuisine) => `${cuisine}   `)}
                          </td>
                        </tr>
                        <tr>
                          <th>COST FOR TWO:</th>
                          <td>{item.cost}</td>
                        </tr>
                      </tbody>
                    </table>
                  </span>
                </div>
              );
            })
          ) : (
            // <div className="noRecord">No Records Found...</div>
            <div>
              {/* {setTimeout("No Records found",2000)} */}
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F1*CsJ05WEGfunYMLGfsT2sXA.gif&f=1&nofb=1"
                style={{ height: "400px", width: "750px" }}
              />
            </div>
          )}

          {restaurants && restaurants.length > 0 ? (
            <div className="pagination">
              <a className="arrows" href="#">
                &laquo;
              </a>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a className="arrows" href="#">
                &raquo;
              </a>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Restaurant);
