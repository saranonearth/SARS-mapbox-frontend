import React from "react";

const SearchPattern = ({ close, data }) => {
  console.log("SP DATA", data);
  return (
    <div>
      <div className="info-card">
        <div className="info-content">
          <div className="move-end">
            <div>
              <i onClick={close} class="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
          <h1>Terrain: {data && data.terrain}</h1>
          {data &&
            data.searchPattern &&
            data.searchPattern.length > 0 &&
            data.searchPattern.map((item, i) => (
              <div key={i + Math.random()}>
                <h1 className="info-tittle">Name: {item.name || item.Name}</h1>
                <p>Description: {item.description}</p>
                <p>Terrain:{item.terrain}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPattern;
