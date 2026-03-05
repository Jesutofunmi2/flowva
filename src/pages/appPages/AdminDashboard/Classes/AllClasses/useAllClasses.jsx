import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import PrimaryComponents from "../../../../../components/primaryComponents";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";
import { defaultDateDisplay } from "../../../../../helpers";
import { DeleteIcon } from "../../../../../assets/svgIcons";

const useAllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteClass = async (classId) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await callSupabase((sb) =>
        sb.from("classes").delete().eq("id", classId)
      );

      if (error) {
        throw error;
      }

      // Remove the deleted class from the state
      setClasses((prevClasses) =>
        prevClasses.filter((cls) => cls.id !== classId)
      );
    } catch (err) {
      setError(err.message || "Failed to delete class");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);

      const { data, error } = await callSupabase((sb) =>
        sb.from("classes").select("*")
      );

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setClasses(data || []);
      }

      setIsLoading(false);
    };
    fetchClasses();
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
              onClick={() => {}}
            >
              Update
            </PrimaryComponents.Button>

            <PrimaryComponents.Button
              classNames="btn btn--outline smallBtn"
              onClick={() => {
                deleteClass(row?.original?.id);
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
    data: classes || [],
  });

  return {
    instance,
    classes,
    isLoading,
    error,
  };
};

export default useAllClasses;
