/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { getTarget,getFootNoteTarget } from "../core/getTarget";
import HtmlPerfEditor from "./HtmlPerfEditor";
import FootNoteEditor from "./FootNoteEditor";

export default function FootNoteRecursiveBlock({
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
  setFootNotes,
  ...props
}) {
  useEffect(() => {
    if (verbose) console.log("Block: Mount/First Render", index);
    return () => {
      if (verbose) console.log("Block: UnMount/Destroyed", index);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let component;
  // console.log({htmlPerf});
  // console.log("PROPS",{...props});

  let editable = !!content.match(/data-type="paragraph"/);
  let fnote = !!content.match(/data-subtype="f"/);

  if (editable) {
    // console.log("editable content:", content);
    component = <div contentEditable={contentEditable} {...props} />;
  }
  // if (fnote) {
  //   // console.log({ content });
  //   const sequenceId = getFootNoteTarget({ content });
  //   console.log("FOOTNOTE TARGET",sequenceId);
    
  //   if (sequenceId && !options.preview) {
  //   const _props = {
  //     sequenceIds: [...sequenceIds, sequenceId],
  //     addSequenceId,
  //     htmlPerf,
  //     onHtmlPerf,
  //   };
  //   // component = <HtmlPerfEditor {..._props} />;
    
  // }
  // component = <div>footnote</div>
  // }

  if (!editable) {
    // console.log("Non editable content:", content);

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
