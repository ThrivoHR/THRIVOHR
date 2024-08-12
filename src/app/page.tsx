import { redirect } from "next/navigation";

function isAuthenticated() {
  return false;
}

export default function Home() {
  const authenticated = isAuthenticated();
  if (!authenticated) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

