//<!-- Counter Animation Script -->
const options = { root: null, rootMargin: '0px', threshold: 0.5 };
// The hasStarted flag prevents repeated animation of counters during the current page load.
// Note: If the section is removed and re-added dynamically, counters will not animate again unless the page is reloaded.
let hasStarted = false;

function animateCounters() {
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach(counter => {
    const rawText = counter.textContent.trim();          // e.g. "4.9" or "50"
    const suffix = counter.dataset.suffix || '';        // e.g. "+"
    const value = parseFloat(rawText);                 // 4.9 or 50
    const decimals = (rawText.split('.')[1] || '').length;
    const multiplier = Math.pow(10, decimals);             // 10 for one decimal place
    const target = Math.round(value * multiplier);      // 49 or 50*1
    const duration = 2000;  // total ms for the count
    const stepTime = Math.max(Math.floor(duration / target), 20);
    let count = 0;

    const timer = setInterval(() => {
        count++;
        const display = (count / multiplier).toFixed(decimals);
        counter.textContent = display + suffix;
        if (count >= target) clearInterval(timer);
    }, stepTime);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting && !hasStarted) {
        hasStarted = true;
        animateCounters();
    }
    });
}, options);

observer.observe(document.getElementById('counter'));

//  <!-- Mobile menu toggle script -->
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

// WhatsApp phone number for inquiries (update here if needed)
const WHATSAPP_PHONE = '971553023403';

// intercept form submit
document.getElementById('car-form').addEventListener('submit', function (e) {
    e.preventDefault(); // stop normal submit

    // grab values
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;

    // build message
    const lines = [
    'Hello, I would like to inquire about car parts.',
    `Brand: ${brand}`,
    `Model: ${model}`,
    `Year: ${year}`
    ];
    const text = lines.join('\n');

    // WhatsApp URL using configuration variable
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

    // open in new tab
    window.open(url, '_blank');
});

// Dependent Dropdown Script (update IDs accordingly)
// --- utility: convert hyphenated or spaced strings to camelCase --- 
function toCamelCase(str) {
    const s = str.trim();

    // if there are spaces or hyphens, do the full split-&-capitalize dance:
    if (/[\s\-]/.test(s)) {
    return s
        .split(/[\s\-]+/)               // ["mercedes", "benz"]
        .map((word, i) => {
        word = word.toLowerCase();
        return i === 0
            ? word                      // first chunk all-lower
            : word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');                      // "mercedesBenz"
    }

    // otherwise, assume it’s already camel/Pascal-ish—just lowercase first letter:
    return s.charAt(0).toLowerCase() + s.slice(1);
}

// --- utility: human-friendly model names ---
function formatModelName(key) {
    // fully uppercase 2–3-letter acronyms:
    if (/^[a-z]{2,3}$/.test(key)) {
    return key.toUpperCase();
    }
    // insert spaces before uppercase letters:
    const words = key.replace(/([A-Z])/g, ' $1').split(' ');
    return words
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Example carData; replace with dynamic fetch if needed
const getYearsRange = (yearsBack) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: yearsBack + 1 }, (_, i) => currentYear - i);
};

