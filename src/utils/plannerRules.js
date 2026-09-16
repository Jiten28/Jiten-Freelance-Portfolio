export const MENU_ITEM_MAX = 500;
export const MENU_CATEGORY_MAX = 50;

export function isPositiveIntegerWithin(value, max) {
  return /^[1-9]\d*$/.test(String(value || "")) && Number(value) <= max;
}

export function validateMenuQuantities(data = {}) {
  if (!isPositiveIntegerWithin(data.menuItemCount, MENU_ITEM_MAX))
    return `Enter between 1 and ${MENU_ITEM_MAX} menu items.`;
  if (!isPositiveIntegerWithin(data.menuCategoryCount, MENU_CATEGORY_MAX))
    return `Enter between 1 and ${MENU_CATEGORY_MAX} menu categories.`;
  return "";
}

export function validateDesignSelection(data = {}) {
  if (data.service === "Digital Menu")
    return data.selectedMenuTemplate ? "" : "Select a Digital Menu design.";
  if (data.service === "Website + Digital Menu") {
    if (!data.designStyle) return "Select at least one Website Style.";
    if (!data.selectedMenuTemplate) return "Select a Digital Menu Design.";
    return "";
  }
  return data.designStyle ? "" : "Select a design direction.";
}
