const styles = {
  mic: {
    margin: "auto",
    position: "absolute",
    top: 100,
    left: 270,
    cursor: "pointer",
  },
  outerDiv: {
    paddingTop: 150,
    paddingLeft: 50,
    backgroundColor: "#ffd600",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  innerDiv: {
    width: "45%",
    float: "left",
    position: "relative",
  },
  promptContainer: {
    marginTop: "4em",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  prompt: {
    marginLeft: 50,
  },
  button: {
    marginTop: 50,
    marginLeft: 50,
  },
  instructions: {
    color: "#ffffff",
    weight: 500,
    fontStyle: "italic",
    fontFamily: "Roboto",
    marginTop: 40,
    marginLeft: 50,
    marginRight: 50,
  },
  innerCircle: {
    backgroundColor: "#ffffff",
    width: 300,
    height: 300,
    borderRadius: "50%",
    position: "absolute",
    top: 25,
    left: 175,
    cursor: "pointer",
    boxShadow: "0px 0px 7px rgba(0,0,0,0.1)",
  },
  outerCircle: {
    width: 350,
    height: 350,
    border: "5px solid #ffffff",
    borderRadius: "50%",
    userSelect: "none",
    position: "absolute",
    top: 0,
    left: 150,
  },
  card: {
    backgroundColor: "#ffffff",
    height: 250,
    width: 400,
    position: "absolute",
    top: 250,
    left: 125,
    borderRadius: 10,
    padding: 20,
    textAlign: "center",
    boxShadow: "0px 0px 7px rgba(0,0,0,0.1)",
  },
  link: {
    textDecoration: "none",
    color: "#2b282e",
  },
  h3: {
    marginBottom: 11,
  },
};

export default styles;
