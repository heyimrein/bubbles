import { motion } from "framer-motion";
import "./InputBubble.css";
import { useEffect, useState } from "react";

export function InputBubble(props: {
  text: string;
  idx: number;
  removeBubble: () => void;
  isLast: boolean;
}) {
  const [hide, setHide] = useState(false);

  const isEmpty = props.text === "";
  const isCurrent = props.idx === 0;

  useEffect(() => {
    if (props.idx > 5) {
      setHide(true);
      const timeout = setTimeout(props.removeBubble, 100);
      return () => clearTimeout(timeout);
    } else if (props.isLast && props.idx !== 0) {
      let newTimeout = 0;
      const timeout = setTimeout(() => {
        setHide(true);
        newTimeout = setTimeout(props.removeBubble, 100);
      }, 5000);
      return () => {
        clearTimeout(timeout);
        clearTimeout(newTimeout);
      };
    }
  }, [props.removeBubble, props.idx]);

  return (
    <>
      <motion.span
        className={"input-bubble" + (isCurrent ? " current" : "")}
        initial={{
          x: isCurrent ? -100 : 0,
          marginBottom: isCurrent ? "1em" : "-1.9em",
          borderRadius: "1em 1em 1em 0.1em",
        }}
        animate={{
          x: isEmpty && isCurrent ? -100 : hide ? -500 : 0,
          marginBottom: isCurrent ? "1em" : "0.2em",
          borderRadius: "1em 1em 1em " + (isCurrent ? "0.1em" : "1em"),
        }}
      >
        {props.text}
      </motion.span>
    </>
  );
}
