// main.js
document.addEventListener("DOMContentLoaded", () => {
    const simpleEl = document.getElementById("simple-viz-container");
    if (simpleEl && window.VIS && typeof window.VIS.drawStarbucksBarChart === "function") {
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

        window.VIS.drawStarbucksBarChart(simpleEl, data, {
            width: 980,
            height: 460,
            margin: { top: 50, right: 24, bottom: 120, left: 70 }
        });
    }

    const box = document.getElementById("cat-container");
    const tplOpen = document.getElementById("cat-open-template");

    if (!box || !tplOpen) return;

    // 记录初始的“闭嘴”版本，用于切回
    const closedHTML = box.innerHTML.trim();
    const openHTML = tplOpen.innerHTML.trim();
    let isOpen = false;

    // 点击切换
    box.addEventListener("click", () => {
        if (isOpen) {
            box.innerHTML = closedHTML;
            box.setAttribute("aria-label", "Cat, mouth closed");
        } else {
            box.innerHTML = openHTML;
            box.setAttribute("aria-label", "Cat, mouth open");
        }
        isOpen = !isOpen;
    });

    // 键盘切换，提升可达性
    box.setAttribute("tabindex", "0");
    box.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            box.click();
        }
    });
});

