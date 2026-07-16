<!-- Miniatura SVG del disfraz Salesforce (Lightning, oportunidad) -->
<script lang="ts">
	const NAV: string[] = ['Inicio', 'Oportun.', 'Leads', 'Cuentas', 'Contactos'];
	const STAGES: { label: string; state: 'done' | 'current' | 'todo' }[] = [
		{ label: 'Prosp.', state: 'done' },
		{ label: 'Cualif.', state: 'done' },
		{ label: 'Análisis', state: 'done' },
		{ label: 'Propuesta', state: 'current' },
		{ label: 'Negoc.', state: 'todo' },
		{ label: 'Ganada', state: 'todo' }
	];
	const ROWS: { name: string; role: string }[] = [
		{ name: 'Elena Vidal', role: 'Decisión' },
		{ name: 'A. Fernández', role: 'Económico' }
	];

	function chevFill(s: string): string {
		return s === 'current' ? '#0176d3' : s === 'done' ? '#c5d9ec' : '#ecebea';
	}
	function chevText(s: string): string {
		return s === 'current' ? 'white' : s === 'done' ? '#032d60' : '#514f4d';
	}
</script>

<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Inter, sans-serif">
  <rect width="320" height="200" fill="#f3f3f3"/>

  <!-- Global header -->
  <rect width="320" height="20" fill="#032d60"/>
  {#each [0, 1, 2] as r (r)}
    {#each [0, 1, 2] as c (c)}
      <circle cx={8 + c * 3} cy={7 + r * 3} r="0.8" fill="white"/>
    {/each}
  {/each}
  <text x="22" y="13.5" font-size="8" fill="white" font-weight="700" font-style="italic">Ventas</text>
  <rect x="115" y="4" width="120" height="12" rx="6" fill="white"/>
  <text x="122" y="13" font-size="6" fill="#747474">⌕ Buscar en Salesforce</text>
  <circle cx="310" cy="10" r="6" fill="#e8912d"/>
  <text x="310" y="12.5" font-size="5.5" fill="white" text-anchor="middle" font-weight="700">JG</text>

  <!-- Object nav -->
  <rect y="20" width="320" height="16" fill="white" stroke="#dddbda" stroke-width="0.4"/>
  {#each NAV as tab, i (tab)}
    <text x={10 + i * 44} y="31" font-size="6.5"
      fill={i === 1 ? '#0176d3' : '#080707'} font-weight={i === 1 ? '700' : '400'}>{tab}</text>
    {#if i === 1}<rect x={8 + i * 44} y="34" width="40" height="2" fill="#0176d3"/>{/if}
  {/each}

  <!-- Highlights card -->
  <rect x="8" y="42" width="304" height="52" rx="5" fill="white" stroke="#dddbda" stroke-width="0.5"/>
  <rect x="14" y="48" width="16" height="16" rx="3" fill="#fe9339"/>
  <path d="M18 52h8M18 55h8M18 58h5" stroke="white" stroke-width="1" stroke-linecap="round"/>
  <text x="36" y="52" font-size="5" fill="#706e6b">Oportunidad</text>
  <text x="36" y="61" font-size="8.5" fill="#080707" font-weight="700">Global Media - 250 Widgets</text>
  {#each [['Cuenta', 'Global Media'], ['Cierre', '31/12/25'], ['Importe', '65.500 €']] as [l, v], i (l)}
    <text x={175 + i * 46} y="52" font-size="5" fill="#706e6b">{l}</text>
    <text x={175 + i * 46} y="60" font-size="5.5" fill={i === 0 ? '#0176d3' : '#080707'} font-weight="600">{v}</text>
  {/each}

  <!-- Path -->
  {#each STAGES as st, i (st.label)}
    <polygon points="{16 + i * 46},70 {54 + i * 46},70 {59 + i * 46},77 {54 + i * 46},84 {16 + i * 46},84 {21 + i * 46},77"
      fill={chevFill(st.state)}/>
    <text x={37 + i * 46} y="79" font-size="5" fill={chevText(st.state)} text-anchor="middle" font-weight={st.state === 'current' ? '700' : '400'}>{st.label}</text>
  {/each}

  <!-- Body: game card (left) -->
  <rect x="8" y="100" width="196" height="92" rx="5" fill="white" stroke="#dddbda" stroke-width="0.5"/>
  <rect x="8" y="100" width="196" height="16" rx="5" fill="white"/>
  <rect x="14" y="104" width="9" height="9" rx="2" fill="#8c9196"/>
  <text x="28" y="111" font-size="6.5" fill="#080707" font-weight="700">Archivos (3)</text>
  <line x1="8" y1="116" x2="204" y2="116" stroke="#dddbda" stroke-width="0.4"/>
  <!-- snake mini board -->
  {#each Array(5) as _, r (r)}
    {#each Array(11) as _, c (c)}
      <rect x={16 + c * 16} y={122 + r * 12} width="15" height="11" fill={(r + c) % 2 === 0 ? '#fafaf9' : '#f3f2f2'} stroke="#e5e5e5" stroke-width="0.3"/>
    {/each}
  {/each}
  {#each [[3, 2], [4, 2], [5, 2], [5, 1]] as [c, r] (`${c}-${r}`)}
    <rect x={16 + c * 16 + 1} y={122 + r * 12 + 1} width="13" height="9" fill="#0176d3"/>
  {/each}
  <rect x={16 + 8 * 16 + 1} y={122 + 3 * 12 + 1} width="13" height="9" fill="#fff0f0" stroke="#c0392b" stroke-width="0.4"/>
  <text x={16 + 8 * 16 + 7.5} y={122 + 3 * 12 + 8} font-size="6" fill="#c0392b" text-anchor="middle" font-weight="700">$</text>

  <!-- Activity card (right) -->
  <rect x="210" y="100" width="102" height="92" rx="5" fill="white" stroke="#dddbda" stroke-width="0.5"/>
  <text x="216" y="112" font-size="7" fill="#080707" font-weight="700">Actividad</text>
  <line x1="210" y1="116" x2="312" y2="116" stroke="#ecebea" stroke-width="0.4"/>
  {#each ROWS as row, i (row.name)}
    <rect x="216" y={122 + i * 20} width="6" height="6" rx="1" fill="#8c9196"/>
    <text x="226" y={126 + i * 20} font-size="5.5" fill="#080707">{row.name}</text>
    <text x="226" y={133 + i * 20} font-size="5" fill="#706e6b">{row.role}</text>
  {/each}
</svg>
