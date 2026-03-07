import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import PrimaryComponents from "../../../../../components/primaryComponents";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { defaultDateDisplay } from "../../../../../helpers";
import { DeleteIcon } from "../../../../../assets/svgIcons";
import { pathConstants } from "../../../../../routes/pathContants";
import { useNavigate } from "react-router-dom";

const useAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /**
   * DELETE STUDENT
   */
  const deleteStudent = async (studentId) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await callSupabase((sb) =>
        sb.from("candidates").delete().eq("user_id", studentId)
      );

      if (error) throw error;

      setStudents((prev) =>
        prev.filter((student) => student.user_id !== studentId)
      );
    } catch (err) {
      setError(err.message || "Failed to delete student");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * FETCH STUDENTS
   */
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);

      const { data, error } = await callSupabase((sb) =>
        sb
          .from("candidates")
          .select(
            `
            *,
            class:classes (
              name
            )
          `
          )
      );

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setStudents(data || []);
      }

      setIsLoading(false);
    };

    fetchStudents();
  }, []);

  /**
   * TABLE COLUMNS
   */
  const columns = useMemo(
    () => [
      {
        Header: "S/N",
        accessor: "",
        Cell: ({ row }) => row.index + 1,
      },

      {
        Header: "Photo",
        accessor: "photo_url",
        Cell: ({ cell: { value } }) =>
          value ? (
            <img
              src={value}
              alt="student"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            "N/A"
          ),
      },
      {
        Header: "Full Name",
        accessor: "full_name",
        Cell: ({ cell: { value } }) => (value ? value : "N/A"),
      },

      {
        Header: "Username",
        accessor: "username",
        Cell: ({ cell: { value } }) => (value ? value : "N/A"),
      },

      {
        Header: "Class",
        accessor: "class.name",
        Cell: ({ cell: { value } }) => (value ? value : "N/A"),
      },

      {
        Header: "Session",
        accessor: "session",
        Cell: ({ cell: { value } }) => (value ? value : "N/A"),
      },

      {
        Header: "DOB",
        accessor: "date_of_birth",
        Cell: ({ cell: { value } }) =>
          value ? defaultDateDisplay(value) : "N/A",
      },

      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "5px" }}>
            <PrimaryComponents.Button
              classNames="btn btn--primary smallBtn"
              onClick={() => {
                navigate(
                  pathConstants.UPDATE_CANDIDATE({
                    candidateId: row?.original?.user_id,
                  })
                );
              }}
            >
              Update
            </PrimaryComponents.Button>

            <PrimaryComponents.Button
              classNames="btn btn--outline smallBtn"
              onClick={() => deleteStudent(row?.original?.user_id)}
            >
              <DeleteIcon type="menu" />
            </PrimaryComponents.Button>
          </div>
        ),
      },
    ],
    []
  );

  /**
   * REACT TABLE INSTANCE
   */
  const instance = useTable({
    columns,
    data: students || [],
  });

  return {
    instance,
    students,
    isLoading,
    error,
  };
};

export default useAllStudents;