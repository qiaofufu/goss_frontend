export function GetCookie(name) {
    return document.cookie.split(';').forEach((cookie) => {
        if (cookie.includes(name)) {
            return cookie.split('=')[1];
        }
        return null;
    });
}