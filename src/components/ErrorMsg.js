import React from 'react';
import './css/ErrorMsg.scss';

const ErrorMsg = ({ message }) => (
  <div className="alert alert-danger ErrorMsg" role="alert">
    {message}
  </div>
);

export default ErrorMsg;