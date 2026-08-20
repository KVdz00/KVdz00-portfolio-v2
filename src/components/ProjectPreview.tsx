import type { PreviewKind } from "../types/portfolio";

export function ProjectPreview({ type }: { type: PreviewKind }) {
  return (
    <div className={`project-preview ${type}`} aria-hidden="true">
      {type === "utility" && (
        <>
          <div className="liquid-rail">
            <strong>LU</strong>
            {["Dashboard", "Games", "Hardware", "Media", "Settings"].map(
              (item) => (
                <span key={item}>{item}</span>
              ),
            )}
          </div>
          <div className="liquid-main">
            <div className="liquid-topbar">
              <div>
                <span>Liquid Utility</span>
                <strong>Game Launcher</strong>
              </div>
              <b>Add Game</b>
            </div>
            <p className="liquid-description">
              Launch and manage local Windows games.
            </p>
            <div className="liquid-library-summary">
              <span>
                <small>Library</small>
                <strong>6 games</strong>
              </span>
              <span>
                <small>Visible</small>
                <strong>4 shown</strong>
              </span>
              <span>
                <small>Sort</small>
                <strong>Title</strong>
              </span>
            </div>
            <div className="liquid-controls">
              <span>Search: Title, path, or notes</span>
              <span>Sort by Title</span>
            </div>
            <div className="liquid-games">
              {["Minecraft", "Valorant", "Stardew"].map((item) => (
                <span key={item}>
                  <b>{item.slice(0, 2).toUpperCase()}</b>
                  <strong>{item}</strong>
                  <small>Play / Edit / Remove</small>
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {type === "arindra" && (
        <>
          <div className="arindra-nav">
            <strong>ARINDRA PRODUCTION</strong>
            <span>Layanan</span>
            <span>Portofolio</span>
            <span>Showreel</span>
            <span>Kontak</span>
          </div>
          <div className="arindra-hero">
            <span className="arindra-kicker">Surabaya / Since 2014</span>
            <strong>Produksi visual yang membuat brand lebih dipercaya.</strong>
            <div className="arindra-actions">
              <span>Tonton Showreel</span>
              <span>Konsultasi Proyek</span>
            </div>
          </div>
          <div className="arindra-showreel">
            <div className="arindra-video">
              <span>REC</span>
              <b />
            </div>
            <div className="arindra-tabs">
              <strong>PILIH PORTOFOLIO</strong>
              <span>Company Profile</span>
              <span>Product Video</span>
              <span>Live Streaming</span>
            </div>
          </div>
          <div className="arindra-services">
            <span>PRODUKSI VIDEO</span>
            <span>FOTOGRAFI</span>
            <span>LIVE STREAMING</span>
          </div>
        </>
      )}

      {type === "medan" && (
        <>
          <div className="medan-nav">
            <strong>
              Kota <b>Medan</b>
            </strong>
            <span>Landmark</span>
            <span>Kuliner</span>
            <span>Budaya</span>
          </div>
          <div className="medan-copy">
            <span>Ibukota Sumatera Utara</span>
            <strong>
              Selamat Datang di <b>Kota Medan</b>
            </strong>
            <i>Jelajahi Medan / Lihat Landmark</i>
            <div className="medan-stats">
              <b>2.4Jt+ Penduduk</b>
              <b>265 km2 Luas</b>
              <b>13+ Suku</b>
            </div>
          </div>
          <div className="medan-cards">
            <span>Istana Maimun</span>
            <span>Masjid Raya</span>
            <span>Bika Ambon</span>
          </div>
          <div className="medan-marquee">
            MULTIKULTURAL / KULINER LEGENDARIS / WARISAN BUDAYA
          </div>
        </>
      )}

      {type === "filsafit" && (
        <>
          <div className="filsafit-nav">
            <strong>FILSAFIT</strong>
            <span>Encyclopedia</span>
            <span>Compare</span>
            <span>Quiz</span>
            <span>Profile</span>
          </div>
          <div className="filsafit-body">
            <div className="filsafit-copy">
              <small>Philosophy encyclopedia</small>
              <strong>
                Explore schools, compare ideas, then take the quiz.
              </strong>
              <div>
                <span>16 schools</span>
                <span>30 questions</span>
              </div>
            </div>
            <div className="filsafit-result">
              <small>Example result</small>
              <strong>Stoicism</strong>
              <div className="filsafit-bars">
                <i style={{ width: "82%" }} />
                <i style={{ width: "68%" }} />
                <i style={{ width: "74%" }} />
              </div>
            </div>
          </div>
        </>
      )}

      {type === "modtoggle" && (
        <div className="modtoggle-window">
          <div className="modtoggle-title">ModToggle</div>
          <div className="modtoggle-search">Search...</div>
          <div className="modtoggle-list">
            {[
              ["Sodium (sodium)", "[ ON]"],
              ["Minimap (minimap)", "[OFF]"],
              ["Utility Mod (utility_mod)", "[ ON]"],
            ].map(([name, state]) => (
              <span key={name}>
                {name}
                <b>{state}</b>
              </span>
            ))}
          </div>
          <button type="button" tabIndex={-1}>
            Done
          </button>
          <div className="modtoggle-command">O keybind / /modtoggle list</div>
        </div>
      )}
    </div>
  );
}
