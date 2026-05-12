<script lang="ts">
	// Static meeting notes shown during panic — looks like a real Notion document block
	const today = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
</script>

<div class="panic-content">
	<div class="notion-blocks">
		<div class="block callout">
			<span class="callout-icon">📋</span>
			<div class="callout-text">
				<strong>Revisión de objetivos Q4 2025</strong> — Reunión de seguimiento semanal.
				Fecha: {today}
			</div>
		</div>

		<div class="block heading-2">Puntos del orden del día</div>

		<div class="block bulleted-list">Revisión de KPIs del trimestre anterior y desviaciones respecto al plan</div>
		<div class="block bulleted-list">Actualización del estado de los proyectos en curso y bloqueos identificados</div>
		<div class="block bulleted-list">Priorización del backlog para el próximo sprint (semanas 3–4)</div>
		<div class="block bulleted-list">Asignación de responsables para los entregables pendientes</div>

		<div class="block heading-2">Notas y acuerdos</div>

		<div class="block paragraph">
			El equipo de desarrollo confirma que el módulo de integración estará listo para el
			<strong>viernes 16</strong>. Se delega la validación final a A. Fernández antes del deploy a producción.
		</div>

		<div class="block paragraph muted">
			Próxima reunión: lunes 20 · 10:00 h · Sala B / Meet · Convoca: dirección de producto
		</div>

		<div class="block database-stub">
			<div class="db-header">
				<span class="db-icon">⊞</span>
				<span class="db-title">Tareas derivadas</span>
			</div>
			<div class="db-row header-row">
				<span>Tarea</span><span>Responsable</span><span>Estado</span><span>Fecha</span>
			</div>
			<div class="db-row">
				<span>Validar integración API</span><span>A. Fernández</span>
				<span class="tag in-progress">En curso</span><span>16 ene</span>
			</div>
			<div class="db-row">
				<span>Actualizar documentación</span><span>M. López</span>
				<span class="tag todo">Pendiente</span><span>20 ene</span>
			</div>
			<div class="db-row">
				<span>Deploy a producción</span><span>DevOps</span>
				<span class="tag done">Completado</span><span>12 ene</span>
			</div>
		</div>
	</div>
</div>

<style>
	.panic-content {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background: white;
		padding: 24px 16px;
	}

	.notion-blocks {
		max-width: 560px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.block { font-family: ui-sans-serif, system-ui, sans-serif; }

	.callout {
		background: #f7f6f3;
		border-radius: 4px;
		padding: 10px 14px;
		display: flex;
		gap: 10px;
		align-items: flex-start;
		margin-bottom: 8px;
		font-size: 13px;
		color: #37352f;
		line-height: 1.5;
	}
	.callout-icon { font-size: 16px; flex-shrink: 0; }

	.heading-2 {
		font-size: 16px;
		font-weight: 600;
		color: #37352f;
		margin-top: 16px;
		margin-bottom: 4px;
	}

	.bulleted-list {
		font-size: 13px;
		color: #37352f;
		padding-left: 20px;
		line-height: 1.6;
		position: relative;
	}
	.bulleted-list::before {
		content: '•';
		position: absolute;
		left: 6px;
		color: #9b9a97;
	}

	.paragraph {
		font-size: 13px;
		color: #37352f;
		line-height: 1.6;
		margin-top: 6px;
	}
	.paragraph.muted { color: #9b9a97; font-size: 12px; }

	.database-stub {
		margin-top: 16px;
		border: 1px solid #e9e9e7;
		border-radius: 4px;
		overflow: hidden;
		font-size: 12px;
	}

	.db-header {
		padding: 8px 12px;
		display: flex;
		align-items: center;
		gap: 6px;
		border-bottom: 1px solid #e9e9e7;
		background: #fbfbfa;
	}
	.db-icon { color: #9b9a97; }
	.db-title { font-weight: 600; color: #37352f; font-size: 12px; }

	.db-row {
		display: grid;
		grid-template-columns: 2fr 1.2fr 1fr 0.8fr;
		padding: 7px 12px;
		border-bottom: 1px solid #f0f0ef;
		color: #37352f;
		align-items: center;
		gap: 8px;
	}
	.db-row.header-row {
		background: #fbfbfa;
		color: #9b9a97;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.tag {
		display: inline-block;
		padding: 1px 7px;
		border-radius: 3px;
		font-size: 11px;
	}
	.tag.todo { background: #f0f0ef; color: #787774; }
	.tag.in-progress { background: #dbeafe; color: #1d4ed8; }
	.tag.done { background: #d1fae5; color: #065f46; }
</style>
