export default function Comment({ comment }) {
  return (
    <div className="rounded-lg bg-white p-2 mb-2 border border-[#575A65]">
      <div className="flex flex-col mb-2">
        <strong className="text-xl">{comment.user_name}</strong>
        <p className="text-gray-700">{comment.text}</p>
      </div>
    </div>
  );
}
