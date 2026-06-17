import { useEffect, useState } from "react";

/** Live local time in a monospace stamp — a small "studio is awake" detail. */
export function Clock({ className }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <span className={className}>
      <span className="text-bone/45">NY</span> {time}
    </span>
  );
}
