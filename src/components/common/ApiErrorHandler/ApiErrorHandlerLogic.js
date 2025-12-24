import { setApiErrorMessage } from "../../../store/modules/apiErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ApiErrorHandlerLogic = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.apiErrorReducer.toastError);

  useEffect(() => {
    if (message === null) return;

    setTimeout(() => {
      closeApiErrorHandler();
    }, 10000);
  }, [message]);

  const closeApiErrorHandler = () => {
    dispatch(
      setApiErrorMessage({
        message: null,
      }),
    );
  };

  return { message, closeApiErrorHandler };
};
export default ApiErrorHandlerLogic;
