import styles from "./TableHelper.module.scss";
import { v4 as uuidv4 } from "uuid";

const TableHelper = ({
  children = null,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  useDefaultTableMobile = true,
  autoScrollRef = null,
  handleScroll = false,
  hasHeader = true,
  classNames = "",
  minHeight = "500px",
  hasAction = false,
}) => {
  return (
    <>
      {rows && rows?.length > 0 ? (
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            className={`${styles.tableSection} ${classNames} ${
              handleScroll ? styles.handleScroll : ""
            } ${!useDefaultTableMobile ? styles.dontShowOnMobile : ""}`}
            style={{
              paddingTop: hasHeader ? "0px" : "0px",
              minHeight: minHeight,
            }}
          >
            {/* desktop view */}
            <table
              className={`${hasAction ? styles.actionView : ""}`}
              {...getTableProps()}
            >
              <thead>
                {headerGroups?.map((headerGroup) => {
                  const { key, ...headerProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr {...headerProps} key={uuidv4()}>
                      {headerGroup?.headers?.map((column) => {
                        const { key, ...columnHeaderProps } =
                          column.getHeaderProps();
                        return (
                          <th
                            key={key}
                            {...columnHeaderProps}
                            className="font-weight-semibold"
                          >
                            {column?.render("Header")}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows?.map((row, rowIndex) => {
                  prepareRow(row);
                  const { key, ...rowProps } = row.getRowProps();
                  return (
                    <tr
                      key={key}
                      {...rowProps}
                      ref={autoScrollRef}
                      style={row?.depth === 1 ? { background: "#F3F1FC" } : {}}
                    >
                      {row?.cells?.map((cell, cellIndex) => {
                        const { key, ...cellProps } = cell.getCellProps();

                        return (
                          <td
                            key={key}
                            {...cellProps}
                            style={{ zIndex: 100 - rowIndex }}
                          >
                            {cellIndex + 1 === row?.cells.length &&
                            hasAction ? (
                              <span className="d-flex justify-content-end w-100">
                                {cell?.render("Cell")}
                              </span>
                            ) : (
                              cell?.render("Cell")
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* mobile view */}
            {useDefaultTableMobile ? (
              <div className={styles.mobileTable}>
                {rows?.map((row) => {
                  prepareRow(row);
                  const { key, rowProps } = row.getRowProps();
                  return (
                    <div
                      key={key}
                      {...rowProps}
                      className={styles.mobileTable__row}
                      style={row?.depth === 1 ? { background: "#F3F1FC" } : {}}
                    >
                      {row?.cells?.map((cell) => {
                        const { key, cellProps } = cell.getCellProps();
                        return (
                          <div
                            key={key}
                            {...cellProps}
                            className={styles.rowItem}
                          >
                            <h6 className={styles.rowItem__title}>
                              {cell?.column?.Header}
                            </h6>
                            <p className={styles.rowItem__value}>
                              {cell?.render("Cell")}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};
export default TableHelper;
