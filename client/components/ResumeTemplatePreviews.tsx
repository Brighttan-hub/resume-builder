/**
 * Realistic A4 resume template SVG previews for the Dashboard templates tab.
 * Each template has a distinct layout, color scheme and typography feel.
 */

// ── Modern (orange sidebar left, content right) ───────────────────────────────
export function ModernPreview() {
  return (
    <svg viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Sidebar */}
      <rect width="85" height="380" fill="#f97316" />
      {/* Avatar circle */}
      <circle cx="42" cy="52" r="28" fill="white" fillOpacity="0.25" />
      <circle cx="42" cy="44" r="14" fill="white" fillOpacity="0.4" />
      <ellipse cx="42" cy="66" rx="18" ry="9" fill="white" fillOpacity="0.3" />
      {/* Sidebar sections */}
      <rect x="10" y="92" width="65" height="5" rx="2" fill="white" fillOpacity="0.9" />
      <rect x="10" y="102" width="55" height="3" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="10" y="108" width="50" height="3" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="10" y="114" width="58" height="3" rx="1.5" fill="white" fillOpacity="0.5" />
      {/* Skills */}
      <rect x="10" y="130" width="40" height="4" rx="2" fill="white" fillOpacity="0.8" />
      {["React","Node.js","TypeScript","AWS","Docker"].map((_, i) => (
        <g key={i}>
          <rect x="10" y={140 + i * 18} width="65" height="12" rx="6" fill="white" fillOpacity="0.15" />
          <rect x="10" y={140 + i * 18} width={30 + i * 6} height="12" rx="6" fill="white" fillOpacity="0.5" />
        </g>
      ))}
      {/* Languages */}
      <rect x="10" y="238" width="45" height="4" rx="2" fill="white" fillOpacity="0.8" />
      <rect x="10" y="248" width="60" height="3" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="10" y="255" width="50" height="3" rx="1.5" fill="white" fillOpacity="0.5" />
      {/* Main content area */}
      <rect x="85" width="195" height="380" fill="#fff7ed" />
      {/* Name */}
      <rect x="100" y="22" width="140" height="10" rx="3" fill="#1a1a1a" />
      <rect x="100" y="38" width="100" height="6" rx="2" fill="#f97316" />
      {/* Divider */}
      <line x1="100" y1="55" x2="265" y2="55" stroke="#f97316" strokeWidth="1.5" />
      {/* Experience */}
      <rect x="100" y="65" width="70" height="6" rx="2" fill="#f97316" />
      <rect x="100" y="80" width="130" height="5" rx="2" fill="#333" />
      <rect x="100" y="88" width="90" height="3" rx="1.5" fill="#999" />
      <rect x="100" y="95" width="155" height="3" rx="1.5" fill="#bbb" />
      <rect x="100" y="101" width="140" height="3" rx="1.5" fill="#bbb" />
      <rect x="100" y="107" width="148" height="3" rx="1.5" fill="#bbb" />
      <rect x="100" y="120" width="125" height="5" rx="2" fill="#333" />
      <rect x="100" y="128" width="85" height="3" rx="1.5" fill="#999" />
      <rect x="100" y="135" width="150" height="3" rx="1.5" fill="#bbb" />
      <rect x="100" y="141" width="130" height="3" rx="1.5" fill="#bbb" />
      {/* Education */}
      <rect x="100" y="158" width="70" height="6" rx="2" fill="#f97316" />
      <rect x="100" y="172" width="120" height="5" rx="2" fill="#333" />
      <rect x="100" y="180" width="90" height="3" rx="1.5" fill="#999" />
      <rect x="100" y="187" width="80" height="3" rx="1.5" fill="#bbb" />
      {/* Projects */}
      <rect x="100" y="202" width="70" height="6" rx="2" fill="#f97316" />
      <rect x="100" y="214" width="140" height="4" rx="2" fill="#333" />
      <rect x="100" y="222" width="155" height="3" rx="1.5" fill="#bbb" />
      <rect x="100" y="229" width="145" height="3" rx="1.5" fill="#bbb" />
    </svg>
  );
}

