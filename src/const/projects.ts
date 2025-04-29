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
    title: "UList",
    description: "An application for creating shared lists where you can add people and update lists synchronously in real time.",
    image: "projects/image/demo1.png",
    link: "https://qurence.github.io/ULists/",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Firebase", color: "#FFCA28" },
    ],
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: "#",
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
      { name: "MongoDB", color: "#47A248" },
    ],
  },
  {
    title: "Crypto Dashboard",
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
    title: "Social Network",
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
    title: "Weather App",
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
    title: "Fitness Tracker",
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