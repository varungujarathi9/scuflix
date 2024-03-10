import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";
import { Modal } from "reactstrap";
import CommentApiService from "../apis/CommentApiService";
import FavoriteMovieApiService from "../apis/FavoriteMovieApiService";
import TMDBMovieApiService from "../apis/TMDBMovieApiService";
import Comments from "./Comments";

class DetailContentCompoent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      id: this.props.id,
      movie: this.props.movie,
      modal: false, 
      details: {},
      genres: [],
      
      poster_image:
        "http://image.tmdb.org/t/p/w500" + this.props.movie.poster_path,
      content: "", 
    };
  }
 handleMovieSave = async () => {
  var temp = {
    movie_id : this.state.id,
    movie_original_title : this.props.movie.original_title,
    poster_path : this.props.movie.poster_path,
    user_id : window.sessionStorage.getItem("user"),
  };
  console.log(temp);
  if(sessionStorage.getItem('user') != null){
    await FavoriteMovieApiService.addMovie(temp)
      .then(res => {
        console.log(res.data);
        if (res.data === 'success') {
          console.info('save success', this.props.databaseid);
          alert("Added to your wishlist.");
          this.setState({
            modal: false,
          })
        } else {
          alert("It's already on your wishlist.");
          this.setState({
            modal: false,
          })
        }
      })
      .catch(err => {
        console.error('ApiService.addMovies Error', err);
        alert('Wish list save error\nPlease contact the administrator');
      })
  } else {
    alert('It is available after login.');
    window.location.href="http://localhost:3000/login";
  }
}

  handleMovieDelete = async () => {
    
    await FavoriteMovieApiService.removeMovie2(this.state.id)
    .then(res => {
      console.info('deletion success', res.state);
      if(res.data === 'success') {
        alert("Deleted.");
        if(document.location.href === "http://localhost:3000/myContent") {
          this.props.loadFavoriteMovie();
          this.setState({
            modal: false,
          });
        }
        else {  
          this.setState({
            modal: false,
          });
        }
      }
      else {  
        alert('Its not on wish list.');
        return;
      }
    })
    .catch(err => {
      console.error('ApiService.removeMovie Error', err);
      alert('Wish list deletion error\nPlease contact the administrator');
    })
}

  getAllInfo = () => {
    this.getMovieDetails();
    this.getMoviesYoutubeKey();
    this.getMovieCredits();
    this.getCommentList();
  };

  getMovieDetails = async () => {
    let res = await TMDBMovieApiService.getMovieDetails(this.state.id);
    let genres = res.data.genres.map((item) => {
      return item.name;
    });
    this.setState(
      {
        details: res.data,
        genres: genres,
      },
      () => {
      }
    );
  };
  getMoviesYoutubeKey = async () => {
    let res = await TMDBMovieApiService.getYoutubeKey(this.state.id);
    if (res.data.results[0] !== undefined) {
      console.log("youtubeKey data:", res.data.results[0].key);
      this.setState(
        {
          key:
            "https://youtube.com/embed/" +
            res.data.results[0].key +
            "?autoplay=1&controls=0&rel=0&loop=1",
        },
        () => {
          
        }
      );
      
    } else {
      this.setState({ key: false });
    }
  };
  getMovieCredits = async () => {
    let res = await TMDBMovieApiService.getCredits(this.state.id);
    let cast = res.data.cast.slice(0, 6).map((item) => {
      return item.name;
    });
    this.setState(
      {
        cast: cast,
      },
      () => {
      }
    );
  };

  getCommentList = async () => {
    let res = await CommentApiService.getCommentList(this.state.id);
    let commentList = res.data;
    this.setState({ comments: commentList }, () => {

    });
  };
  seperactor = (Array) => {
    var seperactor = ",";
    var tempString = "";
    for (var i = 0; i < Array.length; i++) {
      if (i < Array.length - 1) {
        tempString += Array[i] + seperactor;
      } else if (i === Array.length - 1) {
        tempString += Array[i];
      }
    }
    return tempString;
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleText = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  writeMovieComment = () => {
    let user_id = sessionStorage.getItem("user");
    if (user_id == null) {
      alert("Login is required");
      window.location.href = "http://localhost:3000/login";
    }
    let content = this.state.content;
    let comment = {
      movie_id: this.state.id,
      user_id: user_id,
      content: content,
    };
    CommentApiService.writeMovieComment(comment)
      .then((res) => {
        let result = res.data;
        if (result === 1) {
          alert("Completion of comment");
          this.getCommentList();
          this.setState({ content: "" });
        }
      })
      .catch((err) => console.log(err));
  };
  deleteComment = (id, user_id) => {
    if (sessionStorage.getItem("user") === user_id.toString()) {
      CommentApiService.deleteComment(id)
        .then((res) => {
          console.log(res.data); 
          if (res.status === 200) {
            alert("Comment has been deleted");
            this.getCommentList();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <div>
        <div className="btn bg-transparent" onClick={this.toggle}>
          {this.state.poster_image === "http://image.tmdb.org/t/p/w500null" ? (
            <img
              alt=""
              src={"https://i.ytimg.com/vi/GV3HUDMQ-F8/maxresdefault.jpg"}
              height="270"
              width="180"
              style={{ margin: "5px" }}
            />
          ) : (
            <img
              src={this.state.poster_image}
              width="180px"
              alt="new"
              style={{ borderRadius: 5 }}
              onClick={this.getAllInfo}
            />
          )}
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="lg"
          className="my-modal"
          style={{ maxWidth: "900px", width: "80%" }}
        >
          <div className="container">
            <div className="row">
              <div
                onClick={this.toggle}
                style={{
                  paddingRight: "10px",
                  margin: "5px",
                  textDecoration: "none",
                  color: "#777777",
                  fontWeight: "bold",
                  fontSize: "x-large",
                  flex: "1",
                  textAlign: "right",
                }}
              >
                <Icon.XCircleFill />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="vedio">
                  {this.state.key ? (
                    <iframe
                      title="Youtube Video Player"
                      className="video"
                      allowFullScreen
                      frameBorder="0"
                      style={{
                        width: "100%",
                        height: "50vh",
                        margin: 0,
                        padding: 0,
                      }}
                      allow="autoplay"
                      src={this.state.key}
                    ></iframe>
                  ) : (
                    "There is no Youtube video"
                  )}

                  <div>
                    <h1 style={{ color: "white" }}>
                      {this.state.details && this.state.details.title}
                    </h1>
                    <div style={{ flexDirection: "row" }}>
                      <input
                        className="btn btn-light btn-lg"
                        type="button"
                        value="▶ Play"
                        style={{ margin: 5 }}
                        onClick={() =>
                          window.open(`${this.state.key}`, "_blank")
                        }
                      />
                      <input
                          className="btn btn-light btn-lg"
                          type="button"
                          value="❤"
                          style={{ margin: 5, borderRadius: 20 }}
                          onClick={() => this.handleMovieSave()}
                        />
                      {sessionStorage.getItem("user") != null ?
                        <input
                          className="btn btn-light btn-lg"
                          type="button"
                          value="❌ "
                          style={{ margin: 5, borderRadius: 20 }}
                          onClick={() => this.handleMovieDelete(this.state.id)}
                        />
                        :''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingLeft: "24px", marginTop: 15 }}>
              <div className="col-8">
                <div className="content1">
                  <p className="contentFont">
                    <strong>Release Date:</strong> {this.state.details.release_date &&
                      this.state.details.release_date}{" "}
                    <br/><strong>Duration</strong>: {this.state.details.runtime && this.state.details.runtime} Minutes
                  </p>
                  <p className="contentFont" style={{ marginTop: 15 }}>
                    {this.state.details.overview
                      ? this.state.details.overview
                      : "No plot summary"}
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div className="content2">
                  <div style={{ flexDirection: "row", marginBottom: 10 }}>
                    <div style={{ textDecoration: "none", color: "#777777" }}>
                      Cast
                    </div>
                    <div className="detailFont">
                      {this.state.cast && this.seperactor(this.state.cast)}
                    </div>
                  </div>
                  <div style={{ flexDirection: "row", marginBottom: 10 }}>
                    <div style={{ textDecoration: "none", color: "#777777" }}>
                      Genre
                    </div>
                    <div className="detailFont">
                      {this.state.genres && this.seperactor(this.state.genres)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingLeft: "24px", marginTop: 20 }}>
              <div className="col">
                <form className="form-inline" style={{ width: "100%" }}>
                  <textarea
                    placeholder="Review"
                    className="form-control"
                    rows="2"
                    cols="100"
                    name="content"
                    value={this.state.content}
                    onChange={(e) => this.handleText(e)}
                  />
                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    style={{ margin: 10 }}
                    onClick={() => this.writeMovieComment()}
                  >
                    Comment
                  </button>
                </form>
                <div className="comment">
                  {this.state.comments
                    ? this.state.comments.map((item) => {
                        return (
                          <Comments
                            key={item.id}
                            id={item.id}
                            movie_id={item.movie_id}
                            user_id={item.user_id}
                            content={item.content}
                            deleteComment={this.deleteComment}
                          />
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DetailContentCompoent;
