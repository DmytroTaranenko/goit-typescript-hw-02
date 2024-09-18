type Props = {
  onClick: () => void;
};

const LoadMoreBtn = ({ onClick }: Props) => {
  return (
    <button type="button" onClick={onClick}>
      LoadMoreBtn
    </button>
  );
};

export default LoadMoreBtn;
