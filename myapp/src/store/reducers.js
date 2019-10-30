function auth(state = false, action) {
    if (localStorage.getItem("isAuthenticated")) {
        return true;
    }

    if (action.type === "LOGIN") {
        if (localStorage.getItem("isAuthenticated")) {
            return true;
        }
        return false;
    }
    return state;
}

export default auth;