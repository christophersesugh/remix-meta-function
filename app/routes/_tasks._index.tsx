import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { tasks } from "~/utils/tasks.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix meta function" },
    { name: "description", content: "demystifying the remix meta function" },
  ];
};

export async function loader() {
  return json({ tasks }, 200);
}

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Tasks</h1>
      <Link to="terms-of-use">Terms of use</Link>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={`${task.id}-${index}`}>
              <a href={`/task/${task.id}`}>{task.title}</a>
            </li>
          ))
        ) : (
          <p>No tasks</p>
        )}
      </ul>
    </div>
  );
}
