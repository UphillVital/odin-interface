/* ODIN V03.9.3 — INTERACTIVE GRAPH PRO
   View-only.
   Adds:
   - auto refresh
   - hover focus
   - click focus
   - pipeline highlight
   - status/risk/problem filters
   - reset view
*/

const ODIN_VISUAL_GRAPH = {
  state: {
    selectedId: null,
    hoveredId: null,
    positions: {},
    map: null,
    autoRefresh: true,
    refreshMs: 5000,
    timer: null,
    filters: {
      loaded: true,
      runtime: true,
      notRequired: true,
      missing: true,
      partial: true,
      highRiskOnly: false,
      problemsOnly: false,
      pipelineOnly: false
    }
  },

  pipelineIds: ["task", "git", "diff", "safe_push", "push_package"],

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
    LOW: "#86efac",
    dim: "rgba(148,163,184,.22)"
  },

  buildMap() {
    if (window.ODIN_PROJECT_MAP_PRO?.buildMap) return ODIN_PROJECT_MAP_PRO.buildMap();
    return {
      version: "V03.9.3_FALLBACK",
      nodes: [],
      links: [],
      risks: ["ODIN_PROJECT_MAP_PRO not available"],
      next_actions: ["Load Project Map Pro first."]
    };
  },

  updateFiltersFromUI() {
    const get = id => !!document.getElementById(id)?.checked;
    this.state.filters.loaded = get("graphFilterLoaded");
    this.state.filters.runtime = get("graphFilterRuntime");
    this.state.filters.notRequired = get("graphFilterNotRequired");
    this.state.filters.missing = get("graphFilterMissing");
    this.state.filters.partial = get("graphFilterPartial");
    this.state.filters.highRiskOnly = get("graphFilterHighRisk");
    this.state.filters.problemsOnly = get("graphFilterProblems");
    this.state.filters.pipelineOnly = get("graphFilterPipeline");
  },

  nodeVisible(node) {
    const f = this.state.filters;
    if (f.pipelineOnly && !this.pipelineIds.includes(node.id)) return false;
    if (f.highRiskOnly && node.risk !== "HIGH") return false;
    if (f.problemsOnly && !node.problem) return false;

    if (node.status === "LOADED" && !f.loaded) return false;
    if (node.status === "RUNTIME_ONLY" && !f.runtime) return false;
    if (node.status === "NOT_REQUIRED_HERE" && !f.notRequired) return false;
    if (node.status === "MISSING" && !f.missing) return false;
    if (node.status === "PARTIAL" && !f.partial) return false;

    return true;
  },

  render() {
    this.updateFiltersFromUI();

    const map = this.buildMap();
    this.state.map = map;

    const canvas = document.getElementById("odinGraphCanvas");
    if (!canvas) return;

    const wrap = canvas.parentElement;
    const width = Math.max(900, wrap?.clientWidth || 900);
    const height = 580;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    const allNodes = map.nodes || [];
    const nodes = allNodes.filter(n => this.nodeVisible(n));
    const links = (map.links || []).filter(l => nodes.some(n => n.id === l.from) && nodes.some(n => n.id === l.to));

    const positions = this.layout(nodes, width, height);
    this.state.positions = positions;

    this.drawBackground(ctx, width, height);
    this.drawLinks(ctx, links, positions);
    this.drawNodes(ctx, nodes, positions);
    this.drawLegend(ctx, width, height);
    this.renderDetails(nodes);

    this.updateStats(map, nodes, links);

    canvas.onclick = (ev) => this.handleClick(ev, canvas, nodes, positions);
    canvas.onmousemove = (ev) => this.handleMove(ev, canvas, nodes, positions);
    canvas.onmouseleave = () => {
      if (this.state.hoveredId) {
        this.state.hoveredId = null;
        this.render();
      }
    };
  },

  layout(nodes, width, height) {
    const positions = {};
    const centerX = width / 2;
    const centerY = height / 2;
    const radiusX = Math.min(width * 0.36, 380);
    const radiusY = Math.min(height * 0.34, 220);

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

  isRelated(id, nodeId, links) {
    if (!nodeId) return true;
    if (id === nodeId) return true;
    return links.some(l => (l.from === id && l.to === nodeId) || (l.to === id && l.from === nodeId));
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
    const focus = this.state.hoveredId || this.state.selectedId;

    links.forEach(link => {
      const a = positions[link.from];
      const b = positions[link.to];
      if (!a || !b) return;

      const pipeline = this.pipelineIds.includes(link.from) && this.pipelineIds.includes(link.to);
      const related = !focus || link.from === focus || link.to === focus;
      const dim = focus && !related;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);

      if (pipeline) {
        ctx.strokeStyle = dim ? "rgba(251,191,36,.18)" : "rgba(251,191,36,.95)";
        ctx.lineWidth = dim ? 1 : 4;
      } else {
        ctx.strokeStyle = dim ? "rgba(148,163,184,.12)" : (link.type === "depends_on" ? "rgba(59,130,246,.55)" : "rgba(34,197,94,.45)");
        ctx.lineWidth = dim ? 1 : (link.type === "depends_on" ? 2 : 1.5);
      }

      ctx.stroke();
      if (!dim) this.drawArrow(ctx, a, b, pipeline ? "rgba(251,191,36,.95)" : "rgba(148,163,184,.75)");
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
    const focus = this.state.hoveredId || this.state.selectedId;
    const links = this.state.map?.links || [];

    nodes.forEach(node => {
      const p = positions[node.id];
      if (!p) return;

      const selected = this.state.selectedId === node.id;
      const hovered = this.state.hoveredId === node.id;
      const related = this.isRelated(node.id, focus, links);
      const dim = focus && !related;
      const pipeline = this.pipelineIds.includes(node.id);

      const r = selected || hovered ? 36 : 29;

      ctx.save();
      ctx.globalAlpha = dim ? 0.25 : 1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 6, 0, Math.PI * 2);
      ctx.fillStyle = pipeline ? "#fbbf24" : this.riskColor(node.risk);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = this.statusColor(node.status);
      ctx.fill();

      ctx.strokeStyle = selected ? "#ffffff" : hovered ? "#e0f2fe" : "rgba(255,255,255,.55)";
      ctx.lineWidth = selected || hovered ? 4 : 1.5;
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

      ctx.restore();
    });
  },

  drawLegend(ctx, width, height) {
    const items = [
      ["LOADED", this.colors.LOADED],
      ["RUNTIME_ONLY", this.colors.RUNTIME_ONLY],
      ["NOT_REQUIRED_HERE", this.colors.NOT_REQUIRED_HERE],
      ["MISSING", this.colors.MISSING],
      ["PARTIAL", this.colors.PARTIAL],
      ["PIPELINE", "#fbbf24"]
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
      x += label === "NOT_REQUIRED_HERE" ? 175 : 135;
    });
  },

  handleClick(ev, canvas, nodes, positions) {
    const found = this.findNodeAtEvent(ev, canvas, nodes, positions);
    if (found) {
      this.state.selectedId = found;
      this.render();
    }
  },

  handleMove(ev, canvas, nodes, positions) {
    const found = this.findNodeAtEvent(ev, canvas, nodes, positions);
    canvas.style.cursor = found ? "pointer" : "default";
    if (found !== this.state.hoveredId) {
      this.state.hoveredId = found;
      this.render();
    }
  },

  findNodeAtEvent(ev, canvas, nodes, positions) {
    const rect = canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left) * (canvas.width / rect.width);
    const y = (ev.clientY - rect.top) * (canvas.height / rect.height);

    let found = null;
    nodes.forEach(node => {
      const p = positions[node.id];
      if (!p) return;
      const d = Math.hypot(x - p.x, y - p.y);
      if (d < 42) found = node.id;
    });
    return found;
  },

  renderDetails(nodes = null) {
    const box = document.getElementById("graphDetailsBox");
    if (!box) return;

    const map = this.state.map;
    nodes = nodes || map?.nodes || [];
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

  updateStats(map, nodes, links) {
    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    set("graphVisibleNodes", nodes.length);
    set("graphVisibleLinks", links.length);
    set("graphAutoStatus", this.state.autoRefresh ? "ON" : "OFF");
    set("graphPushStatus", map.pipeline_status?.last_push_package_status || "UNKNOWN");
  },

  toggleAutoRefresh() {
    this.state.autoRefresh = !this.state.autoRefresh;
    this.setupAutoRefresh();
    this.render();
  },

  setupAutoRefresh() {
    if (this.state.timer) clearInterval(this.state.timer);
    this.state.timer = null;
    if (!this.state.autoRefresh) return;

    this.state.timer = setInterval(() => {
      this.render();
    }, this.state.refreshMs);
  },

  resetView() {
    this.state.selectedId = null;
    this.state.hoveredId = null;

    const ids = [
      "graphFilterLoaded", "graphFilterRuntime", "graphFilterNotRequired",
      "graphFilterMissing", "graphFilterPartial"
    ];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.checked = true;
    });

    ["graphFilterHighRisk", "graphFilterProblems", "graphFilterPipeline"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.checked = false;
    });

    this.render();
  },

  showPipelineOnly() {
    const el = document.getElementById("graphFilterPipeline");
    if (el) el.checked = true;
    this.render();
  },

  statusColor(status) {
    return this.colors[status] || this.colors.UNKNOWN;
  },

  riskColor(risk) {
    return this.colors[risk] || "#475569";
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
      ODIN_VISUAL_GRAPH.setupAutoRefresh();
      ODIN_VISUAL_GRAPH.render();
    }
  }, 2600);
});
