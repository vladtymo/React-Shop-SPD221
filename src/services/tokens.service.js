import { jwtDecode } from "jwt-decode";

const accessTokenKey = "accessKey";
const refreshTokenKey = "refreshKey";

export const tokensService = {
    save: function (model) {
        localStorage.setItem(accessTokenKey, model.accessToken);
        localStorage.setItem(refreshTokenKey, model.refreshToken);
    },
    clear: function () {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    },
    isExists() {
        return localStorage.getItem(accessTokenKey) != null;
    },
    getAccessToken() {
        return localStorage.getItem(accessTokenKey);
    },
    getRefreshToken() {
        return localStorage.getItem(refreshTokenKey);
    },
    getAccessTokenPayload: function () {

        const token = this.getAccessToken();

        if (!token) return null;

        try {
            const payload = jwtDecode(token);

            return {
                email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                id: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                dateOfBirth: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth'],
                role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
            };

        } catch (Error) {
            return null;
        }
    }
}