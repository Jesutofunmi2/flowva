import { useContext } from "react";
import { MetaHandler } from "./hooks/context";

const Meta = () => {
 const ctx = useContext(MetaHandler) || {};
 const metaDetails = ctx.metaDetails || { title: "Redeemer Teap International School, CLUB", description: "Redeemer Teap International School, CLUB - Your Rewards Journey" };
  return (
    <>
      <title>{metaDetails.title}</title>
      <meta name="description" content={metaDetails.description} />
    </>
  );
};

export default Meta;
