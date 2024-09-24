import ElementClass from "./ElementClass";

const Page = (function () {
  // create page using page tree
  const createPage = (pageTree) => {
    const page = pageTree.map((el) => {
      let elChildren;
      if (el.children) {
        elChildren = el.children.map((el) => {
          const childElement = ElementClass.createElementObject(el.element);

          if (el.textContent) {
            childElement.addTextContent(el.textContent);
          }

          if (el.classList) {
            childElement.addClassList(el.classList);
          }

          return childElement.getElement();
        });
      }

      const element = ElementClass.createElementObject(el.element);

      if (el.classList) {
        element.addClassList(el.classList);
      }

      if (el.textContent) {
        element.addTextContent(el.textContent);
      }

      if (el.children) {
        element.appendChildren(elChildren);
      }

      return element.getElement();
    });

    return page;
  };

  // get page using page tree
  const getPage = (pageTree) => {
    const page = createPage(pageTree);
    return page;
  };

  return {
    getPage,
  };
})();

export default Page;
