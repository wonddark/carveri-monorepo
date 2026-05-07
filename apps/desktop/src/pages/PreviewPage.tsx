import { useLoaderData } from "react-router";
import { generateReportTitle } from "@carveri/shared/lib/formatters.ts";
import type { VehicleReportPreviewResponse } from "@carveri/shared/types/vehicle-report.ts";
import { ArrowRightIcon, CircleCheckBigIcon, SparkleIcon } from "lucide-react";
import { Button } from "@carveri/shared/components/ui/button.tsx";

function scrollToCTA() {
  globalThis.window?.document
    ?.getElementById("precheck-cta")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function PreviewPage() {
  const preview = useLoaderData() as VehicleReportPreviewResponse;
  const report = preview.data;

  const title = generateReportTitle({
    year: report.vehicle.year,
    make: report.vehicle.make,
    model: report.vehicle.model,
    trim: report.vehicle.trim,
  });

  return (
    <>
      <style>
        {`
        :root {
        --navy-900: #0a1628;
                --navy-800: #0f2440;
                --navy-700: #162f52;}
        
        /* ─── Navigation ─── */
        .nav {
        background: var(--navy-900);
        padding: 12px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 100;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }

        .nav-logo {
        height: 28px;
        cursor: pointer;
      }

        .nav-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

        .lang-toggle {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        border-radius: var(--radius-xs);
        font-size: 12px;
        font-weight: 600;
        color: var(--color-gray-400);
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: all 0.2s;
        font-family: "Outfit", sans-serif;
      }

        .lang-toggle:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.08);
      }

        /* ─── Hero Header ─── */
        .hero {
        background: linear-gradient(
        180deg,
        var(--navy-900) 0%,
        var(--navy-800) 100%
        );
        padding: 32px 24px 48px;
        position: relative;
        overflow: hidden;
      }

        .hero::before {
        content: "";
        position: absolute;
        top: -50%;
        right: -20%;
        width: 600px;
        height: 600px;
        background: radial-gradient(
        circle,
        rgba(4, 44, 215, 0.12) 0%,
        transparent 70%
        );
        pointer-events: none;
      }

        .hero::after {
        content: "";
        position: absolute;
        bottom: -30%;
        left: -10%;
        width: 400px;
        height: 400px;
        background: radial-gradient(
        circle,
        rgba(16, 185, 129, 0.08) 0%,
        transparent 70%
        );
        pointer-events: none;
      }

        .hero-inner {
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        position: relative;
        z-index: 1;
      }

        .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-family: "Outfit", sans-serif;
      }

        .badge-success {
        background: rgba(16, 185, 129, 0.15);
        color: var(--color-emerald-400);
        border: 1px solid rgba(16, 185, 129, 0.2);
      }

        .badge-info {
        background: rgba(59, 130, 246, 0.15);
        color: var(--color-blue-400);
        border: 1px solid rgba(59, 130, 246, 0.2);
      }

        .hero-vehicle {
        font-size: clamp(24px, 4vw, 36px);
        font-weight: 900;
        color: #fff;
        margin: 16px 0 8px;
        line-height: 1.2;
      }

        .hero-meta {
        color: var(--color-gray-400);
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex-wrap: wrap;
      }

        .hero-meta .vin {
        font-family: "SF Mono", "Fira Code", monospace;
        font-size: 13px;
        padding: 3px 10px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 6px;
        letter-spacing: 0.04em;
      }

        .hero-meta .dot {
        width: 3px;
        height: 3px;
        background: var(--color-gray-500);
        border-radius: 50%;
      }

        .hero-scanned {
        margin-top: 16px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--color-blue-400);
        font-size: 13px;
        font-weight: 500;
      }

        .hero-quick-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
        margin-top: 28px;
      }

        .quick-stat {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: var(--radius-sm);
        padding: 14px 12px;
        text-align: center;
      }

        .quick-stat-value {
        font-family: "Outfit", sans-serif;
        font-size: 22px;
        font-weight: 800;
        color: #fff;
      }

        .quick-stat-label {
        font-size: 12px;
        color: var(--color-gray-400);
        margin-top: 2px;
      }

        /* ─── Main Content ─── */
        .main {
        max-width: 960px;
        margin: 0 auto;
        padding: 0 24px 64px;
        margin-top: -24px;
        z-index: 1000;
        position: relative;
      }

        .cards-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

        .card {
        background: #fff;
        border-radius: var(--radius);
        border: 1px solid var(--color-gray-100);
        box-shadow: var(--shadow-sm);
        padding: 24px;
        transition:
        box-shadow 0.2s,
        transform 0.2s;
      }

        .card:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-1px);
      }

        .card-full {
        grid-column: 1 / -1;
      }

        .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
      }

        .card-icon {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-xs);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

        .card-icon svg {
        width: 20px;
        height: 20px;
      }

        .card-icon--color-blue {
        background: var(--color-blue-100);
        color: var(--color-blue-600);
      }
        .card-icon--color-purple {
        background: var(--color-purple-100);
        color: var(--color-purple-600);
      }
        .card-icon--color-amber {
        background: var(--color-amber-100);
        color: var(--color-amber-500);
      }
        .card-icon--color-emerald {
        background: var(--color-emerald-100);
        color: var(--color-emerald-500);
      }

        .card-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--color-gray-800);
      }

        .card-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 16px;
      }

        .card-list li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        color: var(--color-gray-700);
        line-height: 1.4;
      }

        .card-list li svg {
        flex-shrink: 0;
        margin-top: 1px;
      }

        .check {
        color: var(--color-emerald-500);
      }
        .warn {
        color: var(--color-amber-500);
      }
        .info {
        color: var(--color-blue-400);
      }

        /* ─── Blurred teaser ─── */
        .teaser {
        position: relative;
        border-radius: var(--radius-sm);
        overflow: hidden;
        margin-bottom: 16px;
      }

        .teaser-content {
        padding: 16px;
        background: var(--color-gray-50);
        border-radius: var(--radius-sm);
        filter: blur(6px);
        user-select: none;
        pointer-events: none;
      }

        .teaser-content p {
        font-size: 13px;
        color: var(--color-gray-600);
        line-height: 1.6;
        margin-bottom: 4px;
      }

        .teaser-content p:last-child {
        margin-bottom: 0;
      }

        .teaser-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(2px);
      }

        .teaser-lock {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid var(--color-gray-200);
        border-radius: 999px;
        padding: 8px 16px;
        box-shadow: var(--shadow-md);
        font-size: 13px;
        font-weight: 600;
        color: var(--color-gray-700);
      }

        .teaser-lock svg {
        width: 14px;
        height: 14px;
        color: var(--color-gray-500);
      }

        .teaser-price-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        padding: 16px;
        background: var(--color-gray-50);
        border-radius: var(--radius-sm);
      }

        .teaser-price-item {
        text-align: center;
      }
        .teaser-price-item span {
        display: block;
      }
        .teaser-price-item .label {
        font-size: 11px;
        color: var(--color-gray-500);
        margin-bottom: 4px;
      }
        .teaser-price-item .value {
        font-family: "Outfit", sans-serif;
        font-size: 20px;
        font-weight: 800;
        color: var(--color-gray-800);
      }

        .card-cta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        padding: 10px 16px;
        border: 1px solid rgba(4, 44, 215, 0.2);
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-blue-600);
        font-size: 13px;
        font-weight: 600;
        font-family: "Outfit", sans-serif;
        cursor: pointer;
        transition: all 0.2s;
      }

        .card-cta:hover {
        background: rgba(4, 44, 215, 0.04);
        border-color: rgba(4, 44, 215, 0.3);
      }
        .card-cta svg {
        width: 14px;
        height: 14px;
      }

        /* ─── Auction row detail ─── */
        .auction-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid var(--color-gray-100);
      }

        .auction-row:last-child {
        border-bottom: none;
      }
        .auction-row .label {
        font-size: 13px;
        color: var(--color-gray-600);
      }
        .auction-row .value {
        font-family: "Outfit", sans-serif;
        font-size: 14px;
        font-weight: 700;
        color: var(--color-gray-800);
      }

        /* ─── Gauge (simplified) ─── */
        .gauge-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 12px;
      }

        .gauge-svg {
        width: 100%;
        max-width: 200px;
      }

        /* ─── CTA Section ─── */
        

        .cta-section::before {
        content: "";
        position: absolute;
        top: -40%;
        right: -10%;
        width: 400px;
        height: 400px;
        background: radial-gradient(
        circle,
        rgba(4, 44, 215, 0.2) 0%,
        transparent 70%
        );
        pointer-events: none;
      }

        .cta-benefits {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px 24px;
        text-align: left;
        max-width: 560px;
        margin: 20px auto 28px;
      }

        .cta-benefit {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        color: var(--color-gray-300);
        line-height: 1.4;
      }

        .cta-benefit svg {
        flex-shrink: 0;
        color: var(--color-emerald-400);
        margin-top: 1px;
      }

        .cta-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        max-width: 400px;
        padding: 16px 32px;
        background: var(--color-blue-600);
        color: #fff;
        font-family: "Outfit", sans-serif;
        font-size: 16px;
        font-weight: 800;
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition:
        background 0.2s,
        box-shadow 0.2s;
        box-shadow: 0 4px 16px rgba(4, 44, 215, 0.35);
      }

        .cta-button:hover {
        background: var(--color-blue-500);
        box-shadow: 0 6px 24px rgba(4, 44, 215, 0.4);
      }
        .cta-button svg {
        width: 18px;
        height: 18px;
      }

        .cta-secure {
        margin-top: 12px;
        font-size: 12px;
        color: var(--color-gray-500);
      }

        /* ─── WhatsApp footer ─── */
        .whatsapp-footer {
        text-align: center;
        padding: 24px;
      }

        .whatsapp-footer p {
        font-size: 14px;
        color: var(--color-gray-500);
        margin-bottom: 6px;
      }

        .whatsapp-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--color-emerald-500);
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.2s;
      }

        .whatsapp-link:hover {
        color: #059669;
      }
        .whatsapp-link svg {
        width: 16px;
        height: 16px;
      }

        /* ─── Responsive ─── */
        @media (max-width: 768px) {
        .cards-grid {
        grid-template-columns: 1fr;
      }
        .cta-benefits {
        grid-template-columns: 1fr;
      }
        .hero-quick-stats {
        grid-template-columns: repeat(3, 1fr);
      }
        .cta-section {
        padding: 32px 20px;
      }
        .card {
        padding: 20px;
      }
      }

        @media (max-width: 480px) {
        .hero-quick-stats {
        grid-template-columns: repeat(2, 1fr);
      }
        .nav {
        padding: 10px 16px;
      }
        .hero {
        padding: 24px 16px 36px;
      }
        .main {
        padding: 0 16px 48px;
      }
      }`}
      </style>

      {/* Nav */}
      <nav className="nav">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663263444526/E8JeqGFrSjk7BEGyAsBvjA/logo-dark.svg"
          alt="CarVeri"
          className="nav-logo"
        />
        <div className="nav-actions">
          <button className="lang-toggle">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span id="langLabel">ES</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="badge badge-success">
            <CircleCheckBigIcon className="size-3" />
            <span data-i18n="pc.vehicleFound">VEHICLE FOUND</span>
          </div>

          <h1 className="hero-vehicle">{title}</h1>

          <div className="hero-meta">
            <span className="vin">{report.vehicle.vin}</span>
            <span className="dot"></span>
            <span>{report.vehicle.bodyType}</span>
            <span className="dot"></span>
            <span>AWD</span>
          </div>

          <div className="hero-scanned">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span data-i18n="pc.scannedDatabases">10+ databases scanned</span>
          </div>

          <div className="hero-quick-stats">
            <div className="quick-stat">
              <div className="quick-stat-value">1</div>
              <div className="quick-stat-label" data-i18n="pc.statOwners">
                Registered Owner(s)
              </div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">3</div>
              <div className="quick-stat-label" data-i18n="pc.statRecords">
                History Records
              </div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-value">12</div>
              <div className="quick-stat-label" data-i18n="pc.statComps">
                Similar for Sale
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <main className="main">
        <div className="cards-grid">
          {/* History */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon card-icon--color-blue">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="card-title" data-i18n="pc.historyTitle">
                Vehicle History
              </h3>
            </div>
            <ul className="card-list">
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="check"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>1 registered owner found</span>
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="warn"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>This vehicle has auction history</span>
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="info"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>3 records found in history</span>
              </li>
            </ul>
            <div className="teaser">
              <div className="teaser-content">
                <p>Accidente reportado: Impacto frontal moderado (03/2023)</p>
                <p>Reparación estructural: Marco lateral izquierdo</p>
                <p>Odómetro: 3 lecturas verificadas, sin anomalías</p>
              </div>
              <div className="teaser-overlay">
                <div className="teaser-lock">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span data-i18n="pc.unlockDetails">
                    See details in full report
                  </span>
                </div>
              </div>
            </div>
            <button className="card-cta" onClick={scrollToCTA}>
              <span data-i18n="pc.seeFullHistory">See full history</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Market */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon card-icon--color-purple">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="card-title" data-i18n="pc.marketTitle">
                Market Analysis
              </h3>
            </div>
            <ul className="card-list">
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="info"
                >
                  <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                  <polygon points="12 15 17 21 7 21 12 15" />
                </svg>
                <span>We found 12 identical vehicles for sale near you</span>
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="check"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <span className="text-emarald-500 font-semibold">
                  One of them is below market average
                </span>
              </li>
            </ul>
            <div className="teaser">
              <div className="teaser-price-grid">
                <div className="teaser-price-item">
                  <span className="label">Minimum</span>
                  <span className="value">$18,500</span>
                </div>
                <div className="teaser-price-item">
                  <span className="label">Average</span>
                  <span className="value">$22,100</span>
                </div>
                <div className="teaser-price-item">
                  <span className="label">Maximum</span>
                  <span className="value">$26,800</span>
                </div>
              </div>
              <div className="teaser-overlay">
                <div className="teaser-lock">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span data-i18n="pc.unlockPrices">
                    See prices in full report
                  </span>
                </div>
              </div>
            </div>
            <button className="card-cta">
              <span data-i18n="pc.seeFullMarket">See market analysis</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Auction */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon card-icon--color-amber">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 7 3 3-3 3" />
                  <path d="M18 10H9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h1" />
                  <path d="M2 10s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                </svg>
              </div>
              <h3 className="card-title" data-i18n="pc.auctionTitle">
                Auction History
              </h3>
            </div>
            <ul className="card-list">
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="warn"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>This vehicle went through auction</span>
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="info"
                  style={{ color: "#ef4444" }}
                >
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                  <polyline points="17 18 23 18 23 12" />
                </svg>
                <span>2 price reductions detected</span>
              </li>
            </ul>
            <div className="teaser">
              <div className="teaser-content px-4 py-3">
                <div className="auction-row">
                  <span className="label">Auction purchase price:</span>
                  <span className="value">$14,200</span>
                </div>
                <div className="auction-row">
                  <span className="label">Reported condition:</span>
                  <span className="value">Run &amp; Drive</span>
                </div>
                <div className="mt-3 flex h-20 items-center justify-center rounded-xs bg-gray-200 text-xs text-gray-500">
                  Auction Photos
                </div>
              </div>
              <div className="teaser-overlay">
                <div className="teaser-lock">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span data-i18n="pc.unlockAuction">
                    See original purchase price
                  </span>
                </div>
              </div>
            </div>
            <button className="card-cta">
              <span data-i18n="pc.seeAuctionDetails">See auction details</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Valuation */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon card-icon--color-emerald">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="card-title" data-i18n="pc.valuationTitle">
                CarVeri Valuation
              </h3>
            </div>
            <p
              className="mb-4 text-sm leading-normal text-gray-600"
              data-i18n="pc.valuationDesc"
            >
              Our AI has already calculated the fair price for this exact VIN.
            </p>
            <div className="teaser">
              <div className="teaser-content">
                <div className="gauge-container">
                  <svg className="gauge-svg" viewBox="0 0 200 120">
                    <defs>
                      <linearGradient
                        id="gaugeGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" style={{ stopColor: "#ef4444" }} />
                        <stop offset="30%" style={{ stopColor: "#f59e0b" }} />
                        <stop offset="60%" style={{ stopColor: "#10b981" }} />
                        <stop offset="100%" style={{ stopColor: "#059669" }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="var(--color-gray-200)"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="url(#gaugeGrad)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="251"
                      strokeDashoffset="60"
                    />
                    <line
                      x1="100"
                      y1="100"
                      x2="140"
                      y2="50"
                      stroke="var(--color-gray-800)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="6"
                      fill="var(--color-gray-800)"
                    />
                    <text
                      x="100"
                      y="80"
                      textAnchor="middle"
                      fontFamily="Outfit"
                      fontWeight="800"
                      fontSize="24"
                      fill="var(--color-gray-800)"
                    >
                      $22,000
                    </text>
                    <text
                      x="100"
                      y="115"
                      textAnchor="middle"
                      fontSize="10"
                      fill="var(--color-gray-500)"
                    >
                      Fair Price
                    </text>
                  </svg>
                  <div className="flex w-full justify-between px-2 py-0 text-[11px] text-gray-500">
                    <span>$18,000</span>
                    <span>$28,000</span>
                  </div>
                </div>
              </div>
              <div className="teaser-overlay">
                <div className="teaser-lock">
                  <ArrowRightIcon />
                  <span data-i18n="pc.unlockValuation">Unlock fair price</span>
                </div>
              </div>
            </div>
            <button className="card-cta">
              <span data-i18n="pc.seeValuation">See full valuation</span>
              <ArrowRightIcon />
            </button>
          </div>

          {/* CTA */}
          <div className="col-start-1 -col-end-1" id="precheck-cta">
            <div className="pointer-events-none relative mt-6 overflow-hidden rounded bg-linear-135 from-(--navy-900) via-(--navy-800) to-(--navy-700) px-8 py-10 text-center *:relative *:z-1 before:absolute before:top-[-40%] before:right-[-10%] before:h-100 before:w-100 before:bg-radial before:from-[rgba(4,44,215,0.2)] before:to-transparent before:content-['']">
              <div className="badge badge-info" style={{ marginBottom: 16 }}>
                <SparkleIcon className="size-3" />
                <span data-i18n="pc.ctaBadge">FULL REPORT</span>
              </div>

              <h2
                className="mb-1 text-[clamp(22px,3.5vw,30px)] font-black text-white"
                data-i18n="pc.ctaTitle"
              >
                Unlock the Full Report
              </h2>
              <p
                className="mb-6 text-[15px] text-gray-400"
                data-i18n="pc.ctaSubtitle"
              >
                Everything you need to make a confident decision
              </p>

              <div className="cta-benefits">
                <div className="cta-benefit">
                  <CircleCheckBigIcon className="size-4.5" />
                  <span data-i18n="pc.ctaBenefit1">
                    AI Verdict: Buy / Avoid / Negotiate
                  </span>
                </div>
                <div className="cta-benefit">
                  <CircleCheckBigIcon className="size-4.5" />
                  <span data-i18n="pc.ctaBenefit2">
                    Complete uncensored history
                  </span>
                </div>
                <div className="cta-benefit">
                  <CircleCheckBigIcon className="size-4.5" />
                  <span data-i18n="pc.ctaBenefit3">
                    Exact fair price and market range
                  </span>
                </div>
                <div className="cta-benefit">
                  <CircleCheckBigIcon className="size-4.5" />

                  <span data-i18n="pc.ctaBenefit4">
                    Personalized negotiation strategy
                  </span>
                </div>
              </div>

              <Button>
                <span data-i18n="pc.ctaButton">Get Report — $29</span>
                <ArrowRightIcon />
              </Button>

              <p className="cta-secure" data-i18n="pc.ctaSecure">
                Secure payment with Stripe. Report ready in minutes.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="whatsapp-footer">
          <p data-i18n="pc.needHelp">Have questions?</p>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            <span data-i18n="pc.chatWhatsApp">Chat with us on WhatsApp</span>
          </a>
        </div>
      </main>
    </>
  );
}
