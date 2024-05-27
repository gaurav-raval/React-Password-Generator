import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  // console.log(length);
  console.log(password);

  const passworRef = useRef(null);

  function copyPassword(){
    passworRef.current.select();

    navigator.clipboard.writeText(password);
  }

  const PasswordGenertor = useCallback(()=>{

    let charNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      charNum += "0123456789";
    }
    if (charAllowed) {
      charNum += "!@#$%^&*()_+";
    }

    let pass = "";

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * charNum.length);
      pass += charNum[randomNumber];

    }
    setPassword(pass);

  },[length, numberAllowed, charAllowed])

  useEffect(() => {
    PasswordGenertor();
  }, [length, numberAllowed, charAllowed, PasswordGenertor]);

  return (
    <>
      <div className="border-4 border-black p-5 bg-gray-600 text-white">
        <div className="flex items-center w-full justify-center  text-black">
          <input
            className=" border-2 border-gray-800 rounded-l-md h-8  w-56  "
            type="text"
            readOnly
            value={password}
            id="1"
            ref={passworRef}
          />
          <button onClick={copyPassword} className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 px-2 rounded-r text-center border-2  border-gray-800 ">
            copy
          </button>
        </div>

        <div className=" bottom flex items-center justify-center   ">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            id="2"

            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label htmlFor="2" className="ml-2">Length: {length}</label>
          <div className=" ml-2  pr-2 flex  justify-center items-center ">
            <input
              onChange={() => setNumberAllowed(!numberAllowed)}
              className="mt-1"
              type="checkbox"
              name="number"
              id="NumberInput"
            />
            <label htmlFor="NumberInput" >Number</label>
          </div>

          <div className=" ml-2  pr-2 flex items-center  justify-center   ">
            <input
              onChange={() => setCharAllowed(!charAllowed)}
              className="mt-1"
              type="checkbox"
              name="character"
              id="CharFor"
            />
            <label htmlFor="CharFor">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
