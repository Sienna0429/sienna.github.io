// ====== Simple Bar Chart: Starbucks counts by city ======
(function () {

    const VIS = window.VIS || {};

    // data: [{ city, state, count }]
    VIS.drawStarbucksBarChart = function (container, data, opts = {}) {
        if (!container) return;

        // 配置
        const width = opts.width || 900;
        const height = opts.height || 420;
        const margin = Object.assign({ top: 40, right: 24, bottom: 120, left: 70 }, opts.margin || {});
        const innerW = width - margin.left - margin.right;
        const innerH = height - margin.top - margin.bottom;

        // 排序：从大到小
        const sorted = [...data].sort((a, b) => b.count - a.count);

        // 清空容器
        container.innerHTML = "";

        // 创建 SVG
        const svg = createSVG(width, height, { role: "img", "aria-label": "Bar chart of Starbucks store counts by city" });

        // 主分组
        const g = createEl("g", { transform: `translate(${margin.left},${margin.top})` }, svg);

        // 计算比例尺
        const maxV = Math.max(...sorted.map(d => d.count));
        const xStep = innerW / sorted.length * 1.5;

        // y 线性比例尺
        const y = vmap(0, maxV, innerH, 0);

        // 网格线
        const gridCount = 5;
        for (let i = 0; i <= gridCount; i++) {
            const value = (maxV / gridCount) * i;
            const yPos = y(value);
            line(g, 0, yPos, innerW, yPos, { stroke: "#e6e6e6" });
            text(g, String(Math.round(value)), -10, yPos + 4, { textAnchor: "end", fontSize: 11, fill: "#555" });
        }

        // 柱子
        const barW = xStep * 0.5; // 留出间距

        sorted.forEach((d, i) => {
            const h = innerH - y(d.count);
            const x = i * xStep + (xStep - barW) / 2;
            const yTop = y(d.count);
            rect(g, x, yTop, barW, h, { fill: "#006241" }); // 绿色

            // 数值标签
            text(g, String(d.count), x + barW / 2, yTop - 6, {
                textAnchor: "middle",
                fontSize: 12,
                fill: "#333"
            });

            // x 轴标签（城市）
            const cityLabel = `${d.city}`;
            const label = createEl("text", {
                x: x + barW / 2,
                y: innerH + 18,
                "text-anchor": "middle",
                "font-size": 12,
                fill: "#333"
            }, g);
            label.textContent = cityLabel;

            // 第二行州缩写
            const stateLabel = createEl("text", {
                x: x + barW / 2,
                y: innerH + 36,
                "text-anchor": "middle",
                "font-size": 11,
                fill: "#777"
            }, g);
            stateLabel.textContent = d.state;
        });

        // 轴标题
        text(g, "Number of Starbucks stores", -50, -30, { fontSize: 13, fill: "#222" });



        container.appendChild(svg);
    };

    // ====== Helper functions ======
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
