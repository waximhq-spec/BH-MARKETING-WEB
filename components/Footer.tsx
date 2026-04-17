import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="container py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-[11px] font-black tracking-[0.28em] uppercase text-[#EDEDED] mb-1">
            Cinmach Productions
          </p>
          <p className="text-[#666] text-xs">Bahrain · Est. 2022</p>
        </div>

        <nav className="flex flex-wrap gap-6">
          {[
            { label: "Work", href: "/work" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/estimate" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.2em] uppercase text-[#666] hover:text-[#EDEDED] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-[#444] text-xs">
          © {new Date().getFullYear()} Cinmach Productions
        </p>
      </div>
    </footer>
  );
}
