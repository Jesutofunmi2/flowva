import styles from "./ToolTip.module.scss";
import DOMPurify from "dompurify";

const ToolTip = ({
  children,
  tipText = "",
  position = "top",
  maxWidth = "350px",
}) => {
  const safeHTML = DOMPurify.sanitize(tipText || "");
  return (
    <>
      <span className={styles.tooltipCover}>
        <span className="d-block" style={{ position: "relative" }}>
          {tipText !== "" && (
            <span
              className={`${
                position === "right"
                  ? styles.tooltipTextRight
                  : position === "left"
                    ? styles.tooltipTextLeft
                    : position === "bottom"
                      ? styles.tooltipTextBottom
                      : styles.tooltipTextTop
              }`}
              style={{ maxWidth: maxWidth }}
              dangerouslySetInnerHTML={{ __html: safeHTML }}
            />
          )}
        </span>
        {children}
      </span>
    </>
  );
};

export default ToolTip;
