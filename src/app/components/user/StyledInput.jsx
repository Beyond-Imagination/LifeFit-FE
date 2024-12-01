import "../../../styles/user/StyledInput.css";

export default function StyledInput({
  name,
  type = "text",
  value,
  onChange,
  readOnly,
}) {
  return (
    <div className="input-box">
      <label>{name}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}
