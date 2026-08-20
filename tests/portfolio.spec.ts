import { expect, test } from "@playwright/test";

test("renders core portfolio content", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Muhammad Dzikrul Kahfi/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Liquid Utility", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Filsafit", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "ModToggle", exact: true }),
  ).toBeVisible();
});

test("primary navigation changes the hash", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
});

test("theme toggle persists", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /switch to light mode/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("contact destinations are correct", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: /github.com\/KVdz00/i }),
  ).toHaveAttribute("href", "https://github.com/KVdz00");
  await expect(
    page.getByRole("link", { name: /kahfiworks.id@gmail.com/i }),
  ).toHaveAttribute("href", "mailto:kahfiworks.id@gmail.com");
});

test("shows concrete case-study evidence", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByText("Problem", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByText("Technical decision", { exact: true }).first(),
  ).toBeVisible();
  await expect(page.getByText("Result", { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/clarity over cleverness/i)).toHaveCount(0);
  await expect(page.getByText(/meaningful collaborations/i)).toHaveCount(0);
});

test("document does not overflow horizontally", async ({ page }) => {
  await page.goto("/");
  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("reduced motion disables smooth scrolling and long body transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const values = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    bodyTransitionDuration: getComputedStyle(document.body).transitionDuration,
  }));
  expect(values.scrollBehavior).toBe("auto");
  expect(values.bodyTransitionDuration).not.toContain("0.42s");
});
