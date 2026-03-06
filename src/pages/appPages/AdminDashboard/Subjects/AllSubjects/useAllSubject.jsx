import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import PrimaryComponents from "../../../../../components/primaryComponents";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { defaultDateDisplay } from "../../../../../helpers";
import { DeleteIcon } from "../../../../../assets/svgIcons";
import { pathConstants } from "../../../../../routes/pathContants";
import { useNavigate } from "react-router-dom";

const useAllSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const deleteSubject = async (subjectId) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await callSupabase((sb) =>
        sb.from("subjects").delete().eq("id", subjectId)
      );

      if (error) {
        throw error;
      }

      // Remove the deleted subject from the state
      setSubjects((prevSubjects) =>
        prevSubjects.filter((sub) => sub.id !== subjectId)
      );
    } catch (err) {
      setError(err.message || "Failed to delete subject");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);

      const { data, error } = await callSupabase((sb) =>
        sb.from("subjects").select("*")
      );

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setSubjects(data || []);
      }

      setIsLoading(false);
    };
    fetchSubjects();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "S/N",
        accessor: "",
        Cell: ({ row }) => row.index + 1,
      },
      {
          Header: "Date",
          accessor: "created_at",
          Cell: ({ cell: { value } }) =>
            value ? defaultDateDisplay(value) : "N/A",
        },
      {
        Header: "Class Name",
        accessor: "name",
        Cell: ({ cell: { value } }) => (value ? value : "N/A"),
      },

      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="d-flex" style={{ gap: "5px", display: "flex" }}>
            <PrimaryComponents.Button
              classNames="btn btn--primary smallBtn"
              isDisabled={!row?.original}
              onClick={() => {
                navigate(pathConstants.UPDATE_SUBJECT({ subjectId: row?.original?.id }));
              }}
            >
              Update
            </PrimaryComponents.Button>

            <PrimaryComponents.Button
              classNames="btn btn--outline smallBtn"
              onClick={() => {
                deleteSubject(row?.original?.id);
              }}
            >
              <DeleteIcon type="menu" />
            </PrimaryComponents.Button>
          </div>
        ),
      },
    ],
    []
  );

   const instance = useTable({
    columns,
    data: subjects || [],
  });

  return {
    instance,
    subjects,
    isLoading,
    error,
  };
};

export default useAllSubject;
