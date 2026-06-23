import { useState, useEffect } from "react";

interface Props {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export default function TypewriterText({
  words,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseMs = 1800,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => setIsPaused(false), pauseMs);
      return () => clearTimeout(t);
    }

    const target = words[wordIdx];
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    const t = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(target.slice(0, displayed.length + 1));
        if (displayed.length + 1 === target.length) {
          setIsPaused(true);
          setIsDeleting(true);
        }
      } else {
        setDisplayed(target.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, isDeleting, isPaused, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse ml-0.5 inline-block w-[3px] h-[0.85em] bg-current align-middle rounded-sm" />
    </span>
  );
}
