import React from "react";

const Information = ({ data, close }) => {
  return (
    <div>
      <div className="info-card">
        <div className="info-content">
          <div className="move-end">
            <div>
              <i
                onClick={() => close()}
                class="fa fa-times"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <h1 className="info-tittle">{data.name}</h1>
          <p>{data.formatted_address}</p>
          <div onClick={() => window.open(data.url, "_blank")} className="btn">
            View More
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
