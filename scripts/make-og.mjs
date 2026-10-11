// Renders src/site/og.png (1200x630) with Playwright. Run once when the branding changes.
import { chromium } from '@playwright/test';
const html = `<!doctype html><html><body style="margin:0;width:1200px;height:630px;background:#0f5c6e;font-family:system-ui,sans-serif;color:#fff;display:flex;flex-direction:column;justify-content:center;padding:0 80px;box-sizing:border-box">
<div style="display:flex;align-items:center;gap:20px;font-size:34px;font-weight:700"><svg width="64" height="64" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#fff"/><path d="M9 16.5l4.5 4.5L23 11" fill="none" stroke="#0f5c6e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>Kit GPSR Vendeurs · GPSR Seller Kit</div>
<div style="font-size:64px;font-weight:800;line-height:1.1;margin-top:36px">Fiche sécurité, étiquette,<br>analyse de risques, checklists</div>
<div style="font-size:30px;margin-top:28px;opacity:.92">Règlement (UE) 2023/988 + REP France · gratuit · 100 % dans le navigateur</div>
<div style="font-size:24px;margin-top:40px;opacity:.8">Un produit de READ FRANCE SAS — outil d’information, pas un conseil juridique</div></body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.screenshot({ path: new URL('../src/site/og.png', import.meta.url).pathname });
await b.close();
