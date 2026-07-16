<!-- Miniatura SVG del disfraz Outlook (nuevo Outlook / Fluent 2) -->
<script lang="ts">
	const WORDS: { w: string; color: string; current: boolean }[] = [
		{ w: 'informe', color: '#0f6cbd', current: true },
		{ w: 'agenda', color: '#999', current: false },
		{ w: 'cliente', color: '#999', current: false }
	];

	const MESSAGES: { from: string; subj: string; selected: boolean; unread: boolean; color: string }[] = [
		{ from: 'Elena Vidal', subj: 'RE: Cifras Q3', selected: true, unread: false, color: '#c239b3' },
		{ from: 'A. Fernández', subj: 'Acta del comité', selected: false, unread: true, color: '#0f6cbd' },
		{ from: 'RRHH', subj: 'Evaluaciones', selected: false, unread: true, color: '#8764b8' },
		{ from: 'M. López', subj: 'Docs de API', selected: false, unread: false, color: '#038387' },
		{ from: 'Soporte IT', subj: 'Mantenimiento', selected: false, unread: false, color: '#5c5c5c' },
		{ from: 'Laura Ortiz', subj: 'Propuesta v2', selected: false, unread: true, color: '#ca5010' }
	];
</script>

<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Inter, sans-serif">
  <!-- App background -->
  <rect width="320" height="200" fill="white"/>

  <!-- Top bar -->
  <rect width="320" height="26" fill="#0f6cbd"/>
  <text x="24" y="17" font-size="9" fill="white" font-weight="600">Outlook</text>
  {#each [0, 1, 2] as r (r)}
    {#each [0, 1, 2] as c (c)}
      <circle cx={9 + c * 3.4} cy={10 + r * 3.4} r="0.9" fill="white"/>
    {/each}
  {/each}
  <rect x="105" y="6" width="115" height="14" rx="3" fill="white"/>
  <text x="112" y="16" font-size="7" fill="#888">⌕ Buscar</text>
  <circle cx="306" cy="13" r="7" fill="#ca5010"/>
  <text x="306" y="16" font-size="6" fill="white" text-anchor="middle" font-weight="600">JG</text>

  <!-- Command bar -->
  <rect y="26" width="320" height="20" fill="white" stroke="#e1dfdd" stroke-width="0.4"/>
  <rect x="8" y="30" width="52" height="12" rx="3" fill="#0f6cbd"/>
  <text x="34" y="39" font-size="6.5" fill="white" text-anchor="middle" font-weight="600">+ Correo</text>
  {#each ['Eliminar', 'Archivar', 'Responder'] as cmd, i (cmd)}
    <text x={70 + i * 42} y="39" font-size="6.5" fill="#616161">{cmd}</text>
  {/each}

  <!-- App rail -->
  <rect y="46" width="18" height="154" fill="#faf9f8" stroke="#e1dfdd" stroke-width="0.4"/>
  <rect x="2" y="52" width="2" height="10" rx="1" fill="#0f6cbd"/>
  <rect x="6" y="53" width="8" height="6" rx="1" fill="none" stroke="#0f6cbd" stroke-width="0.9"/>
  <path d="m6.5 54 3.5 2.6 3.5-2.6" fill="none" stroke="#0f6cbd" stroke-width="0.9"/>
  <rect x="6" y="69" width="8" height="7" rx="1" fill="none" stroke="#888" stroke-width="0.9"/>
  <line x1="6" y1="71.5" x2="14" y2="71.5" stroke="#888" stroke-width="0.9"/>
  <circle cx="10" cy="89" r="2.4" fill="none" stroke="#888" stroke-width="0.9"/>
  <path d="M6 96c.8-2 2.3-3 4-3s3.2 1 4 3" fill="none" stroke="#888" stroke-width="0.9"/>

  <!-- Folder pane -->
  <rect x="18" y="46" width="62" height="154" fill="#faf9f8" stroke="#e1dfdd" stroke-width="0.4"/>
  <text x="24" y="58" font-size="6" fill="#616161" font-weight="600">Favoritos</text>
  <rect x="21" y="62" width="56" height="11" rx="2" fill="#e0ecf9"/>
  <text x="25" y="70" font-size="6.5" fill="#242424" font-weight="600">Bandeja</text>
  <text x="72" y="70" font-size="6.5" fill="#0f6cbd" text-anchor="end" font-weight="600">4</text>
  {#each ['Borradores', 'Enviados', 'Archivo', 'Eliminados'] as f, i (f)}
    <text x="25" y={83 + i * 12} font-size="6.5" fill="#424242">{f}</text>
  {/each}

  <!-- Message list -->
  <rect x="80" y="46" width="92" height="154" fill="white" stroke="#e1dfdd" stroke-width="0.4"/>
  {#each MESSAGES as msg, i (msg.from)}
    {#if msg.selected}
      <rect x="80" y={48 + i * 25} width="92" height="24" fill="#e0ecf9"/>
    {/if}
    {#if msg.selected || msg.unread}
      <rect x="81" y={50 + i * 25} width="2" height="20" rx="1" fill="#0f6cbd"/>
    {/if}
    <circle cx="92" cy={59 + i * 25} r="5.5" fill={msg.color}/>
    <text x="102" y={57 + i * 25} font-size="6" fill="#242424" font-weight={msg.unread ? '700' : '400'}>{msg.from}</text>
    <text x="102" y={65 + i * 25} font-size="5.5" fill={msg.unread ? '#0f6cbd' : '#616161'} font-weight={msg.unread ? '600' : '400'}>{msg.subj}</text>
    <text x="168" y={57 + i * 25} font-size="5" fill="#888" text-anchor="end">9:{40 - i * 5}</text>
  {/each}

  <!-- Reading pane -->
  <text x="180" y="62" font-size="8" fill="#242424" font-weight="650">RE: Cifras Q3 — revisión</text>
  <circle cx="188" cy="76" r="7" fill="#c239b3"/>
  <text x="188" y="79" font-size="6" fill="white" text-anchor="middle" font-weight="600">EV</text>
  <text x="200" y="74" font-size="6.5" fill="#242424" font-weight="600">Elena Vidal</text>
  <text x="200" y="82" font-size="5.5" fill="#616161">Para: ti</text>
  <line x1="180" y1="90" x2="312" y2="90" stroke="#e1dfdd" stroke-width="0.5"/>

  <!-- Reply frame with typing game -->
  <rect x="180" y="98" width="132" height="94" rx="4" fill="white" stroke="#e1dfdd" stroke-width="0.8"/>
  <circle cx="191" cy="108" r="4.5" fill="#ca5010"/>
  <text x="191" y="110.5" font-size="4.5" fill="white" text-anchor="middle" font-weight="600">JG</text>
  <text x="199" y="110.5" font-size="5.5" fill="#616161">Responder a Elena Vidal</text>
  <line x1="181" y1="115" x2="311" y2="115" stroke="#f0f0f0" stroke-width="0.6"/>
  <!-- Typing words -->
  {#each WORDS as word, i (word.w)}
    <text x={188 + i * 40} y="132" font-size="7" font-family="Consolas, monospace"
      fill={word.color} font-weight={word.current ? '700' : '400'}>{word.w}</text>
    {#if word.current}<rect x={186 + i * 40} y="136" width="32" height="1.4" fill="#0f6cbd"/>{/if}
  {/each}
  <rect x="188" y="145" width="116" height="14" rx="2" fill="white" stroke="#0f6cbd" stroke-width="0.9"/>
  <text x="192" y="154.5" font-size="6.5" fill="#242424" font-family="Consolas, monospace">infor|</text>
  <!-- Reply footer -->
  <line x1="181" y1="172" x2="311" y2="172" stroke="#f0f0f0" stroke-width="0.6"/>
  <rect x="187" y="177" width="34" height="10" rx="2" fill="#0f6cbd"/>
  <text x="204" y="184.5" font-size="6" fill="white" text-anchor="middle" font-weight="600">Enviar</text>
  <text x="228" y="184.5" font-size="5.5" fill="#616161">Descartar</text>
</svg>
