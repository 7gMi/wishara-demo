import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/gifts", label: "Gifts" },
  { href: "/creators", label: "Creators" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            Built by{" "}
            <a
              href="https://mihaigaina.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
            >
              Mihai Gaina
            </a>
          </p>

          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-primary-600 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
