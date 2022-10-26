/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { getTarget } from "../core/getTarget";
import HtmlPerfEditor from "./HtmlPerfEditor";

export default function RecursiveBlock({
  htmlPerf,
  onHtmlPerf,
  sequenceIds,
  addSequenceId,
  options,
  content,
  style,
  contentEditable,
  index,
  verbose,
  setFootNote,
  ...props
}) {
  useEffect(() => {
    if (verbose) console.log("Block: Mount/First Render", index);
    return () => {
      if (verbose) console.log("Block: UnMount/Destroyed", index);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkReturnKeyPress = (event) => {
    if (event.key === "Enter") {
      let activeTextArea = document.activeElement;
      if (activeTextArea.children.length > 1) {
        const lineBreak = activeTextArea.children[1]?.outerHTML;
        const newLine = lineBreak.replace(/<br\s*\/?>/gi, "&nbsp");
        activeTextArea.children[1].outerHTML = newLine;
      }
    }
  };

  let component;

  let editable = !!content.match(/data-type="paragraph"/);

  if (editable) {
    component = (
      <div
        contentEditable={contentEditable}
        onKeyUp={checkReturnKeyPress}
        {...props}
      />
    );
  }

  if (!editable) {
    const sequenceId = getTarget({ content });

    if (sequenceId && !options.preview) {
      const _props = {
        sequenceIds: [...sequenceIds, sequenceId],
        addSequenceId,
        htmlPerf,
        onHtmlPerf,
      };
      component = <HtmlPerfEditor {..._props} />;
    }
    component ||= <div {...props} contentEditable={false} />;
  }

  return <>{component}</>;
}
