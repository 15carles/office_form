<!-- Miniatura SVG del disfraz Microsoft Teams (nuevo Teams, tema claro) -->
<script lang="ts">
	const RAIL: { label: string; y: number; active?: boolean; badge?: string }[] = [
		{ label: 'Activ.', y: 40, badge: '3' },
		{ label: 'Chat', y: 66, active: true },
		{ label: 'Equipos', y: 92 },
		{ label: 'Cal.', y: 118 }
	];

	const CHATS: { name: string; snippet: string; color: string; selected: boolean; unread: boolean }[] = [
		{ name: 'Elena Vidal', snippet: 'Perfecto, le echo un vistazo', color: '#c239b3', selected: true, unread: false },
		{ name: 'Proyecto Q3', snippet: 'A. Fernández: deck actualizado', color: '#5b5fc7', selected: false, unread: true },
		{ name: 'M. López', snippet: 'La doc de API ya está 👍', color: '#038387', selected: false, unread: true },
		{ name: 'Laura Ortiz', snippet: 'Tú: perfecto, gracias', color: '#ca5010', selected: false, unread: false },
		{ name: 'Soporte IT', snippet: 'Incidencia resuelta', color: '#5c5c5c', selected: false, unread: false }
	];

	const WORDS: { w: string; color: string; current: boolean }[] = [
		{ w: 'informe', color: '#5b5fc7', current: true },
		{ w: 'agenda', color: '#999', current: false },
		{ w: 'cliente', color: '#999', current: false }
	];
</script>

<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Inter, sans-serif">
  <!-- App background -->
  <rect width="320" height="200" fill="#f5f5f5"/>

  <!-- Top bar -->
  <rect width="320" height="22" fill="#ebebeb"/>
  <rect x="95" y="5" width="130" height="12" rx="3" fill="white" stroke="#d1d1d1" stroke-width="0.5"/>
  <text x="102" y="14" font-size="6.5" fill="#888">⌕ Buscar</text>
  <circle cx="308" cy="11" r="7" fill="#ca5010"/>
  <text x="308" y="14" font-size="6" fill="white" text-anchor="middle" font-weight="600">JG</text>

  <!-- App rail -->
  <rect y="22" width="34" height="178" fill="#ebebeb"/>
  {#each RAIL as item (item.label)}
    {#if item.active}
      <rect x="3" y={item.y - 8} width="2.5" height="16" rx="1" fill="#5b5fc7"/>
    {/if}
    <rect x="12" y={item.y - 8} width="11" height="9" rx="2" fill="none"
      stroke={item.active ? '#5b5fc7' : '#616161'} stroke-width="1"/>
    {#if item.badge}
      <circle cx="24" cy={item.y - 8} r="3.5" fill="#c4314b"/>
      <text x="24" y={item.y - 6} font-size="4.5" fill="white" text-anchor="middle" font-weight="600">{item.badge}</text>
    {/if}
    <text x="17.5" y={item.y + 8} font-size="4.5" text-anchor="middle"
      fill={item.active ? '#5b5fc7' : '#616161'} font-weight={item.active ? '600' : '400'}>{item.label}</text>
  {/each}

  <!-- Chat list -->
  <rect x="34" y="22" width="118" height="178" fill="white" stroke="#e0e0e0" stroke-width="0.4"/>
  <text x="42" y="38" font-size="10" fill="#242424" font-weight="700">Chat</text>
  {#each CHATS as chat, i (chat.name)}
    {#if chat.selected}
      <rect x="38" y={44 + i * 27} width="110" height="24" rx="4" fill="#eceafa"/>
    {/if}
    <circle cx="50" cy={56 + i * 27} r="8" fill={chat.color}/>
    <text x="50" y={58.5 + i * 27} font-size="6.5" fill="white" text-anchor="middle" font-weight="600">
      {chat.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}</text>
    <text x="63" y={53 + i * 27} font-size="6.5" fill="#242424" font-weight={chat.unread ? '700' : '400'}>{chat.name}</text>
    <text x="63" y={62 + i * 27} font-size="5.5" fill={chat.unread ? '#242424' : '#616161'} font-weight={chat.unread ? '600' : '400'}>{chat.snippet}</text>
    {#if chat.unread}
      <circle cx="143" cy={57 + i * 27} r="2.5" fill="#5b5fc7"/>
    {/if}
  {/each}

  <!-- Conversation panel -->
  <rect x="152" y="22" width="168" height="178" fill="white"/>
  <!-- Conv header -->
  <line x1="152" y1="46" x2="320" y2="46" stroke="#e0e0e0" stroke-width="0.5"/>
  <circle cx="164" cy="34" r="7" fill="#c239b3"/>
  <text x="164" y="36.5" font-size="6" fill="white" text-anchor="middle" font-weight="600">EV</text>
  <text x="176" y="32" font-size="7.5" fill="#242424" font-weight="700">Elena Vidal</text>
  <text x="176" y="42" font-size="6" fill="#242424" font-weight="600">Chat</text>
  <line x1="176" y1="44" x2="188" y2="44" stroke="#5b5fc7" stroke-width="1.2"/>
  <text x="196" y="42" font-size="6" fill="#616161">Archivos</text>

  <!-- Typing game framed as compose -->
  <!-- Words being typed -->
  {#each WORDS as word, i (word.w)}
    <text x={168 + i * 40} y="90" font-size="7" font-family="Consolas, monospace"
      fill={word.color} font-weight={word.current ? '700' : '400'}>{word.w}</text>
    {#if word.current}<rect x={166 + i * 40} y="94" width="34" height="1.4" fill="#5b5fc7"/>{/if}
  {/each}
  <rect x="166" y="104" width="140" height="14" rx="2" fill="white" stroke="#5b5fc7" stroke-width="0.9"/>
  <text x="171" y="113.5" font-size="6.5" fill="#242424" font-family="Consolas, monospace">infor|</text>

  <!-- Compose bar -->
  <rect x="160" y="168" width="128" height="24" rx="6" fill="white" stroke="#d1d1d1" stroke-width="0.6"/>
  <text x="166" y="176" font-size="5.5" fill="#616161">Aa 😊 📎</text>
  <text x="166" y="186" font-size="6" fill="#909090">Responder a Elena Vidal</text>
  <rect x="292" y="169" width="22" height="22" rx="5" fill="#5b5fc7"/>
  <path d="M298 180l11-5-3 10-2.5-3.5 3-3-5 3z" fill="white"/>
</svg>
