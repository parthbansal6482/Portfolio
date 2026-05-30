export default function Navbar() {
  const navItems = ["Our story", "Skills", "Collective", "Inquiries"];

  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 border-x border-b border-neutral-900">
      <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            style={{ color: 'rgba(225, 224, 204, 0.8)' }}
            className="text-[10px] sm:text-xs md:text-sm font-normal tracking-wider uppercase transition-colors duration-300 hover:!text-[#E1E0CC] whitespace-nowrap"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
