export default function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 px-6 md:px-12 lg:px-16 flex justify-between">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-[1px] h-full bg-white/5" />
      ))}
    </div>
  );
}
