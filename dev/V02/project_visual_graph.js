/* ODIN V03.9.2.1 — REAL VISUAL GRAPH
   Full visual graph layer.
   View-only. No state mutation except optional log.
*/

const ODIN_VISUAL_GRAPH = {
  state: {
    selectedId: null,
    positions: {},
    map: null
  },

  colors: {
    LOADED: "#22c55e",
    PARTIAL: "#facc15",
    MISSING: "#ef4444",
    RUNTIME_ONLY: "#38bdf8",
    NOT_REQUIRED_HERE: "#a78bfa",
    ADMIN_ONLY: "#94a3b8",
    UNKNOWN: "#64748b",
    HIGH: "#fb7185",
    MEDIUM: "#fbbf24",
    LOW: "#86efac"
  },

  buildMap() {
    if (window.ODIN_PROJECT_MAP_PRO?.buildMap) {
      return ODIN_PROJECT_MAP_PRO.buildMap();
    }

    return {
      version: "V03.9.2.1_FALLBACK",
      nodes: [],
      links: [],
      risks: ["ODIN_PROJECT_MAP_PRO not available"],
      next_actions: ["Load Project Map Pro first."]
    };
  },

  render() {
    const map = this.buildMap();
    this.state.map = map;

    const canvas = document.getElementById("odinGraphCanvas");
    if (!canvas) return;

    const wrap = canvas.parentElement;
    const width = Math.max(900, wrap?.clientWidth || 900);
    const height = 560;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    const nodes = map.nodes || [];
    const links = map.links || [];
    const positions = this.layout(nodes, width, height);
    this.state.positions = positions;

    this.drawBackground(ctx, width, height);
    this.drawLinks(ctx, links, positions);
    this.drawNodes(ctx, nodes, positions);
    this.drawLegend(ctx, width, height);
    this.renderDetails();

    canvas.onclick = (ev) => this.handleClick(ev, canvas, nodes, positions);
  },

  layout(nodes, width, height) {
    const positions = {};
    const centerX = width / 2;
    const centerY = height / 2;
    const radiusX = Math.min(width * 0.36, 360);
    const radiusY = Math.min(height * 0.34, 210);

    const order = [
      "state", "event_bus", "mode", "router", "engine",
      "map", "unknown", "task", "snapshot", "git", "diff", "safe_push", "push_package"
    ];

    const sorted = [...nodes].sort((a, b) => {
      const ia = order.indexOf(a.id);
      const ib = order.indexOf(b.id);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    sorted.forEach((n, i) => {
      const angle = (-Math.PI / 2) + (i * 2 * Math.PI / Math.max(sorted.length, 1));
      positions[n.id] = {
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY
      };
    });

    return positions;
  },

  drawBackground(ctx, width, height) {
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(148,163,184,.12)";
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  },

  drawLinks(ctx, links, positions) {
    links.forEach(link => {
      const a = positions[link.from];
      const b = positions[link.to];
      if (!a || !b) return;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = link.type === "depends_on" ? "rgba(59,130,246,.55)" : "rgba(34,197,94,.45)";
      ctx.lineWidth = link.type === "depends_on" ? 2 : 1.5;
      ctx.stroke();

      this.drawArrow(ctx, a, b, link.type === "depends_on" ? "rgba(59,130,246,.75)" : "rgba(34,197,94,.65)");
    });
  },

  drawArrow(ctx, a, b, color) {
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    const endX = b.x - Math.cos(angle) * 34;
    const endY = b.y - Math.sin(angle) * 34;

    ctx.save();
    ctx.translate(endX, endY);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-9, -5);
    ctx.lineTo(-9, 5);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  },

  drawNodes(ctx, nodes, positions) {
    nodes.forEach(node => {
      const p = positions[node.id];
      if (!p) return;

      const selected = this.state.selectedId === node.id;
      const r = selected ? 34 : 29;

      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
      ctx.fillStyle = this.riskColor(node.risk, selected);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = this.statusColor(node.status);
      ctx.fill();

      ctx.strokeStyle = selected ? "#ffffff" : "rgba(255,255,255,.55)";
      ctx.lineWidth = selected ? 3 : 1.5;
      ctx.stroke();

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 11px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.short(node.id), p.x, p.y);

      ctx.fillStyle = "#e5e7eb";
      ctx.font = "12px Arial";
      ctx.textBaseline = "top";
      ctx.fillText(node.name.slice(0, 18), p.x, p.y + r + 8);
    });
  },

  drawLegend(ctx, width, height) {
    const items = [
      ["LOADED", this.colors.LOADED],
      ["RUNTIME_ONLY", this.colors.RUNTIME_ONLY],
      ["NOT_REQUIRED_HERE", this.colors.NOT_REQUIRED_HERE],
      ["MISSING", this.colors.MISSING],
      ["PARTIAL", this.colors.PARTIAL]
    ];

    let x = 18;
    let y = height - 34;

    ctx.font = "12px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    items.forEach(([label, color]) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y - 6, 12, 12);
      ctx.fillStyle = "#cbd5e1";
      ctx.fillText(label, x + 18, y);
      x += 135;
    });
  },

  handleClick(ev, canvas, nodes, positions) {
    const rect = canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left) * (canvas.width / rect.width);
    const y = (ev.clientY - rect.top) * (canvas.height / rect.height);

    let found = null;
    nodes.forEach(node => {
      const p = positions[node.id];
      if (!p) return;
      const d = Math.hypot(x - p.x, y - p.y);
      if (d < 38) found = node.id;
    });

    if (found) {
      this.state.selectedId = found;
      this.render();
    }
  },

  renderDetails() {
    const box = document.getElementById("graphDetailsBox");
    if (!box) return;

    const map = this.state.map;
    const nodes = map?.nodes || [];
    const selected = nodes.find(n => n.id === this.state.selectedId) || nodes[0];

    if (!selected) {
      box.textContent = "No node selected.";
      return;
    }

    const incoming = (map.links || []).filter(l => l.to === selected.id);
    const outgoing = (map.links || []).filter(l => l.from === selected.id);

    box.textContent = [
      `NODE: ${selected.name}`,
      `id: ${selected.id}`,
      `status: ${selected.status}`,
      `scope: ${selected.scope}`,
      `risk: ${selected.risk}`,
      `problem: ${selected.problem}`,
      "",
      `role: ${selected.role}`,
      "",
      `depends_on: ${(selected.depends_on || []).join(", ") || "—"}`,
      `feeds: ${(selected.feeds || []).join(", ") || "—"}`,
      `files: ${(selected.files || []).join(", ")}`,
      `active_tasks: ${selected.active_tasks}`,
      "",
      `incoming links: ${incoming.length}`,
      `outgoing links: ${outgoing.length}`,
      "",
      "RISKS:",
      ...(map.risks?.length ? map.risks.map(r => " - " + r) : [" — none"]),
      "",
      "NEXT ACTIONS:",
      ...(map.next_actions?.length ? map.next_actions.map(a => " - " + a) : [" — none"])
    ].join("\n");
  },

  statusColor(status) {
    return this.colors[status] || this.colors.UNKNOWN;
  },

  riskColor(risk, selected) {
    const c = this.colors[risk] || "#475569";
    return selected ? "#ffffff" : c;
  },

  short(id) {
    const map = {
      state: "STATE",
      event_bus: "BUS",
      mode: "MODE",
      router: "RTR",
      engine: "ENG",
      map: "MAP",
      unknown: "UNK",
      task: "TASK",
      snapshot: "SNAP",
      git: "GIT",
      diff: "DIFF",
      safe_push: "SAFE",
      push_package: "PKG"
    };
    return map[id] || id.slice(0, 5).toUpperCase();
  },

  copyDetails() {
    const box = document.getElementById("graphDetailsBox");
    navigator.clipboard?.writeText(box?.textContent || "");
  }
};

window.ODIN_VISUAL_GRAPH = ODIN_VISUAL_GRAPH;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (document.getElementById("odinGraphCanvas")) {
      ODIN_VISUAL_GRAPH.render();
    }
  }, 2600);
});
