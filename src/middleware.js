import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const { cookies, url, redirect } = context;
    const accessToken = cookies.get("access_token")?.value; // Obtenemos el valor del string
    const PUBLIC_API_URL = import.meta.env.PUBLIC_API_URL;

    const isDashboard = url.pathname.startsWith("/dashboard");
    const isAuthPage = url.pathname === "/login" || url.pathname === "/register";

    if (isDashboard) {
        if (!accessToken) return redirect("/login");

        try {
            const response = await fetch(`${PUBLIC_API_URL}/api/profile`, {
                headers: { 
                    'Authorization': `Bearer ${accessToken}`,
                    'Cookie': `access_token=${accessToken}`
                }
            });

            if (!response.ok) {
                context.cookies.delete("access_token"); 
                return redirect("/login");
            }
        } catch (error) {
            console.error("Error conectando con la API de Railway:", error);
        }
    }

    if (isAuthPage && accessToken) {
        return redirect("/dashboard");
    }

    return next();
});