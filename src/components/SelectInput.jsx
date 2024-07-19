function SelectInput({ input, name, onChange, value, error }) {
  return (
    <>
      <div className="w-full bg-white px-2 py-1.5 border border-secondary rounded-lg">
        <select
          className="w-full bg-white"
          name={name}
          onChange={onChange}
          value={value}
        >
          {input.map((item, index) => (
            <option
              key={item.title}
              value={item.value}
              disabled={index == 0 ? true : false}
            >
              {item.title}
            </option>
          ))}
        </select>
      </div>
      {error ? <small className="text-red-500">{error}</small> : null}
    </>
  );
}

export default SelectInput;
