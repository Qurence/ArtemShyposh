import Header from "@/components/Header";
import Footer from "@/components/Footer";

const contacts = [
  { label: "Email", value: "shyposhartem.biz@gmail.com", href: "mailto:shyposhartem.biz@gmail.com" },
  { label: "Telegram", value: "@qurence_dev", href: "https://t.me/qurence_dev" },
  { label: "Location", value: "Ukraine, Kyiv" },
  { label: "GitHub", value: "github.com/Qurence", href: "https://github.com/Qurence" },
  { label: "LinkedIn", value: "linkedin.com/in/artem-shyposh-97135a352", href: "https://linkedin.com/in/artem-shyposh-97135a352" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Qurence" },
  { label: "LinkedIn", href: "https://linkedin.com/in/artem-shyposh-97135a352" },
  { label: "Telegram", href: "https://t.me/qurence_dev" },
];

const skills = [
  {
    title: "Frontend Development",
    items: ["JavaScript (ES6+)", "React.js", "Next.js", "HTML5", "CSS3 / SASS"],
  },
  {
    title: "Backend Development",
    items: ["Node.js & Express.js", "Python (Flask / FastAPI)"]
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB"]
  },
  {
    title: "Version Control & Tools",
    items: ["Git & GitHub", "VS Code"]
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16 px-4 md:px-8 lg:px-0">
        <div className="container mx-auto max-w-4xl">
          <section className="bg-white dark:bg-[#181818] rounded-2xl shadow-lg p-8 md:p-12 mb-10 border border-theme-accent/40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1 tracking-tight">Shyposh Artem</h1>
                <h2 className="text-lg md:text-xl font-semibold text-theme-accent mb-2">Full Stack Developer</h2>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {contacts.map((c) => c.href ? (
                    <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-theme-accent underline underline-offset-2">{c.value}</a>
                  ) : (
                    <span key={c.label}>{c.value}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <a href="https://github.com/Qurence" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-theme-accent text-theme-accent font-semibold hover:bg-theme-accent/10 transition">GitHub</a>
                  <a href="https://linkedin.com/in/artem-shyposh-97135a352" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-theme-accent text-theme-accent font-semibold hover:bg-theme-accent/10 transition">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-theme-accent">Educational Background</h3>
                <div className="mb-4">
                  <div className="font-medium">International Scientific and Technical University named after Y. Bugay</div>
                  <div className="text-sm text-muted-foreground">Software development, 2020 - 2024</div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-theme-accent">Relevant Courses</h3>
                <div className="mb-4">
                  <div className="font-medium">Genius Space</div>
                  <div className="text-sm text-muted-foreground">Full Stack Developer</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-theme-accent">Professional Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((block) => (
                    <div key={block.title}>
                      <div className="font-medium mb-1 text-theme-accent">{block.title}</div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
