import { Suspense } from "react";

export default async function RightSidebar() {
  return (
    <div className="h-screen border-l-2 lg:w-1/4 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block">
      <div className="">
        <h1 className="text-2xl font-bold">Suggestion for you</h1>
      </div>
      <div className="mt-5">
        {/* {users.map((item) => (
          <UserListCard user={item} key={item.id} />
        ))} */}
      </div>
    </div>
  );
}