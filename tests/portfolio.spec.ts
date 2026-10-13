import { expect, test, type Page } from "@playwright/test";

const navigationLinks = [
  ["Work", "#work"],
  ["Capabilities", "#capabilities"],
  ["Profile / More work", "#profile"],
  ["Contact", "#contact"],
] as const;

const reducedMotionTransitionThresholdMs = 0.01;

function cssTimeToMilliseconds(duration: string) {
  const normalized = duration.trim();
  const value = Number.parseFloat(normalized);

  if (normalized.endsWith("ms")) {
    return value;
  }
  if (normalized.endsWith("s")) {
    return value * 1000;
  }
  return Number.NaN;
}

async function openNavigationOnMobile(page: Page, projectName: string) {
  if (projectName === "mobile-chromium") {
    await page
      .getByRole("button", { name: "Open primary navigation", exact: true })
      .click();
  }
}

test("renders the recruiter headline and three featured projects", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I build useful software for real workflows.",
      exact: true,
    }),
  ).toBeVisible();

  for (const name of ["Liquid Utility", "Filsafit", "Arindra Production Web"]) {
    await expect(
      page.getByRole("heading", { level: 3, name, exact: true }),
    ).toBeVisible();
  }
});

test("primary navigation exposes and follows approved section links", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await openNavigationOnMobile(page, testInfo.project.name);

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
    exact: true,
  });

  for (const [name, href] of navigationLinks) {
    await expect(
      navigation.getByRole("link", { name, exact: true }),
    ).toHaveAttribute("href", href);
  }

  await navigation.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
});

test("first visit follows the system color scheme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.emulateMedia({ colorScheme: "dark" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("theme selection persists after a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Switch to light theme", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(
    page.getByRole("button", { name: "Switch to dark theme", exact: true }),
  ).toBeVisible();
});

test("contact destinations remain verified", async ({ page }) => {
  await page.goto("/");

  const contact = page.locator("#contact");
  await expect(
    contact.getByRole("link", { name: /kahfiworks\.id@gmail\.com/i }),
  ).toHaveAttribute("href", "mailto:kahfiworks.id@gmail.com");
  await expect(
    contact.getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386",
  );
  await expect(
    contact.getByRole("link", { name: "GitHub", exact: true }),
  ).toHaveAttribute("href", "https://github.com/KVdz00");
});

test("enlarged text does not cause horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.addInitScript(() => {
    document.documentElement.style.fontSize = "32px";
  });
  await page.goto("/");

  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("project previews keep a bounded landscape shape on desktop", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium",
    "desktop-only behavior",
  );
  await page.goto("/");

  const box = await page.locator(".product-preview").first().boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeLessThan(box!.width);
  expect(box!.height).toBeLessThanOrEqual(386);
});

test("document does not overflow horizontally", async ({ page }) => {
  await page.goto("/");

  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("reduced motion disables smooth scrolling and long transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const values = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    transitionDurations: getComputedStyle(
      document.querySelector<HTMLAnchorElement>(".button")!,
    ).transitionDuration.split(","),
  }));
  expect(values.scrollBehavior).toBe("auto");

  const transitionDurationsMs = values.transitionDurations.map(
    cssTimeToMilliseconds,
  );
  expect(transitionDurationsMs).not.toHaveLength(0);
  for (const durationMs of transitionDurationsMs) {
    expect(Number.isFinite(durationMs)).toBe(true);
    expect(durationMs).toBeLessThanOrEqual(reducedMotionTransitionThresholdMs);
  }
});

test("mobile menu supports Menu and Close keyboard behavior", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chromium",
    "mobile-only behavior",
  );
  await page.goto("/");

  const menu = page.locator('button[aria-controls="primary-navigation"]');
  await expect(menu).toHaveAccessibleName("Open primary navigation");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(menu).toHaveAccessibleName("Close primary navigation");
  await expect(menu).toHaveText("Close");

  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation", exact: true })
      .getByRole("link", { name: "Work", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
});

test("mobile menu resets after crossing the desktop breakpoint", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chromium",
    "mobile-only behavior",
  );
  await page.goto("/");

  const menu = page.locator('button[aria-controls="primary-navigation"]');
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");

  await page.setViewportSize({ width: 900, height: 844 });
  await page.setViewportSize({ width: 390, height: 844 });

  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toHaveAccessibleName("Open primary navigation");
});

test("mobile navigation choice keeps the destination in view", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chromium",
    "mobile-only behavior",
  );
  await page.goto("/");

  const menu = page.locator('button[aria-controls="primary-navigation"]');
  await menu.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeFocused();
});

test("sticky navigation marks the current section", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-chromium",
    "desktop-only behavior",
  );
  await page.goto("/");

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
    exact: true,
  });
  const contact = navigation.getByRole("link", {
    name: "Contact",
    exact: true,
  });
  await contact.click();
  await expect(contact).toHaveAttribute("aria-current", "location");
});

test("loads without console or page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I build useful software for real workflows.",
      exact: true,
    }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
