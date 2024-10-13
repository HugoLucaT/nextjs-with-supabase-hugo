"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function TodoClientCreate() {
  const supabase = createClient();
  const router = useRouter();

  function submitTodo(formData: FormData) {
    const title = formData.get("title")?.toString();
    const priority = formData.get("priority");

    if (!title || !priority) {
      alert("All fields must have a value.");
      return;
    }

    supabase
      .from("todos")
      .insert([{ title, priority }])
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error inserting todo:", error);
          return;
        }
        console.log("Success");
        router.refresh();
      });
  }

  function updateTodo(formData: FormData) {
    const id = formData.get("id")?.toString();
    const title = formData.get("title")?.toString();
    const priority = formData.get("priority");

    if (!id || !title || !priority) {
      alert("All fields must have a value.");
      return;
    }

    supabase
      .from("todos")
      .update({ title, priority })
      .eq("id", id)
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error updating todo:", error);
          return;
        }
        router.refresh();
      });
  }

  return (
    <>
      <h1 className="bold text-orange-500">Client Sided Submit</h1>
      <form>
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" placeholder="Todo Title" required />
        <Label htmlFor="priority">Priority</Label>
        <Input
          type="number"
          name="priority"
          required
          defaultValue={0}
          min={0}
        />
        <SubmitButton pendingText="Adding Todo" formAction={submitTodo}>
          Add
        </SubmitButton>
        <br />
        <Label htmlFor="id">ID</Label>
        <Input
          type="text"
          name="id"
          placeholder="ID of todo you want to update"
        />
        <SubmitButton pendingText="Update Todo" formAction={updateTodo}>
          Update
        </SubmitButton>
      </form>
    </>
  );
}
