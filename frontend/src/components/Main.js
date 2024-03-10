import React, { Component } from "react";
import TMDBMovieApiService from "../apis/TMDBMovieApiService";
import Row from "./Row";

class MainPage extends Component {
  constructor(props) {
    super(props);

    if(props.location.search!==''){
      let id = props.location.search.replace("?", "").split("=");
      sessionStorage.setItem("user", id[1]);
    }
    this.state = {
      genre: [
        "Action",
        "Adventure",
        "Comedy",
        "Documentary",
        "Family",
        "Fantasy",
        "Horror",
      ],
      populars: '',
    };
  }
  componentDidMount() {
    this.getAllMoviesByGenre();
    this.getMainPopularMovies();
  }

  getAllMoviesByGenre = async () => {
    for (let i = 0; i < this.state.genre.length; i++) {
      await TMDBMovieApiService.getGenreList(this.state.genre[i])
        .then((res) => {
          switch (i) {
            case 0: 
              this.setState({ actions: res.data.results.slice(10) }, () => {});
              break;
            case 1: 
              this.setState(
                { adventures: res.data.results.slice(10) },
                () => {}
              );
              break;
            case 2: 
              this.setState({ comedys: res.data.results.slice(10) }, () => {});
              break;
            case 3: 
              this.setState(
                { documentarys: res.data.results.slice(10) },
                () => {}
              );
              break;
            case 4: 
              this.setState({ familys: res.data.results.slice(10) }, () => {});
              break;
            case 5:
              this.setState({ fantasys: res.data.results.slice(10) }, () => {});
              break;
            case 6: 
              this.setState({ horrors: res.data.results.slice(10) }, () => {});
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.error("getGenreList get error : ", err);
        });
    }
  };
  getMainPopularMovies = async () => {
    await TMDBMovieApiService.getPopularMovies(1)
      .then((res) => {
        this.setState({ populars: res.data.results }, () => {});
      })
      .catch((err) => {
        console.error('getMainPopularMovies 오류 : ', err)
      });
  };
  render() {
    return (
      <div style={{ backgroundColor: "#181818", paddingRight: "15px", paddingLeft: "15px" }}>
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.youtube.com/embed/qqrpMRDuPfc?si=3oeauLgLz0jYQfQm"
              title="Godzilla vs. Kong  - 2"
              className="video"
              allowFullScreen
              frameBorder="0"
              style={{ width: "100%", height: "80vh" }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Row
              actions={this.state.actions}
              adventures={this.state.adventures}
              comedys={this.state.comedys}
              documentarys={this.state.documentarys}
              familys={this.state.familys}
              fantasys={this.state.fantasys}
              horrors={this.state.horrors}
              populars={this.state.populars}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
