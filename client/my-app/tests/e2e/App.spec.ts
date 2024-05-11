import { expect, test } from "@playwright/test";


test("on page load, input fields are visible", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const buildingInput = await page.isVisible('input[type="text"]');
  const roomTypeSelect = await page.isVisible("select");
  expect(buildingInput).toBeTruthy();
  expect(roomTypeSelect).toBeTruthy();
});

test("after typing into the building input field, its value changes", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.fill('input[type="text"]', "Chen");
  const buildingValue = await page.getAttribute('input[type="text"]', "value");
  expect(buildingValue).toBe("Chen");
});

test("after selecting a room type, its value changes", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.selectOption("select", { label: "Single" });
  const roomTypeValue = await page.getAttribute("select", "value");
  expect(roomTypeValue).toBe("single");
});

test("after typing into the file path input field, its value changes", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.fill('input[type="text"]', "server/data/Sheet 2-Housing.csv");
  const filePathValue = await page.getAttribute('input[type="text"]', "value");
  expect(filePathValue).toBe("/server/data/Sheet 2-Housing.csv");
});

test("after clicking on Load/View button, room data is displayed", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.fill('input[type="text"]', "server/data/Sheet 2-Housing.csv");
  await page.click('button:has-text("Load/View")');
  await page.waitForSelector(".box-container");
  const roomBox = await page.isVisible(".room-box");
  expect(roomBox).toBeTruthy();
});

test("after selecting room type and building, filtered room data is displayed", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.selectOption("select", { label: "Single" });
  await page.fill('input[type="text"]', "Hegeman");
  await page.click('button:has-text("Load/View")');
  await page.waitForSelector(".box-container");
  const roomBox = await page.isVisible(".room-box");
  expect(roomBox).toBeTruthy();
});

test("after loading file, file path is stored in localStorage", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.fill('input[type="text"]', "server/data/Sheet 2-Housing.csv");
  await page.click('button:has-text("Load/View")');
  const storedFilePath = await page.evaluate(() =>
    localStorage.getItem("filePath")
  );
  expect(storedFilePath).toBe("server/data/Sheet 2-Housing.csv");
});

