// ===== Food database for the Nutrition Diary =====
// Values are per 100 g (drinks: per 100 ml) and are APPROXIMATE.
// Basic foods follow USDA FoodData Central; Taiwanese dishes and
// convenience-store items are typical estimates and vary by shop.
//
// Format of each food:
//   key: [name, search words, emoji, photo key or null,
//         kcal, protein, carbs, fat, fiber,
//         portions: [one, many, grams] ...]

const FOOD_DATA = {
    // ---------- Rice, noodles, bread ----------
    rice:        ["White rice, cooked (白飯)", "rice bai fan steamed", "🍚", "rice", 130, 2.7, 28.2, 0.3, 0.4, [["bowl", "bowls", 200], ["half bowl", "half bowls", 100]]],
    brownrice:   ["Brown rice, cooked (糙米飯)", "brown rice", "🍚", null, 123, 2.7, 25.6, 1.0, 1.6, [["bowl", "bowls", 200]]],
    friedrice:   ["Fried rice (炒飯)", "fried rice chao fan", "🍛", null, 170, 5.0, 25.0, 6.0, 0.6, [["plate", "plates", 350]]],
    luroufan:    ["Braised pork rice (滷肉飯)", "lu rou fan braised pork rice minced", "🍚", null, 190, 6.0, 24.0, 8.0, 0.5, [["small bowl", "small bowls", 250], ["large bowl", "large bowls", 400]]],
    bento:       ["Chicken leg bento (雞腿便當)", "bento lunch box biandang chicken", "🍱", "meal", 160, 8.0, 20.0, 5.5, 1.0, [["box", "boxes", 550]]],
    noodles:     ["Noodles, cooked (麵)", "noodles mian", "🍜", "noodles", 138, 4.5, 25.0, 2.1, 1.2, [["bowl", "bowls", 200]]],
    beefnoodle:  ["Beef noodle soup (牛肉麵)", "beef noodle soup niu rou mian", "🍜", "noodles", 95, 6.0, 10.0, 3.5, 0.5, [["bowl", "bowls", 650]]],
    instant:     ["Instant noodles (泡麵)", "instant noodles ramen pao mian cup", "🍜", null, 450, 9.0, 60.0, 19.0, 2.0, [["pack", "packs", 85]]],
    bread:       ["White bread / toast (吐司)", "bread toast tu si slice", "🍞", "bread", 265, 9.0, 49.0, 3.2, 2.7, [["slice", "slices", 30], ["thick slice (厚片)", "thick slices", 60]]],
    oatmeal:     ["Oatmeal, cooked (燕麥粥)", "oatmeal oats porridge", "🥣", null, 71, 2.5, 12.0, 1.5, 1.7, [["bowl", "bowls", 240]]],

    // ---------- Taiwanese breakfast & snacks ----------
    baozi:       ["Pork bun (肉包)", "baozi bao bun pork steamed rou bao baozhi", "🥟", null, 230, 8.5, 31.0, 8.0, 1.2, [["bun", "buns", 100]]],
    mantou:      ["Steamed bun, plain (饅頭)", "mantou steamed bun plain", "🥯", null, 250, 7.5, 50.0, 1.5, 1.5, [["bun", "buns", 100]]],
    dumpling:    ["Pork dumplings, boiled (水餃)", "dumpling dumplings shui jiao jiaozi", "🥟", null, 210, 9.0, 22.0, 9.5, 1.0, [["dumpling", "dumplings", 25]]],
    potsticker:  ["Potstickers (鍋貼)", "potsticker guo tie fried dumpling", "🥟", null, 250, 9.0, 24.0, 13.0, 1.0, [["piece", "pieces", 30]]],
    xlb:         ["Soup dumplings (小籠包)", "xiao long bao xlb soup dumpling", "🥟", null, 220, 9.0, 22.0, 10.0, 1.0, [["piece", "pieces", 30]]],
    danbing:     ["Egg crepe (蛋餅)", "dan bing egg crepe pancake breakfast", "🌯", null, 220, 8.0, 25.0, 10.0, 1.0, [["roll", "rolls", 150]]],
    congyoubing: ["Scallion pancake (蔥油餅)", "cong you bing scallion green onion pancake", "🥞", null, 300, 6.0, 38.0, 14.0, 2.0, [["piece", "pieces", 120]]],
    radishcake:  ["Radish cake, pan-fried (蘿蔔糕)", "radish cake luo bo gao turnip", "🍘", null, 140, 2.0, 20.0, 5.5, 1.0, [["serving", "servings", 150]]],
    fantuan:     ["Rice roll (飯糰)", "fan tuan rice ball roll breakfast", "🍙", null, 200, 5.0, 35.0, 4.5, 1.0, [["roll", "rolls", 180]]],
    onigiri:     ["Onigiri, convenience store (御飯糰)", "onigiri rice ball 7-11 seven family mart triangle", "🍙", null, 190, 5.0, 33.0, 4.0, 0.5, [["piece", "pieces", 110]]],
    shaobing:    ["Sesame flatbread + fried dough (燒餅油條)", "shao bing you tiao youtiao", "🥖", null, 340, 8.0, 40.0, 16.0, 1.5, [["set", "sets", 150]]],
    teaegg:      ["Tea egg (茶葉蛋)", "tea egg cha ye dan 7-11", "🥚", "egg", 150, 12.5, 1.5, 10.0, 0, [["egg", "eggs", 55]]],

    // ---------- Night market ----------
    jipai:       ["Fried chicken cutlet (雞排)", "chicken cutlet ji pai fried night market", "🍗", "chicken", 280, 18.0, 14.0, 17.0, 0.5, [["piece", "pieces", 250]]],
    yansuji:     ["Popcorn chicken (鹽酥雞)", "popcorn chicken yan su ji salty crispy", "🍗", "chicken", 300, 17.0, 14.0, 20.0, 0.5, [["bag", "bags", 150]]],
    oyster:      ["Oyster omelette (蚵仔煎)", "oyster omelette o a jian", "🍳", null, 160, 6.0, 16.0, 8.0, 0.5, [["plate", "plates", 250]]],
    stinkytofu:  ["Stinky tofu, fried (臭豆腐)", "stinky tofu chou dou fu", "🍢", null, 230, 12.0, 9.0, 16.0, 1.0, [["serving", "servings", 150]]],
    pineapple:   ["Pineapple cake (鳳梨酥)", "pineapple cake feng li su", "🍍", null, 430, 4.0, 60.0, 19.0, 1.5, [["piece", "pieces", 50]]],
    mochi:       ["Mochi (麻糬)", "mochi ma shu", "🍡", null, 240, 4.0, 50.0, 2.0, 1.0, [["piece", "pieces", 40]]],

    // ---------- Western & convenience store ----------
    hamegg:      ["Ham & egg sandwich (火腿蛋三明治)", "sandwich ham egg 7-11 san ming zhi", "🥪", null, 240, 10.0, 26.0, 10.0, 1.5, [["sandwich", "sandwiches", 130]]],
    tunasand:    ["Tuna sandwich (鮪魚三明治)", "sandwich tuna", "🥪", null, 250, 11.0, 25.0, 12.0, 1.5, [["sandwich", "sandwiches", 130]]],
    burger:      ["Hamburger (漢堡)", "burger hamburger mcdonalds", "🍔", null, 250, 12.5, 28.0, 10.0, 1.5, [["burger", "burgers", 120]]],
    fries:       ["French fries (薯條)", "fries french fries chips", "🍟", null, 312, 3.4, 41.0, 15.0, 3.8, [["medium", "medium portions", 110]]],
    pizza:       ["Pizza (披薩)", "pizza", "🍕", null, 266, 11.0, 33.0, 10.0, 2.3, [["slice", "slices", 110]]],
    sweetpotato: ["Roasted sweet potato (烤地瓜)", "sweet potato di gua yam 7-11", "🍠", null, 90, 2.0, 21.0, 0.2, 3.3, [["medium", "medium ones", 200]]],
    corn:        ["Corn on the cob (玉米)", "corn yu mi", "🌽", null, 96, 3.4, 21.0, 1.5, 2.4, [["ear", "ears", 150]]],

    // ---------- Protein ----------
    egg:         ["Egg, whole (雞蛋)", "egg eggs ji dan boiled", "🥚", "egg", 143, 12.6, 0.7, 9.5, 0, [["egg", "eggs", 50]]],
    friedegg:    ["Fried egg (荷包蛋)", "fried egg he bao dan sunny side", "🍳", "egg", 196, 13.6, 0.8, 15.0, 0, [["egg", "eggs", 46]]],
    chicken:     ["Chicken breast, cooked (雞胸肉)", "chicken breast ji xiong rou 7-11", "🍗", "chicken", 165, 31.0, 0, 3.6, 0, [["breast", "breasts", 150], ["pack (7-11)", "packs", 100]]],
    porkchop:    ["Pork chop, cooked (豬排)", "pork chop zhu pai", "🥩", null, 242, 27.0, 0, 14.0, 0, [["piece", "pieces", 120]]],
    salmon:      ["Salmon, cooked (鮭魚)", "salmon fish gui yu", "🐟", null, 206, 22.0, 0, 12.0, 0, [["fillet", "fillets", 120]]],
    tofu:        ["Tofu, firm (豆腐)", "tofu dou fu bean curd", "🧊", null, 76, 8.0, 1.9, 4.8, 0.3, [["quarter block", "quarter blocks", 75], ["block", "blocks", 300]]],
    ham:         ["Ham (火腿)", "ham huo tui", "🥓", null, 145, 21.0, 1.5, 5.5, 0, [["slice", "slices", 20]]],
    cheese:      ["Cheese (起司)", "cheese qi si slice cheddar", "🧀", "cheese", 403, 25.0, 1.3, 33.0, 0, [["slice", "slices", 20]]],

    // ---------- Drinks ----------
    bubbletea:   ["Bubble milk tea (珍珠奶茶)", "bubble tea boba pearl milk tea zhen zhu nai cha", "🧋", null, 60, 0.5, 11.0, 1.6, 0, [["large cup (700 ml)", "large cups", 700], ["medium cup (500 ml)", "medium cups", 500]]],
    soymilk:     ["Soy milk, sweetened (豆漿)", "soy milk dou jiang soya", "🥛", null, 55, 3.0, 6.0, 1.8, 0.5, [["cup (400 ml)", "cups", 400]]],
    soymilkplain:["Soy milk, unsweetened (無糖豆漿)", "soy milk unsweetened no sugar", "🥛", null, 35, 3.3, 1.5, 1.8, 0.5, [["cup (400 ml)", "cups", 400]]],
    coffee:      ["Black coffee / Americano (美式咖啡)", "coffee americano black kafei", "☕", null, 2, 0.3, 0, 0, 0, [["cup (350 ml)", "cups", 350]]],
    latte:       ["Latte (拿鐵)", "latte coffee milk na tie", "☕", null, 55, 3.0, 4.5, 2.8, 0, [["cup (350 ml)", "cups", 350]]],
    milk:        ["Milk, whole (鮮奶)", "milk xian nai", "🥛", "milk", 61, 3.2, 4.8, 3.3, 0, [["glass (250 ml)", "glasses", 250]]],
    oj:          ["Orange juice (柳橙汁)", "orange juice oj", "🧃", null, 45, 0.7, 10.4, 0.2, 0.2, [["cup (250 ml)", "cups", 250]]],
    cola:        ["Cola (可樂)", "cola coke soda ke le", "🥤", null, 42, 0, 10.6, 0, 0, [["can (330 ml)", "cans", 330]]],
    yogurt:      ["Yogurt, plain (優格)", "yogurt yoghurt you ge", "🥛", null, 61, 3.5, 4.7, 3.3, 0, [["cup", "cups", 150]]],

    // ---------- Fruit & vegetables ----------
    banana:      ["Banana (香蕉)", "banana xiang jiao", "🍌", "banana", 89, 1.1, 22.8, 0.3, 2.6, [["medium banana", "medium bananas", 120]]],
    apple:       ["Apple (蘋果)", "apple ping guo", "🍎", "apple", 52, 0.3, 13.8, 0.2, 2.4, [["medium apple", "medium apples", 180]]],
    guava:       ["Guava (芭樂)", "guava ba le", "🍐", null, 68, 2.6, 14.3, 1.0, 5.4, [["medium guava", "medium guavas", 200]]],
    orange:      ["Orange (柳丁)", "orange liu ding", "🍊", null, 47, 0.9, 11.8, 0.1, 2.4, [["medium orange", "medium oranges", 150]]],
    tomato:      ["Tomato (番茄)", "tomato fan qie", "🍅", "tomato", 18, 0.9, 3.9, 0.2, 1.2, [["medium tomato", "medium tomatoes", 120]]],
    cabbage:     ["Cabbage (高麗菜)", "cabbage gao li cai", "🥬", "cabbage", 25, 1.3, 5.8, 0.1, 2.5, [["cup, chopped", "cups", 90]]],
    greens:      ["Broccoli (花椰菜)", "broccoli hua ye cai greens vegetables", "🥦", "greens", 34, 2.8, 6.6, 0.4, 2.6, [["cup", "cups", 90]]],
    potato:      ["Potato (馬鈴薯)", "potato ma ling shu", "🥔", "potato", 77, 2.0, 17.0, 0.1, 2.2, [["medium potato", "medium potatoes", 170]]],
    onion:       ["Onion (洋蔥)", "onion yang cong", "🧅", "onion", 40, 1.1, 9.3, 0.1, 1.7, [["medium onion", "medium onions", 110]]],

    // ---------- Snacks ----------
    chips:       ["Potato chips (洋芋片)", "chips crisps potato chips lays", "🥔", null, 536, 7.0, 53.0, 35.0, 4.4, [["small bag", "small bags", 50]]],
    peanuts:     ["Peanuts (花生)", "peanuts nuts hua sheng", "🥜", null, 567, 26.0, 16.0, 49.0, 8.5, [["handful", "handfuls", 30]]],
    icecream:    ["Ice cream (冰淇淋)", "ice cream", "🍦", null, 207, 3.5, 24.0, 11.0, 0.7, [["scoop", "scoops", 70]]]
};

// Turn the compact table into objects
const FOODS = {};
for (const key in FOOD_DATA) {
    const d = FOOD_DATA[key];
    FOODS[key] = {
        name: d[0], words: (d[0] + " " + d[1]).toLowerCase(), emoji: d[2], photo: d[3],
        kcal: d[4], p: d[5], c: d[6], f: d[7], fib: d[8],
        portions: d[9].map(function (x) { return { one: x[0], many: x[1], g: x[2] }; })
    };
}

// Photo if we have one, otherwise the emoji
function foodPic(key, cls) {
    const f = FOODS[key];
    if (f && f.photo && typeof photoTag === "function") return photoTag(f.photo, cls, 120);
    return '<div class="emoji ' + cls + '">' + (f ? f.emoji : "🍽️") + '</div>';
}
