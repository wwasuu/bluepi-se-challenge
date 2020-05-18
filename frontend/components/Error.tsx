interface IErrorProps {
    message: string;
    clearError: () => void;
}

const Modal: React.FC<IErrorProps> = ({ message, clearError }) => {

  return (
    <div className="error__mask" onClick={clearError}>
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
