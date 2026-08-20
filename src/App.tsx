import { Header } from "./components/Header";
import { About } from "./sections/About";
import { Connect } from "./sections/Connect";
import { Hero } from "./sections/Hero";
import { Process } from "./sections/Process";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Process />
        <Connect />
      </main>
      <footer className="site-footer">
        <span>Copyright 2026 Muhammad Dzikrul Kahfi</span>
        <span>KV</span>
      </footer>
    </>
  );
}

export default App;
