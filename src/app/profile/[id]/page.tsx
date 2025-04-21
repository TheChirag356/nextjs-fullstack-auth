export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen py-2 text-center">
      <h1>Profile Page</h1>
      <hr />
      <p className="text-4xl">
        Profile Page{" "}
        <span className="rounded-xl ml-2 p-2 bg-orange-500 text-black">
          {id}
        </span>
      </p>
    </div>
  );
}
