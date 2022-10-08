import { Alert } from "react-bootstrap";

export const AlertError = ({ errMsg, setErr }) => {
  return (
    <>
      {setErr ? (
        <Alert
          variant='danger'
          onClose={() => setErr({ show: false, msg: "" })}
          dismissible
        >
          {errMsg.msg}
        </Alert>
      ) : (
        <Alert variant='danger'>{errMsg}</Alert>
      )}
    </>
  );
};

export const AlertSuccess = ({ successMsg, setSuccess }) => {
  return (
    <>
      {setSuccess ? (
        <Alert
          variant='success'
          onClose={() => setSuccess({ show: false, msg: "" })}
          dismissible
        >
          {successMsg.msg}
        </Alert>
      ) : (
        <Alert variant='success'>{successMsg}</Alert>
      )}
    </>
  );
};
