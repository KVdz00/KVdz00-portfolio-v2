import { Capabilities } from "./components/Capabilities";
import { Contact } from "./components/Contact";
import { FeaturedWork } from "./components/FeaturedWork";
import { Hero } from "./components/Hero";
import { ProfileAndMoreWork } from "./components/ProfileAndMoreWork";
import { ProofStrip } from "./components/ProofStrip";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProofStrip />
        <FeaturedWork />
        <Capabilities />
        <ProfileAndMoreWork />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
