import MetaSetterLogic from "./MetaSetterLogic";

const MetaSetter = ({ children, title, description }) => {
  MetaSetterLogic({ title, description });
  return children;
};

export default MetaSetter;
