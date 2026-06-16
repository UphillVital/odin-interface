const ODIN_AUTH = {
  password: "ODIN",
  login(){
    const input = document.getElementById("password");
    const status = document.getElementById("loginStatus");
    const value = input ? input.value : "";
    if(value === this.password){
      localStorage.setItem("odin_admin_auth", "OK");
      localStorage.setItem("odin_admin_login_time", new Date().toISOString());
      location.replace("admin.html");
    } else {
      if(status){
        status.textContent = "Невірний пароль. Для MVP: ODIN";
        status.style.color = "#dc2626";
      }
    }
  },
  require(){
    if(localStorage.getItem("odin_admin_auth") !== "OK"){
      location.replace("login.html");
    }
  },
  logout(){
    localStorage.removeItem("odin_admin_auth");
    location.replace("login.html");
  }
};
if(location.pathname.endsWith("admin.html")) ODIN_AUTH.require();