// ── Classic (header bar, single column, formal) ───────────────────────────────
export function ClassicPreview() {
  return (
    <svg viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="380" fill="#fffbeb" />
      {/* Header */}
      <rect width="280" height="72" fill="#d97706" />
      <rect x="20" y="18" width="160" height="12" rx="3" fill="white" />
      <rect x="20" y="36" width="110" height="6" rx="2" fill="white" fillOpacity="0.75" />
      <rect x="20" y="48" width="220" height="3" rx="1.5" fill="white" fillOpacity="0.5" />
      <rect x="20" y="54" width="180" height="3" rx="1.5" fill="white" fillOpacity="0.5" />
      {/* Section: Summary */}
      <rect x="20" y="84" width="80" height="5" rx="2" fill="#d97706" />
      <rect x="20" y="94" width="240" height="3" rx="1.5" fill="#666" />
      <rect x="20" y="100" width="230" height="3" rx="1.5" fill="#666" />
      <rect x="20" y="106" width="200" height="3" rx="1.5" fill="#666" />
      {/* Divider */}
      <line x1="20" y1="116" x2="260" y2="116" stroke="#d97706" strokeWidth="1" strokeDasharray="4 2" />
      {/* Experience */}
      <rect x="20" y="124" width="85" height="5" rx="2" fill="#d97706" />
      {[0,1].map(j => (
        <g key={j}>
          <rect x="20" y={136+j*52} width="145" height="5" rx="2" fill="#222" />
          <rect x="20" y={144+j*52} width="100" height="3" rx="1.5" fill="#d97706" />
          <rect x="20" y={151+j*52} width="230" height="3" rx="1.5" fill="#888" />
          <rect x="20" y={157+j*52} width="210" height="3" rx="1.5" fill="#888" />
          <rect x="20" y={163+j*52} width="220" height="3" rx="1.5" fill="#888" />
        </g>
      ))}
      <line x1="20" y1="248" x2="260" y2="248" stroke="#d97706" strokeWidth="1" strokeDasharray="4 2" />
      {/* Education */}
      <rect x="20" y="256" width="70" height="5" rx="2" fill="#d97706" />
      <rect x="20" y="268" width="160" height="4" rx="2" fill="#222" />
      <rect x="20" y="276" width="110" height="3" rx="1.5" fill="#d97706" />
      <rect x="20" y="283" width="90" height="3" rx="1.5" fill="#888" />
      {/* Skills */}
      <line x1="20" y1="296" x2="260" y2="296" stroke="#d97706" strokeWidth="1" strokeDasharray="4 2" />
      <rect x="20" y="303" width="45" height="5" rx="2" fill="#d97706" />
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={20 + i * 48} y="314" width="42" height="14" rx="7" fill="#d97706" fillOpacity={0.15 + i*0.05} />
      ))}
    </svg>
  );
}

