import ElementClass from "./ElementClass";
import Todos from "./Todos";

const UI = (function () {
  // create project
  const createProject = (project) => {
    const li = ElementClass.createElementObject("li").addClassList("project");
    const projectColor = ElementClass.createElementObject("span")
      .addClassList("project-color")
      .addTextContent("#")
      .addStyle({ key: "color", value: project.color.value })
      .getElement();
    const p = ElementClass.createElementObject("p")
      .addTextContent(project.name)
      .getElement();
    const todoCounts = ElementClass.createElementObject("span")
      .addTextContent(project.todoCounts)
      .getElement();

    li.appendChildren([projectColor, p, todoCounts]);

    return li.getElement();
  };

  const toggleTodoStatus = (e) => {
    const todoEl = e.target.parentElement.parentElement;
    const id = +todoEl.dataset.id;
    const status = e.target.checked ? "completed" : "uncompleted";
    Todos.updateTodo(id, { status });
  };

  // create todo
  const createTodo = (todo) => {
    const li = ElementClass.createElementObject("li").addClassList(
      `todo ${todo.priority} ${
        todo.status === "new" || todo.status === "uncompleted"
          ? ""
          : todo.status
      }`
    );

    let label = ElementClass.createElementObject("label")
      .addClassList("todo-check-label")
      .addProperty({ key: "for", value: `todo-${todo.id}` });

    const checkMark = ElementClass.createElementObject("span")
      .addClassList("mdi mdi-check-bold icon xs")
      .getElement();

    let inputCheck = ElementClass.createElementObject("input")
      .addProperty({ key: "name", value: "todo-check" })
      .addProperty({ key: "type", value: "checkbox" })
      .addId(`todo-${todo.id}`);

    if (todo.status === "completed") {
      inputCheck.addProperty({ key: "checked", value: "checked" });
    }

    const p = ElementClass.createElementObject("p")
      .addTextContent(todo.title)
      .getElement();

    inputCheck = inputCheck.getElement();

    inputCheck.addEventListener("change", toggleTodoStatus);

    label.appendChildren([checkMark, inputCheck]);

    label = label.getElement();

    li.appendChildren([label, p]);
    li.addProperty({ key: "data-id", value: todo.id });

    return li.getElement();
  };

  // append todo to dom list when created
  const addProjectToList = (project) => {
    const ul = document.querySelector(".project-list");
    const projectEl = createProject(project);
    ul.appendChild(projectEl);
  };

  const addTaskToList = (task) => {
    const ul = document.querySelector(".todo-list");
    const todoEl = createTodo(task);
    ul.appendChild(todoEl);
  };

  // create project list
  const createProjectList = (ul, projects) => {
    ul.innerHTML = "";

    const projectList = projects.map((project) => {
      return createProject(project);
    });

    ul.append(...projectList);
  };

  // create todo list
  const createTodoList = (ul, todos) => {
    ul.innerHTML = "";

    todos = todos.map((todo) => {
      return createTodo(todo);
    });

    ul.append(...todos);
  };

  const createSectionList = (ul, sectionObject) => {
    ul.innerHTML = "";
    let keys = Object.keys(sectionObject);

    keys = keys.map((key) => {
      const section = ElementClass.createElementObject("li");
      const h3 = ElementClass.createElementObject("h3")
        .addTextContent(key)
        .getElement();

      let ul =
        ElementClass.createElementObject("ul");

      const list = sectionObject[key].map((el) => {
        return createTodo(el);
      });

      ul.appendChildren([...list]);

      ul = ul.getElement();

      section.appendChildren([h3, ul]);
      return section.getElement();
    });
    ul.append(...keys);
  };

  return {
    createTodo,
    createProject,
    addProjectToList,
    createProjectList,
    createTodoList,
    addTaskToList,
    createSectionList,
  };
})();

export default UI;
