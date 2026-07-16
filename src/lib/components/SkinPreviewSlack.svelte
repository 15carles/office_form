<!-- Miniatura SVG del disfraz Slack (vista de canal, tema claro) -->
<script lang="ts">
	const CHANNELS: { name: string; active: boolean; unread: boolean }[] = [
		{ name: 'general', active: false, unread: false },
		{ name: 'proyecto-q3', active: true, unread: false },
		{ name: 'anuncios', active: false, unread: true },
		{ name: 'random', active: false, unread: false }
	];

	const DMS: { name: string; initials: string; color: string; online: boolean }[] = [
		{ name: 'Elena Vidal', initials: 'EV', color: '#e8912d', online: true },
		{ name: 'A. Fernández', initials: 'AF', color: '#4a154b', online: true },
		{ name: 'M. López', initials: 'ML', color: '#2eb67d', online: false }
	];

	const MSGS: { sender: string; text: string; color: string; initials: string }[] = [
		{ sender: 'A. Fernández', text: 'deck del Q3 actualizado 📊', color: '#4a154b', initials: 'AF' },
		{ sender: 'Elena Vidal', text: 'gracias, revisando ahora', color: '#e8912d', initials: 'EV' }
	];

	const WORDS: { w: string; color: string; current: boolean }[] = [
		{ w: 'informe', color: '#007a5a', current: true },
		{ w: 'agenda', color: '#999', current: false },
		{ w: 'cliente', color: '#999', current: false }
	];
</script>

<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="Lato, Segoe UI, sans-serif">
  <rect width="320" height="200" fill="white"/>

  <!-- Workspace rail -->
  <rect width="26" height="200" fill="#3f0e40"/>
  <rect x="6" y="8" width="14" height="14" rx="4" fill="white"/>
  <text x="13" y="18.5" font-size="7" fill="#3f0e40" text-anchor="middle" font-weight="800">Oc</text>
  <rect x="6" y="28" width="14" height="14" rx="4" fill="rgba(255,255,255,0.1)"/>
  <text x="13" y="38" font-size="9" fill="#e8e0e8" text-anchor="middle">+</text>

  <!-- Channel sidebar -->
  <rect x="26" y="0" width="104" height="200" fill="#f8f8f8"/>
  <line x1="26" y1="24" x2="130" y2="24" stroke="#e8e8e8" stroke-width="0.5"/>
  <text x="34" y="16" font-size="9" fill="#1d1c1d" font-weight="800">OfficeCorp</text>
  <text x="98" y="16" font-size="7" fill="#1d1c1d">▾</text>

  <text x="34" y="36" font-size="6.5" fill="#616061" font-weight="700">Canales</text>
  {#each CHANNELS as ch, i (ch.name)}
    {#if ch.active}
      <rect x="26" y={40 + i * 12} width="104" height="11" fill="#007a5a"/>
    {/if}
    <text x="35" y={48 + i * 12} font-size="7"
      fill={ch.active ? 'rgba(255,255,255,0.8)' : '#9a999a'}>#</text>
    <text x="42" y={48 + i * 12} font-size="7"
      fill={ch.active ? 'white' : ch.unread ? '#1d1c1d' : '#616061'}
      font-weight={ch.unread ? '700' : '400'}>{ch.name}</text>
    {#if ch.name === 'anuncios'}
      <circle cx="124" cy={44.5 + i * 12} r="4" fill="#cd2553"/>
      <text x="124" y={46.5 + i * 12} font-size="5" fill="white" text-anchor="middle" font-weight="700">3</text>
    {/if}
  {/each}

  <text x="34" y="102" font-size="6.5" fill="#616061" font-weight="700">Mensajes directos</text>
  {#each DMS as dm, i (dm.name)}
    <circle cx="37" cy={110 + i * 12} r="3" fill={dm.online ? '#2eb67d' : 'none'} stroke={dm.online ? 'none' : '#949494'} stroke-width="1"/>
    <text x="44" y={112 + i * 12} font-size="7" fill="#616061">{dm.name}</text>
  {/each}

  <!-- Channel area -->
  <rect x="130" y="0" width="190" height="200" fill="white"/>
  <line x1="130" y1="24" x2="320" y2="24" stroke="#e8e8e8" stroke-width="0.5"/>
  <text x="138" y="14" font-size="6" fill="#616061"># </text>
  <text x="143" y="14" font-size="9" fill="#1d1c1d" font-weight="900">proyecto-q3</text>
  <text x="138" y="21" font-size="5.5" fill="#616061">Cierre Q3 · revisión de cifras y pack</text>

  <!-- Messages -->
  {#each MSGS as msg, i (msg.sender)}
    <rect x="138" y={34 + i * 20} width="13" height="13" rx="3" fill={msg.color}/>
    <text x="144.5" y={43 + i * 20} font-size="5.5" fill="white" text-anchor="middle" font-weight="700">{msg.initials}</text>
    <text x="155" y={40 + i * 20} font-size="6.5" fill="#1d1c1d" font-weight="800">{msg.sender}</text>
    <text x="155" y={47 + i * 20} font-size="6.5" fill="#1d1c1d">{msg.text}</text>
  {/each}

  <!-- Typing words -->
  {#each WORDS as word, i (word.w)}
    <text x={140 + i * 44} y="92" font-size="7" font-family="Consolas, monospace"
      fill={word.color} font-weight={word.current ? '700' : '400'}>{word.w}</text>
    {#if word.current}<rect x={138 + i * 44} y="96" width="34" height="1.4" fill="#007a5a"/>{/if}
  {/each}
  <rect x="138" y="104" width="164" height="14" rx="2" fill="white" stroke="#007a5a" stroke-width="0.9"/>
  <text x="143" y="113.5" font-size="6.5" fill="#1d1c1d" font-family="Consolas, monospace">infor|</text>

  <!-- Composer -->
  <rect x="138" y="164" width="172" height="28" rx="5" fill="white" stroke="#c9c9c9" stroke-width="0.6"/>
  <line x1="138" y1="174" x2="310" y2="174" stroke="#ededed" stroke-width="0.5"/>
  <text x="144" y="172" font-size="5.5" fill="#616061" font-weight="700">B  I  S  🔗  @  😊</text>
  <text x="144" y="186" font-size="6" fill="#8d8d8d">Mensaje a #proyecto-q3</text>
  <rect x="292" y="180" width="14" height="10" rx="3" fill="#007a5a"/>
  <path d="M295.5 185l7-3-2 6-1.5-2.5z" fill="white"/>
</svg>
