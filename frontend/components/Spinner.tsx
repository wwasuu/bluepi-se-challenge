interface ISpinnerProps {
  message: string;
}

const Spinner: React.FC<ISpinnerProps> = ({ message }) => {
  return (
    <div className="spinner__container">
      <div className="spinner__content">
        <div className="text text--xxl">{message}</div>
      </div>
    </div>
  );
};

export default Spinner;
