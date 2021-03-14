import Link from "next/link";
import { MouseEventHandler } from "react";
import classes from "./button.module.css";

const Button: React.FC<{
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = (props) => {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
