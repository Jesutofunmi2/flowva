export const ExclamationCirlce = ({
  strokeColor = "#15112D",
  width = "17",
  height = "16",
  ...rest
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect x="0.5" width="16" height="16" rx="8" fill="#F3F1FC" />
      <path
        d="M8.50004 2.54598C5.48758 2.54598 3.0455 4.98807 3.0455 8.00053C3.0455 11.013 5.48758 13.4551 8.50004 13.4551C11.5125 13.4551 13.9546 11.013 13.9546 8.00053C13.9546 4.98807 11.5125 2.54598 8.50004 2.54598Z"
        fill="white"
        stroke={strokeColor}
        strokeWidth="1.09091"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10.1817L8.5 7.99987"
        stroke={strokeColor}
        strokeWidth="1.09091"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 5.80577L8.5 5.81641"
        stroke={strokeColor}
        strokeWidth="1.09091"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
