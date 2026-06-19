export function BlobertParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(10)].map((_, index) => (
        <span
          key={index}
          className="absolute h-3 w-3 rounded-full bg-white/45"
          style={{
            left: `${10 + index * 8}%`,
            top: `${12 + ((index * 17) % 70)}%`,
          }}
        />
      ))}
    </div>
  );
}
