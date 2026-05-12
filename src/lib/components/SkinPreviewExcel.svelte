<!-- Miniatura SVG pixel-accurate del disfraz Excel -->
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="Calibri, sans-serif">
  <!-- Title bar -->
  <rect width="320" height="18" fill="#1f7145"/>
  <text x="8" y="12" font-size="8" fill="white">Informe_Ventas_Q4_2025.xlsx — Excel</text>
  <rect x="300" y="3" width="8" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>

  <!-- Ribbon tabs -->
  <rect y="18" width="320" height="22" fill="#f3f3f3"/>
  <rect y="38" width="320" height="1" fill="#1f7145" opacity="0.6"/>
  {#each ['Inicio','Insertar','Fórmulas','Datos','Vista'] as tab, i}
    <text x={8 + i * 55} y="33" font-size="7" fill={i === 0 ? '#1f7145' : '#555'}
      font-weight={i === 0 ? 'bold' : 'normal'}>{tab}</text>
  {/each}

  <!-- Ribbon actions -->
  <rect y="39" width="320" height="14" fill="white"/>
  {#each ['Copiar','Pegar','N','K','S','Σ Autosuma'] as btn, i}
    <rect x={6 + i * 44} y="41" width={i < 2 ? 36 : 12} height="10" fill="#fafafa" stroke="#ccc" stroke-width="0.5" rx="1"/>
    <text x={6 + i * 44 + (i < 2 ? 18 : 6)} y="49" font-size="6" fill="#333" text-anchor="middle">{btn}</text>
  {/each}

  <!-- Formula bar -->
  <rect y="53" width="320" height="14" fill="white" stroke="#ccc" stroke-width="0.3"/>
  <rect x="4" y="55" width="28" height="10" fill="white" stroke="#bbb" stroke-width="0.5"/>
  <text x="18" y="62" font-size="6" fill="#333" text-anchor="middle">D7</text>
  <text x="38" y="62" font-size="7" fill="#aaa" font-style="italic">ƒx</text>
  <text x="50" y="62" font-size="6" fill="#555">=SERPIENTE(D7; longitud=5; puntos=3)</text>

  <!-- Col headers -->
  <rect y="67" width="320" height="12" fill="#f3f3f3" stroke="#bbb" stroke-width="0.3"/>
  <rect y="67" width="28" height="12" fill="#f3f3f3" stroke="#bbb" stroke-width="0.3"/>
  {#each ['A','B','C','D','E','F','G','H'] as col, i}
    <text x={28 + i * 37 + 18} y="75" font-size="6" fill="#555" text-anchor="middle">{col}</text>
    <line x1={28 + (i+1) * 37} y1="67" x2={28 + (i+1) * 37} y2="79" stroke="#ccc" stroke-width="0.3"/>
  {/each}

  <!-- Grid rows with fake data -->
  {#each Array(6) as _, r}
    <rect y={79 + r * 14} width="320" height="14" fill={r % 2 === 0 ? 'white' : '#fafafa'}/>
    <line x1="0" y1={79 + (r+1) * 14} x2="320" y2={79 + (r+1) * 14} stroke="#e8e8e8" stroke-width="0.3"/>
    <text x="4" y={79 + r * 14 + 9} font-size="5.5" fill="#888">{r + 1}</text>
  {/each}

  <!-- Table header row -->
  <rect y="79" width="292" height="14" fill="#1f7145"/>
  {#each ['Delegación','Octubre','Noviembre','Total Q4','Var. %','Cumpl.'] as h, i}
    <text x={28 + i * 47 + 2} y="88" font-size="6" fill="white" font-weight="bold">{h}</text>
  {/each}

  <!-- Table data -->
  {#each [['Madrid Norte','48.320','51.200','167.360','+12,4%','107%'],
          ['Barcelona','55.600','59.200','186.300','+15,2%','106%'],
          ['Valencia','28.400','31.100','99.300','+6,7%','104%'],
          ['Sevilla','22.100','24.500','77.800','+4,3%','97%'],
          ['TOTAL','247.020','266.750','859.010','+8,9%','104%']] as row, r}
    <rect y={93 + r * 14} width="292" height="14"
      fill={r === 4 ? '#d4edda' : r % 2 === 0 ? '#f2faf6' : 'white'}/>
    {#each row as cell, c}
      <text x={28 + c * 47 + 2} y={93 + r * 14 + 9} font-size="5.5"
        fill={c === 4 ? '#1a7a3c' : r === 4 ? '#111' : '#333'}
        font-weight={r === 4 ? 'bold' : 'normal'}>{cell}</text>
    {/each}
  {/each}

  <!-- Game zone (snake preview) bottom-left -->
  <rect x="0" y="163" width="84" height="28" fill="#f0faf4" stroke="#a0d0b0" stroke-width="1"/>
  <!-- Snake cells -->
  {#each [[0,0],[1,0],[2,0]] as [cx, cy]}
    <rect x={2 + cx * 14} y={165 + cy * 14} width="12" height="12" fill="#1f7145" rx="1"/>
  {/each}
  <!-- Food -->
  <rect x="44" y="165" width="12" height="12" fill="#fff0f0" stroke="#922b21" stroke-width="0.5" rx="1"/>
  <text x="50" y="174" font-size="8" fill="#c0392b" text-anchor="middle" font-weight="bold">$</text>
  <text x="2" y="194" font-size="5" fill="#888">Ejecutar macro · Flechas para mover</text>

  <!-- KPI box -->
  <rect x="236" y="79" width="84" height="70" fill="white" stroke="#e0e0e0" stroke-width="0.5"/>
  <rect x="236" y="79" width="84" height="12" fill="#1f7145"/>
  <text x="278" y="87" font-size="6" fill="white" text-anchor="middle" font-weight="bold">KPIs</text>
  {#each [['Facturación','859.010 €'],['Crecimiento','+8,9%'],['Ticket medio','1.847 €'],['Objetivo','87,3%']] as [k,v], i}
    <text x="240" y={96 + i * 12} font-size="5.5" fill="#555">{k}</text>
    <text x="318" y={96 + i * 12} font-size="5.5" fill="#1f7145" text-anchor="end" font-weight="bold">{v}</text>
  {/each}

  <!-- Sheet tabs -->
  <rect y="191" width="320" height="9" fill="#f3f3f3" stroke="#ccc" stroke-width="0.3"/>
  {#each ['Resumen Q4','Detalle mensual','Previsión 2026'] as tab, i}
    <text x={6 + i * 75} y="198" font-size="5.5" fill={i === 0 ? '#1f7145' : '#777'}
      font-weight={i === 0 ? 'bold' : 'normal'}>{tab}</text>
  {/each}
</svg>
