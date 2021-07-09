import React from "react";
import "./style.css";
import {withRouter} from 'react-router-dom'

class quickSearch extends React.Component {

    handleClick = (mealtypeId) => {
        // console.log(mealtypeId)
        const locationId = sessionStorage.getItem('locationId')

        if(locationId){
            this.props.history.push(`/places?mealtype=${mealtypeId}&location=${locationId}`)
        }
        else{
            this.props.history.push(`/places?mealtype=${mealtypeId}`)
        }
    }

  render() {
    const { quicksearch } = this.props;

    return (
      <React.Fragment>
        <div className="container">
          <div className="QuickSearches">
            <h1>Quick Search</h1>
            <p>Discover restaurants by type of meal</p>

            <div className="Qcards">
              {quicksearch.map((item, i) => {
                return (
                  <div className="Cards" onClick = {()=> this.handleClick(item.mealtype)}>
                    <img src={`card${i+1}.png`} alt={item.name} />
                    <h5>{item.name}</h5>
                    <p>{`Start your day with exclusive ${item.name} options`}.</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(quickSearch);
