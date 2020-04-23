import React from "react";
import axios from "axios";
import { apiKey } from "../components/config";
import { photosetID } from "../components/config";
import { userID } from "../components/config";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.Names = [];
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${photosetID}&user_id=${userID}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.images = response.data.photoset.photo;
        for (var i=0; i<this.images.length; i++) {
          let temp = this.images[i];
          this.Names[i] = temp.title;
          //console.log(this.Names[i]);
        }
        this.setState({value: this.Names[0]});
        //console.log("state", this.state);

      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
    };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  buildOptions(Names) {
    var arr = [];
    for (let i = 0; i <=Names.length ; i++) {
        arr.push(<option key={i} value={Names[i]}>{Names[i]}</option>)
    }
    return arr;
  }

  render() {
    console.log('History Property', this.props.history)
    return (
      <form onSubmit={e => this.props.handleSubmit(e, this.props.history, this.state.value)}>
        <label>
          <select value={this.state.value} onChange={this.handleChange}>
           {this.buildOptions(this.Names)}
          </select>
          <input type="submit" className="submit-button" value="Buy" />
        </label>
      </form>
    );
  }
}

export default MyForm;
