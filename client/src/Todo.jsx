import React, { useState } from "react";
import axios from "axios";

const Todo = () => {
  const [input, setinput] = useState("");

  //    handle submit value to db
  const handleSubmit = async () => {
    try {
      await axios
        .post("http://localhost:3000/post", { todo: input })
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="enter something"
        value={input}
        onChange={(e) => setinput(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default Todo;
