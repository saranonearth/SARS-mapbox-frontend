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
          <div>
            <img
              className="info-banner"
              src="https://via.placeholder.com/150"
              alt="info"
            />
          </div>
          <h1 className="info-tittle">Lorem, ipsum dolor.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            rerum eos consequatur aperiam nihil incidunt unde culpa. Sint sit
            possimus a quis tenetur natus vitae nulla, quod enim in consectetur!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;
