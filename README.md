# STER: Simple Text Editor for React

STER is a collection of libraries that build on top of each other. 

The primary implementation will be focused on ste-perf-html but architected to be useful for other projects needing to edit strings parsable into sections and blocks.

## Packages

### @ster/core 

A core library that others extend to edit their respective file formats.

### @ster/type-perf-html

An implementation of STE for editing HtmlPerf, a block based format based on Epitelete/PERF.

## Pending packages

### @ster/ui-mui

A series of react components to be used with the ste-core to customize the rendering of STE using MUI.

### @ster/ui-tailwind

A series of react components to be used with the ste-core to customize the rendering of STE using tailwind.

### @ster/type-usfm

A precursor to ste-perf-html, STE USFM is an implementation that is a starting point to edit raw USFM files.

### @ster/type-markdown

A markdown implementation that is not comprehensive but a starting point that could use contributions.
