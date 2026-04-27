// ODIN MODULE REGISTRY v1

window.ODIN_MODULES = {
  registry: {},

  register(name, module) {
    this.registry[name] = module;
    console.log('MODULE REGISTERED:', name);
  },

  run(name, action, payload) {
    if (!this.registry[name]) {
      console.warn('MODULE NOT FOUND:', name);
      return;
    }
    if (!this.registry[name][action]) {
      console.warn('ACTION NOT FOUND:', action);
      return;
    }
    return this.registry[name][action](payload);
  },
};
