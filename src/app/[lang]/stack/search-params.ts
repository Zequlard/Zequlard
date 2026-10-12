import { createLoader, createSerializer, parseAsStringLiteral } from "nuqs/server";
import { areas, levels } from "@/content/stack";

export const stackFilters = {
  level: parseAsStringLiteral(levels),
  area: parseAsStringLiteral(areas),
};

export const loadStackFilters = createLoader(stackFilters);
export const serializeStackFilters = createSerializer(stackFilters);
