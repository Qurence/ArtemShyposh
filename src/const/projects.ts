export interface ProjectProps {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: { name: string; color: string }[];
  className?: string;
}

export const projects: ProjectProps[] = [
  {
    title: "U-Pizza",
    description: "Modern web application for ordering pizza, built using advanced web development technologies.",
    image: "assets/u-pizza-img.png",
    link: "https://u-pizza.vercel.app/",
    technologies: [
      { name: "Next.js 14", color: "#477694" },
      { name: "Prisma ", color: "#5f6cd9" },
      { name: "Next.js API Routes", color: "#db9534" },
      { name: "TypeScript", color: "#4a55b8" },
    ],
  },
  {
    title: "UList",
    description: "An application for creating shared lists where you can add people and update lists synchronously in real time.",
    image: "projects/image/demo1.png",
    link: "https://qurence.github.io/ULists/",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
    ],
  },
  {
    title: "#Example Project 1",
    description: "Real-time cryptocurrency dashboard with advanced analytics.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    link: "#",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Redux", color: "#764ABC" },
      { name: "Chart.js", color: "#FF6384" },
    ],
  },
  {
    title: "#Example Project 2",
    description: "A social networking platform focusing on privacy and user experience.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    link: "#",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "GraphQL", color: "#E10098" },
      { name: "PostgreSQL", color: "#336791" },
    ],
  },
  {
    title: "#Example Project 3",
    description: "Location-based weather forecast with interactive maps.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    link: "#",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "OpenWeather API", color: "#FF6B6B" },
      { name: "Leaflet", color: "#199900" },
    ],
  },
  {
    title: "#Example Project 4",
    description: "Personal fitness tracker with workout plans and progress analytics.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "#",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "D3.js", color: "#F9A03C" },
    ],
  },
]; 