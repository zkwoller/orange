---
group: css
order: 1
toc: content
---
# Grid

## 网格轨道

- 行轨道: `grid-template-rows` `grid-auto-rows`
- 列轨道: `grid-template-columns` `grid-auto-columns`

```css
/* 其起始轨道为 20 像素，接着重复了 6 个 1fr 的轨道，最后再添加了一个 20 像素的轨道 */
.wrapper {
  display: grid;
  grid-template-columns: 20px repeat(6, 1fr) 20px;
}
/* 网格将有共计 10 个轨道，为 1 个 1fr 轨道后面跟着 1 个 2fr 轨道，该模式重复 5 次 */
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr 2fr);
  grid-auto-rows: minmax(100px, auto);
}

.box1 {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

.box2 {
  grid-column: 1;
  grid-row: 3 / 5;
}

.item {
  grid-column: 1 / -1; /* 起始计数 */
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 1em;
}

.box1 {
  grid-column: 1;
  grid-row: 1 / span 3;
}
.box2 {
  grid-column: 3;
  grid-row: 1 / span 2; /* 起始线与跨越轨道数量(从1开始跨越2个轨道) */
}
.box3 {
  grid-column: 2;
  grid-row: 1;
}
.box4 {
  grid-column: 2 / span 2;
  grid-row: 3;
}
```
- `grid-row-start`
- `grid-column-start`
- `grid-row-end`
- `grid-column-end`

- `grid-column`: `grid-column-start` / `grid-column-end`
- `grid-row`:  `grid-row-start` / `grid-row-end`
- `grid-area`: `grid-row-start` / `grid-column-start` / `grid-row-end` / `grid-column-end`

```css
.header {
  grid-area: hd;
}
.footer {
  grid-area: ft;
}
.content {
  grid-area: main;
}
.sidebar {
  grid-area: sd;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    "hd hd hd hd   hd   hd   hd   hd   hd"
    "sd sd sd main main main main main main"
    "sd sd sd  ft  ft   ft   ft   ft   ft";
}
```
