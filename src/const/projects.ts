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
    title: "U-Tech",
    description: "E-commerce platform for high-quality used electronics with warranty, fast delivery, and 24/7 support.",
    image: "assets/u-tech-img.png",
    link: "https://utech-vert.vercel.app/",
    technologies: [
      { name: "Next.js", color: "#242323" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#38BDF8" },
      { name: "Shadcn/ui", color: "#8989fa" },
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
    title: "Parallax Fairy Forest",
    description: "A visually rich parallax website featuring a magical forest with animated layers and interactive gallery.",
    image: "projects/project1/img/demo1.png",
    link: "projects/project1/index.html",
    technologies: [
      { name: "HTML", color: "#E44D26" },
      { name: "CSS", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "GSAP", color: "#88CE02" },
    ],
  },
  {
    title: "Witcher Parallax Slider",
    description: "A parallax slider inspired by The Witcher universe, with animated character cards and interactive backgrounds.",
    image: "projects/project2/img/demo.png",
    link: "projects/project2/index.html",
    technologies: [
      { name: "HTML", color: "#E44D26" },
      { name: "CSS", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "Swiper.js", color: "#6332F6" },
      { name: "Particles.js", color: "#B99970" },
    ],
  },
  {
    title: "Natural Forest Weather",
    description: "A 3D website with a lens effect and animated rain, showcasing a natural forest weather scene.",
    image: "projects/project3/img/demo.png",
    link: "projects/project3/index.html",
    technologies: [
      { name: "HTML", color: "#E44D26" },
      { name: "CSS", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
    ],
  },
  {
    title: "Hogwarts New Year",
    description: "Landing page for a magical New Year event at Hogwarts, with interactive sections and festive design.",
    image: "projects/project4/js/../Sources/header.png",
    link: "projects/project4/index.html",
    technologies: [
      { name: "HTML", color: "#E44D26" },
      { name: "CSS", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
    ],
  },
]; 