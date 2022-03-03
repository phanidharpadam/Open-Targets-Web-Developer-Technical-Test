import React from "react";
import "../styles/TabStyles.css";
import BarChart from "../charts/BarChart";
import RadarChart from "../charts/RadarChart";

export default function TabView(props) {
  const { index, datatypeScores, title } = props;
  const openTab = (event, tabName, index) => {
    let tabContentElements = document.getElementById(
      "tabContentWrapper" + index
    ).childNodes;
    let tabLinkElements = document.getElementById(
      "tablinksWrapper" + index
    ).childNodes;
    for (let i = 0; i < tabLinkElements.length; i++) {
      if (tabLinkElements[i].getAttribute("id") === tabName + index) {
        tabLinkElements[i].classList.add("active");
      } else {
        tabLinkElements[i].classList.remove("active");
      }
    }
    for (let i = 0; i < tabContentElements.length; i++) {
      if (tabContentElements[i].getAttribute("id") === tabName + index) {
        tabContentElements[i].classList.add("tabVisibility");
      } else {
        tabContentElements[i].classList.remove("tabVisibility");
      }
    }
  };
  return (
    <div className="tabWrapper">
      <div id={"tablinksWrapper" + index} className="tab">
        <button
          id={"Bar" + index}
          className="tablinks active"
          onClick={(e) => openTab(e, "Bar", index)}
        >
          Bar chart
        </button>
        <button
          id={"Radar" + index}
          className="tablinks"
          onClick={(e) => openTab(e, "Radar", index)}
        >
          Radar chart
        </button>
      </div>
      <div id={"tabContentWrapper" + index}>
        <div id={"Bar" + index} className="tabcontent tabVisibility">
          <div className="graphStyles">
            <BarChart datatypeScores={datatypeScores} title={title} />
          </div>
        </div>

        <div id={"Radar" + index} className="tabcontent">
          <div className="graphStyles" style={{ width: "500px" }}>
            <RadarChart datatypeScores={datatypeScores} title={title} />
          </div>
        </div>
      </div>
    </div>
  );
}
