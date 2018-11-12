import React from 'react';

const styleMessage = {
  backgroundColor: "#ff7272",
  color: "white",
  padding: "1em",
}

const Notify = (message) => {
  return (
    <div style={styleMessage}>
      {message}
    </div>
  );
}
export default Notify