// ── Minimal (clean white, thin lines, lots of whitespace) ────────────────────
export function MinimalPreview() {
  return (
    <svg viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="380" fill="#f9fafb" />
      {/* Name large */}
      <rect x="20" y="24" width="180" height="14" rx="3" fill="#111" />
      <rect x="20" y="44" width="120" height="6" rx="2" fill="#6b7280" />
      {/* Thin accent line */}
      <line x1="20" y1="58" x2="260" y2="58" stroke="#6b7280" strokeWidth="0.5" />
      {/* Contact row */}
      <rect x="20" y="64" width="60" height="3" rx="1.5" fill="#6b7280" />
      <rect x="95" y="64" width="60" height="3" rx="1.5" fill="#6b7280" />
      <rect x="170" y="64" width="70" height="3" rx="1.5" fill="#6b7280" />
      <line x1="20" y1="74" x2="260" y2="74" stroke="#e5e7eb" strokeWidth="0.5" />
      {/* Experience */}
      <rect x="20" y="82" width="4" height="4" rx="1" fill="#6b7280" />
      <rect x="28" y="82" width="60" height="4" rx="1.5" fill="#111" />
      {[0,1].map(j => (
        <g key={j}>
          <rect x="20" y={94+j*60} width="150" height="5" rx="1.5" fill="#222" />
          <rect x="20" y={103+j*60} width="90" height="3" rx="1.5" fill="#6b7280" />
          <rect x="20" y={110+j*60} width="235" height="2.5" rx="1.25" fill="#d1d5db" />
          <rect x="20" y={116+j*60} width="220" height="2.5" rx="1.25" fill="#d1d5db" />
          <rect x="20" y={122+j*60} width="200" height="2.5" rx="1.25" fill="#d1d5db" />
        </g>
      ))}
      <line x1="20" y1="222" x2="260" y2="222" stroke="#e5e7eb" strokeWidth="0.5" />
      {/* Education */}
      <rect x="20" y="230" width="4" height="4" rx="1" fill="#6b7280" />
      <rect x="28" y="230" width="55" height="4" rx="1.5" fill="#111" />
      <rect x="20" y="242" width="155" height="4" rx="1.5" fill="#222" />
      <rect x="20" y="250" width="100" height="3" rx="1.5" fill="#6b7280" />
      <rect x="20" y="257" width="80" height="2.5" rx="1.25" fill="#d1d5db" />
      <line x1="20" y1="268" x2="260" y2="268" stroke="#e5e7eb" strokeWidth="0.5" />
      {/* Skills */}
      <rect x="20" y="276" width="4" height="4" rx="1" fill="#6b7280" />
      <rect x="28" y="276" width="38" height="4" rx="1.5" fill="#111" />
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={20+(i%3)*82} y={288+Math.floor(i/3)*18} width="72" height="12" rx="6" fill="#6b7280" fillOpacity="0.12" />
      ))}
    </svg>
  );
}

// ── Creative (bold top band, two-col with color blocks) ──────────────────────
export function CreativePreview() {
  return (
    <svg viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="380" fill="#fff7ed" />
      {/* Bold diagonal header */}
      <polygon points="0,0 280,0 280,90 0,110" fill="#ea580c" />
      <rect x="20" y="20" width="170" height="13" rx="3" fill="white" />
      <rect x="20" y="40" width="120" height="6" rx="2" fill="white" fillOpacity="0.8" />
      <rect x="20" y="54" width="200" height="3" rx="1.5" fill="white" fillOpacity="0.6" />
      <rect x="20" y="61" width="160" height="3" rx="1.5" fill="white" fillOpacity="0.6" />
      {/* Left col */}
      <rect x="0" y="110" width="95" height="270" fill="#fff3e8" />
      {/* Avatar placeholder */}
      <circle cx="47" cy="138" r="24" fill="#ea580c" fillOpacity="0.2" stroke="#ea580c" strokeWidth="2" />
      <circle cx="47" cy="130" r="12" fill="#ea580c" fillOpacity="0.35" />
      <ellipse cx="47" cy="152" rx="16" ry="8" fill="#ea580c" fillOpacity="0.25" />
      <rect x="10" y="170" width="50" height="4" rx="2" fill="#ea580c" />
      {["Python","React","AWS","Figma","SQL"].map((_, i) => (
        <g key={i}>
          <rect x="10" y={180+i*20} width="75" height="12" rx="6" fill="#ea580c" fillOpacity="0.12" />
          <rect x="10" y={180+i*20} width={30+i*8} height="12" rx="6" fill="#ea580c" fillOpacity={0.4+i*0.05} />
        </g>
      ))}
      <rect x="10" y="288" width="50" height="4" rx="2" fill="#ea580c" />
      <rect x="10" y="298" width="70" height="3" rx="1.5" fill="#888" />
      <rect x="10" y="306" width="60" height="3" rx="1.5" fill="#888" />
      {/* Right col */}
      <rect x="108" y="118" width="60" height="5" rx="2" fill="#ea580c" />
      {[0,1].map(j => (
        <g key={j}>
          <rect x="108" y={130+j*58} width="135" height="5" rx="2" fill="#222" />
          <rect x="108" y={139+j*58} width="90" height="3" rx="1.5" fill="#ea580c" />
          <rect x="108" y={146+j*58} width="155" height="3" rx="1.5" fill="#aaa" />
          <rect x="108" y={152+j*58} width="145" height="3" rx="1.5" fill="#aaa" />
          <rect x="108" y={158+j*58} width="150" height="3" rx="1.5" fill="#aaa" />
        </g>
      ))}
      <rect x="108" y="252" width="60" height="5" rx="2" fill="#ea580c" />
      <rect x="108" y="264" width="140" height="4" rx="2" fill="#222" />
      <rect x="108" y="272" width="100" height="3" rx="1.5" fill="#ea580c" />
      <rect x="108" y="280" width="150" height="3" rx="1.5" fill="#aaa" />
      <rect x="108" y="300" width="60" height="5" rx="2" fill="#ea580c" />
      <rect x="108" y="312" width="155" height="3" rx="1.5" fill="#aaa" />
      <rect x="108" y="320" width="145" height="3" rx="1.5" fill="#aaa" />
    </svg>
  );
}

