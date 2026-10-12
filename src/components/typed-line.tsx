// Server-rendered typing effect. Screen readers and no-motion users get the
// whole line at once; everyone else sees it typed once, then it stays still.
export function TypedLine({
  text,
  as: Tag = "p",
  className,
  style,
}: {
  text: string;
  as?: "p" | "h1";
  className?: string;
  style?: React.CSSProperties;
}) {
  const chars = Array.from(text);
  return (
    <Tag className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, i) => (
          <span key={i} className="type-char" style={{ "--i": i } as React.CSSProperties}>
            {char}
          </span>
        ))}
        <span className="type-caret" style={{ "--n": chars.length } as React.CSSProperties} />
      </span>
    </Tag>
  );
}
