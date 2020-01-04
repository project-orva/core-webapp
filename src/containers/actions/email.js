const emailAction = ({ text = "" }) => ({
  type: "EMAIL",
  text
});

export default emailAction;
