// GET /auth/register
export function register(req, res) {
    res.send("To-do endpoint");
}

// GET /auth/login
export function signIn(req, res, next) {
    return req.authContext.login({
        postLoginRedirectUri: "/",
    })(req, res, next);
}

// GET /auth/logout
export function signOut(req, res, next) {
    return req.authContext.logout({
        postLogoutRedirectUri: "/",
    })(req, res, next);
}