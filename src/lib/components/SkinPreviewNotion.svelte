<!-- Miniatura SVG del disfraz Notion -->
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="ui-sans-serif, Inter, system-ui, sans-serif">
  <!-- Background -->
  <rect width="320" height="200" fill="white"/>

  <!-- Sidebar -->
  <rect width="80" height="200" fill="#f7f6f3"/>
  <rect x="0" y="0" width="80" height="32" fill="#f7f6f3" stroke="#e9e9e7" stroke-width="0.5"/>
  <rect x="8" y="9" width="14" height="14" rx="3" fill="#191919"/>
  <text x="15" y="19" font-size="7" fill="white" text-anchor="middle">⊞</text>
  <text x="26" y="19" font-size="7" fill="#37352f" font-weight="600">Mi Empresa</text>

  {#each [['🔍','Buscar'],['🕐','Actualizaciones'],['⚙️','Ajustes']] as [icon, label], i}
    <text x="8" y={42 + i * 14} font-size="7" fill="#9b9a97">{icon} {label}</text>
  {/each}

  <line x1="4" y1="88" x2="76" y2="88" stroke="#e9e9e7" stroke-width="0.5"/>
  <text x="8" y="98" font-size="5" fill="#9b9a97" letter-spacing="0.5">PRIVADO</text>

  {#each [['📋','Reunión semanal',true],['📊','OKRs Q1 2026',false],['📝','Roadmap',false],['✅','Tareas',false]] as [icon, name, active], i}
    <rect x="2" y={102 + i * 16} width="76" height="14" rx="2"
      fill={active ? '#ebebea' : 'transparent'}/>
    <text x="6" y={112 + i * 16} font-size="6.5"
      fill={active ? '#37352f' : '#9b9a97'}
      font-weight={active ? '500' : 'normal'}>{icon} {name}</text>
  {/each}

  <!-- Main doc area -->
  <!-- Topbar -->
  <rect x="80" y="0" width="240" height="32" fill="white" stroke="#e9e9e7" stroke-width="0.3"/>
  <text x="90" y="19" font-size="6" fill="#9b9a97">Mi Empresa</text>
  <text x="112" y="19" font-size="6" fill="#9b9a97">›</text>
  <text x="120" y="19" font-size="6" fill="#37352f" font-weight="500">Reunión semanal</text>
  <rect x="246" y="8" width="64" height="14" rx="2" fill="transparent" stroke="#e9e9e7" stroke-width="0.5"/>
  <text x="278" y="17" font-size="5.5" fill="#37352f" text-anchor="middle">Compartir</text>

  <!-- Document content -->
  <text x="92" y="50" font-size="20">📋</text>
  <text x="92" y="72" font-size="16" fill="#37352f" font-weight="700">Reunión semanal</text>
  <text x="92" y="83" font-size="6" fill="#9b9a97">12 de enero de 2026 · Editado hace unos segundos</text>

  <!-- Properties -->
  <text x="92" y="96" font-size="6" fill="#9b9a97">Estado</text>
  <rect x="140" y="88" width="44" height="11" rx="2" fill="#dbeafe"/>
  <text x="162" y="96" font-size="6" fill="#1d4ed8" text-anchor="middle">En curso</text>

  <text x="92" y="110" font-size="6" fill="#9b9a97">Métricas</text>
  <text x="140" y="110" font-size="6" fill="#191919" font-weight="700">42 ppm</text>

  <line x1="88" y1="116" x2="316" y2="116" stroke="#e9e9e7" stroke-width="0.5"/>

  <!-- Game callout block -->
  <rect x="88" y="120" width="224" height="72" fill="#f7f6f3" rx="2"/>
  <rect x="88" y="120" width="3" height="72" fill="#191919" rx="1"/>
  <rect x="88" y="120" width="224" height="16" fill="#f0eeeb"/>
  <text x="96" y="131" font-size="6" fill="#9b9a97">⚡ ANÁLISIS EN TIEMPO REAL</text>

  <!-- Typing game preview inside callout -->
  <rect x="91" y="136" width="218" height="54" fill="white"/>
  <!-- Word display -->
  <rect x="95" y="140" width="208" height="28" fill="white" stroke="#e0e0e0" stroke-width="0.5"/>
  {#each [['report',false],['budget',false],['quarter',true],['revenue',false],['analysis',false]] as [word, current], i}
    <text x={99 + i * 42} y="157" font-size="7"
      fill={current ? '#191919' : '#ccc'}
      font-weight={current ? '700' : 'normal'}
      font-family="Courier New, monospace">{word}</text>
  {/each}
  <!-- Input field -->
  <rect x="95" y="170" width="208" height="14" fill="white" stroke="#191919" stroke-width="1"/>
  <text x="99" y="180" font-size="7" fill="#191919" font-family="Courier New, monospace">quart|</text>

  <!-- Stats bar -->
  <text x="92" y="200" font-size="5.5" fill="#9b9a97">Escribe debajo para añadir notas...</text>
</svg>
