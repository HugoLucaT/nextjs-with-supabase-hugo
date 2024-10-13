import { formatDate } from "@/utils/utils";
import { Todo } from "./TodoClient";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Button } from "../ui/button";

export default async function TodoServer({ todos }: { todos: Todo[] }) {
  async function deleteTodo(id: Number) {
    "use server";
    const supabase = createClient();

    const { data, error } = await supabase
      .from("todo")
      .update({ deleted: new Date() })
      .eq("id", id)
      .select();

    // if (error) {
    //   console.error("Error deleting todo:", error);
    // } else {
    //   console.log("Todo deleted:", data);
    // }

    /*if (data) {
      return revalidatePath("/todo");
    }*/
    revalidatePath("/todo");
    return { data };
  }

  async function updateTodo(id: Number) {
    "use server";
    const supabase = createClient();

    const { data, error } = await supabase
      .from("todo")
      .update({ deleted: new Date() })
      .eq("id", id)
      .select();

    // if (error) {
    //   console.error("Error deleting todo:", error);
    // } else {
    //   console.log("Todo deleted:", data);
    // }

    /*if (data) {
      return revalidatePath("/todo");
    }*/
    revalidatePath("/todo");
    return { data };
  }
  if (!todos || todos.length === 0) return <h1>No todos found</h1>;

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <table className="table-auto w-full  border border-gray-300">
          <thead className=" border-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="border border-gray-300">
                <td className="px-4 py-2">{todo.id}</td>
                <td className="px-4 py-2">{todo.title}</td>
                <td className="px-4 py-2">{todo.priority}</td>
                <td className="px-4 py-2">
                  {formatDate(todo.created_at as unknown as number)}
                </td>
                {/*
                <td className="px-4 py-2">
                  <form>
                    <Button formAction={() => deleteTodo(todo.id)}>x</Button>
                  </form>
                </td>
                */}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
