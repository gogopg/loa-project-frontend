import { PaletteOptions } from '@mui/material';

// https://ethanschoonover.com/solarized/
// https://github.com/altercation/vim-colors-solarized#the-values
const solarized = {
    base03: '#002b36', //   dark : background
    base02: '#073642', //   dark : background highlights
    base01: '#586e75', //   dark : text secondary           | light : text highlights
    base00: '#657b83', //                                   | light : text primary
    base0: '#839496', //    dark : text primary
    base1: '#93a1a1', //    dark : text highlights          | light : text secondary
    base2: '#ffffff', //                                    | light : background
    base3: '#ffffff', //                                    | light : background highlights
    yellow: '#b58900', //   accent: warning
    orange: '#cb4b16', //                                   | dark: secondary
    red: '#dc322f', //      accent: danger
    magenta: '#d33682', //                                  | light: secondary
    violet: '#6c71c4', //   accent: info
    blue: '#268bd2', //                                     | dark: primary
    cyan: '#2aa198', //                                     | light: primary
    green: '#859900', //    accent: success
};

const theme_palette_accents: PaletteOptions = {
    error: { main: solarized.red },
    info: { main: solarized.violet },
    success: { main: solarized.green },
    warning: { main: solarized.yellow },
};

export const theme_palette_dark: PaletteOptions = {
    mode: 'dark',
    primary: { main: '#102040' },
    secondary: { main: '#b0a000' },
    background: { default: '#00000b', paper: '#10121c' },
    // text: { primary: solarized.base0, secondary: solarized.base01, hint: solarized.base1 },
    ...theme_palette_accents,
};

export const solarized_theme_palette_dark: PaletteOptions = {
    mode: 'dark',
    primary: { main: solarized.blue },
    secondary: { main: solarized.orange },
    background: { default: solarized.base03, paper: solarized.base02 },
    text: { primary: solarized.base0, secondary: solarized.base01 },
    ...theme_palette_accents,
};

export const theme_palette_light: PaletteOptions = {
    mode: 'light',
    primary: { main: solarized.cyan },
    secondary: { main: solarized.magenta },
    background: { default: solarized.base3, paper: solarized.base2 },
    text: { primary: solarized.base00, secondary: solarized.base1 },
    ...theme_palette_accents,
};

export default solarized;
