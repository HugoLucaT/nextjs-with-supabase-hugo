import { useUserContext } from "@/app/context";
export default function User() {
  const user = useUserContext();

  return (
    <div>
      <h1>User</h1>
      <div>
        <div>
          <label>Username:</label>
          <p>{user.username}</p>
        </div>
        <div>
          <label>Email:</label>
          <p>{user.email}</p>
        </div>
        <div>
          <label>Name:</label>
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
}
