// ValidationMessage.js
import React from 'react';

const ValidationMessage = ({ error }) => {
  return error ? <div className="text-danger">{error}</div> : null;
};

export default ValidationMessage;
