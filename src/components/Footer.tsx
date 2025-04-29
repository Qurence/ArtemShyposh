import { Link } from "react-router-dom";

const githubUrl = "https://github.com/qurence";
const linkedinUrl = "https://www.linkedin.com/in/artem-shyposh/";
const telegramUrl = "https://t.me/qurence_dev";
const email = "shyposhartem@gmail.com";
const cvUrl = "/cv.pdf";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 text-center md:text-left">
        {/* Лого */}
        <div className="flex flex-col items-center md:items-start justify-between min-w-[120px]">
          <Link to="/" className="text-2xl font-bold text-theme-accent custom-font mb-4 md:mb-0">AS</Link>
        </div>
        {/* Ссылки */}
        <div className="flex flex-1 flex-col md:flex-row justify-between gap-8 md:gap-20 items-center md:items-start">
          <div>
            <h4 className="font-semibold mb-2 text-theme-accent">RESOURCES</h4>
            <ul className="space-y-1">
              <li>
                <a href={cvUrl} download className="hover:text-theme-accent transition-colors">My Resume</a>
              </li>
              <li>
                <Link to="/showcase" className="hover:text-theme-accent transition-colors">Showcase</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-theme-accent">FOLLOW ME</h4>
            <div className="flex gap-4 mt-2 justify-center md:justify-start">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-theme-accent transition-colors">
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" fill="currentColor"/></svg>
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-theme-accent transition-colors">
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" fill="currentColor"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-theme-accent">SAY HELLO</h4>
            <ul className="space-y-1">
              <li>
                <a href={`mailto:${email}`} className="hover:text-theme-accent transition-colors">{email}</a>
              </li>
              <li>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-theme-accent transition-colors">@qurence_dev</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-4 pb-2 px-4 flex items-center justify-center max-w-7xl mx-auto">
        <span className="text-xs text-muted-foreground text-center w-full">© 2025 Artem Shyposh. All Rights Reserved.</span>
      </div>
    </footer>
  );
} 