// ── Executive (dark header, serif feel, premium) ─────────────────────────────
export function ExecutivePreview() {
  return (
    <svg viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="380" fill="#fafaf9" />
      {/* Dark premium header */}
      <rect width="280" height="88" fill="#292524" />
      <rect x="20" y="18" width="190" height="14" rx="2" fill="white" />
      <rect x="20" y="39" width="130" height="7" rx="2" fill="#f97316" />
      <rect x="20" y="54" width="240" height="2.5" rx="1.25" fill="white" fillOpacity="0.35" />
      <rect x="20" y="60" width="180" height="2.5" rx="1.25" fill="white" fillOpacity="0.35" />
      <rect x="20" y="66" width="200" height="2.5" rx="1.25" fill="white" fillOpacity="0.35" />
      {/* Gold accent line */}
      <rect x="0" y="88" width="280" height="4" fill="#f97316" />
      {/* Two columns */}
      <rect x="185" y="92" width="1" height="280" fill="#e7e5e4" />
      {/* Main col */}
      <rect x="16" y="104" width="75" height="5" rx="1.5" fill="#292524" />
      <line x1="16" y1="112" x2="175" y2="112" stroke="#f97316" strokeWidth="1.5" />
      {[0,1].map(j => (
        <g key={j}>
          <rect x="16" y={118+j*65} width="148" height="5" rx="1.5" fill="#111" />
          <rect x="16" y={127+j*65} width="100" height="3" rx="1.5" fill="#f97316" />
          <rect x="16" y={134+j*65} width="158" height="2.5" rx="1.25" fill="#78716c" />
          <rect x="16" y={140+j*65} width="150" height="2.5" rx="1.25" fill="#78716c" />
          <rect x="16" y={146+j*65} width="155" height="2.5" rx="1.25" fill="#78716c" />
          <rect x="16" y={152+j*65} width="140" height="2.5" rx="1.25" fill="#78716c" />
        </g>
      ))}
      <rect x="16" y="260" width="75" height="5" rx="1.5" fill="#292524" />
      <line x1="16" y1="268" x2="175" y2="268" stroke="#f97316" strokeWidth="1.5" />
      <rect x="16" y="276" width="148" height="4" rx="1.5" fill="#111" />
      <rect x="16" y="284" width="105" height="3" rx="1.5" fill="#78716c" />
      <rect x="16" y="291" width="90" height="3" rx="1.5" fill="#78716c" />
      {/* Side col */}
      <rect x="197" y="104" width="65" height="4" rx="1.5" fill="#292524" />
      <line x1="197" y1="112" x2="264" y2="112" stroke="#f97316" strokeWidth="1.5" />
      {["Leadership","Strategy","Analytics","Compliance","Negotiation"].map((_, i) => (
        <g key={i}>
          <rect x="197" y={118+i*22} width="67" height="14" rx="3" fill="#292524" fillOpacity={0.06+i*0.02} />
          <rect x="197" y={118+i*22} width={30+i*5} height="14" rx="3" fill="#f97316" fillOpacity={0.25+i*0.06} />
        </g>
      ))}
      <rect x="197" y="232" width="65" height="4" rx="1.5" fill="#292524" />
      <line x1="197" y1="240" x2="264" y2="240" stroke="#f97316" strokeWidth="1.5" />
      <rect x="197" y="248" width="60" height="3" rx="1.5" fill="#78716c" />
      <rect x="197" y="255" width="50" height="3" rx="1.5" fill="#78716c" />
      <rect x="197" y="262" width="55" height="3" rx="1.5" fill="#78716c" />
    </svg>
  );
}

