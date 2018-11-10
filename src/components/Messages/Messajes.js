import React, { Component } from 'react';

const styleMessage = {
  backgroundColor: "#ff7272",
  color: "white",
  padding: "1em",
}

const Messajes = (message) => {
  return (
    <div style={styleMessage}>
      {message}
    </div>
  );
}
export default Messajes
