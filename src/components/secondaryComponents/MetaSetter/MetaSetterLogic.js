import { useContext, useEffect } from "react";
import { MetaHandler } from "../../../hooks/context";

const MetaSetterLogic = ({ title, description }) => {
  const ctx = useContext(MetaHandler) || {};
  const setMetaDetails = ctx.setMetaDetails;

  useEffect(() => {
    if (typeof setMetaDetails !== "function") return;
    setMetaDetails({
      title: title ?? "Flowva Hub",
      description: description ?? "Flowva Hub - Your Rewards Journey",
    });
  }, [setMetaDetails, title, description]);

  return null;
};

export default MetaSetterLogic;