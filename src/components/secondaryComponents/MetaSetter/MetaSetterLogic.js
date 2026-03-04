import { useContext, useEffect } from "react";
import { MetaHandler } from "../../../hooks/context";

const MetaSetterLogic = ({ title, description }) => {
  const ctx = useContext(MetaHandler) || {};
  const setMetaDetails = ctx.setMetaDetails;

  useEffect(() => {
    if (typeof setMetaDetails !== "function") return;
    setMetaDetails({
      title: title ?? "Redeemer Teap International School, CLUBHub",
      description: description ?? "Redeemer Teap International School, CLUBHub - Your Rewards Journey",
    });
  }, [setMetaDetails, title, description]);

  return null;
};

export default MetaSetterLogic;