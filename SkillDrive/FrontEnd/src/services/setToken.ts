export const setAccessToken = (accessToken: string): void => {
    localStorage.setItem("accessToken", accessToken);
}