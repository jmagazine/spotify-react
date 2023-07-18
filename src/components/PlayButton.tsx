interface Props {
  icon: string;
}
function PlayButton({ icon }: Props) {
  return (
    <img
      src={"./src/assets/" + icon + ".png"}
      alt="..."
      style={{
        position: "absolute",
        top: "-5%",
        left: "-12%",
        transform: "translate(-50%, -50%)",
        scale: "0.3",
        opacity: "0.7",
      }}
    ></img>
  );
}

export default PlayButton;
