import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Our Shopping App</h1>
      <p>Find the best products at unbeatable prices.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "80px",
  }
};

export default Home;
