export function LiquidUtilityPreview() {
  return (
    <div className="product-preview preview-liquid" aria-hidden="true">
      <div className="preview-window__bar">
        <span>Liquid Utility</span>
        <i />
        <i />
      </div>
      <div className="preview-liquid__layout">
        <div className="preview-liquid__rail">
          <strong>LU</strong>
          <span className="is-active">Games</span>
          <span>Hardware</span>
          <span>System care</span>
          <span>Media</span>
        </div>
        <div className="preview-liquid__main">
          <small>Game launcher</small>
          <b>Your Windows library</b>
          <div className="preview-liquid__cards">
            <span>Steam library</span>
            <span>Manual game</span>
            <span>Recent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
