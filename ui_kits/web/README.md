# Web UI Kit

Pixel-complete recreations of the core responsive components in the Webdesign System. All components are CSS-token driven and theme-config via `../../colors_and_type.css`.

## Components

| File | Components |
|---|---|
| `Header.jsx` | `<Header />` — sticky nav with brand, links, CTAs, mobile menu |
| `Footer.jsx` | `<Footer />` — 4-column dark footer |
| `Hero.jsx` | `<Hero />` — marketing hero with headline & CTA |
| `Welcome.jsx` | `<Welcome />` — empty / first-run state |
| `Primitives.jsx` | `<Button>`, `<Input>`, `<Select>`, `<Checkbox>`, `<Badge>`, `<Card>`, `<Avatar>` |
| `Dialog.jsx` | `<Dialog>` — modal + overlay |
| `Carousel.jsx` | `<Carousel>` — sliding hero carousel |
| `DataViews.jsx` | `<Tabs>`, `<Table>`, `<Pagination>`, `<List>` |
| `styles.css` | All component-scoped styles (`.wd-*`) |
| `index.html` | Interactive demo page stitching everything together |

## Running

Open `index.html`. The page renders a realistic marketing site and an interactive workspace demo (tabs, table, list selection, pagination, dialog, form).

## Theming

Edit tokens in `../../colors_and_type.css`. The entire kit re-themes automatically — change `--primary-600` to any hue and every button, badge, link, active tab, and avatar picks it up.
