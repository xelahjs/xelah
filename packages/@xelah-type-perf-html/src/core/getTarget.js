import { Children } from "react";

export const getTarget = ({ content }) => {
  const div = document.createElement("div");
  div.innerHTML = content;

  const { target } = div.firstChild?.dataset || {};

  return target;
};

export const getFootNoteTarget =  ({ content }) => {
  const div = document.createElement("div");
  div.innerHTML = content;
console.log("getfootnoteTarget",div)

  const { target } = div.getElementsByClassName("graft")[0]?.dataset || {};

  return target;
};