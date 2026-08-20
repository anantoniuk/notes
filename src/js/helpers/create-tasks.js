import Handlebars from "handlebars";
import taskListTemplate from "bundle-text:../../template/tasks-list.hbs";

Handlebars.registerHelper("equal", (a, b) => a === b);

export const createdTaskMurkup = Handlebars.compile(taskListTemplate);
