/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
      },
      colors: {
        textSecondaryDefault: "#000A33",
        textHoverBlue: "#203FDF",
        arrowButtonGray: "#C1C1C1",
        brandBlue: "#4262FF",
        grayTextColor: "#F5F5F5",
        grayBox: "#FFF",
        darkBlue: "#001052",
        grayText: "#979797",
        gifBlue: "#284CFF",
        lightPurpleBg: "#EDF0FF",
        boxGrayBodyColor: "#FAFAFA",
        grayTextinBox: "#B2B2B2",
        footerGrayText: "#888",
        footerDarkGrayText: "#222",
        grayLineFooter: "#EBEBEB",
        bodyColor: "#FAFAFA",
        inputDefault: "#F5F5F5",
        inputPlaceholderText: "#979797",
        inputBorder: "#DFDFDF",
        brandBlue700: "#0029F5",
        grayButtonText: "#79797A",
        buttonBlueHover: "#0025db",
        buttonPressedPrimary: "#0020c2",
        buttonSecondaryHover: "#dfdfdf",
        buttonSecondaryPressed: "#c1c1c1",
        neutralBlack:"#000"
      },
      letterSpacing: {
        "036": "0.36px",
      },
      boxShadow: {
        createBox: "0px 4px 8px 0px rgba(93, 97, 114, 0.08)",
      },
    },
  },
  plugins: [],
};
