const requireAuth = (state, router) => {
  if (state.auth !== true) {
    router.push("/login");
  }
};
const requireNonAuth = (state, router) => {
  if (state.auth !== false) {
    router.push("/");
  }
};

export default {
  requireAuth,
  requireNonAuth
};
