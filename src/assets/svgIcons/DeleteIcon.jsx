const DeleteIcon = ({
  type = "default",
  width = 24,
  height = 24,
  color = "#E02020",
  ...rest
}) => {
  return type === "default" ? (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="white" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#E02020" />
      <path
        d="M9.33333 7.99967V6.66634C9.33333 5.92996 9.93029 5.33301 10.6667 5.33301H13.3333C14.0697 5.33301 14.6667 5.92996 14.6667 6.66634V7.99967M6 7.99967H18H6ZM7.33333 7.99967V17.333C7.33333 18.0694 7.93029 18.6663 8.66667 18.6663H15.3333C16.0697 18.6663 16.6667 18.0694 16.6667 17.333V7.99967H7.33333Z"
        stroke="#15112D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3334 11.333V15.333"
        stroke="#15112D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6666 11.333V15.333"
        stroke="#15112D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21H3ZM5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6H5Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11V17"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 11V17" stroke={color} strokeLinejoin="round" />
    </svg>
  );
};

export default DeleteIcon;