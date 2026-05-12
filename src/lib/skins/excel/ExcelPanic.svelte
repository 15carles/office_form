<script lang="ts">
	// Static "work" content shown when panic mode is active.
	// Looks like a normal Excel chart — nothing game-related visible.
</script>

<div class="panic-content">
	<!-- Static bar chart as SVG -->
	<svg width="100%" height="100%" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" font-family="Calibri, sans-serif">
		<!-- Chart background -->
		<rect width="320" height="200" fill="#f9f9f9" stroke="#e0e0e0" stroke-width="0.5"/>

		<!-- Chart title -->
		<text x="10" y="16" font-size="10" font-weight="bold" fill="#1f7145">Ventas por Delegación (€ miles) — Q4 2025</text>

		<!-- Y-axis grid lines -->
		<line x1="50" y1="25" x2="310" y2="25" stroke="#e8e8e8" stroke-width="0.5"/>
		<line x1="50" y1="55" x2="310" y2="55" stroke="#e8e8e8" stroke-width="0.5"/>
		<line x1="50" y1="85" x2="310" y2="85" stroke="#e8e8e8" stroke-width="0.5"/>
		<line x1="50" y1="115" x2="310" y2="115" stroke="#e8e8e8" stroke-width="0.5"/>
		<line x1="50" y1="145" x2="310" y2="145" stroke="#e8e8e8" stroke-width="0.5"/>

		<!-- Y-axis labels -->
		<text x="44" y="28" font-size="8" fill="#888" text-anchor="end">200</text>
		<text x="44" y="58" font-size="8" fill="#888" text-anchor="end">150</text>
		<text x="44" y="88" font-size="8" fill="#888" text-anchor="end">100</text>
		<text x="44" y="118" font-size="8" fill="#888" text-anchor="end">50</text>
		<text x="44" y="148" font-size="8" fill="#888" text-anchor="end">0</text>

		<!-- Bars -->
		<!-- Madrid Norte: 167 → height = 167/200*120 = 100.2 -->
		<rect x="58" y="45" width="28" height="100" fill="#1f7145"/>
		<text x="72" y="42" font-size="7" fill="#555" text-anchor="middle">167k</text>
		<text x="72" y="160" font-size="7" fill="#555" text-anchor="middle">MAD-N</text>

		<!-- Madrid Sur: 140 → 84 -->
		<rect x="98" y="61" width="28" height="84" fill="#2e9e61"/>
		<text x="112" y="58" font-size="7" fill="#555" text-anchor="middle">140k</text>
		<text x="112" y="160" font-size="7" fill="#555" text-anchor="middle">MAD-S</text>

		<!-- Barcelona: 186 → 111.6 -->
		<rect x="138" y="34" width="28" height="111" fill="#1f7145"/>
		<text x="152" y="31" font-size="7" fill="#555" text-anchor="middle">186k</text>
		<text x="152" y="160" font-size="7" fill="#555" text-anchor="middle">BCN</text>

		<!-- Valencia: 99 → 59.4 -->
		<rect x="178" y="86" width="28" height="59" fill="#2e9e61"/>
		<text x="192" y="83" font-size="7" fill="#555" text-anchor="middle">99k</text>
		<text x="192" y="160" font-size="7" fill="#555" text-anchor="middle">VLC</text>

		<!-- Sevilla: 77 → 46.2 -->
		<rect x="218" y="99" width="28" height="46" fill="#3aad70"/>
		<text x="232" y="96" font-size="7" fill="#555" text-anchor="middle">77k</text>
		<text x="232" y="160" font-size="7" fill="#555" text-anchor="middle">SVL</text>

		<!-- Bilbao: 70 → 42 -->
		<rect x="258" y="103" width="28" height="42" fill="#3aad70"/>
		<text x="272" y="100" font-size="7" fill="#555" text-anchor="middle">70k</text>
		<text x="272" y="160" font-size="7" fill="#555" text-anchor="middle">BIL</text>

		<!-- X axis line -->
		<line x1="50" y1="145" x2="310" y2="145" stroke="#bbb" stroke-width="1"/>

		<!-- Footnote -->
		<text x="10" y="192" font-size="8" fill="#aaa">Fuente: Sistema ERP interno · Actualizado: {new Date().toLocaleDateString('es-ES')}</text>
	</svg>
</div>

<style>
	.panic-content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		border: 1px solid #e0e0e0;
	}
</style>
