import { Spinner } from "react-bootstrap";

export default function Loader({
  size = "lg",
  color = "dark",
  text = "Please wait..",
}) {
  return (
    <>
      <Spinner animation='border' variant={color} size={size} role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
      <span className='mx-2'>{text}</span>
    </>
  );
}
