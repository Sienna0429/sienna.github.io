(function () {

    const VIS = window.VIS || {};

    // data: [{ city, state, count }]
    VIS.drawStarbucksBarChart = function (container, data, opts = {}) {
        if (!container) return;

        // config
        const width = opts.width || 980;
        const height = opts.height || 460;
        const isSmall = window.matchMedia && window.matchMedia("(max-width: 48em)").matches;

        const baseMargin = isSmall
            ? { top: 44, right: 16, bottom: 90, left: 60 }
            : { top: 80, right: 24, bottom: 120, left: 70 };

        const margin = Object.assign({}, baseMargin, opts.margin || {});

        const innerW = width - margin.left - margin.right;
        const innerH = height - margin.top - margin.bottom;

        // data
        const sorted = [...data].sort((a, b) => b.count - a.count);

        // reset
        container.innerHTML = "";

        // svg + group
        const svg = createSVG(width, height, { role: "img", "aria-label": "Bar chart of Starbucks store counts by city" });
        const g = createEl("g", { transform: `translate(${margin.left},${margin.top})` }, svg);

        // title (centered, on <svg>)
        const title = text(svg, "Top 20 Cities with the Most Starbucks", width / 2, 24, {
            "text-anchor": "middle",
            "font-weight": 800,
            fill: "#006241",
            class: "chart-title"
        });


        // layout
        const xStep = (innerW / sorted.length) * 1.5;
        const barW = xStep * 0.5;

        // Y axis fixed to 0..200 with ticks every 50
        const yMax = 200;
        const tickStep = 50;
        const y = vmap(0, yMax, innerH, 0);

        // grid + tick labels (0, 50, 100, 150, 200)
        for (let v = 0; v <= yMax; v += tickStep) {
            const yPos = y(v);
            line(g, 0, yPos, innerW, yPos, { stroke: "#DCDCDC" });
            text(g, String(v), -10, yPos + 4, { "text-anchor": "end", "font-size": 11, fill: "#555" });
        }

        // bars
        sorted.forEach((d, i) => {
            const valueForDraw = Math.min(d.count, yMax);
            const h = innerH - y(valueForDraw);
            const yTop = y(valueForDraw);
            const x = i * xStep + (xStep - barW) / 2;

            rect(g, x, yTop, barW, h, { fill: "#006241" });

            // value label (above bar)
            text(g, String(d.count), x + barW / 2, yTop - 6, {
                "text-anchor": "middle",
                "font-size": 12,
                fill: "#333"
            });

            // x labels (city + state)
            const cityLabel = createEl("text", {
                x: x + barW / 2,
                y: innerH + 18,
                "text-anchor": "middle",
                "font-size": 12,
                fill: "#333"
            }, g);
            cityLabel.textContent = d.city;

            const stateLabel = createEl("text", {
                x: x + barW / 2,
                y: innerH + 36,
                "text-anchor": "middle",
                "font-size": 11,
                fill: "#777"
            }, g);
            stateLabel.textContent = d.state;
        });

        // y-axis label (optional; kept as your color)
        text(g, "Number of Starbucks stores", -50, -30, {
            "font-size": 13,
            fill: "#222"
        });

        const srcX = innerW / 2;
        const srcY = innerH + 80;

        const link = createEl("a", {
            href: "https://cafely.com/blogs/research/starbucks-statistics?srsltid=AfmBOooTrTNOxZ3IKNzvPeaSDOHOcJ7z-D8Qc1mjzHkhyzcvHUME1fqT",
            target: "_blank",
            rel: "noopener"
        }, g);

        const srcText = createEl("text", {
            x: 0,
            y: srcY,
            "text-anchor": "start",
            "font-size": 11,
            fill: "#777"
        }, link);
        srcText.textContent = "Data source: https://cafely.com/blogs/research/starbucks-statistics?srsltid=AfmBOooTrTNOxZ3IKNzvPeaSDOHOcJ7z-D8Qc1mjzHkhyzcvHUME1fqT";


        container.appendChild(svg);
    };

    function createSVG(w, h, attrs = {}) {
        const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        s.setAttribute("width", w);
        s.setAttribute("height", h);
        s.setAttribute("viewBox", `0 0 ${w} ${h}`);
        setAttrs(s, attrs);
        return s;
    }
    function createEl(name, attrs = {}, parent = null) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", name);
        setAttrs(el, attrs);
        if (parent) parent.appendChild(el);
        return el;
    }
    function rect(parent, x, y, w, h, attrs = {}) {
        return createEl("rect", Object.assign({ x, y, width: w, height: h }, attrs), parent);
    }
    function line(parent, x1, y1, x2, y2, attrs = {}) {
        return createEl("line", Object.assign({ x1, y1, x2, y2 }, attrs), parent);
    }
    function text(parent, str, x, y, attrs = {}) {
        const el = createEl("text", Object.assign({ x, y }, attrs), parent);
        el.textContent = str;
        return el;
    }
    function setAttrs(el, attrs) {
        Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));
    }
    function vmap(d0, d1, r0, r1) {
        const m = (r1 - r0) / (d1 - d0);
        return v => r0 + (v - d0) * m;
    }

    window.VIS = VIS;
})();
