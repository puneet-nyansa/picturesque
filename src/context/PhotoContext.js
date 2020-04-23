import React, { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../components/config";
import { photosetID } from "../components/config";
import { userID } from "../components/config";
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const runSearch = () => {
    axios
      .get(
        //`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&tags=${query}&photoset_id=${photosetID}&user_id=${userID}&per_page=24&format=json&nojsoncallback=1`
        `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${photosetID}&user_id=${userID}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        setImages(response.data.photoset.photo);
        setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  };

  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
