const Image = ({ src, onClick, className }) => {
  return (
    <img
      src={src}
      width={24}
      height={24}
      onClick={onClick}
      alt="controls"
      className={className}
    />
  );
};

export default Image;
