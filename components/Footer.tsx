import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-16"
      style={{ borderColor: "rgba(255,255,255,0.1)", background: "#000000" }}
    >
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        <div>
          <p className="text-[12px] font-black tracking-[0.4em] uppercase text-white mb-2">
            Cinmach Productions
          </p>
          <p className="text-[#888] text-[10px] tracking-[0.1em] uppercase">Built for Impact · Bahrain · 2024</p>
        </div>

        <nav className="flex flex-wrap gap-8">
          {[
            { label: "Work", href: "/work" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/estimate" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-black tracking-[0.25em] uppercase text-[#888] hover:text-[#C50022] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-[#444] text-[10px] font-medium tracking-widest uppercase">
          © Cinmach Productions
        </p>
      </div>
    </footer>
  );
}
