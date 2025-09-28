document.addEventListener("DOMContentLoaded", () => {
    // ==== Starbucks chart ====
    const simpleEl = document.getElementById("simple-viz-container");

    // 安全检查：函数是否存在、容器是否存在
    const canDraw =
        simpleEl &&
        window.VIS &&
        typeof window.VIS.drawStarbucksBarChart === "function";

    if (canDraw) {
        const data = [
            { city: "New York", state: "NY", count: 191 },
            { city: "Chicago", state: "IL", count: 186 },
            { city: "Las Vegas", state: "NV", count: 179 },
            { city: "Houston", state: "TX", count: 161 },
            { city: "Los Angeles", state: "CA", count: 151 },
            { city: "San Diego", state: "CA", count: 135 },
            { city: "Phoenix", state: "AZ", count: 119 },
            { city: "Dallas", state: "TX", count: 99 },
            { city: "Seattle", state: "WA", count: 96 },
            { city: "Miami", state: "FL", count: 88 },
            { city: "San Antonio", state: "TX", count: 84 },
            { city: "Portland", state: "OR", count: 81 },
            { city: "San Jose", state: "CA", count: 80 },
            { city: "Charlotte", state: "NC", count: 76 },
            { city: "Sacramento", state: "CA", count: 75 },
            { city: "Denver", state: "CO", count: 74 },
            { city: "Tucson", state: "AZ", count: 72 },
            { city: "Washington", state: "DC", count: 70 },
            { city: "Orlando", state: "FL", count: 70 },
            { city: "Columbus", state: "OH", count: 69 }
        ];

        const mql = window.matchMedia("(max-width: 48em)");

        function renderChart() {
            // 不再从 main.js 传 margin —— 完全交给 vis.js 里的 baseMargin 处理
            window.VIS.drawStarbucksBarChart(simpleEl, data, {
                width: 980,
                height: 460
                // 如果你只想自定义左右间距，可这样传但不要传 top/bottom：
                // margin: { left: 70, right: 24 }
            });
        }

        renderChart();
        // 断点变化时重绘（新浏览器）
        if (mql.addEventListener) mql.addEventListener("change", renderChart);
        // 兼容旧 Safari
        else if (mql.addListener) mql.addListener(renderChart);
        // 可选：窗口尺寸变化也重绘
        // window.addEventListener("resize", renderChart);
    } else {
        // 如果图没出来，打开控制台看看这里打印
        console.warn("Chart not drawn:", {
            simpleElExists: !!simpleEl,
            hasVIS: !!window.VIS,
            fnType: typeof window.VIS?.drawStarbucksBarChart
        });
    }

    // ==== Cat expression toggle ====
    const box = document.getElementById("cat-container");
    const tplOpen = document.getElementById("cat-open-template");

    // 如果猫的元素不存在，不要 return；直接跳过这部分即可
    if (box && tplOpen) {
        const closedNode = box.firstElementChild
            ? box.firstElementChild.cloneNode(true)
            : null;
        const openNode = tplOpen.content.firstElementChild
            ? tplOpen.content.firstElementChild.cloneNode(true)
            : null;
        if (closedNode && openNode) {
            let isOpen = false;

            box.replaceChildren(closedNode.cloneNode(true));
            box.setAttribute("aria-label", "Cat, mouth closed");
            box.style.cursor = "pointer";
            box.setAttribute("tabindex", "0");

            function toggleCat() {
                if (isOpen) {
                    box.replaceChildren(closedNode.cloneNode(true));
                    box.setAttribute("aria-label", "Cat, mouth closed");
                } else {
                    box.replaceChildren(openNode.cloneNode(true));
                    box.setAttribute("aria-label", "Cat, mouth open");
                }
                isOpen = !isOpen;

                const btn = document.getElementById("cat-toggle-btn");
                if (btn) btn.textContent = isOpen ? "Close mouth" : "Open mouth";
            }

            box.addEventListener("click", toggleCat);
            box.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCat();
                }
            });

            const btn = document.getElementById("cat-toggle-btn");
            if (btn) btn.addEventListener("click", toggleCat);
        }
    }
});
