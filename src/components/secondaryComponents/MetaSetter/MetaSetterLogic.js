import { useContext, useEffect } from "react";
import { MetaHandler } from "../../../hooks/context";

const MetaSetterLogic = ({ title, description }) => {
  const ctx = useContext(MetaHandler) || {};
  const setMetaDetails = ctx.setMetaDetails;

  useEffect(() => {
    if (typeof setMetaDetails !== "function") return;
    setMetaDetails({
      title: title ?? "Test Engine / Assessment Platform Solution, CLUBHub",
      description: description ?? "Test Engine / Assessment Platform Solution, CLUBHub - Your Rewards Journey",
    });
  }, [setMetaDetails, title, description]);

  return null;
};

export default MetaSetterLogic;