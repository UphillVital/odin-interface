const ODIN_REPO_CONFIG = {
  owner: "UphillVital",
  repo: "odin-interface",
  branch: "dev",
  rawBase(){
    return `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/`;
  },
  toRawUrl(path){
    return this.rawBase() + path.replace(/^\/+/, "");
  }
};
