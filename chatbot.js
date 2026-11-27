// =========================================================
// Plate Pal — the Save the Plate kitchen assistant
// Runs in the browser. Answers from the site's own data:
// recipes, storage tips, nutrition values and your fridge list.
// =========================================================
(function () {

    // ---------- Knowledge ----------
    const RECIPES = [
        { name: "Egg Fried Rice", needs: ["rice", "egg", "onion"], steps: "Fry onion, add cold rice, push it aside, scramble the egg, then mix with soy sauce." },
        { name: "Tomato Egg Stir-fry", needs: ["tomato", "egg"], steps: "Scramble the eggs, cook tomato until soft, then mix together with a little sugar and salt." },
        { name: "French Toast", needs: ["bread", "egg", "milk"], steps: "Mix egg and milk, dip old bread, fry both sides until golden." },
        { name: "Banana Pancakes", needs: ["banana", "egg"], steps: "Mash a soft banana, mix with an egg, fry small pancakes." },
        { name: "Cheesy Potato Bake", needs: ["potato", "cheese", "milk"], steps: "Slice potato, pour milk on top, add cheese, bake 30 minutes." },
        { name: "Cabbage Noodle Soup", needs: ["noodles", "cabbage", "onion"], steps: "Boil water, add onion and cabbage, cook the noodles in the soup." },
        { name: "Chicken Rice Porridge", needs: ["rice", "chicken", "onion"], steps: "Boil leftover rice with lots of water, add chicken pieces and onion." },
        { name: "Bread Pudding", needs: ["bread", "milk", "banana"], steps: "Tear stale bread, mix with milk and banana, bake 25 minutes." },
        { name: "Potato Pancakes", needs: ["potato", "egg", "onion"], steps: "Grate potato and onion, mix with egg, fry flat pancakes." },
        { name: "Chicken Noodle Stir-fry", needs: ["noodles", "chicken", "cabbage"], steps: "Fry chicken, add cabbage, then noodles and sauce." }
    ];

    const STORAGE = {
        bread:   "Room temperature for 3–4 days. Freeze slices you won't eat soon and toast them straight from the freezer.",
        rice:    "Cooked rice: fridge for 3–4 days. Cool it quickly and keep it in a closed box. Day-old rice is perfect for fried rice.",
        milk:    "Fridge for 5–7 days after opening. Keep it at the back of the fridge, not in the door.",
        egg:     "Fridge for 3–5 weeks, in the box. Float test: if an egg floats in water, throw it away.",
        banana:  "Room temperature for 3–5 days. Brown bananas are great for pancakes or smoothies.",
        tomato:  "Room temperature for 3–5 days. Move to the fridge only when fully ripe.",
        potato:  "A cool, dark place for 2–4 weeks, away from onions.",
        onion:   "A dry place with air around it for 1–2 months. Cut onion goes in the fridge.",
        cabbage: "Fridge for 1–2 weeks. Wrap it to keep it crisp.",
        chicken: "Raw chicken: fridge for 1–2 days, or freezer up to 9 months. Thaw it in the fridge.",
        cheese:  "Fridge for 3–4 weeks. Wrap it in paper, then a bag, so it can breathe.",
        apple:   "Fridge for 4–6 weeks. Keep apples away from other fruit, they make it ripen faster.",
        noodles: "Cooked noodles: fridge for 3–5 days in a closed box. Dry noodles keep for months in the cupboard.",
        greens:  "Leafy vegetables: fridge for 3–7 days. Wrap in a paper towel to soak up extra water."
    };

    // per 100 g, approximate (USDA FoodData Central)
    const NUTRITION = {
        rice: [130, 2.7, 28.2, 0.3], egg: [143, 12.6, 0.7, 9.5], bread: [265, 9, 49, 3.2],
        tomato: [18, 0.9, 3.9, 0.2], potato: [77, 2, 17, 0.1], onion: [40, 1.1, 9.3, 0.1],
        noodles: [138, 4.5, 25, 2.1], milk: [61, 3.2, 4.8, 3.3], banana: [89, 1.1, 22.8, 0.3],
        cheese: [403, 25, 1.3, 33], cabbage: [25, 1.3, 5.8, 0.1], chicken: [165, 31, 0, 3.6],
        apple: [52, 0.3, 13.8, 0.2], greens: [34, 2.8, 6.6, 0.4]
    };

    // words people type -> food keys
    const WORDS = {
        rice: "rice", egg: "egg", eggs: "egg", bread: "bread", toast: "bread", tomato: "tomato", tomatoes: "tomato",
        potato: "potato", potatoes: "potato", onion: "onion", onions: "onion", noodle: "noodles", noodles: "noodles",
        ramen: "noodles", milk: "milk", banana: "banana", bananas: "banana", cheese: "cheese", cabbage: "cabbage",
        chicken: "chicken", apple: "apple", apples: "apple", broccoli: "greens", lettuce: "greens", spinach: "greens",
        vegetables: "greens", veggies: "greens", greens: "greens"
    };
    const NICE = { greens: "leafy vegetables", noodles: "noodles", egg: "eggs" };

    function foodsIn(text) {
        const found = [];
        text.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).forEach(function (w) {
            if (WORDS[w] && !found.includes(WORDS[w])) found.push(WORDS[w]);
        });
        return found;
    }
    const has = (t, list) => list.some(w => t.includes(w));
    const nice = k => NICE[k] || k;

    // ---------- Answers ----------
    function recipeAnswer(foods) {
        const scored = RECIPES.map(function (r) {
            const have = r.needs.filter(n => foods.includes(n));
            return { r: r, have: have.length, missing: r.needs.filter(n => !foods.includes(n)) };
        }).filter(x => x.have > 0).sort((a, b) => a.missing.length - b.missing.length || b.have - a.have);

        if (scored.length === 0) {
            return "I don't have a recipe with " + foods.map(nice).join(" and ") + " yet. Try rice, egg, bread, tomato, potato, noodles or banana.";
        }
        const best = scored.slice(0, 3);
        let html = "With " + foods.map(nice).join(", ") + " you could make:<ul>";
        best.forEach(function (x) {
            html += "<li><b>" + x.r.name + "</b>" +
                (x.missing.length ? " <span class='pp-dim'>(also needs " + x.missing.map(nice).join(", ") + ")</span>" : " <span class='pp-ok'>you have everything</span>") +
                "</li>";
        });
        html += "</ul>How to cook <b>" + best[0].r.name + "</b>: " + best[0].r.steps +
            "<br><a href='recipes.html'>Open the recipe finder</a>";
        return html;
    }

    function storageAnswer(foods) {
        return foods.map(k => "<b>" + cap(nice(k)) + ":</b> " + (STORAGE[k] || "I don't have a tip for that yet.")).join("<br><br>") +
            "<br><a href='tips.html'>See all storage tips</a>";
    }

    function nutritionAnswer(foods, text) {
        const g = (text.match(/(\d+)\s*(g|gram|grams)\b/) || [])[1];
        const grams = g ? Number(g) : 100;
        return foods.filter(k => NUTRITION[k]).map(function (k) {
            const n = NUTRITION[k], f = grams / 100;
            return "<b>" + grams + " g " + nice(k) + "</b>: " + Math.round(n[0] * f) + " kcal · " +
                round1(n[1] * f) + " g protein · " + round1(n[2] * f) + " g carbs · " + round1(n[3] * f) + " g fat";
        }).join("<br>") + "<br><span class='pp-dim'>Approximate values (USDA).</span> <a href='nutrition.html'>Log it in your diary</a>";
    }

    function fridgeAnswer() {
        let foods = [];
        try { foods = JSON.parse(localStorage.getItem("foods")) || []; } catch (e) {}
        if (foods.length === 0) {
            return "Your fridge list is empty. Add food in the <a href='tracker.html'>Expiry Tracker</a> and I'll tell you what to eat first.";
        }
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const withDays = foods.map(f => ({ name: f.name, d: Math.round((new Date(f.date + "T00:00:00") - today) / 86400000) }))
            .sort((a, b) => a.d - b.d);
        const urgent = withDays.filter(f => f.d <= 2);
        let html = urgent.length
            ? "Eat these first:<ul>" + urgent.map(f => "<li><b>" + f.name + "</b> " +
                (f.d < 0 ? "<span class='pp-bad'>expired</span>" : f.d === 0 ? "<span class='pp-warn'>today</span>" : "<span class='pp-warn'>in " + f.d + " day(s)</span>") + "</li>").join("") + "</ul>"
            : "Nothing is about to expire. Next up: <b>" + withDays[0].name + "</b> in " + withDays[0].d + " days.<br>";
        const keys = foodsIn(withDays.map(f => f.name).join(" "));
        if (keys.length) html += "Idea: " + recipeAnswer(keys).split("<ul>")[1].split("</li>")[0].replace("<li>", "");
        return html;
    }

    function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
    function round1(n) { return Math.round(n * 10) / 10; }

    function reply(input) {
        const t = input.toLowerCase().trim();
        const foods = foodsIn(t);

        if (t === "") return "Type a question, or tap one of the suggestions below.";
        if (/\b(thanks?|thank you|thx|ty)\b/.test(t)) return "You're welcome! Every plate saved counts. 🌱";
        if (/^(hi|hello|hey|yo|hii+)\b/.test(t)) return "Hi! I'm Plate Pal. Tell me what's in your fridge and I'll suggest a recipe, a storage tip, or the calories.";
        if (has(t, ["expire", "expiring", "fridge", "eat first", "go bad", "going bad"]) && foods.length === 0) return fridgeAnswer();
        if (has(t, ["sdg", "sustainable", "goal"])) return "This site supports two UN goals:<br><b>SDG 2 Zero Hunger</b>: share extra food instead of throwing it away.<br><b>SDG 12 Responsible Consumption</b>: target 12.3 is to halve food waste per person by 2030.";
        if (has(t, ["waste", "fact", "statistic", "how much food"]) && foods.length === 0) return "A few facts:<ul><li>About <b>1/3</b> of all food is lost or wasted (FAO).</li><li><b>1.05 billion tonnes</b> were wasted in 2022, about 60% at home (UNEP).</li><li>Food waste causes <b>8–10%</b> of global emissions (UNEP).</li></ul><a href='quiz.html'>Test yourself with the quiz</a>";
        if (has(t, ["share", "give away", "donate", "extra food"])) return "Post it on the <a href='share.html'>Food Sharing board</a>: write the food, place and pick-up time, and other students can claim it.";
        if (has(t, ["help", "what can you do", "who are you"])) return "I can help with:<ul><li>Recipes: <i>what can I cook with egg and rice?</i></li><li>Storage: <i>how long does milk last?</i></li><li>Nutrition: <i>calories in 150 g chicken</i></li><li>Your fridge: <i>what should I eat first?</i></li></ul>";

        if (foods.length) {
            if (has(t, ["calorie", "kcal", "protein", "carb", "fat", "macro", "nutrition", "healthy"])) return nutritionAnswer(foods, t);
            if (has(t, ["store", "storage", "keep", "last", "fresh", "fridge", "freeze", "expire"])) return storageAnswer(foods);
            return recipeAnswer(foods);
        }
        if (has(t, ["cook", "recipe", "make", "eat", "dinner", "lunch", "breakfast", "hungry"])) return "Tell me what you have, for example: <i>I have egg, tomato and rice</i>.";
        return "I'm not sure about that one. I know about recipes, storage, nutrition and food waste. Try: <i>what can I cook with bread and milk?</i>";
    }

    // ---------- Interface ----------
    const css = `
    .pp-launch { position: fixed; right: 24px; bottom: 24px; z-index: 300; width: 62px; height: 62px; border-radius: 50%;
        border: none; background: var(--tomato, #E8452C); color: #fff; font-size: 30px; cursor: pointer;
        box-shadow: 0 10px 30px rgba(23,32,26,.25); display: grid; place-items: center; transition: transform .2s; }
    .pp-launch:hover { transform: scale(1.06); }
    .pp-panel { position: fixed; right: 24px; bottom: 100px; z-index: 300; width: 380px; max-width: calc(100vw - 32px);
        height: 560px; max-height: calc(100vh - 140px); background: #fff; border-radius: 24px; overflow: hidden;
        box-shadow: 0 20px 60px rgba(23,32,26,.25); display: flex; flex-direction: column;
        transform-origin: bottom right; transform: scale(.9); opacity: 0; pointer-events: none; transition: transform .2s, opacity .2s; }
    .pp-panel.open { transform: scale(1); opacity: 1; pointer-events: auto; }
    .pp-head { background: var(--leaf, #1F5135); color: #fff; padding: 16px 18px; display: flex; align-items: center; gap: 12px; }
    .pp-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--butter, #F6D66B); color: var(--leaf, #1F5135);
        display: grid; place-items: center; font-size: 22px; flex: none; }
    .pp-head b { font-family: var(--display, sans-serif); font-size: 18px; display: block; line-height: 1.1; }
    .pp-head small { color: #CFE0CC; font-size: 13px; }
    .pp-close { margin-left: auto; background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; }
    .pp-body { flex: 1; overflow-y: auto; padding: 16px; background: var(--paper, #F7F8F3); display: flex; flex-direction: column; gap: 10px; }
    .pp-msg { max-width: 85%; padding: 10px 14px; border-radius: 18px; font-size: 15px; line-height: 1.5; }
    .pp-msg ul { margin: 6px 0 6px 18px; }
    .pp-msg a { color: var(--leaf-2, #2E7D4F); font-weight: 600; }
    .pp-bot { background: #fff; border: 1px solid var(--line, #DCE5D7); border-bottom-left-radius: 6px; align-self: flex-start; }
    .pp-user { background: var(--leaf, #1F5135); color: #fff; border-bottom-right-radius: 6px; align-self: flex-end; }
    .pp-dim { color: #7A877E; font-size: 13px; }
    .pp-ok { color: var(--leaf-2, #2E7D4F); font-size: 13px; font-weight: 600; }
    .pp-warn { color: #9A5D07; font-weight: 600; }
    .pp-bad { color: var(--tomato, #E8452C); font-weight: 600; }
    .pp-typing span { display: inline-block; width: 7px; height: 7px; margin: 0 2px; border-radius: 50%; background: #9AA89E; animation: ppb 1s infinite; }
    .pp-typing span:nth-child(2) { animation-delay: .15s; } .pp-typing span:nth-child(3) { animation-delay: .3s; }
    @keyframes ppb { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-5px); } }
    .pp-chips { display: flex; gap: 8px; overflow-x: auto; padding: 10px 14px 0; background: #fff; }
    .pp-chips button { flex: none; font: 600 13px var(--body, sans-serif); border: 1.5px solid var(--line, #DCE5D7); background: #fff;
        color: var(--ink, #17201A); border-radius: 999px; padding: 6px 12px; cursor: pointer; }
    .pp-chips button:hover { border-color: var(--leaf-2, #2E7D4F); }
    .pp-form { display: flex; gap: 8px; padding: 12px 14px 14px; background: #fff; }
    .pp-form input { flex: 1; margin: 0 !important; }
    .pp-send { width: 46px; height: 46px; flex: none; border-radius: 50%; border: none; background: var(--tomato, #E8452C);
        color: #fff; font-size: 22px; cursor: pointer; display: grid; place-items: center; }
    @media (max-width: 600px) { .pp-panel { right: 16px; bottom: 92px; } .pp-launch { right: 16px; bottom: 16px; } }
    @media (prefers-reduced-motion: reduce) { .pp-panel, .pp-launch { transition: none; } .pp-typing span { animation: none; } }`;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const launch = document.createElement("button");
    launch.className = "pp-launch";
    launch.setAttribute("aria-label", "Open the kitchen assistant");
    launch.innerHTML = "<i class='bx bx-message-rounded-dots'></i>";

    const panel = document.createElement("div");
    panel.className = "pp-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Plate Pal kitchen assistant");
    panel.innerHTML =
        "<div class='pp-head'><div class='pp-avatar'><i class='bx bxs-leaf'></i></div>" +
        "<div><b>Plate Pal</b><small>Your zero-waste kitchen assistant</small></div>" +
        "<button class='pp-close' aria-label='Close'>×</button></div>" +
        "<div class='pp-body' id='ppBody' aria-live='polite'></div>" +
        "<div class='pp-chips'>" +
        ["What can I cook with egg and rice?", "What should I eat first?", "How long does milk last?", "Calories in 150 g chicken", "Food waste facts"]
            .map(q => "<button type='button'>" + q + "</button>").join("") + "</div>" +
        "<form class='pp-form'><input type='text' id='ppInput' placeholder='Ask about your food…' autocomplete='off' aria-label='Message'>" +
        "<button class='pp-send' aria-label='Send'><i class='bx bx-send'></i></button></form>";

    document.body.appendChild(panel);
    document.body.appendChild(launch);

    const body = panel.querySelector("#ppBody");
    const input = panel.querySelector("#ppInput");

    function add(html, who) {
        const div = document.createElement("div");
        div.className = "pp-msg " + (who === "user" ? "pp-user" : "pp-bot");
        if (who === "user") div.textContent = html; else div.innerHTML = html;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
        return div;
    }

    function ask(text) {
        add(text, "user");
        const typing = add("<span class='pp-typing'><span></span><span></span><span></span></span>", "bot");
        setTimeout(function () {
            typing.innerHTML = reply(text);
            body.scrollTop = body.scrollHeight;
        }, 550 + Math.random() * 400);
    }

    let greeted = false;
    function toggle(open) {
        panel.classList.toggle("open", open);
        launch.innerHTML = open ? "<i class='bx bx-x'></i>" : "<i class='bx bx-message-rounded-dots'></i>";
        if (open && !greeted) {
            greeted = true;
            add("Hi, I'm <b>Plate Pal</b>! 🌱 Tell me what's in your fridge and I'll help you use it up. Try a suggestion below.", "bot");
        }
        if (open) setTimeout(() => input.focus(), 200);
    }

    launch.addEventListener("click", () => toggle(!panel.classList.contains("open")));
    panel.querySelector(".pp-close").addEventListener("click", () => toggle(false));
    document.addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
    panel.querySelectorAll(".pp-chips button").forEach(b => b.addEventListener("click", () => ask(b.textContent)));
    panel.querySelector(".pp-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = "";
        ask(text);
    });

    // for testing in the console
    window.platePalReply = reply;
})();
