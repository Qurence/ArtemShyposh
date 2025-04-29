import Header from "@/components/Header";
import SimpleProjectShowcase from "@/components/SimpleProjectShowcase";
import Footer from "@/components/Footer";

const Showcase = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-accent">My Projects</h1>
            <p className="text-xl text-muted-foreground">A collection of my recent work</p>
          </div>
          
          <SimpleProjectShowcase isShowcase={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Showcase;
