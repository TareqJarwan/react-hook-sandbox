import React from "react";

import { useHttp } from "../hooks/http";
import Summary from "./Summary";

const Character = props => {
  const [isLoading, fetchData] = useHttp(
    "https://swapi.co/api/people/" + props.selectedChar,
    [props.selectedChar]
  );

  let loadedChar = null;
  if (fetchData) {
    loadedChar = {
      id: props.selectedChar,
      name: fetchData.name,
      height: fetchData.height,
      colors: {
        hair: fetchData.hair_color,
        skin: fetchData.skin_color
      },
      gender: fetchData.gender,
      movieCount: fetchData.films.length
    };
  }

  console.log("Rendering....");

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedChar) {
    content = (
      <Summary
        name={loadedChar.name}
        gender={loadedChar.gender}
        height={loadedChar.height}
        hairColor={loadedChar.colors.hair}
        skinColor={loadedChar.colors.skin}
        movieCount={loadedChar.movieCount}
      />
    );
  } else if (!isLoading && !loadedChar) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);
