import type { MetaFunction } from "@remix-run/node";

interface Taskdata {
  title: string;
  description: string;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const metaFn: MetaFunction = ({ matches, data }) => {
  const taskPage = matches?.find((match) => match.id === "routes/task.$id");
  let pageTitle;

  if (matches) {
    matches.forEach((match) => {
      if (match.id !== "root" && match.pathname !== "/") {
        if (match.id !== "routes/task.$id") {
          console.log(match.pathname);

          pageTitle = `${match.pathname.replace(/\//g, "").replace(/-/g, " ")}`;
        }
      } else {
        pageTitle = "Task manager";
      }
    });
  }

  type Task = {
    task: {
      title: string;
      description: string;
    };
  };

  if (taskPage) {
    const mData = data as Task;
    const task = mData.task;
    return getTaskMeta(task);
  }

  return getTaskMeta({
    title: `${pageTitle}`,
    description: "Manage your tasks.",
  });
};

function getTaskMeta(task: Taskdata) {
  const title = capitalizeFirstLetter(task.title);

  return [
    { title },
    { name: "description", content: task.description },
    { property: "og:title", content: title },
    { property: "og:description", content: task.description },

    { name: "twitter:title", content: title },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "https://codingsimba.com" },
    { name: "twitter:creator", content: "@codingsimba_" },
    { name: "twitter:description", content: task.description },
  ];
}
