import ElementClass from "./ElementClass";

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

  // create todo
  const createTodo = (todo) => {
    const li = ElementClass.createElementObject("li").addClassList(
      `todo ${todo.priority}`
    );
    const label = ElementClass.createElementObject("label")
      .addClassList("todo-check-label")
      .addProperty({ key: "for", value: `todo-${todo.id}` });
    const checkMark = ElementClass.createElementObject("span")
      .addClassList("mdi mdi-check-bold icon xs")
      .getElement();
    const inputCheck = ElementClass.createElementObject("input")
      .addProperty({ key: "name", value: "todo-check" })
      .addProperty({ key: "type", value: "checkbox" })
      .addId(`todo-${todo.id}`)
      .getElement();
    const p = ElementClass.createElementObject("p")
      .addTextContent(todo.name)
      .getElement();
    label.appendChildren([checkMark, inputCheck]).getElement();
    li.appendChildren([label, p]);

    return li.getElement();
  };

  // append todo to dom list when created
  const addProjectToList = (project) => {
    const ul = document.querySelector(".project-list");
    const projectEl = createProject(project);
    ul.appendChild(projectEl);
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

  return {
    createTodo,
    createProject,
    addProjectToList,
    createProjectList,
    createTodoList,
  };
})();

export default UI;
