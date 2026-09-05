/**
 * Styles for the draft console, as a plain CSS string.
 *
 * Deliberately not Tailwind and not a CSS module: everything here is scoped
 * under `.fdc` and injected by the console itself, so this page cannot
 * affect the rest of the site and does not depend on the site's Tailwind
 * content globs or design tokens continuing to look the way they do today.
 * The console is also a fixed overlay, which is what keeps the site's navbar
 * and footer out of the way without editing the root layout.
 */

export const CONSOLE_CSS = `
.fdc{
  position:fixed; inset:0; z-index:9999; overflow:hidden;
  display:flex; flex-direction:column;
  background:#0f1115; color:#e7eaf0;
  font:15px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  -webkit-font-smoothing:antialiased;
}
.fdc *{box-sizing:border-box}
.fdc button{font:inherit;color:inherit;cursor:pointer;border:0;background:none}
.fdc-dim{color:#9aa3b2;font-weight:400}
.fdc-spacer{flex:1}
.fdc-num{margin-left:auto;text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}

/* header ------------------------------------------------------------- */
.fdc-head{
  flex:0 0 auto; background:#0f1115; border-bottom:1px solid #2a2f3a;
  padding:calc(env(safe-area-inset-top) + 10px) 12px 8px;
}
.fdc-headrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.fdc-pick{font-size:20px;font-weight:700}
.fdc-badge{padding:3px 10px;border-radius:99px;font-size:12.5px;font-weight:700}
.fdc-up{background:#3ddc91;color:#06210f}
.fdc-wait{background:#1e222b;color:#9aa3b2;font-weight:500}
.fdc-toggle{display:flex;border:1px solid #2a2f3a;border-radius:8px;overflow:hidden}
.fdc-toggle button{padding:5px 10px;font-size:12.5px;color:#9aa3b2}
.fdc-toggle button.on{background:#e7eaf0;color:#0f1115;font-weight:700}
.fdc-ghost{padding:5px 12px;border-radius:8px;border:1px solid #2a2f3a;
  font-size:13px;color:#9aa3b2}
.fdc-ghost:disabled{opacity:.4;cursor:default}

.fdc-search{margin-top:8px}
.fdc-search input{
  width:100%;padding:11px 12px;border-radius:9px;border:1px solid #2a2f3a;
  background:#1e222b;color:#e7eaf0;font:inherit;-webkit-appearance:none;
}
.fdc-search input::placeholder{color:#6f7889}
.fdc-search input:focus{outline:2px solid #4ea1ff;outline-offset:-1px}

.fdc-chips{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:8px}
.fdc-chips button{
  padding:5px 11px;border-radius:99px;border:1px solid #2a2f3a;
  font-size:12.5px;color:#9aa3b2;
}
.fdc-chips button.on{background:#e7eaf0;color:#0f1115;font-weight:700;border-color:transparent}

/* body --------------------------------------------------------------- */
.fdc-body{
  flex:1 1 auto;overflow-y:auto;-webkit-overflow-scrolling:touch;
  padding:10px 12px calc(env(safe-area-inset-bottom) + 24px);
}
.fdc-panel{background:#171a21;border:1px solid #2a2f3a;border-radius:12px;
  padding:11px;margin-bottom:10px}
.fdc-panel h2{font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;
  color:#9aa3b2;margin:0 0 9px;font-weight:600}
.fdc-last{font-size:13px;color:#9aa3b2;padding:4px 2px 9px}
.fdc-empty{padding:14px 2px}

.fdc-pos{
  display:inline-block;min-width:36px;text-align:center;border-radius:5px;
  padding:2px 5px;font-size:10.5px;font-weight:800;color:#0d1117;flex:0 0 auto;
}
.p-RB{background:#3ddc91}.p-WR{background:#4ea1ff}.p-TE{background:#c792ea}
.p-QB{background:#ffb020}.p-K{background:#8b93a3}.p-DEF{background:#8b93a3}
.p-NA{background:#5b6270}

/* recommendation ------------------------------------------------------ */
.fdc-rec{border-color:#2f5d43}
.fdc-reccard{
  display:flex;align-items:flex-start;gap:10px;width:100%;text-align:left;
  padding:11px;border-radius:10px;background:#1e222b;margin-bottom:7px;
}
.fdc-reccard.top{outline:2px solid #3ddc91}
.fdc-reccard:active{background:#262b36}
.fdc-recmain{display:flex;flex-direction:column;gap:3px;min-width:0}
.fdc-recname{font-weight:700;font-size:15.5px}
.fdc-why{color:#9aa3b2;font-size:12.5px;line-height:1.35}

/* board list ---------------------------------------------------------- */
.fdc-list{display:flex;flex-direction:column}
.fdc-row{
  display:flex;align-items:center;gap:10px;width:100%;text-align:left;
  padding:9px 6px;border-bottom:1px solid #21252e;border-radius:6px;
}
.fdc-row:last-child{border-bottom:0}
.fdc-row:active{background:#1e222b}
.fdc-row.dim{opacity:.45}
.fdc-name{display:flex;flex-direction:column;min-width:0;font-weight:600}
.fdc-sub{color:#9aa3b2;font-size:12px;font-weight:400}
.fdc-flag{
  display:inline-block;margin-left:6px;padding:0 5px;border-radius:4px;
  background:#3a2417;color:#ffb020;font-size:10px;font-weight:700;
  text-transform:uppercase;letter-spacing:.04em;vertical-align:1px;
}

/* roster -------------------------------------------------------------- */
.fdc-rosterrow{display:flex;align-items:center;gap:9px;padding:5px 2px;font-size:14px}
.fdc-picksmap{display:flex;gap:5px;flex-wrap:wrap;margin-top:10px}
.fdc-picksmap span{
  background:#1e222b;color:#6f7889;border-radius:99px;padding:2px 9px;font-size:12px;
}
.fdc-picksmap span.fdc-mine{background:#123047;color:#9fd0ff;font-weight:700}

/* footer -------------------------------------------------------------- */
.fdc-foot{
  display:flex;flex-wrap:wrap;gap:10px;align-items:center;
  color:#6f7889;font-size:11.5px;padding:6px 2px 0;
}
.fdc-foot button{margin-left:auto}

@media (min-width:760px){
  .fdc-head{padding-left:24px;padding-right:24px}
  .fdc-body{padding-left:24px;padding-right:24px}
  .fdc-body>*{max-width:920px;margin-left:auto;margin-right:auto}
  .fdc-headrow,.fdc-search,.fdc-chips{max-width:920px;margin-left:auto;margin-right:auto}
}
`;
