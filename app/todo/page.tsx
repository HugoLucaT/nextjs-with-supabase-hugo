import TodoServer from "@/components/todo/TodoServer";
import TodoClient, { Todo } from "@/components/todo/TodoClient";
import TodoServerCreate from "@/components/todo/TodoServerCreate";
import TodoClientCreate from "@/components/todo/TodoClientCreate";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  let { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .is("deleted_at", null);
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h1 className="bold text-pink-500">Todo Server</h1>
        <TodoServer todos={todos as Todo[]} />
        <TodoServerCreate />
        <hr />
        <h1 className="bold text-blue-500">Todo Client</h1>
        <TodoClient />
        <TodoClientCreate />
      </main>
    </>
  );
}
