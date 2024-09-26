const Page = (function () {
  // Build page
  const buildPage = (pageTitle, pageContent) => {
    const header = document.createElement("header");
    header.classList += "header";
    const h1 = document.createElement("h1");
    h1.textContent = pageTitle;
    header.append(h1);
    const content = document.createElement("div");
    content.classList += "content";
    content.append(pageContent);
    const container = document.querySelector(".main-container");
    container.innerHTML = "";
    container.append(header, content);
  };

  return {
    buildPage,
  };
})();

export default Page;
