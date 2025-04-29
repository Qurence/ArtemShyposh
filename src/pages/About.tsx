import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-accent">About Me</h1>
            <p className="text-xl text-muted-foreground">Coming Soon</p>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <p className="text-xl">Check back later for more details</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
