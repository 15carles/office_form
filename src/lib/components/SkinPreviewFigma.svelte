<!-- Miniatura SVG del disfraz Figma -->
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Segoe UI, sans-serif">
  <!-- App background -->
  <rect width="320" height="200" fill="#2c2c2c"/>

  <!-- Top bar -->
  <rect width="320" height="28" fill="#1e1e1e"/>
  <text x="10" y="18" font-size="10" fill="#f24e1e">◈</text>
  <text x="130" y="18" font-size="7" fill="#e0e0e0" font-weight="600">Design System v2</text>
  <text x="190" y="18" font-size="6" fill="#666">v2.4.1</text>
  <rect x="246" y="8" width="32" height="12" rx="3" fill="#333" stroke="#555" stroke-width="0.5"/>
  <text x="262" y="17" font-size="6" fill="#ccc" text-anchor="middle">Share</text>
  <rect x="282" y="8" width="34" height="12" rx="3" fill="#18a0fb"/>
  <text x="299" y="17" font-size="6" fill="white" text-anchor="middle">▶ Present</text>

  <!-- Toolbar -->
  <rect y="28" width="320" height="24" fill="#1e1e1e" stroke="#3a3a3a" stroke-width="0.3"/>
  {#each ['▲','⬜','◯','✒','T'] as tool, i}
    <rect x={10 + i * 28} y="33" width="22" height="14" rx="3"
      fill={i === 0 ? '#18a0fb22' : 'transparent'}
      stroke={i === 0 ? '#18a0fb' : 'transparent'} stroke-width="0.5"/>
    <text x={10 + i * 28 + 11} y="43" font-size="8" fill={i === 0 ? '#18a0fb' : '#888'} text-anchor="middle">{tool}</text>
  {/each}
  <text x="290" y="43" font-size="6" fill="#888">100%</text>

  <!-- Left panel -->
  <rect x="0" y="52" width="72" height="148" fill="#2c2c2c" stroke="#3a3a3a" stroke-width="0.5"/>
  <rect x="0" y="52" width="72" height="18" fill="#2c2c2c" stroke="#3a3a3a" stroke-width="0.3"/>
  <text x="10" y="64" font-size="6" fill="#e0e0e0" font-weight="600">Layers</text>
  <text x="42" y="64" font-size="6" fill="#666">Assets</text>
  <line x1="10" y1="68" x2="36" y2="68" stroke="#18a0fb" stroke-width="1"/>

  {#each [
    [0,'⬜','Frame 1'],
    [1,'◻','Group'],
    [2,'◈','Button/Primary'],
    [2,'⬡','Icon/chevron'],
    [1,'▭','Background'],
    [1,'T','Header text'],
    [1,'—','Divider'],
  ] as [ind, icon, name], i}
    <rect x="0" y={70 + i * 16} width="72" height="16"
      fill={i === 2 ? '#18a0fb18' : 'transparent'}/>
    <text x={4 + ind * 6} y={81 + i * 16} font-size="7"
      fill={i === 2 ? '#18a0fb' : '#999'}>{icon}</text>
    <text x={12 + ind * 6} y={81 + i * 16} font-size="6"
      fill={i === 2 ? '#18a0fb' : '#aaa'}
      font-weight={i === 2 ? '600' : 'normal'}>{name}</text>
  {/each}

  <!-- Canvas area -->
  <rect x="72" y="52" width="176" height="148" fill="#1a1a1a"/>
  <!-- Dot grid -->
  {#each Array(8) as _, r}
    {#each Array(12) as _, c}
      <circle cx={80 + c * 14} cy={60 + r * 18} r="0.8" fill="#3a3a3a"/>
    {/each}
  {/each}

  <!-- Tetris preview inside white frame -->
  <rect x="100" y="62" width="80" height="130" fill="white" stroke="#555" stroke-width="1"/>
  <!-- Tetris board mini -->
  {#each Array(8) as _, r}
    {#each Array(6) as _, c}
      <rect x={102 + c * 12} y={64 + r * 15} width="11" height="14"
        fill={
          (r === 5 && (c === 0 || c === 1 || c === 2)) ? '#4fc3f7' :
          (r === 6 && (c === 1 || c === 2 || c === 3)) ? '#ce93d8' :
          (r === 7 && (c === 0 || c === 1 || c === 2 || c === 3 || c === 4)) ? '#a5d6a7' :
          r % 2 === 0 ? '#fafafa' : '#f3f3f3'
        }
        stroke="#e8e8e8" stroke-width="0.3"
      />
    {/each}
  {/each}
  <!-- Falling I piece -->
  {#each [0,1,2,3] as c}
    <rect x={102 + c * 12} y="64" width="11" height="14" fill="#4fc3f7" stroke="#e0e0e0" stroke-width="0.3"/>
  {/each}
  <text x="140" y="204" font-size="5" fill="#666" text-anchor="middle">Layout Optimizer</text>

  <!-- Frame label -->
  <rect x="100" y="56" width="48" height="8" fill="#18a0fb"/>
  <text x="124" y="62" font-size="5.5" fill="white" text-anchor="middle">Frame / Canvas</text>

  <!-- Right panel -->
  <rect x="248" y="52" width="72" height="148" fill="#2c2c2c" stroke="#3a3a3a" stroke-width="0.5"/>
  <rect x="248" y="52" width="72" height="18" fill="#2c2c2c"/>
  <text x="258" y="64" font-size="6" fill="#e0e0e0" font-weight="600">Design</text>
  <text x="292" y="64" font-size="6" fill="#666">Prototype</text>
  <line x1="258" y1="68" x2="280" y2="68" stroke="#18a0fb" stroke-width="1"/>

  {#each [['W','1440'],['H','900'],['X','0'],['Y','0']] as [k, v], i}
    <text x="252" y={80 + i * 14} font-size="6" fill="#888">{k}</text>
    <text x="318" y={80 + i * 14} font-size="6" fill="#e0e0e0" text-anchor="end">{v}</text>
  {/each}
  <line x1="248" y1="140" x2="320" y2="140" stroke="#3a3a3a" stroke-width="0.5"/>
  <text x="252" y="152" font-size="6" fill="#888">Units</text>
  <text x="318" y="152" font-size="6" fill="#18a0fb" text-anchor="end" font-weight="600">0</text>
  <text x="252" y="164" font-size="6" fill="#888">Best</text>
  <text x="318" y="164" font-size="6" fill="#e0e0e0" text-anchor="end">0</text>
</svg>
