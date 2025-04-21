import { Suspense } from "react";
import UserHomePage from "./userhomepage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading user page...</p>}>
      <UserHomePage />
    </Suspense>
  );
}
