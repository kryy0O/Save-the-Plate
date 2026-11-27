// ===== Food photos (from Wikimedia Commons, free licenses) =====
// Each food name points to a photo file on Wikimedia Commons.
const PHOTO_BASE = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const PHOTOS = {
    tomato:  { file: "Tomato_je.jpg",                         emoji: "🍅" },
    rice:    { file: "Meshi_001.jpg",                         emoji: "🍚" },
    egg:     { file: "6-Pack-Chicken-Eggs.jpg",               emoji: "🥚" },
    bread:   { file: "Soda_bread.jpg",                        emoji: "🍞" },
    potato:  { file: "Patates.jpg",                           emoji: "🥔" },
    onion:   { file: "Onion_on_White.JPG",                    emoji: "🧅" },
    noodles: { file: "Ramen_20121203.jpg",                    emoji: "🍜" },
    milk:    { file: "Glass_of_milk_on_tablecloth.jpg",       emoji: "🥛" },
    banana:  { file: "Banana-Single.jpg",                     emoji: "🍌" },
    cheese:  { file: "Emmentaler.jpg",                        emoji: "🧀" },
    cabbage: { file: "A_large_cabbage.jpg",                   emoji: "🥬" },
    chicken: { file: "Chili_Garlic_Chicken_-_Flickr_-_MattCC716.png", emoji: "🍗" },
    apple:   { file: "Apple_in_lightbox.jpg",                 emoji: "🍎" },
    greens:  { file: "Broccoli_and_cross_section_edit.jpg",   emoji: "🥦" },
    meal:    { file: "Oyakodon_003.jpg",                      emoji: "🍱" }
};

// Web address of a photo, in a small size so the page loads fast
function photoUrl(key, width) {
    return PHOTO_BASE + encodeURIComponent(PHOTOS[key].file) + "?width=" + (width || 400);
}

// HTML for a photo. If the photo can't load, it shows the emoji instead.
function photoTag(key, className, width) {
    const p = PHOTOS[key];
    if (!p) return '<div class="emoji">🍽️</div>';
    return '<img class="' + className + '" src="' + photoUrl(key, width) + '" alt="' + key + '" loading="lazy" ' +
           'onerror="this.outerHTML=\'<div class=&quot;emoji&quot;>' + p.emoji + '</div>\'">';
}
