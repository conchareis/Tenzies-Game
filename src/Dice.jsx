export default function Dice(props) {
  const style = {
    backgroundColor: props.isHeld ? "#7E7EA8" : "white",
    color: props.isHeld ? "white" : "black",
  };
  return (
    <div className="dice-face" style={style} onClick={props.holdDice}>
      <h2 className="dice-num">{props.value}</h2>
    </div>
  );
}
