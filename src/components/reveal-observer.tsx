"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `.is-in` to every `[data-reveal]` element the first time it enters
 * the viewport. Stagger comes from the `--i` custom property on each element.
 */
export const RevealObserver = () => {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-scan the DOM on every route change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const watch = () => {
      for (const el of document.querySelectorAll("[data-reveal]:not(.is-in)")) {
        observer.observe(el);
      }
    };
    watch();
    // Content rendered after hydration (route changes, client lists)
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
};
