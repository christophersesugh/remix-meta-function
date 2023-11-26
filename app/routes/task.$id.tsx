import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { metaFn } from "~/utils/meta";
import { tasks } from "~/utils/tasks.server";

export const meta = metaFn;

export async function loader({ params }: LoaderFunctionArgs) {
  const taskId = Number(params.id);

  return json({ task: tasks.find((task) => task.id === taskId) }, 200);
}

export default function Task() {
  const { task } = useLoaderData<typeof loader>();
  return (
    <div>
      <Link to="/">
        <button>back to tasks</button>
      </Link>
      <h1>{task?.title}</h1>
      <p>{task?.description}</p>
    </div>
  );
}
