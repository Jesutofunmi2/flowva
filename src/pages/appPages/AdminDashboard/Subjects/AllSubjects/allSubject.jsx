import React from "react";
import SecondaryComponents from "../../../../../components/secondaryComponents";
import { BankEmptyIcon } from "../../../../../assets/svgIcons";
import useAllSubject from "./useAllSubject";
import PrimaryComponents from "../../../../../components/primaryComponents";
import { pathConstants } from "../../../../../routes/pathContants";
import { useNavigate } from "react-router-dom";

const AllSubjects = () => {
  const { instance } = useAllSubject();
  const navigate = useNavigate();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    instance;
  return (
    <SecondaryComponents.MetaSetter
      title="Redeemer Teap International School, | All Subjects"
      description="View all dashboard activities and statistics on Redeemer Teap International School,."
    >
        <div style={{ padding: "30px 0", width: "100%" }}>
          <div className="login-page__container">
            <div className="login-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 className="light-purple--text font-weight-bold">
                All Subjects
              </h4>
              <PrimaryComponents.Button
                classNames="btn btn--primary smallBtn"
                onClick={() => {
                  navigate(pathConstants.CREATE_SUBJECT)
                }}
              >
                Create New Subject
              </PrimaryComponents.Button>
            </div>
      <SecondaryComponents.TableHelper
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
      >
        <div className="text-center mt-5" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <BankEmptyIcon />
          <h5>
            You have no subject names yet. <br />
            {<span className="text-primary">Create a new subject</span>}
          </h5>
          <p>When you do, they would appear here.</p>
        </div>
      </SecondaryComponents.TableHelper>
      </div>
      </div>
    </SecondaryComponents.MetaSetter>
  );
};

export default AllSubjects;
