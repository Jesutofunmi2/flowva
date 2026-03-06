import { callSupabase } from "./supabaseWrapper";

export const getUrlQuerysection = () => {
  let queries = window.location.search;
  return queries;
};

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

  keys?.forEach((key) => {
    delete obj[key];
  });
  return obj;
}

export const formatNumberWithCommas = (number = 0) => {
  if (!number) return 0;
  number = `${number}`;
  const [integerPart, decimalPart] = number.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
    pathname === "/" || pathname === "/app" || pathname.includes("/admin_dashboard") || pathname.includes("/candidate_dashboard") || pathname.includes("/super_admin_dashboard");

  let titleHtml = null;
  let titleText = "";

  if (isDashboard) {
    const hour = new Date().getHours();
    const greeting =
      hour >= 5 && hour < 12
      ? "Good morning"
      : hour >= 12 && hour < 18
      ? "Good afternoon"
      : "Good evening";

    titleHtml = displayName
      ? `${greeting}, <span style="font-weight: 600; color: #9013FE;">${displayName}</span>`
      : greeting;
  } else {
    const parts = pathname.split("/").filter(Boolean);

    const looksLikeId = (seg) =>
      !seg ||
      /^\d+$/.test(seg) ||
      /^[0-9a-fA-F-]{8,}$/.test(seg) ||
      /^[0-9a-fA-F]{24}$/.test(seg);

    let segment = parts[parts.length - 1] || "";
    if (looksLikeId(segment)) {
      segment = parts[parts.length - 2] || segment;
    }

    const normalized = (segment || "").replace(/[-_]/g, " ").trim();
    const key = normalized.toLowerCase();


    if (routeAliases[key]) {
      titleText = routeAliases[key];
    } else {
      titleText = normalized
        ? normalized.replace(/\b\w/g, (c) => c.toUpperCase())
        : "";
    }
  }

  return { pathname, isDashboard, titleHtml, titleText };
};

export const getWeekIndexFromDate = (date = new Date()) => {
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
};

export const ROLES = {
  ADMIN: "admin",
  CANDIDATE: "candidate",
  SUPER_ADMIN: "super_admin",
};

export const defaultDateDisplay = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  const day = date.getDate();
  const month = date.toLocaleString("en-us", { month: "short" });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  const formattedHours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
};

export const generateUsername = async (schoolId) => {
  const year = new Date().getFullYear();

  const { data, error } = await callSupabase((sb) =>
    sb
      .from("candidates")
      .select("username")
      .eq("school_id", schoolId)
      .like("username", `RED/${year}/%`)
  );

  if (error) throw error;

  const nextNumber = (data?.length || 0) + 1;

  const padded = String(nextNumber).padStart(3, "0");

  return `RED/${year}/${padded}`;
};