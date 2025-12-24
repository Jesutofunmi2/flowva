export const getUrlQuerysection = () => {
  let queries = window.location.search;
  return queries;
};

// this function removes null, undefined and empty string values from an object
export function cleanObject(obj, keys = []) {
  for (let propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === "" ||
      obj[propName] === "None"
    ) {
      delete obj[propName];
    }
  }
  // delete key name specified
  keys?.forEach((key) => {
    delete obj[key];
  });
  return obj;
}

export const formatNumberWithCommas = (number = 0) => {
  if (!number) return 0;
  number = `${number}`;
  const [integerPart, decimalPart] = number.split(".");

  // Add commas to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted number with decimals (if any)
  return decimalPart || number?.includes(".")
    ? `${formattedInteger}.${decimalPart || ""}`
    : formattedInteger;
};

export const removeCommas = (numberWithCommas = 0) => {
  if (!numberWithCommas && numberWithCommas !== 0) return numberWithCommas;
  return `${numberWithCommas}`?.replace(/,/g, "");
};

export const getPageTitle = ({
  pathname: providedPathname,
  displayName: providedDisplayName,
  routeAliases = {},
} = {}) => {
  const pathname =
    providedPathname ??
    (typeof window !== "undefined" ? window.location.pathname : "");
  const displayName = providedDisplayName ?? "";

  const isDashboard =
    pathname === "/" || pathname === "/app" || pathname.includes("/dashboard");

  let titleHtml = null;
  let titleText = "";

  if (isDashboard) {
    titleHtml = displayName
      ? `Good morning, <span style="font-weight: 600; color: #9013FE;">${displayName}</span>`
      : "Good morning";
  } else {
    const parts = pathname.split("/").filter(Boolean);

    const looksLikeId = (seg) =>
      !seg ||
      /^\d+$/.test(seg) || // numbers
      /^[0-9a-fA-F-]{8,}$/.test(seg) ||
      /^[0-9a-fA-F]{24}$/.test(seg);

    let segment = parts[parts.length - 1] || "";
    if (looksLikeId(segment)) {
      segment = parts[parts.length - 2] || segment;
    }

    const normalized = (segment || "").replace(/[-_]/g, " ").trim();
    const key = normalized.toLowerCase();

    // Allow callers to pass a mapping of path -> friendly name (e.g. { rewards: "RewardHub" })
    if (routeAliases[key]) {
      titleText = routeAliases[key];
    } else {
      // Fallback: prettify the segment
      titleText = normalized
        ? normalized.replace(/\b\w/g, (c) => c.toUpperCase())
        : "";
    }
  }

  return { pathname, isDashboard, titleHtml, titleText };
};
