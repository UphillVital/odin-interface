/* ODIN V03.7.3 — UNKNOWN REVIEW + ACTION SYSTEM
   Призначення:
   - переглянути conflicts/orphans з V03.7.2
   - запропонувати дію
   - створити review plan
   - НЕ змінювати файли автоматично
*/

const ODIN_UNKNOWN_REVIEW = {
  actions: ["KEEP", "IGNORE", "DOCUMENT", "FIX_LATER", "CREATE_TASK", "MOVE_REVIEW"],

  state: {
    items: [],
    decisions: {}
  },

  loadUnknown() {
    let report = null;

    if (window.ODIN_STATE?.data?.tree?.unknown_semantic) {
      report = ODIN_STATE.data.tree.unknown_semantic;
    }

    if (!report && window.ODIN_UNKNOWN_DETECTOR?.analyze) {
      report = ODIN_UNKNOWN_DETECTOR.analyze();
    }

    this.state.items = report?.results || [];
    this.state.decisions = this.loadDecisions();
    return this.state.items;
  },

  storageKey() {
    return "odin_unknown_review_v0373";
  },

  loadDecisions() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey())) || {};
    } catch(e) {
      return {};
    }
  },

  saveDecisions() {
    localStorage.setItem(this.storageKey(), JSON.stringify(this.state.decisions, null, 2));
  },

  setDecision(path, action) {
    this.state.decisions[path] = {
      path,
      action,
      time: new Date().toISOString()
    };
    this.saveDecisions();

    if (window.ODIN_STATE) {
      ODIN_STATE.log("UNKNOWN_REVIEW_DECISION", `${action}: ${path}`);
      ODIN_STATE.save();
    }

    this.render();
  },

  suggestAction(item) {
    if (item.type === "UNKNOWN_CONFLICT") return "DOCUMENT";
    if (item.type === "UNKNOWN_ORPHAN") return "CREATE_TASK";
    if (item.type === "UNKNOWN_NO_ROLE") return "DOCUMENT";
    if (item.type === "UNKNOWN_WEAK_MATCH") return "FIX_LATER";
    return "REVIEW";
  },

  buildPlan() {
    const items = this.loadUnknown();

    const rows = items.map(item => {
      const saved = this.state.decisions[item.path]?.action;
      const suggested = saved || this.suggestAction(item);

      return {
        path: item.path,
        type: item.type,
        current_group: item.map_group || "—",
        suggested_action: suggested,
        reasons: item.reasons || [],
        confirmed: !!saved
      };
    });

    const summary = {
      version: "V03.7.3",
      created_at: new Date().toISOString(),
      total_items: rows.length,
      confirmed: rows.filter(x => x.confirmed).length,
      pending: rows.filter(x => !x.confirmed).length,
      actions: this.groupBy(rows, "suggested_action"),
      rows
    };

    if (window.ODIN_STATE) {
      ODIN_STATE.data.tree.unknown_review = summary;
      ODIN_STATE.log("UNKNOWN_REVIEW_PLAN_BUILT", `items=${summary.total_items}; pending=${summary.pending}`);
      ODIN_STATE.save();
    }

    return summary;
  },

  groupBy(items, key) {
    return items.reduce((acc, item) => {
      const k = item[key] || "UNKNOWN";
      if (!acc[k]) acc[k] = 0;
      acc[k]++;
      return acc;
    }, {});
  },

  render() {
    const plan = this.buildPlan();

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(value);
    };

    setText("unknownReviewTotal", plan.total_items);
    setText("unknownReviewConfirmed", plan.confirmed);
    setText("unknownReviewPending", plan.pending);

    const list = document.getElementById("unknownReviewList");
    if (!list) return;

    if (!plan.rows.length) {
      list.innerHTML = "<p class='muted'>Немає items для review.</p>";
      return;
    }

    list.innerHTML = plan.rows.map((item, i) => `
      <div class="session-item">
        <b>${i + 1}. [${this.escapeHtml(item.type)}]</b><br>
        <small>${this.escapeHtml(item.path)}</small><br>
        <span class="meta">group: ${this.escapeHtml(item.current_group)}</span><br>
        <span class="meta">suggested: <b>${this.escapeHtml(item.suggested_action)}</b> · ${item.confirmed ? "CONFIRMED" : "PENDING"}</span><br>
        <small>reasons: ${this.escapeHtml((item.reasons || []).join("; "))}</small>
        <div class="actions">
          ${this.actions.map(action => `<button onclick="ODIN_UNKNOWN_REVIEW.setDecision('${this.escapeAttr(item.path)}','${action}')">${action}</button>`).join("")}
        </div>
      </div>
    `).join("");
  },

  exportPlan() {
    const plan = this.buildPlan();
    const text = JSON.stringify(plan, null, 2);
    const box = document.getElementById("unknownReviewExport");
    if (box) box.textContent = text;
  },

  copyPlan() {
    const plan = this.buildPlan();
    navigator.clipboard?.writeText(JSON.stringify(plan, null, 2));
  },

  clearDecisions() {
    localStorage.removeItem(this.storageKey());
    this.state.decisions = {};
    if (window.ODIN_STATE) {
      ODIN_STATE.log("UNKNOWN_REVIEW_CLEAR", "Review decisions cleared");
      ODIN_STATE.save();
    }
    this.render();
  },

  escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  },

  escapeAttr(value) {
    return String(value ?? "")
      .replaceAll("\\", "\\\\")
      .replaceAll("'", "\\'")
      .replaceAll('"', "&quot;");
  }
};

window.ODIN_UNKNOWN_REVIEW = ODIN_UNKNOWN_REVIEW;

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => ODIN_UNKNOWN_REVIEW.render(), 900);
});
