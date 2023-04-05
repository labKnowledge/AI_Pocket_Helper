export default function Button(props) {
  return (
    <button
      className={"btn btn-" + props.color}
      onClick={props.action}
      value={props.value}
    >
      {props.btnName}
    </button>
  );
}