const carData = {
    audi: {
    a3: getYearsRange(50),
    a4: getYearsRange(50),
    a5: getYearsRange(50),
    a6: getYearsRange(50),
    a7: getYearsRange(50),
    a8: getYearsRange(50),
    q3: getYearsRange(50),
    q5: getYearsRange(50),
    q7: getYearsRange(50),
    q8: getYearsRange(50),
    etron: getYearsRange(50),
    tt: getYearsRange(50),
    r8: getYearsRange(50),
    other: getYearsRange(50)
    },
    bmw: {
    series1: getYearsRange(50),
    series2: getYearsRange(50),
    series3: getYearsRange(50),
    series4: getYearsRange(50),
    series5: getYearsRange(50),
    series6: getYearsRange(50),
    series7: getYearsRange(50),
    series8: getYearsRange(50),
    x1: getYearsRange(50),
    x2: getYearsRange(50),
    x3: getYearsRange(50),
    x4: getYearsRange(50),
    x5: getYearsRange(50),
    x6: getYearsRange(50),
    x7: getYearsRange(50),
    z4: getYearsRange(50),
    i3: getYearsRange(50),
    i4: getYearsRange(50),
    ix: getYearsRange(50),
    ix3: getYearsRange(50),
    m3: getYearsRange(50),
    m4: getYearsRange(50),
    m5: getYearsRange(50),
    m8: getYearsRange(50),
    other: getYearsRange(50)
    },
    chevrolet: {
    spark: getYearsRange(50),
    malibu: getYearsRange(50),
    camaro: getYearsRange(50),
    corvette: getYearsRange(50),
    equinox: getYearsRange(50),
    tahoe: getYearsRange(50),
    suburban: getYearsRange(50),
    blazer: getYearsRange(50),
    traverse: getYearsRange(50),
    trailblazer: getYearsRange(50),
    trax: getYearsRange(50),
    colorado: getYearsRange(50),
    bolt: getYearsRange(50),
    other: getYearsRange(50)
    },
    ford: {
    fiesta: getYearsRange(50),
    focus: getYearsRange(50),
    fusion: getYearsRange(50),
    mustang: getYearsRange(50),
    explorer: getYearsRange(50),
    edge: getYearsRange(50),
    escape: getYearsRange(50),
    expedition: getYearsRange(50),
    f150: getYearsRange(50),
    ranger: getYearsRange(50),
    bronco: getYearsRange(50),
    maverick: getYearsRange(50),
    transit: getYearsRange(50),
    other: getYearsRange(50)
    },
    gmc: {
    sierra: getYearsRange(50),
    canyon: getYearsRange(50),
    terrain: getYearsRange(50),
    yukon: getYearsRange(50),
    acadia: getYearsRange(50),
    other: getYearsRange(50)
    },
    honda: {
    civic: getYearsRange(50),
    accord: getYearsRange(50),
    crv: getYearsRange(50),
    pilot: getYearsRange(50),
    odyssey: getYearsRange(50),
    fit: getYearsRange(50),
    hrv: getYearsRange(50),
    other: getYearsRange(50)
    },
    hyundai: {
    elantra: getYearsRange(50),
    sonata: getYearsRange(50),
    accent: getYearsRange(50),
    tucson: getYearsRange(50),
    santaFe: getYearsRange(50),
    palisade: getYearsRange(50),
    kona: getYearsRange(50),
    venue: getYearsRange(50),
    other: getYearsRange(50)
    },
    infiniti: {
    q50: getYearsRange(50),
    q60: getYearsRange(50),
    q70: getYearsRange(50),
    qx50: getYearsRange(50),
    qx60: getYearsRange(50),
    qx80: getYearsRange(50),
    other: getYearsRange(50)
    },
    kia: {
    rio: getYearsRange(50),
    forte: getYearsRange(50),
    optima: getYearsRange(50),
    stinger: getYearsRange(50),
    soul: getYearsRange(50),
    seltos: getYearsRange(50),
    sportage: getYearsRange(50),
    sorento: getYearsRange(50),
    telluride: getYearsRange(50),
    carnival: getYearsRange(50),
    other: getYearsRange(50)
    },
    landRover: {
    defender: getYearsRange(50),
    discovery: getYearsRange(50),
    rangeRover: getYearsRange(50),
    velar: getYearsRange(50),
    evoque: getYearsRange(50),
    other: getYearsRange(50)
    },
    lexus: {
    is: getYearsRange(50),
    es: getYearsRange(50),
    gs: getYearsRange(50),
    ls: getYearsRange(50),
    ux: getYearsRange(50),
    nx: getYearsRange(50),
    rx: getYearsRange(50),
    gx: getYearsRange(50),
    lx: getYearsRange(50),
    other: getYearsRange(50)
    },
    mazda: {
    mazda3: getYearsRange(50),
    mazda6: getYearsRange(50),
    cx3: getYearsRange(50),
    cx5: getYearsRange(50),
    cx9: getYearsRange(50),
    mx5: getYearsRange(50),
    other: getYearsRange(50)
    },
    mercedesBenz: {
    aClass: getYearsRange(50),
    cClass: getYearsRange(50),
    eClass: getYearsRange(50),
    sClass: getYearsRange(50),
    gla: getYearsRange(50),
    glc: getYearsRange(50),
    gle: getYearsRange(50),
    gls: getYearsRange(50),
    gClass: getYearsRange(50),
    sl: getYearsRange(50),
    cls: getYearsRange(50),
    other: getYearsRange(50)
    },
    mitsubishi: {
    mirage: getYearsRange(50),
    lancer: getYearsRange(50),
    eclipseCross: getYearsRange(50),
    outlander: getYearsRange(50),
    endeavour: getYearsRange(50),
    pajero: getYearsRange(50),
    other: getYearsRange(50)
    },
    nissan: {
    versa: getYearsRange(50),
    sentra: getYearsRange(50),
    altima: getYearsRange(50),
    maxima: getYearsRange(50),
    leaf: getYearsRange(50),
    rogue: getYearsRange(50),
    murano: getYearsRange(50),
    pathfinder: getYearsRange(50),
    armada: getYearsRange(50),
    frontier: getYearsRange(50),
    other: getYearsRange(50)
    },
    toyota: {
    corolla: getYearsRange(50),
    camry: getYearsRange(50),
    prius: getYearsRange(50),
    avalon: getYearsRange(50),
    supra: getYearsRange(50),
    rav4: getYearsRange(50),
    highlander: getYearsRange(50),
    tundra: getYearsRange(50),
    tacoma: getYearsRange(50),
    other: getYearsRange(50)
    },
    volkswagen: {
    golf: getYearsRange(50),
    passat: getYearsRange(50),
    jetta: getYearsRange(50),
    tiguan: getYearsRange(50),
    atlas: getYearsRange(50),
    arteon: getYearsRange(50),
    id3: getYearsRange(50),
    id4: getYearsRange(50),
    other: getYearsRange(50)
    }
};

const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const yearSelect = document.getElementById('year');

brandSelect.addEventListener('change', () => {
    // turn "mercedes-benz" → "mercedesBenz", "mitsubishi" → "mitsubishi", etc.
    const brandKey = toCamelCase(brandSelect.value);
    console.log(`Selected brand key: ${brandKey}`);
    const models = carData[brandKey] || {};

    // reset
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    yearSelect.disabled = true;

    // populate models
    Object.keys(models).forEach(mKey => {
    const opt = document.createElement('option');
    opt.value = mKey;
    opt.textContent = formatModelName(mKey);
    modelSelect.appendChild(opt);
    });
});

modelSelect.addEventListener('change', () => {
    const brandKey = toCamelCase(brandSelect.value);
    const years = carData[brandKey]?.[modelSelect.value] || [];

    yearSelect.innerHTML = '<option value="">Select Year</option>';
    yearSelect.disabled = false;

    years.forEach(y => {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
    });
});