export default function UserInfoCard({ username, email }) {
  return (
    <>
      <div className="w-full max-w-md space-y-4 mb-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-700 gap-x-4">
          <span className="text-lg font-medium text-gray-400">Username</span>
          <span className="text-lg text-white">{username || "N/A"}</span>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <span className="text-lg font-medium text-gray-400">Email</span>
          <span className="text-lg text-white">{email || "N/A"}</span>
        </div>
      </div>
    </>
  );
}
