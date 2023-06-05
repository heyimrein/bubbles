import "./App.css";
import { useState, Fragment } from "react";
import { InputBubble } from "./components/InputBubble.tsx";

type Bubble = {
  key: number;
  text: string;
};

function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");
  const [bubbles, setBubbles] = useState<Bubble[]>([{ key: 0, text }]);

  const renderBubble = (bubble: Bubble, idx: number) => {
    const isCurrent = idx === 0;
    return (
      <Fragment key={bubble.key}>
        <InputBubble
          text={isCurrent ? text : bubble.text}
          idx={idx}
          removeBubble={removeBubble}
          isLast={idx === bubbles.length - 1}
        />
      </Fragment>
    );
  };

  const addBubble = () => {
    const newBubbles = Object.assign([], bubbles);
    newBubbles.splice(1, 0, { key: count, text });
    newBubbles.splice(0, 1, { key: count + 1, text: "" });
    setBubbles(newBubbles);
    setCount(count + 2);
    setText("");
  };

  const removeBubble = () => {
    const newBubbles = Object.assign([], bubbles);
    newBubbles.pop();
    setBubbles(newBubbles);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text === "") return;
          addBubble();
        }}
      >
        <input
          autoFocus
          className="input-field"
          type="text"
          onBlur={(e) => e.target.focus()}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </form>
      <div className="app-wrapper flex flex-col-reverse">
        {bubbles.map(renderBubble)}
      </div>
    </>
  );
}

export default App;
