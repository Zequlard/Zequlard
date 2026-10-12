export function PageHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 pt-16 pb-12 lg:grid-cols-12 lg:pt-24">
      <p className="label lg:col-span-3 lg:pt-4">{eyebrow}</p>
      <div className="lg:col-span-8">
        <h1 className="text-step-3 leading-[1.05] font-light tracking-tight">{title}</h1>
        {children && <div className="text-mute mt-6 max-w-[38rem] text-step-1 leading-snug">{children}</div>}
      </div>
    </div>
  );
}
