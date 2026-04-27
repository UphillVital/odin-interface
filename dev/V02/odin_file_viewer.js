const ODIN_FILE_VIEWER = {
  contentMap: {
    "ODIN SYSTEM": "# ODIN SYSTEM\n\nGlobal Control Center.\n\nV02.1 додає File Viewer Layer.",
    "ODIN_TREE_PROJECT_v1/ODIN_SYSTEM_STATUS_v1.md": "# ODIN SYSTEM STATUS v1\n\nSTATUS: STABLE BASE\n\nNEXT STAGE: RUN SYSTEM",
    "ODIN_TREE_PROJECT_v1/00_CORE/ODIN_TEMPLATE_ROUTER_v1.md": "# ODIN TEMPLATE ROUTER v1\n\nlesson → TEMPLATE_BASE_v1.html\nphoto_lesson → TEMPLATE_BASE_v1.html\nissu_photo_lesson → TEMPLATE_BASE_v1.html\n\nFORBIDDEN FOR LESSONS:\n- dev/index.html\n- ODIN Interface\n- ODIN-ADMIN\n- admin.html",
    "ODIN_TREE_PROJECT_v1/00_CORE/ODIN_TEMPLATE_PRIORITY_POLICY_v1.md": "# ODIN TEMPLATE PRIORITY POLICY v1\n\n1. HARD LOCK\n2. TASK TYPE\n3. MODE\n4. SOURCE\n5. USER INSTRUCTION",
    "ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html": "<!-- TEMPLATE_BASE_v1.html -->\n<!doctype html>\n<html lang='uk'>\n<!-- Lesson Page Template locked for lesson generation -->\n</html>"
  },

  getPreview(node){
    if(this.contentMap[node.path]) return this.contentMap[node.path];

    if(node.type === "folder"){
      return `# ${node.title}\n\nPath: ${node.path}\nLayer: ${node.layer}\nStatus: ${node.status}\n\n${node.description}\n\nV02.1 preview-map: folder metadata only.\nFuture layer: real folder/file fetch.`;
    }

    return `# ${node.title}\n\nPath: ${node.path}\nType: ${node.type}\nStatus: ${node.status}\nLayer: ${node.layer}\n\n${node.description}\n\nFuture layer: real file fetch from repository.`;
  },

  open(node){
    document.getElementById("viewerPath").textContent = node.path;
    document.getElementById("viewerType").textContent = node.type;
    document.getElementById("viewerMode").textContent = "preview-map";
    document.getElementById("filePreview").textContent = this.getPreview(node);
  }
};
