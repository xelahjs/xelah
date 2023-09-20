/**
@module 
@description 
xelah-core is the core library for editing Html components. 
The core can be extended for editing other file formats, 
for instance, HtmlPerf - a block based format based on [Epitelete-html]{@link https://github.com/unfoldingWord/epitelete-html}. 

@see [PERF Github]{@link https://github.com/Proskomma/proskomma-json-tools/tree/main} 
*/
import EditableBlock from "./components/EditableBlock";
import EditableSection from "./components/EditableSection";
import EditableContent from "./components/EditableContent";
import { segmenter } from "./helpers/segmenter";

export {
  EditableBlock,
  EditableSection,
  EditableContent,
  segmenter,
};