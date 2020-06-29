import React from "react";

import "./App.css";
import Linegraph from "./linegraph";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      particularData: null,
      datas: null,
      countrySelected: null,
    };
  }
  componentDidMount() {
    fetch("https://api.covid19api.com/summary")
      .then((resp) => resp.json())
      .then((datas) => {
        this.setState({ datas: datas });
      });
  }
  handleCountryChange = (e) => {
    this.setState({
      countrySelected: e.target.value,
    });
    fetch(`https://api.covid19api.com/total/dayone/country/${e.target.value}`)
      .then((resp) => resp.json())
      .then((datas) => {
        this.setState({ particularData: datas });
      });
  };
  render() {
    var dataLabels = [];
    this.state.particularData &&
      this.state.particularData.map((data) => dataLabels.push(data.Date));
    var active = [];
    this.state.particularData &&
      this.state.particularData.map((data) => active.push(data.Active));
    var confirmed = [];
    this.state.particularData &&
      this.state.particularData.map((data) => confirmed.push(data.Confirmed));
    var deaths = [];
    this.state.particularData &&
      this.state.particularData.map((data) => deaths.push(data.Deaths));
    var recovered = [];
    this.state.particularData &&
      this.state.particularData.map((data) => recovered.push(data.Recovered));

    var dataToShow = <p className="pa3 red ma3 tc ">Select a country please</p>;

    if (this.state.datas) {
      var selectCountry = this.state.datas.Countries.map((countries, i) => {
        return (
          <option key={i} value={countries.Country}>
            {countries.Country}
          </option>
        );
      });
      var dataFound = this.state.datas.Countries.filter(
        (data) => data.Country === this.state.countrySelected
      );

      if (dataFound[0]) {
        dataToShow = (
          <div className="mt4">
            <div className="tc br3 ba f2 ba--purple bg-purple white ma3">
              <p>{dataFound[0].Country}</p>
            </div>
            <div className=" flex justify-between">
              <div className="fl pa3 br3 ba ba--yellow bg-orange white shadow-4 boxes">
                <p>New Found</p>
                <hr />

                <p className="tc"> {dataFound[0].NewConfirmed}</p>
              </div>
              <div className="fl pa3 br3 ba ba--purple bg-light-green black shadow-4 boxes">
                <p>New Deaths</p>
                <hr />

                <p className="tc">{dataFound[0].NewDeaths}</p>
              </div>
              <div className="fl pa3 br3 ba ba--purple bg-light-green black shadow-4 boxes">
                <p>New Recovered</p>
                <hr />

                <p className="tc">{dataFound[0].NewRecovered}</p>
              </div>
              <div className="fl pa3 br3 ba ba--purple bg-light-green black shadow-4 boxes">
                <p>Total Confirmed</p>
                <hr />

                <p className="tc">{dataFound[0].TotalConfirmed}</p>
              </div>
              <div className="fl pa3 br3 ba ba--purple bg-light-green black shadow-4 boxes">
                <p>Total Deaths</p>
                <hr />

                <p className="tc">{dataFound[0].TotalDeaths}</p>
              </div>
              <div className="fl pa3 br3 ba ba--purple bg-light-green black shadow-4 boxes">
                <p>Total Recovered</p>
                <hr />

                <p className="tc"> {dataFound[0].TotalRecovered}</p>
              </div>
            </div>
          </div>
        );
      }
    }
    if (
      !active.length &&
      !confirmed.length &&
      !deaths.length &&
      !recovered.length
    ) {
      var showGraph = <p className = 'tc b f3 '>SORRY.. No Data Found. Select other country please</p>
    } else {
      showGraph = (
        <>
          <p className="f2 bg-light-blue br3  shadow-5 pa3 ma3 tc">
            Data of Last 10 days
          </p>
          <Linegraph
            labels={dataLabels.slice(Math.max(dataLabels.length - 10, 1))}
            active={active.slice(Math.max(active.length - 10, 1))}
            confirmed={confirmed.slice(Math.max(active.length - 10, 1))}
            deaths={deaths.slice(Math.max(active.length - 10, 1))}
            recovered={recovered.slice(Math.max(active.length - 10, 1))}
          />
        </>
      );
    }
    return (
      <div>
        <select
          id="country_select"
          name="country"
          className="db tc pa3 ma3"
          style={{
            position: "fixed",
            top: "0",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
          onChange={this.handleCountryChange}
          default="select"
        >
          <option value="select">Select a Country...</option>
          {selectCountry}
        </select>
        {dataToShow}

        <div>{showGraph}</div>
      </div>
    );
  }
}

export default App;