// ── ATS-Ready (plain, structured, maximum readability) ───────────────────────
export function ATSPreview() {
  return (
    <svg viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="280" height="380" fill="#fffbeb" />
      {/* Simple top name block */}
      <rect x="20" y="18" width="170" height="13" rx="2" fill="#111" />
      <rect x="20" y="36" width="115" height="5" rx="1.5" fill="#b45309" />
      <rect x="20" y="47" width="240" height="2.5" rx="1.25" fill="#b45309" fillOpacity="0.5" />
      {/* Contact inline */}
      <rect x="20" y="57" width="55" height="3" rx="1.5" fill="#555" />
      <rect x="82" y="57" width="55" height="3" rx="1.5" fill="#555" />
      <rect x="144" y="57" width="80" height="3" rx="1.5" fill="#555" />
      {/* Thick rule */}
      <rect x="20" y="68" width="240" height="2" rx="1" fill="#b45309" />
      {/* Summary */}
      <rect x="20" y="77" width="75" height="5" rx="1.5" fill="#b45309" />
      <rect x="20" y="87" width="240" height="3" rx="1.5" fill="#555" />
      <rect x="20" y="93" width="228" height="3" rx="1.5" fill="#555" />
      <rect x="20" y="99" width="210" height="3" rx="1.5" fill="#555" />
      <rect x="20" y="108" width="240" height="2" rx="1" fill="#b45309" fillOpacity="0.4" />
      {/* Experience */}
      <rect x="20" y="116" width="85" height="5" rx="1.5" fill="#b45309" />
      {[0,1,2].map(j => (
        <g key={j}>
          <rect x="20" y={128+j*48} width="150" height="5" rx="1.5" fill="#111" />
          <rect x="180" y={128+j*48} width="80" height="5" rx="1.5" fill="#b45309" fillOpacity="0.7" />
          <rect x="20" y={137+j*48} width="110" height="3" rx="1.5" fill="#b45309" fillOpacity="0.5" />
          <rect x="20" y={144+j*48} width="235" height="2.5" rx="1.25" fill="#888" />
          <rect x="20" y="150" width="220" height="2.5" rx="1.25" fill="#888" />
        </g>
      ))}
      <rect x="20" y="276" width="240" height="2" rx="1" fill="#b45309" fillOpacity="0.4" />
      {/* Education */}
      <rect x="20" y="284" width="68" height="5" rx="1.5" fill="#b45309" />
      <rect x="20" y="296" width="155" height="5" rx="1.5" fill="#111" />
      <rect x="185" y="296" width="75" height="5" rx="1.5" fill="#b45309" fillOpacity="0.7" />
      <rect x="20" y="305" width="105" height="3" rx="1.5" fill="#888" />
      <rect x="20" y="316" width="240" height="2" rx="1" fill="#b45309" fillOpacity="0.4" />
      {/* Skills */}
      <rect x="20" y="323" width="42" height="5" rx="1.5" fill="#b45309" />
      <rect x="20" y="334" width="240" height="3" rx="1.5" fill="#555" />
      <rect x="20" y="341" width="210" height="3" rx="1.5" fill="#555" />
    </svg>
  );
}
