export default function Flag({ code, name, size = 32 }) {
  if (!code) {
    return (
      <div
        className="flex items-center justify-center rounded-sm bg-pitch-700 text-[10px] text-gray-400"
        style={{ width: size, height: size * 0.75 }}
        title={name}
      >
        ?
      </div>
    );
  }
  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      alt={name}
      title={name}
      width={size}
      height={size * 0.75}
      className="rounded-sm object-cover shadow-sm ring-1 ring-white/10"
      loading="lazy"
    />
  );
}
