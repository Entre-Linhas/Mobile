import { extendTheme } from "native-base";

export const THEME = extendTheme({
    colors: {
        zinc: {
            400: "#A1A1AA"
        },
        red: {
            400: "#FF6464",
        },
        bittersweet: {
            '50': '#fff1f1',
            '100': '#ffe1e1',
            '200': '#ffc7c7',
            '300': '#ffa0a0',
            '400': '#ff6464',
            '500': '#f83b3b',
            '600': '#e51d1d',
            '700': '#c11414',
            '800': '#a01414',
            '900': '#841818'
        },
        turquoise: {
            "50": "#f3faf9",
            "100": "#d6f1ec",
            "200": "#ade2d9",
            "300": "#7cccc1",
            "400": "#62B8AF",
            "500": "#37958d",
            "600": "#2a7772",
            "700": "#25605c",
            "800": "#214e4c",
            "900": "#204140"
        },
        jade: {
            "300": "#63f2be",
            "400": "#25e2a4",
            "500": "#00B37E"
        }
    },
    fonts: {
        Nunito: {
            body: "Nunito_400Regular",
            mono: "Nunito_600SemiBold",
            heading: "Nunito_700Bold"
        },
        Sacramento: {
            body: "Sacramento_400Regular"
        }
    }
})