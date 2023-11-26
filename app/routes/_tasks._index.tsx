import React from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import { metaFn } from "~/utils/meta";
import { tasks as rTasks } from "~/utils/tasks.server";

export const meta = metaFn;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const tasks = search
    ? rTasks.filter((task) => task.title.toLowerCase().includes(search))
    : rTasks;
  return json({ tasks }, 200);
}

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Tasks</h1>
      <Link to="terms-of-use">Terms of use</Link>
      <br />
      <br />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search tasks"
        onChange={(e) => {
          submit(
            { [e.target.name]: e.target.value },
            { preventScrollReset: true },
          );
        }}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
        }}
      />
      <ul>
        {tasks.length ? (
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
