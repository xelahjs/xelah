export default function sectionParser({ divs }) {
  return (
    () => {
      let sections = [];
      let queue = [];

      Array.from(divs.content().children, (block) => {
        const { type } = block.dataset;
        const isBlock = type === "block";

        if (isBlock) {
          const isChapter = block.firstChild?.dataset?.type === "chapter";

          if (isChapter) {
            // remove last grafts preceding chapter
            let checkLastInQueue = true;
            let headerQueue = [];

            while (checkLastInQueue) {
              if (queue.length > 0) {
                const last = queue.pop();
                const isGraft = last.dataset.type === "graft";
                const isTitle = [...last.classList].includes("title");
                const isIntro = [...last.classList].includes("introduction");

                if (isGraft && !isTitle && !isIntro) {
                  headerQueue = [...headerQueue, last];
                } else {
                  queue = [...queue, last];
                  checkLastInQueue = false;
                }
              } else {
                checkLastInQueue = false;
              }
            };
            sections = [...sections, queue];
            queue = [...headerQueue.reverse()];
          };
        };

        queue = [...queue, block];
        return true;
      });
      sections = [...sections, queue];
      queue = [];

      return sections.map(section => section.map(block => block.outerHTML).join('\n'));
    }
  );
};