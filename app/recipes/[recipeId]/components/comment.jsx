import moment from "moment";

export default function Comment({ comment }) {

  // get time relative to current time
  const getRelevantTime = (timeSent) => {
    const now = moment();
    const time = moment(timeSent, 'M/D/YYYY [at] h:mmA');
    const difference = now.diff(time);

    if (difference < 24 * 60 * 60 * 1000) {
      return time.fromNow();
    } else {
      return time.format('M/D/YYYY [at] h:mmA');
    }
  };

  return (
    <div className="rounded-lg bg-white p-2 mb-2 border">
      <div className="flex flex-col mb-2">
        <div className="flex justify-between items-center">
          <strong className="text-xl">{comment.user_name}</strong>
          <p className="text-gray-500">{getRelevantTime(comment.time_sent)}</p>
        </div>
        <p className="text-black mt-2">{comment.text}</p>
      </div>
    </div>
  );
}