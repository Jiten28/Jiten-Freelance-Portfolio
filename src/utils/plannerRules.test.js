import test from "node:test";
import assert from "node:assert/strict";
import {
  MENU_CATEGORY_MAX,
  MENU_ITEM_MAX,
  isPositiveIntegerWithin,
  validateDesignSelection,
  validateMenuQuantities,
} from "./plannerRules.js";

test("menu quantities require bounded positive integers", () => {
  for (const value of ["", "0", "-1", "1.5", "abc", "99999"])
    assert.equal(isPositiveIntegerWithin(value, MENU_ITEM_MAX), false);
  assert.equal(isPositiveIntegerWithin("1", MENU_ITEM_MAX), true);
  assert.equal(
    isPositiveIntegerWithin(String(MENU_ITEM_MAX), MENU_ITEM_MAX),
    true,
  );
  assert.equal(
    validateMenuQuantities({ menuItemCount: "20", menuCategoryCount: "4" }),
    "",
  );
  assert.match(
    validateMenuQuantities({
      menuItemCount: String(MENU_ITEM_MAX + 1),
      menuCategoryCount: "4",
    }),
    new RegExp(String(MENU_ITEM_MAX)),
  );
  assert.match(
    validateMenuQuantities({
      menuItemCount: "20",
      menuCategoryCount: String(MENU_CATEGORY_MAX + 1),
    }),
    new RegExp(String(MENU_CATEGORY_MAX)),
  );
});

test("bundle design validation requires both independent selections", () => {
  const base = { service: "Website + Digital Menu" };
  assert.match(validateDesignSelection(base), /Website Style/);
  assert.match(
    validateDesignSelection({ ...base, designStyle: "minimalistic" }),
    /Digital Menu Design/,
  );
  assert.match(
    validateDesignSelection({
      ...base,
      selectedMenuTemplate: "modern-cafe",
    }),
    /Website Style/,
  );
  assert.equal(
    validateDesignSelection({
      ...base,
      designStyle: "minimalistic",
      selectedMenuTemplate: "modern-cafe",
    }),
    "",
  );
});
