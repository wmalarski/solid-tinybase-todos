import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	preflight: true,
	theme: { extend: {} },
	presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
	include: ["./src/**/*.{js,jsx,ts,tsx}"],
	exclude: [],
	jsxFramework: "solid",
	outdir: "src/styled-system",
});
