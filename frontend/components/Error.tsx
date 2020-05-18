
import { useDispatch } from "react-redux";
import { ErrorClearAction } from "../redux/store";

interface IErrorProps {
    message: string;
}

const Modal: React.FC<IErrorProps> = ({ message }) => {
  const dispatch = useDispatch();
  return (
    <div className="error__mask" onClick={() => dispatch(ErrorClearAction())}>
      <div className="error__container border--pixel">
        <div className="error__content">
          <div>Error</div>
          <div className="error__message">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
