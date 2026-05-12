<script lang="ts">
	// Static Figma design spec shown during panic — looks like a component inspection view
</script>

<div class="panic-content">
	<div class="spec-frame">
		<!-- Annotated component mockup -->
		<svg width="100%" height="100%" viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Segoe UI, sans-serif">
			<!-- Background -->
			<rect width="340" height="220" fill="#f5f5f5"/>

			<!-- Component frame -->
			<rect x="80" y="30" width="180" height="90" fill="white" stroke="#e0e0e0" stroke-width="1"/>

			<!-- Simulated button component inside frame -->
			<rect x="110" y="55" width="120" height="36" rx="4" fill="#1a1a1a"/>
			<text x="170" y="78" font-size="12" fill="white" text-anchor="middle" font-weight="500">Confirm action</text>

			<!-- Dimension annotations -->
			<!-- Width arrow top -->
			<line x1="80" y1="20" x2="260" y2="20" stroke="#18a0fb" stroke-width="1"/>
			<line x1="80" y1="16" x2="80" y2="24" stroke="#18a0fb" stroke-width="1"/>
			<line x1="260" y1="16" x2="260" y2="24" stroke="#18a0fb" stroke-width="1"/>
			<text x="170" y="17" font-size="9" fill="#18a0fb" text-anchor="middle">180</text>

			<!-- Height arrow right -->
			<line x1="270" y1="30" x2="270" y2="120" stroke="#18a0fb" stroke-width="1"/>
			<line x1="266" y1="30" x2="274" y2="30" stroke="#18a0fb" stroke-width="1"/>
			<line x1="266" y1="120" x2="274" y2="120" stroke="#18a0fb" stroke-width="1"/>
			<text x="285" y="80" font-size="9" fill="#18a0fb" text-anchor="middle">90</text>

			<!-- Inner button annotations -->
			<line x1="110" y1="140" x2="230" y2="140" stroke="#18a0fb" stroke-width="0.8" stroke-dasharray="3,2"/>
			<line x1="110" y1="136" x2="110" y2="144" stroke="#18a0fb" stroke-width="0.8"/>
			<line x1="230" y1="136" x2="230" y2="144" stroke="#18a0fb" stroke-width="0.8"/>
			<text x="170" y="152" font-size="9" fill="#18a0fb" text-anchor="middle">120 · h: 36 · r: 4</text>

			<!-- Property panel (right side) -->
			<rect x="290" y="30" width="44" height="140" fill="white" stroke="#e0e0e0" stroke-width="0.5"/>
			<text x="312" y="44" font-size="8" fill="#333" text-anchor="middle" font-weight="600">Design</text>
			<line x1="290" y1="48" x2="334" y2="48" stroke="#e0e0e0" stroke-width="0.5"/>

			<text x="294" y="60" font-size="7" fill="#888">W</text>
			<text x="330" y="60" font-size="7" fill="#333" text-anchor="end">180</text>
			<text x="294" y="72" font-size="7" fill="#888">H</text>
			<text x="330" y="72" font-size="7" fill="#333" text-anchor="end">90</text>
			<text x="294" y="84" font-size="7" fill="#888">X</text>
			<text x="330" y="84" font-size="7" fill="#333" text-anchor="end">80</text>
			<text x="294" y="96" font-size="7" fill="#888">Y</text>
			<text x="330" y="96" font-size="7" fill="#333" text-anchor="end">30</text>
			<line x1="290" y1="102" x2="334" y2="102" stroke="#e0e0e0" stroke-width="0.5"/>
			<text x="294" y="114" font-size="7" fill="#888">Fill</text>
			<rect x="294" y="118" width="10" height="8" fill="#1a1a1a" rx="1"/>
			<text x="330" y="124" font-size="7" fill="#333" text-anchor="end">#1A1A1A</text>
			<text x="294" y="136" font-size="7" fill="#888">Opacity</text>
			<text x="330" y="136" font-size="7" fill="#333" text-anchor="end">100%</text>
			<text x="294" y="148" font-size="7" fill="#888">Radius</text>
			<text x="330" y="148" font-size="7" fill="#333" text-anchor="end">4</text>
			<text x="294" y="160" font-size="7" fill="#888">Effects</text>
			<text x="330" y="160" font-size="7" fill="#888" text-anchor="end">—</text>

			<!-- Layer name tag -->
			<rect x="80" y="28" width="56" height="14" fill="#18a0fb"/>
			<text x="108" y="38" font-size="8" fill="white" text-anchor="middle">Button/Primary</text>

			<!-- Footer note -->
			<text x="10" y="212" font-size="8" fill="#aaa">Design System v2 · Component: Button · Variant: Primary · Auto Layout: Horizontal</text>
		</svg>
	</div>
</div>

<style>
	.panic-content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f5f5f5;
	}

	.spec-frame {
		width: 100%;
		height: 100%;
	}
</style>
