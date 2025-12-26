import { Helmet } from "react-helmet";
import { useContext } from "react";
import { MetaHandler } from "./hooks/context";

const Meta = () => {
 const ctx = useContext(MetaHandler) || {};
 const metaDetails = ctx.metaDetails || { title: "Flowva Hub", description: "Flowva Hub - Your Rewards Journey" };
  return (
    <Helmet>
      <title>{metaDetails.title}</title>
      <meta name="description" content={metaDetails.description} />
    </Helmet>
  );
};

export default Meta;
