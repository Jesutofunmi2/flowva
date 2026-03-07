import React from "react";
import SecondaryComponents from "../../../../../components/secondaryComponents";
import { BankEmptyIcon } from "../../../../../assets/svgIcons";
import PrimaryComponents from "../../../../../components/primaryComponents";
import { pathConstants } from "../../../../../routes/pathContants";
import { useNavigate } from "react-router-dom";
import useAllStudents from "./useAllStudents";

const AllStudent = () => {
  const { instance } = useAllStudents();
  const navigate = useNavigate();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    instance;
  return (
    <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | All Students"
      description="View all dashboard activities and statistics on Test Engine / Assessment Platform Solution,."
    >
      <div style={{ padding: "30px 0", width: "100%" }}>
        <div className="login-page__container">
          <div
            className="login-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 className="light-purple--text font-weight-bold">All Students</h4>
            <PrimaryComponents.Button
              classNames="btn btn--primary smallBtn"
              onClick={() => {
                navigate(pathConstants.CREATE_CANDIDATE);
              }}
            >
              Create New Student
            </PrimaryComponents.Button>
          </div>
          <SecondaryComponents.TableHelper
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={prepareRow}
          >
            <div
              className="text-center mt-5"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <BankEmptyIcon />
              <h5>
                You have no class students yet. <br />
                {<span className="text-primary">Create a new student</span>}
              </h5>
              <p>When you do, they would appear here.</p>
            </div>
          </SecondaryComponents.TableHelper>
        </div>
      </div>
    </SecondaryComponents.MetaSetter>
  );
};

export default AllStudent;
