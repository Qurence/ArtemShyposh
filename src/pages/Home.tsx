
import SimpleHero from "@/components/SimpleHero";
import SimpleProjectShowcase from "@/components/SimpleProjectShowcase";
import Header from "@/components/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SimpleHero />
        
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              My Projects
            </h2>
            <SimpleProjectShowcase limit={3} />
            
            <div className="mt-12 text-center">
              <a 
                href="#/showcase"
                className="inline-block border border-theme-accent text-theme-accent px-6 py-3 rounded-md hover:bg-theme-accent hover:text-background transition-all duration-300"
              >
                View All Projects
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
