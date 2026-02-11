import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieLocale = store.get("locale")?.value;
  const locale =
    cookieLocale === "es" || cookieLocale === "en" ? cookieLocale : "es";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

