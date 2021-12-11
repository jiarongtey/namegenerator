import { useState, useEffect } from "react";

export default function Home() {
  const [type, setType] = useState("Application");
  const [names, setNames] = useState([]);
  const [size, setSize] = useState(0);
  const [result, setResult] = useState("");

  const handleChange = async (e) => {
    const value = e.target.value;
    setType(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * (size + 1));
    setResult(names[random]);
  };

  useEffect(() => {
    if (type !== "") {
      fetch("/" + type + ".txt")
        .then((r) => r.text())
        .then((text) => {
          const lines = text.split("\n");
          setSize(lines.length);
          const newNames = [];
          lines.forEach((line) => {
            newNames.push(line);
          });
          setNames(newNames);
        });
    }
  }, [type]);

  return (
    <div>
      <div className="mt-5 mx-5">
        <h1 className="font-bold text-3xl ">Name Generator</h1>
        <div className="badge badge-accent mt-3 ml-1">machine</div>
        <div className="badge badge-secondary mt-3 ml-1">jinx</div>
        <div className="badge badge-primary mt-3 ml-1">fast</div>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="pt-6 pl-20 pr-20 pb-6 mt-5 card bordered  w-11/12 ">
            <label className="cursor-pointer label">
              <span className="label-text">Application</span>
              <input
                onClick={handleChange}
                type="radio"
                defaultChecked={true}
                name="action"
                className="radio radio-primary"
                value="Application"
              />
            </label>
            <label className="cursor-pointer label">
              <span className="label-text">Human</span>
              <input
                onClick={handleChange}
                type="radio"
                name="action"
                className="radio radio-secondary"
                value="Human"
              />
            </label>
            <label className="cursor-pointer label">
              <span className="label-text">Company</span>
              <input
                onClick={handleChange}
                type="radio"
                name="action"
                className="radio radio-accent"
                value="Company"
              />
            </label>
          </div>
          <div>
            <button
              className="btn btn-lg mt-5 float-right mr-30 sm:mr- md:mr-20 mb-5 w-auto"
              type="submit"
            >
              Generate La
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 ml-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
            <div className="mockup-code mt-5 w-1/2">
              <pre data-prefix="$">
                <code>{type}</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>Wait la dey ...</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>Settle!</code>
              </pre>
            </div>
          </div>
        </form>

        <h1 className="text-2xl mt-5"> Results </h1>

        <div className="pt-6 pl-20 pr-20 pb-6 mt-5 card bordered  w-11/12 ">
          <code>{result}</code>
        </div>
      </div>
    </div>
  );
}
