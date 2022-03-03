import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import "../styles/TableStyles.css";
import TabView from "./TabView";

const EXCHANGE_RATES = gql`
  query lungCarcinomaAssociatedTargets {
    disease(efoId: "EFO_0001071") {
      associatedTargets(page: { index: 0, size: 10 }) {
        rows {
          target {
            id
            approvedSymbol
            approvedName
          }
          score
          datatypeScores {
            id
            score
          }
        }
      }
    }
  }
`;

export default function TableView() {
  const { data, loading, error } = useQuery(EXCHANGE_RATES);
  console.log(data);

  const handleExpandRow = (id) => {
    var element = document.getElementById(id);
    element.classList.toggle("trVisibility");
  };

  if (loading) {
    return <div id="loader"></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="table-wrapper">
      <h3>Genes associated with lung carcinoma</h3>
      <table>
        <thead>
          <tr>
            <th style={{ width: "3%" }}></th>
            <th style={{ width: "15%" }}>Approved Symbol</th>
            <th style={{ width: "32%" }}>Gene Name</th>
            <th style={{ width: "35%" }}>Overall Association Score</th>
          </tr>
        </thead>
        <tbody>
          {data.disease.associatedTargets.rows.map(
            ({ target, score, datatypeScores }, index) => {
              return (
                <Fragment key={target.id}>
                  <tr className={target.id}>
                    <td
                      className="cell"
                      onClick={() => handleExpandRow(target.id + index)}
                    >
                      +
                    </td>
                    <td>
                      <a
                        href={
                          "https://platform.opentargets.org/target/" +
                          target.approvedName
                        }
                      >
                        {target.approvedSymbol}
                      </a>
                    </td>
                    <td>{target.approvedName}</td>
                    <td>{score.toFixed(3)}</td>
                  </tr>
                  <tr id={target.id + index} className="trVisibility">
                    <td colSpan={4}>
                      <TabView
                        index={index}
                        datatypeScores={datatypeScores}
                        title={target.approvedSymbol}
                      />
                    </td>
                  </tr>
                </Fragment>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
