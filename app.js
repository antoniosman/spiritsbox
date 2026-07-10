const app = document.getElementById("app");

const roster = [
  ["Alex", "char_alex.webp"],
  ["Billy", "char_billy.webp"],
  ["Catherine", "char_catherine.png"],
  ["Demarin", "char_demarin.webp"],
  ["Elisa", "char_elisa.webp"],
  ["Ester", "char_ester.png"],
  ["Eva", "char_eva.png"],
  ["Evaggelia", "char_evaggelia.png"],
  ["Evelyn", "char_evelyn.webp"],
  ["Hope", "char_hope.webp"],
  ["Ian", "char_ian.png"],
  ["Irene", "char_irene.png"],
  ["Jasmine", "char_jasmine.png"],
  ["Luna", "char_luna.webp"],
  ["Paul", "char_paul.png"],
  ["Pauline", "char_pauline.webp"],
  ["Phillip", "char_phillip.webp"],
  ["Rino", "char_rino.webp"],
  ["Sargenie", "char_sargenie.jpeg"],
  ["Smaragda", "char_smaragda.jpeg"],
  ["Sorina", "char_sorina.png"],
  ["Tony", "char_tony.webp"],
  ["Vicky", "char_vicky.jpg"],
  ["Violet", "char_violet.png"],
  ["Vincent", "char_vincent.jpg"],
  ["Zoe", "char_zoe.jpeg"]
].map(([name, file]) => ({ id: name.toLowerCase(), name, file, alive: true, ally: null, allyUntilRound: 0 }));

const speechNames = {
  Alex: "AH-lex",
  Billy: "BEE-lee",
  Elisa: "eh-LEE-so Lant-SAH-va",
  Evaggelia: "eh-van-gheh-LEE-ah",
  Evelyn: "EH-veh-lin",
  Jasmine: "Yas-MEEN",
  Rino: "REE-no",
  Sargenie: "sar-JEE-nee",
  Smaragda: "sma-ragh-DEN-yah",
  Sorina: "so-REE-nah",
  Zoe: "zo-EE"
};

const QUIZ_BANK = [
  ["Ποιο είναι μεγαλύτερο;", "Ήλιος", "Φεγγάρι", 0],
  ["2 + 3 = ?", "5", "6", 0],
  ["Οι Android εφαρμογές έχουν APK;", "Ναι", "Όχι", 0],
  ["Τι έρχεται πρώτο στο αλφάβητο;", "Α", "Ζ", 0],
  ["Η φωτιά είναι συνήθως...", "Ζεστή", "Κρύα", 0],
  ["Πόσες πλευρές έχει ένα τρίγωνο;", "3", "4", 0],
  ["Πόσες μέρες έχει μία εβδομάδα;", "7", "8", 0],
  ["Ποιο είναι πιο κρύο;", "Πάγος", "Λάβα", 0],
  ["Ποιο χρώμα βγαίνει από κόκκινο και μπλε;", "Μωβ", "Πράσινο", 0],
  ["Πόσο κάνει 9 - 4;", "5", "6", 0],
  ["Ποιο όργανο δείχνει την ώρα;", "Ρολόι", "Θερμόμετρο", 0],
  ["Ποια εποχή έχει συνήθως περισσότερο κρύο;", "Χειμώνας", "Καλοκαίρι", 0],
  ["Πόσα λεπτά έχει μία ώρα;", "60", "100", 0],
  ["Ποιο είναι φρούτο;", "Μήλο", "Πατάτα", 0],
  ["Ποιο ζει στη θάλασσα;", "Ψάρι", "Αετός", 0],
  ["Ποιο είναι πιο κοντά στη Γη;", "Σελήνη", "Ήλιος", 0],
  ["Ποιο γράμμα έρχεται μετά το Β;", "Γ", "Δ", 0],
  ["Πόσα μάτια έχει συνήθως ένας άνθρωπος;", "2", "3", 0],
  ["Τι χρώμα έχει συνήθως το γρασίδι;", "Πράσινο", "Κόκκινο", 0],
  ["Ποιο είναι πιο γρήγορο;", "Αεροπλάνο", "Ποδήλατο", 0],
  ["Πόσο κάνει 4 x 3;", "12", "10", 0],
  ["Ποιο είναι μέταλλο;", "Χρυσός", "Ξύλο", 0],
  ["Ποιο είναι πλανήτης;", "Άρης", "Άτλας", 0],
  ["Ποιο χρειάζεται για να ανάψει φωτιά;", "Οξυγόνο", "Πάγος", 0],
  ["Πόσα δάχτυλα έχει συνήθως ένα χέρι;", "5", "6", 0],
  ["Ποιο είναι πιο βαρύ;", "Πέτρα", "Φτερό", 0],
  ["Ποια λέξη σημαίνει νερό στα αγγλικά;", "Water", "Fire", 0],
  ["Ποιο ζώο νιαουρίζει;", "Γάτα", "Σκύλος", 0],
  ["Ποιο ζώο γαβγίζει;", "Σκύλος", "Γάτα", 0],
  ["Πόσο κάνει 15 + 5;", "20", "25", 0],
  ["Ποια συσκευή βγάζει φωτογραφίες;", "Κάμερα", "Τοστιέρα", 0],
  ["Ποιο είναι πιο γλυκό;", "Μέλι", "Αλάτι", 0],
  ["Ποιο βρίσκεται στον ουρανό τη νύχτα;", "Αστέρια", "Ρίζες", 0],
  ["Πόσοι μήνες έχει ένας χρόνος;", "12", "10", 0],
  ["Ποια ημέρα έρχεται μετά τη Δευτέρα;", "Τρίτη", "Παρασκευή", 0],
  ["Ποιο είναι όχημα;", "Αυτοκίνητο", "Καρέκλα", 0],
  ["Ποιο είναι πιο μαλακό;", "Μαξιλάρι", "Τούβλο", 0],
  ["Ποιο ποτό φτιάχνεται από σταφύλια;", "Κρασί", "Καφές", 0],
  ["Πόσο κάνει 100 - 1;", "99", "90", 0],
  ["Ποιο είναι μουσικό όργανο;", "Πιάνο", "Τραπέζι", 0],
  ["Ποιο είναι έντομο;", "Μέλισσα", "Άλογο", 0],
  ["Ποια λέξη είναι χρώμα;", "Μπλε", "Τρέχω", 0],
  ["Πόσα πόδια έχει μια καρέκλα συνήθως;", "4", "5", 0],
  ["Ποιο είναι πιο φωτεινό;", "Λάμπα", "Σκιά", 0],
  ["Ποιο είναι πρωτεύουσα της Ελλάδας;", "Αθήνα", "Πάτρα", 0],
  ["Ποιο γράμμα είναι φωνήεν;", "Α", "Π", 0],
  ["Ποια θάλασσα βρίσκεται δίπλα στην Ελλάδα;", "Αιγαίο", "Βαλτική", 0],
  ["Πόσο κάνει 7 + 8;", "15", "14", 0],
  ["Ποιο είναι εργαλείο κοπής;", "Ψαλίδι", "Ποτήρι", 0],
  ["Ποιο είναι πιο ζεστό;", "Ήλιος", "Χιόνι", 0],
  ["Ποιο τρώμε σαν πρωινό;", "Δημητριακά", "Πέτρες", 0],
  ["Ποια συσκευή παίρνει τηλέφωνο;", "Κινητό", "Βιβλίο", 0],
  ["Ποιο είναι λαχανικό;", "Καρότο", "Κεράσι", 0],
  ["Πόσες ώρες έχει μία ημέρα;", "24", "12", 0],
  ["Ποιο είναι πιο ψηλό;", "Βουνό", "Παπούτσι", 0],
  ["Ποιο πετάει;", "Πουλί", "Ψάρι", 0],
  ["Ποια λέξη σημαίνει φως στα αγγλικά;", "Light", "Night", 0],
  ["Ποιο είναι παιχνίδι με μπάλα;", "Ποδόσφαιρο", "Σκάκι", 0],
  ["Πόσο κάνει 6 x 6;", "36", "30", 0],
  ["Ποιο έχει κλειδιά;", "Πιάνο", "Πιάτο", 0],
  ["Ποιο είναι γαλακτοκομικό;", "Τυρί", "Ρύζι", 0],
  ["Ποιο είναι φυσικό φαινόμενο;", "Βροχή", "Τηλεόραση", 0],
  ["Πόσες εποχές έχει ένας χρόνος;", "4", "5", 0],
  ["Ποιο είναι πιο μικρό;", "Μυρμήγκι", "Ελέφαντας", 0],
  ["Ποια λέξη σημαίνει σπίτι στα αγγλικά;", "House", "Horse", 0],
  ["Ποιο είναι σχήμα;", "Κύκλος", "Μουσική", 0],
  ["Ποιο είναι πιο αλμυρό;", "Θάλασσα", "Πηγή", 0],
  ["Πόσο κάνει 18 / 3;", "6", "9", 0],
  ["Ποιο είναι δέντρο;", "Ελιά", "Πέτρα", 0],
  ["Ποιο έχει οθόνη;", "Tablet", "Κουτάλι", 0],
  ["Ποιο είναι άθλημα;", "Μπάσκετ", "Ζωγραφική", 0],
  ["Ποιο είναι πιο γρήγορο στο νερό;", "Βάρκα", "Καμήλα", 0],
  ["Ποιο είναι αντικείμενο γραφής;", "Μολύβι", "Πιάτο", 0],
  ["Πόσο κάνει 11 + 11;", "22", "21", 0],
  ["Ποιο είναι πιο σκοτεινό;", "Νύχτα", "Μεσημέρι", 0],
  ["Ποιο ζώο έχει προβοσκίδα;", "Ελέφαντας", "Λύκος", 0],
  ["Ποιο είναι πιο ξινό;", "Λεμόνι", "Σοκολάτα", 0],
  ["Πόσα χρώματα έχει συνήθως το ουράνιο τόξο;", "7", "5", 0],
  ["Ποιο είναι χώρα;", "Ιταλία", "Παρίσι", 0],
  ["Ποιο είναι πόλη;", "Λονδίνο", "Ευρώπη", 0],
  ["Ποιο είναι πιο κοντά στο μηδέν;", "1", "10", 0],
  ["Ποιο χρησιμοποιείς για να κόψεις χαρτί;", "Ψαλίδι", "Πιρούνι", 0],
  ["Ποιο είναι γλυκό;", "Παγωτό", "Πιπέρι", 0],
  ["Πόσο κάνει 8 x 2;", "16", "18", 0],
  ["Ποιο είναι πιο πιθανό να βρεις σε βιβλίο;", "Σελίδες", "Ρόδες", 0],
  ["Ποιο είναι ηλεκτρική συσκευή;", "Ψυγείο", "Μολύβι", 0],
  ["Ποιο ζώο κάνει μέλι;", "Μέλισσα", "Πεταλούδα", 0],
  ["Ποιο είναι πιο μεγάλο;", "Φάλαινα", "Ποντίκι", 0],
  ["Ποιο είναι υγρό;", "Νερό", "Άμμος", 0],
  ["Πόσο κάνει 20 / 4;", "5", "4", 0],
  ["Ποιο είναι πιο εύθραυστο;", "Γυαλί", "Σίδερο", 0],
  ["Ποιο είναι κοσμικό σώμα;", "Αστέρι", "Ποτάμι", 0],
  ["Ποιο είναι μέρος υπολογιστή;", "Πληκτρολόγιο", "Τηγάνι", 0],
  ["Ποιο είναι πιο αργό;", "Χελώνα", "Τρένο", 0],
  ["Πόσο κάνει 13 + 7;", "20", "19", 0],
  ["Ποιο είναι μέσο μεταφοράς;", "Λεωφορείο", "Καναπές", 0],
  ["Ποιο είναι πιο βαρύ συνήθως;", "Καρπούζι", "Σταφύλι", 0],
  ["Ποια λέξη σημαίνει νύχτα στα αγγλικά;", "Night", "Light", 0],
  ["Ποιο είναι πιο κατάλληλο για βροχή;", "Ομπρέλα", "Γυαλιά ηλίου", 0],
  ["Πόσο κάνει 5 x 5;", "25", "20", 0]
];

const state = {
  count: 8,
  selected: [],
  players: [],
  eliminated: [],
  log: [],
  round: 1,
  active: null,
  turnQueue: [],
  king: null,
  kingUsed: false,
  token: 0,
  ttt: Array(9).fill(0),
  tttTurn: 1,
  memory: [],
  memoryStep: 3,
  memoryInput: 0,
  quizIndex: 0,
  quizA: 0,
  quizB: 0,
  quizDeck: [],
  tttTieCount: 0
};

const qs = selector => document.querySelector(selector);
const sample = list => list[Math.floor(Math.random() * list.length)];
const shuffle = list => [...list].sort(() => Math.random() - 0.5);
const alive = () => state.players.filter(p => p.alive);
const candidatesExcept = p => alive().filter(x => x !== p);
const img = p => `./assets/${p.file}`;
let music = null;

function nextActivePlayer() {
  const living = alive();
  state.turnQueue = state.turnQueue.filter(p => p && p.alive);
  if (!state.turnQueue.length) state.turnQueue = shuffle(living);
  return state.turnQueue.shift() || sample(living);
}

function removeFromTurnQueue(player) {
  state.turnQueue = state.turnQueue.filter(p => p && p.alive && p !== player);
}

function forceActivePlayer(player) {
  state.active = player;
  removeFromTurnQueue(player);
}

function playMusic(src, { loop = false, volume = 0.8 } = {}) {
  try {
    if (music) {
      music.pause();
      music.currentTime = 0;
    }
    music = new Audio(src);
    music.loop = loop;
    music.volume = volume;
    music.play().catch(() => {});
  } catch (_) {}
}

function stopMusic() {
  if (!music) return;
  music.pause();
  music.currentTime = 0;
  music = null;
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(toEnglishSpeech(text));
  utter.lang = "en-US";
  utter.rate = 0.9;
  utter.pitch = 0.78;
  window.speechSynthesis.speak(utter);
}

function applyNamePronunciations(text) {
  return Object.entries(speechNames).reduce(
    (value, [name, spoken]) => value.replace(new RegExp(`\\b${name}\\b`, "g"), spoken),
    String(text || "")
  );
}

function toEnglishSpeech(text) {
  const value = String(text || "");
  if (/^[\x00-\x7F\s.,!?:;'’&()\-]+$/.test(value)) return applyNamePronunciations(value);
  const names = roster.map(p => p.name).join("|");
  const namePattern = new RegExp(`(${names})`);
  const foundName = value.match(namePattern)?.[1] || "";
  const spokenName = applyNamePronunciations(foundName || "Player");
  if (value.includes("κινδυνεύει")) return `${spokenName} selected for elimination.`;
  if (value.includes("έφυγε")) return `${spokenName} eliminated.`;
  if (value.includes("φορτώνει")) return "Spirits Box is loading.";
  if (value.includes("Καλώς")) return "Welcome to Spirits Box.";
  if (value.includes("Ενεργός παίκτης")) return `Active player, ${spokenName}.`;
  if (value.includes("Ο τροχός διάλεξε")) return `The wheel selected ${spokenName}.`;
  if (value.includes("Βγήκε")) return applyNamePronunciations(value.replace("Βγήκε", "Result").replace("χάνει", "loses"));
  if (value.includes("κέρδισε") || value.includes("κερδίζει")) return applyNamePronunciations(value.replace("κέρδισε", "won").replace("κερδίζει", "wins"));
  if (value.includes("χάνει")) return applyNamePronunciations(value.replace("χάνει", "loses"));
  if (value.includes("δένει") || value.includes("δέθηκαν")) return applyNamePronunciations(value.replace("και", "and").replace("δέθηκαν για τέσσερις γύρους", "are bound for four rounds"));
  if (value.includes("Καυτή Πατάτα")) return "Hot Potato.";
  if (value.includes("Πάτα το Κουμπί")) return "Press the Button.";
  if (value.includes("Τροχός")) return "The wheel is spinning.";
  if (value.includes("ΨΗΦΟΦΟΡΙΑ")) return "Voting card.";
  if (value.includes("ΜΟΝΟΜΑΧΙΑ")) return "Duel card.";
  if (value.includes("ΧΑΟΣ")) return "Chaos card.";
  if (value.includes("ΒΟΜΒΑ")) return "Bomb card.";
  return applyNamePronunciations(value
    .replaceAll("Πέτρα", "Rock")
    .replaceAll("Ψαλίδι", "Scissors")
    .replaceAll("Χαρτί", "Paper")
    .replaceAll("Τρίλιζα", "Tic tac toe")
    .replaceAll("Κορώνα Γράμματα", "Coin flip")
    .replaceAll("Μνήμη", "Memory")
    .replaceAll("Ερωτήσεις", "Questions")
    .replaceAll("Ρουλέτα", "Roulette")
    .replaceAll("Καυτή Πατάτα", "Hot Potato")
    .replaceAll("Σώσε Έναν", "Save One")
    .replaceAll("Δεμένη Μοίρα", "Bound Fate")
    .replaceAll("Βασιλιάς", "King")
    .replaceAll("Ασφαλής", "Safe")
    .replaceAll("Διπλή", "Double")
    .replaceAll("Υποψήφιος", "Nominee")
    .replaceAll("Γύρος", "Round")
    .replaceAll("Τελικός", "Finale")
    .replaceAll("Ψηφοφορία", "Voting")
    .replaceAll("Μονομαχία", "Duel")
    .replaceAll("Αποχώρηση", "Elimination")
    .replaceAll("Νικητής", "Winner"));
}

function render(kicker, title, body) {
  state.token++;
  app.innerHTML = `
    <section class="screen">
      <div class="horror"><div class="box-mark"></div></div>
      <div class="brand">SPIRITS BOX</div>
      <div class="kicker">${kicker}</div>
      <h1>${title}</h1>
      <div id="content"></div>
    </section>
  `;
  const content = qs("#content");
  if (body) content.append(body);
  return content;
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function button(text, kind, onClick) {
  const b = el("button", `btn ${kind || ""}`, text);
  b.addEventListener("click", onClick);
  return b;
}

function actions(...buttons) {
  const wrap = el("div", "actions");
  buttons.filter(Boolean).forEach(b => wrap.append(b));
  return wrap;
}

function paragraph(text) {
  return el("p", "lead", text);
}

function label(p) {
  if (!p.alive) return "ΕΞΩ";
  if (state.king === p && !state.kingUsed) return "Βασιλιάς";
  if (p.ally && p.ally.alive) return `Δεμένος με ${p.ally.name} έως γύρο ${p.allyUntilRound}`;
  return "Ζωντανός";
}

function playerCard(p, caption, onClick, selected = false) {
  const card = el("button", `player-card ${selected ? "selected" : ""} ${!p.alive ? "dead" : ""}`);
  card.innerHTML = `<img class="avatar" src="${img(p)}" alt="${p.name}"><strong>${p.name}</strong><span class="label">${caption || label(p)}</span>`;
  if (onClick) card.addEventListener("click", () => onClick(p));
  return card;
}

function hero(p) {
  const h = el("div", "hero");
  h.innerHTML = `<img class="avatar" src="${img(p)}" alt="${p.name}"><h2>${p.name}</h2><div class="label">${label(p)}</div>`;
  return h;
}

function grid(players, caption, action, selectedFn) {
  const g = el("div", "grid roster");
  players.forEach(p => g.append(playerCard(p, typeof caption === "function" ? caption(p) : caption, action, selectedFn && selectedFn(p))));
  return g;
}

function statusBar() {
  const s = el("div", "stats");
  [["Ζωντανοί", alive().length], ["Γύρος", state.round], ["Έξω", state.eliminated.length]].forEach(([k, v]) => {
    s.insertAdjacentHTML("beforeend", `<div class="stat">${k}<span>${v}</span></div>`);
  });
  return s;
}

function addLog(content, limit = 6) {
  if (!state.log.length) return;
  const box = el("div", "log");
  box.innerHTML = "<strong>Ιστορικό</strong>";
  state.log.slice(-limit).reverse().forEach(x => box.append(paragraph(x)));
  content.append(box);
}

function showLoading() {
  const content = render("ΦΟΡΤΩΣΗ", "Spirits Box");
  content.append(paragraph("Το σκοτεινό τραπέζι ανοίγει..."));
  speak("Spirits Box is loading.");
  setTimeout(showHome, 900);
}

function showHome() {
  stopMusic();
  const content = render("ΠΑΙΧΝΙΔΙ ΑΠΟΧΩΡΗΣΗΣ", "Spirits Box");
  [
    ["Η εφαρμογή είναι παρουσιαστής", "Τραβάει κάρτες, τρέχει mini games, ψηφοφορίες, τροχούς, βόμβες και τελικό."],
    ["PWA για iPad", "Άνοιξέ το στο Safari και κάνε Add to Home Screen για εγκατάσταση."],
    ["Όλα μέσα στην εφαρμογή", "Τρίλιζα, Πέτρα Ψαλίδι Χαρτί, Memory, Quiz, ζάρι, ρουλέτα και βόμβες."]
  ].forEach(([a, b]) => content.append(el("div", "feature", `<strong>${a}</strong>${b}`)));
  content.append(actions(button("Νέο παιχνίδι", "", showSetup)));
}

function showSetup() {
  stopMusic();
  const content = render("ΡΥΘΜΙΣΗ", "Παίκτες");
  content.append(paragraph("Διάλεξε 6 έως 26 παίκτες."));
  const row = el("div", "count-row");
  const countNode = el("div", "count", state.count);
  const nextButton = button("Επιλογή χαρακτήρων", "", () => { state.selected = []; showPlayerSelection(); });
  const syncCount = () => {
    state.count = Math.max(6, Math.min(26, state.count));
    countNode.textContent = state.count;
    nextButton.textContent = `Επιλογή ${state.count} χαρακτήρων`;
  };
  row.append(
    button("-", "secondary small", () => { state.count--; syncCount(); }),
    countNode,
    button("+", "secondary small", () => { state.count++; syncCount(); })
  );
  syncCount();
  content.append(row, actions(nextButton));
}

function showPlayerSelection() {
  const content = render("ΠΑΡΕΑ", `Διάλεξε ${state.count}`);
  const counter = el("div", "panel selection-counter", `${state.selected.length} / ${state.count} επιλεγμένοι`);
  content.append(counter);
  const selectionGrid = el("div", "grid roster selection-roster");
  roster.forEach(p => selectionGrid.append(selectionCard(p, counter)));
  content.append(selectionGrid);
  content.append(actions(
    button(`Τυχαίοι ${state.count}`, "secondary", () => { state.selected = shuffle(roster).slice(0, state.count); updateSelectionUI(counter); }),
    button("Κάθισε στο τραπέζι", "", () => {
      if (state.selected.length !== state.count) return alert(`Διάλεξε ακριβώς ${state.count} παίκτες.`);
      startGame();
    })
  ));
}

function selectionCard(p, counter) {
  const card = playerCard(p, state.selected.includes(p) ? "Παίζει" : "Πάτα για επιλογή", () => {
    if (state.selected.includes(p)) state.selected = state.selected.filter(x => x !== p);
    else if (state.selected.length < state.count) state.selected.push(p);
    else return alert(`Έχεις ήδη διαλέξει ${state.count} παίκτες.`);
    updateSelectionUI(counter);
  }, state.selected.includes(p));
  card.dataset.playerId = p.id;
  card.setAttribute("aria-pressed", String(state.selected.includes(p)));
  return card;
}

function updateSelectionUI(counter) {
  counter.textContent = `${state.selected.length} / ${state.count} επιλεγμένοι`;
  document.querySelectorAll(".player-card[data-player-id]").forEach(card => {
    const player = roster.find(p => p.id === card.dataset.playerId);
    const selected = state.selected.includes(player);
    card.classList.toggle("selected", selected);
    card.setAttribute("aria-pressed", String(selected));
    const labelNode = card.querySelector(".label");
    if (labelNode) labelNode.textContent = selected ? "Παίζει" : "Πάτα για επιλογή";
  });
}

function startGame() {
  state.players = shuffle(state.selected).map(p => ({ ...p, alive: true, ally: null, allyUntilRound: 0 }));
  state.eliminated = [];
  state.log = ["Το τραπέζι άνοιξε. Όλοι ξεκινούν ζωντανοί."];
  state.round = 1;
  state.active = null;
  state.turnQueue = [];
  state.king = null;
  state.kingUsed = false;
  showTable();
}

function showTable() {
  const content = render("ΤΡΑΠΕΖΙ", `Ζωντανοί: ${alive().length}`);
  content.append(statusBar(), grid(state.players, label, null, p => p === state.active));
  content.append(actions(button("Γύρνα τροχό παίκτη", "", () => {
    state.active = nextActivePlayer();
    state.log.push(`Ο τροχός διάλεξε ${state.active.name}.`);
    speak(`The wheel selected ${state.active.name}.`);
    showGameMaster();
  })));
  addLog(content, 8);
}

function showGameMaster() {
  if (checkEnd()) return;
  resolveAllianceTimers();
  if (!state.active || !state.active.alive) state.active = nextActivePlayer();
  const content = render("GAME MASTER", state.active.name);
  speak(`Active player, ${state.active.name}.`);
  content.append(statusBar(), hero(state.active));
  if (alive().length === 2) {
    content.append(actions(button("Τελικός Best of 2", "", showFinale)));
    return;
  }
  content.append(actions(button(state.round % 5 === 0 ? "Τράβα κάρτα ΧΑΟΣ" : "Τράβα τυχαία κάρτα", "", () => showCard(randomCard()))));
  addLog(content, 6);
}

function nextRound(pickRandom = true) {
  if (checkEnd()) return;
  state.round++;
  resolveAllianceTimers();
  if (state.round % 5 === 0) state.log.push("Έρχεται ΓΥΡΟΣ ΧΑΟΥΣ.");
  if (pickRandom) state.active = nextActivePlayer();
  showGameMaster();
}

function randomCard(forced) {
  let type = forced;
  if (!type) {
    if (state.round % 5 === 0) type = "Χάος";
    else {
      const pool = alive().length <= 5
        ? ["Μονομαχία", "Ψηφοφορία", "Καυτή Πατάτα", "Πάτα το Κουμπί", "Θυσία", "Χάος", "Mini Game"]
        : ["Μονομαχία", "Ψηφοφορία", "Ψηφοφορία", "Δώρο", "Τροχός Τύχης", "Καυτή Πατάτα", "Πάτα το Κουμπί", "Σαμποτάζ", "Συμμαχία", "Θυσία", "Βασιλιάς", "Mini Game"];
      type = sample(pool);
    }
  }
  if (type === "Μονομαχία" || type === "Mini Game") return duelCard();
  if (type === "Ψηφοφορία") return voteCard();
  if (type === "Δώρο") return card("ΔΩΡΟ", "Πάσα Πρόκλησης", "Δώσε την επόμενη κάρτα σε άλλον ζωντανό παίκτη.", () => chooseTarget("Δώσε την πρόκληση", candidatesExcept(state.active), p => { forceActivePlayer(p); showCard(randomCard()); }));
  if (type === "Τροχός Τύχης") return card("ΤΥΧΗ", "Τροχός Τύχης", "Ο τροχός διαλέγει το αποτέλεσμα.", luckWheel);
  if (type === "Καυτή Πατάτα") return card("ΒΟΜΒΑ", "🥔 Καυτή Πατάτα", "Πέτα την πατάτα πριν τελειώσει ο χρόνος. Η έκρηξη είναι κρυφή.", () => startHotPotato(state.active));
  if (type === "Πάτα το Κουμπί") return card("ΡΙΣΚΟ", "💣 Πάτα το Κουμπί", "Σειρά παικτών, minimum 6 πατήματα, μετά αναγκαστικά στον επόμενο.", startClickBomb);
  if (type === "Σαμποτάζ") return card("ΣΑΜΠΟΤΑΖ", "Αναγκαστικός Επόμενος", "Διάλεξε ποιος θα πάρει την επόμενη κάρτα.", () => chooseTarget("Στόχος", candidatesExcept(state.active), p => { forceActivePlayer(p); nextRound(false); }));
  if (type === "Συμμαχία") return card("ΣΥΜΜΑΧΙΑ", "Chained Together", "Το παιχνίδι σε δένει τυχαία με κάποιον για 4 γύρους. Αν φύγει ένας, φεύγουν και οι δύο.", bindRandomAlliance);
  if (type === "Θυσία") return card("ΘΥΣΙΑ", "Επιλογή Θυσίας", "Φεύγεις εσύ ή βγάζεις δύο άλλους.", sacrifice);
  if (type === "Βασιλιάς") return card("ΔΥΝΑΜΗ", "Βασιλιάς", "Μπορείς να ακυρώσεις μία αποχώρηση.", () => { state.king = state.active; state.kingUsed = false; state.log.push(`${state.active.name} έγινε Βασιλιάς.`); nextRound(true); });
  return chaosCard();
}

function card(type, title, body, action) {
  return { type, title, body, action };
}

function duelCard() {
  const game = sample(["Πέτρα Ψαλίδι Χαρτί", "Τρίλιζα", "Κορώνα Γράμματα", "Μνήμη", "6 Ερωτήσεις"]);
  return card("ΜΟΝΟΜΑΧΙΑ", game, "Διάλεξε αντίπαλο. Το mini game παίζεται μέσα στην εφαρμογή.", () => chooseTarget("Αντίπαλος", candidatesExcept(state.active), p => startMini(game, state.active, p)));
}

function voteCard() {
  const r = Math.floor(Math.random() * 3);
  if (r === 0) return card("ΨΗΦΟΦΟΡΙΑ", "Υποψήφιος Εναντίον Σου", "Διάλεξε έναν παίκτη να είναι υποψήφιος απέναντί σου. Οι υποψήφιοι δεν ψηφίζουν.", () => chooseTarget("Υποψήφιος εναντίον σου", candidatesExcept(state.active), p => vote([state.active, p], 1, true)));
  if (r === 1) return card("ΨΗΦΟΦΟΡΙΑ", "Δύο Υποψήφιοι", "Διάλεξε δύο παίκτες. Οι υποψήφιοι δεν ψηφίζουν.", () => chooseTarget("Πρώτος υποψήφιος", alive(), a => chooseTarget("Δεύτερος υποψήφιος", alive().filter(p => p !== a), b => vote([a, b], 1, true))));
  return card("ΨΗΦΟΦΟΡΙΑ", "Σώσε Έναν", "Ξεκινάς σώζοντας έναν άλλον παίκτη. Μετά ο σωσμένος σώζει άλλον, μέχρι να μείνουν 2 που δεν σώθηκαν.", startSaveChain);
}

function chaosCard() {
  const event = sample(["Διπλή αποχώρηση", "Ψηφίζουν όλοι", "Τυχαία μονομαχία", "Ρουλέτα", "Καυτή Πατάτα", "Πάτα το Κουμπί"]);
  return card("ΧΑΟΣ", event, "Όλοι κινδυνεύουν.", () => {
    if (event === "Διπλή αποχώρηση") chooseTwoOut("Διπλή αποχώρηση");
    else if (event === "Ψηφίζουν όλοι") vote(alive(), 1, false);
    else if (event === "Τυχαία μονομαχία") { const a = sample(alive()); startMini("Τυχαία μονομαχία", a, sample(candidatesExcept(a))); }
    else if (event === "Ρουλέτα") rouletteElimination();
    else if (event === "Καυτή Πατάτα") startHotPotato(sample(alive()));
    else startClickBomb();
  });
}

function englishCardSpeech(c) {
  const text = `${c.type} ${c.title}`;
  const typeMap = [
    ["ΜΟΝΟΜΑΧΙΑ", "Duel"],
    ["ΨΗΦΟΦΟΡΙΑ", "Voting"],
    ["ΔΩΡΟ", "Gift"],
    ["ΤΥΧΗ", "Luck"],
    ["ΒΟΜΒΑ", "Hot Potato"],
    ["ΡΙΣΚΟ", "Press the Button"],
    ["ΣΑΜΠΟΤΑΖ", "Sabotage"],
    ["ΣΥΜΜΑΧΙΑ", "Bound Fate"],
    ["ΘΥΣΙΑ", "Sacrifice"],
    ["ΔΥΝΑΜΗ", "Power"],
    ["ΧΑΟΣ", "Chaos"]
  ];
  const titleMap = [
    ["Πέτρα Ψαλίδι Χαρτί", "Rock Paper Scissors"],
    ["Τρίλιζα", "Tic Tac Toe"],
    ["Κορώνα Γράμματα", "Coin Flip"],
    ["Μνήμη", "Memory"],
    ["Ερωτήσεις", "Questions"],
    ["Υποψήφιος Εναντίον Σου", "Nominate someone against you"],
    ["Δύο Υποψήφιοι", "Two nominees"],
    ["Σώσε Έναν", "Save one"],
    ["Πάσα Πρόκλησης", "Pass the challenge"],
    ["Τροχός Τύχης", "Wheel of luck"],
    ["Καυτή Πατάτα", "Hot Potato"],
    ["Πάτα το Κουμπί", "Press the Button"],
    ["Αναγκαστικός Επόμενος", "Forced next player"],
    ["Δεμένη Μοίρα", "Bound fate"],
    ["Επιλογή Θυσίας", "Sacrifice choice"],
    ["Βασιλιάς", "King"],
    ["Διπλή αποχώρηση", "Double elimination"],
    ["Ψηφίζουν όλοι", "Everybody votes"],
    ["Τυχαία μονομαχία", "Random duel"],
    ["Ρουλέτα", "Roulette"]
  ];
  const type = typeMap.find(([key]) => text.includes(key))?.[1] || "Card";
  const title = titleMap.find(([key]) => text.includes(key))?.[1] || c.title.replace(/[^\x00-\x7F]+/g, "").trim();
  return title ? `${type}. ${title}.` : `${type}.`;
}

function showCard(c) {
  const content = render(c.type, c.title);
  speak(englishCardSpeech(c));
  content.append(statusBar(), hero(state.active), el("div", "card-panel", `<div class="type">${c.type}</div><h2>${c.title}</h2><p>${c.body}</p>`));
  content.append(actions(button("Ξεκίνα", "", c.action), button("Άλλη κάρτα", "secondary", () => showCard(randomCard())), button("Καμία αποχώρηση", "ghost", () => nextRound(true))));
}

function chooseTarget(title, options, action) {
  const content = render("ΔΙΑΛΕΞΕ", title);
  content.append(grid(options, "Διάλεξε", action));
}

function vote(options, outCount = 1, excludeOptions = true) {
  const votes = new Map();
  const voters = excludeOptions ? alive().filter(p => !options.includes(p)) : alive();
  voteStep(options, votes, outCount, voters, 0, excludeOptions);
}

function voteStep(options, votes, outCount, voters, index, excludeOptions) {
  const content = render("ΨΗΦΟΦΟΡΙΑ", `Ψήφος ${Math.min(index + 1, voters.length)} / ${voters.length}`);
  content.append(scoreboard(options, votes));
  if (index >= voters.length) {
    content.append(paragraph(excludeOptions ? "Η ψηφοφορία κλείδωσε. Οι υποψήφιοι δεν ψήφισαν." : "Η ψηφοφορία κλείδωσε. Όλοι ψήφισαν μία φορά."));
    content.append(actions(button("Λύσε ψηφοφορία", "", () => resolveVote(options, votes, outCount))));
    return;
  }
  const voter = voters[index];
  content.append(hero(voter), paragraph(`Δώσε το κινητό στον/στην ${voter.name}.`));
  const choices = excludeOptions ? options : options.filter(p => p !== voter);
  content.append(grid(choices, "Ψήφος", p => {
    confirmVote(options, votes, outCount, voters, index, excludeOptions, voter, p);
  }));
}

function confirmVote(options, votes, outCount, voters, index, excludeOptions, voter, target) {
  const content = render("ΕΠΙΒΕΒΑΙΩΣΗ ΨΗΦΟΥ", `${voter.name} → ${target.name}`);
  content.append(paragraph("Επιβεβαίωσε την ψήφο για να αποφύγουμε λάθος πάτημα."));
  content.append(hero(voter), hero(target));
  content.append(actions(
    button(`Ναι, ψήφος στον/στην ${target.name}`, "", () => {
      votes.set(target, (votes.get(target) || 0) + 1);
      voteStep(options, votes, outCount, voters, index + 1, excludeOptions);
    }),
    button("Άλλαξε επιλογή", "secondary", () => voteStep(options, votes, outCount, voters, index, excludeOptions))
  ));
}

function startSaveChain() {
  saveChain(state.active, []);
}

function saveChain(picker, saved) {
  const unsaved = alive().filter(p => !saved.includes(p));
  if (unsaved.length <= 2) {
    const content = render("ΣΩΣΕ ΕΝΑΝ", "Τελική ψηφοφορία");
    content.append(paragraph("Αυτοί οι δύο δεν σώθηκαν. Οι υπόλοιποι ψηφίζουν ποιος φεύγει."));
    content.append(grid(unsaved, "Υποψήφιος", null));
    content.append(actions(button("Ξεκίνα ψηφοφορία", "", () => vote(unsaved, 1, true))));
    return;
  }

  const choices = unsaved.filter(p => p !== picker);
  const content = render("ΣΩΣΕ ΕΝΑΝ", `${picker.name} σώζει`);
  content.append(hero(picker));
  content.append(paragraph(`${picker.name}, διάλεξε έναν παίκτη να σώσεις. Δεν μπορείς να σώσεις τον εαυτό σου.`));
  if (saved.length) {
    const savedPanel = el("div", "scoreboard save-chain");
    savedPanel.append(el("div", "type", "ΣΩΘΗΚΑΝ"));
    saved.forEach((p, index) => savedPanel.append(el("div", "score-row", `<span>${index + 1}. ${p.name}</span><span>Safe</span>`)));
    content.append(savedPanel);
  }
  content.append(grid(choices, "Σώσε", target => {
    saved.push(target);
    state.log.push(`${picker.name} έσωσε ${target.name}.`);
    saveChain(target, saved);
  }));
}

function scoreboard(options, votes) {
  const box = el("div", "scoreboard");
  options.forEach(p => box.append(el("div", "score-row", `<span>${p.name}</span><span>${votes.get(p) || 0} ψήφοι</span>`)));
  return box;
}

function resolveVote(options, votes, outCount) {
  const sorted = [...options].sort((a, b) => (votes.get(b) || 0) - (votes.get(a) || 0));
  if (outCount > 1) return confirmDoubleOut(sorted[0], sorted[1], "Διπλή ψηφοφορία");
  const high = votes.get(sorted[0]) || 0;
  const tied = sorted.filter(p => (votes.get(p) || 0) === high);
  if (tied.length > 1) return resolveVoteTie(tied);
  confirmOut(sorted[0], "Ψηφοφορία");
}

function resolveVoteTie(tied) {
  if (state.king && state.king.alive && !state.kingUsed) {
    const content = render("ΙΣΟΨΗΦΙΑ", "Αποφασίζει ο Βασιλιάς");
    content.append(hero(state.king), grid(tied, "Φεύγει", p => { state.kingUsed = true; confirmOut(p, "Ισοψηφία - απόφαση Βασιλιά"); }));
    return;
  }
  const content = render("ΙΣΟΨΗΦΙΑ", "Πέτρα Ψαλίδι Χαρτί");
  content.append(paragraph(`${tied.length} ισόψηφοι παίζουν όλοι κρυφά. Ο χαμένος φεύγει.`));
  content.append(actions(button(`Παίζουν ${tied.length} παίκτες`, "", () => multiRpsTie(tied, 0, new Map()))));
}

function multiRpsTie(players, index, picks) {
  if (players.length === 1) return confirmOut(players[0], "Ισοψηφία - Πέτρα Ψαλίδι Χαρτί");
  if (index >= players.length) return resolveMultiRpsTie(players, picks);
  const picker = players[index];
  const content = render("ΙΣΟΨΗΦΙΑ RPS", picker.name);
  content.append(paragraph(`Δώσε το κινητό στον/στην ${picker.name}. Διάλεξε κρυφά.`));
  content.append(rpsChoices(move => {
    picks.set(picker, move);
    multiRpsTie(players, index + 1, picks);
  }));
}

function resolveMultiRpsTie(players, picks) {
  const content = render("ΑΠΟΤΕΛΕΣΜΑ RPS", "Ισοψηφία");
  players.forEach(p => content.append(paragraph(`${p.name}: ${picks.get(p)}`)));
  const moves = [...new Set(players.map(p => picks.get(p)))];
  if (moves.length !== 2) {
    content.append(paragraph("Δεν βγήκε καθαρός χαμένος. Ξανά όλοι."));
    content.append(actions(button("Ξανά", "", () => multiRpsTie(players, 0, new Map()))));
    return;
  }
  const losingMove = losingRpsMove(moves[0], moves[1]);
  const losers = players.filter(p => picks.get(p) === losingMove);
  if (losers.length === 1) {
    content.append(actions(button(`${losers[0].name} φεύγει`, "", () => confirmOut(losers[0], "Ισοψηφία - Πέτρα Ψαλίδι Χαρτί"))));
    return;
  }
  content.append(paragraph("Οι χαμένοι παίζουν ξανά μεταξύ τους μέχρι να μείνει ένας."));
  content.append(actions(button("Συνέχεια", "", () => multiRpsTie(losers, 0, new Map()))));
}

function losingRpsMove(a, b) {
  const aWins = (a === "Πέτρα" && b === "Ψαλίδι") || (a === "Ψαλίδι" && b === "Χαρτί") || (a === "Χαρτί" && b === "Πέτρα");
  return aWins ? b : a;
}

function confirmOut(victim, reason) {
  if (!victim || !victim.alive) return nextRound(true);
  if (victim.ally && victim.ally.alive && alive().length > 3) return confirmDoubleOut(victim, victim.ally, `${reason} - Δεμένη Μοίρα`);
  const content = render("ΑΠΟΧΩΡΗΣΗ", victim.name);
  content.append(hero(victim), paragraph(reason));
  if (state.king && state.king.alive && !state.kingUsed) {
    content.append(actions(button(`Ο Βασιλιάς ${state.king.name} ακυρώνει`, "secondary", () => { state.kingUsed = true; state.log.push(`Ο Βασιλιάς ακύρωσε την αποχώρηση του/της ${victim.name}.`); nextRound(true); })));
  }
  content.append(actions(button(`Βγάλε ${victim.name}`, "", () => { eliminateNow(victim, reason); nextRound(true); })));
}

function chooseTwoOut(reason) {
  chooseTarget("Πρώτο θύμα", alive(), a => chooseTarget("Δεύτερο θύμα", alive().filter(p => p !== a), b => confirmDoubleOut(a, b, reason)));
}

function confirmDoubleOut(a, b, reason) {
  const content = render("ΔΙΠΛΗ ΑΠΟΧΩΡΗΣΗ", `${a.name} & ${b.name}`);
  content.append(hero(a), hero(b), paragraph(reason));
  if (state.king && state.king.alive && !state.kingUsed) {
    content.append(actions(button(`Ο Βασιλιάς ${state.king.name} ακυρώνει`, "secondary", () => { state.kingUsed = true; nextRound(true); })));
  }
  content.append(actions(button("Βγάλε και τους δύο", "", () => { eliminateNow(a, reason); eliminateNow(b, reason); nextRound(true); })));
}

function eliminateNow(victim, reason) {
  if (!victim || !victim.alive) return;
  victim.alive = false;
  removeFromTurnQueue(victim);
  state.eliminated.push(victim);
  state.log.push(`${victim.name} έφυγε. Αιτία: ${reason}.`);
  speak(`${victim.name} eliminated.`);
  if (victim.ally && victim.ally.alive) {
    const ally = victim.ally;
    ally.alive = false;
    removeFromTurnQueue(ally);
    state.eliminated.push(ally);
    state.log.push(`${ally.name} έφυγε επίσης λόγω Δεμένης Μοίρας.`);
    speak(`${ally.name} eliminated.`);
    breakAlliance(victim, "");
  }
  if (state.king === victim) { state.king = null; state.kingUsed = false; }
}

function checkEnd() {
  if (alive().length <= 1) { showWinner(); return true; }
  return false;
}

function bindRandomAlliance() {
  if (alive().length <= 3) {
    const content = render("ΔΕΜΕΝΗ ΜΟΙΡΑ", "Δεν ενεργοποιείται");
    content.append(paragraph("Στην τελική τριάδα οι αλυσίδες σπάνε αυτόματα."));
    content.append(actions(button("Συνέχεια", "", () => nextRound(true))));
    return;
  }
  const partner = sample(candidatesExcept(state.active));
  state.active.ally = partner;
  partner.ally = state.active;
  state.active.allyUntilRound = state.round + 4;
  partner.allyUntilRound = state.round + 4;
  const content = render("ΔΕΜΕΝΗ ΜΟΙΡΑ", `${state.active.name} & ${partner.name}`);
  content.append(hero(state.active), hero(partner), paragraph("Αν ένας αποχωρήσει πριν περάσουν 4 γύροι, αποχωρεί και ο άλλος."));
  content.append(actions(button("Συνέχεια", "", () => nextRound(true))));
}

function resolveAllianceTimers() {
  if (alive().length <= 3) {
    state.players.forEach(p => p.ally && breakAlliance(p, "Η τελική τριάδα έσπασε τη Δεμένη Μοίρα."));
    return;
  }
  state.players.forEach(p => {
    if (p.ally && p.alive && p.ally.alive && p.allyUntilRound && state.round > p.allyUntilRound) {
      breakAlliance(p, `${p.name} και ${p.ally.name} επιβίωσαν 4 γύρους. Η αλυσίδα έσπασε.`);
    }
  });
}

function breakAlliance(p, message) {
  const ally = p.ally;
  if (!ally) return;
  p.ally = null;
  p.allyUntilRound = 0;
  ally.ally = null;
  ally.allyUntilRound = 0;
  if (message) state.log.push(message);
}

function wheelScreen(title, labels, pickedIndex, done) {
  const content = render("ΤΡΟΧΟΣ", title);
  const items = labels.map(item => typeof item === "string" ? { label: item } : item);
  const card = el("div", "slot-card");
  const windowNode = el("div", "slot-window");
  const reel = el("div", "slot-reel");
  const repeated = [];
  for (let i = 0; i < 14; i++) repeated.push(...items);
  repeated.forEach(item => reel.append(slotItem(item)));
  windowNode.append(reel, el("div", "slot-selector", "ΕΠΙΛΟΓΗ"));
  const result = el("div", "slot-result", "Έτοιμο");
  card.append(windowNode, result);
  content.append(card);
  content.append(actions(button("Γύρνα", "", e => {
    e.currentTarget.disabled = true;
    playMusic("./audio/spin.mp3", { volume: 0.88 });
    result.textContent = "Γυρίζει...";
    result.classList.remove("winner-flash");
    reel.style.transition = "none";
    reel.style.transform = "translateY(0px)";
    reel.offsetHeight;
    const itemHeight = 74;
    const loops = 9 + Math.floor(Math.random() * 3);
    const finalIndex = loops * items.length + pickedIndex;
    reel.style.transition = "transform 4.2s cubic-bezier(.08,.82,.12,1)";
    reel.style.transform = `translateY(${-finalIndex * itemHeight}px)`;
    setTimeout(() => {
      stopMusic();
      result.textContent = `Αποτέλεσμα: ${items[pickedIndex].label}`;
      result.classList.add("winner-flash");
      reel.querySelectorAll(".slot-item").forEach(item => item.classList.toggle("active", item.dataset.label === items[pickedIndex].label));
      content.append(actions(button("Συνέχεια", "secondary", done)));
    }, 4300);
  })));
}

function slotItem(item) {
  const node = el("div", "slot-item");
  node.dataset.label = item.label;
  node.innerHTML = `
    ${item.img ? `<img class="avatar" src="${item.img}" alt="${item.label}">` : `<span class="slot-icon">?</span>`}
    <strong>${item.label}</strong>
  `;
  return node;
}

function luckWheel() {
  const outcomes = ["Ασφαλής", "Μονομαχία", "Ψηφοφορία", "Διπλή Ψηφοφορία", "Αποχώρηση"];
  const idx = Math.floor(Math.random() * outcomes.length);
  wheelScreen("Τροχός Τύχης", outcomes, idx, () => {
    const outcome = outcomes[idx];
    if (outcome === "Ασφαλής") nextRound(true);
    else if (outcome === "Μονομαχία") chooseTarget("Αντίπαλος", candidatesExcept(state.active), p => startMini("Μονομαχία", state.active, p));
    else if (outcome === "Ψηφοφορία") vote(alive(), 1, false);
    else if (outcome === "Διπλή Ψηφοφορία") vote(alive(), 2, false);
    else confirmOut(state.active, "Τροχός Τύχης");
  });
}

function rouletteElimination() {
  const list = alive();
  const idx = Math.floor(Math.random() * list.length);
  wheelScreen("Ρουλέτα Παικτών", list.map(p => ({ label: p.name, img: img(p) })), idx, () => confirmOut(list[idx], "Ρουλέτα"));
}

function startHotPotato(starter) {
  showHotPotato(starter, 0, 3 + Math.floor(Math.random() * 10));
}

function showHotPotato(holder, passes, boomAt) {
  state.active = holder;
  const content = render("ΚΑΥΤΗ ΠΑΤΑΤΑ", holder.name);
  const token = state.token;
  content.append(hero(holder), el("div", "bomb-panel", `<div class="bomb-icon">🥔</div><div class="timer" id="timer">30</div><p>Πέτα την καυτή πατάτα πριν τελειώσει ο χρόνος. Η έκρηξη είναι κρυφή.</p>`));
  timer(holder, token, 30);
  content.append(grid(alive().filter(p => p !== holder), "Πέτα εδώ", target => {
    const next = passes + 1;
    if (next >= boomAt) confirmOut(target, "Η Καυτή Πατάτα έσκασε");
    else showHotPotato(target, next, boomAt);
  }));
}

function timer(holder, token, seconds) {
  const t = qs("#timer");
  if (!t || token !== state.token || !holder.alive) return;
  t.textContent = seconds;
  if (seconds <= 0) return confirmOut(holder, "Η Καυτή Πατάτα έσκασε επειδή τελείωσε ο χρόνος");
  setTimeout(() => timer(holder, token, seconds - 1), 1000);
}

function startClickBomb() {
  const order = alive();
  if (state.active && order.includes(state.active)) {
    order.splice(order.indexOf(state.active), 1);
    order.unshift(state.active);
  }
  showClickBomb(order, 0, 0, 22 + Math.floor(Math.random() * 48));
}

function showClickBomb(order, index, total, boomAt) {
  const holder = order[index];
  const next = order[(index + 1) % order.length];
  state.active = holder;
  const content = render("ΠΑΤΑ ΤΟ ΚΟΥΜΠΙ", holder.name);
  let turn = 0;
  content.append(hero(holder), el("div", "bomb-panel", `<div class="bomb-icon">💣</div><div id="total" class="timer">${total}</div><p id="turn">Πατήματα γύρου: 0 / 6</p><p>Επόμενος: ${next.name}</p>`));
  const pass = button(`➡ Πέρασε στον ${next.name}`, "secondary", () => showClickBomb(order, (index + 1) % order.length, total, boomAt));
  pass.disabled = true;
  content.append(actions(button("💣 ΠΑΤΑ ΤΟ ΚΟΥΜΠΙ", "danger", () => {
    total++;
    turn++;
    qs("#total").textContent = total;
    qs("#turn").textContent = `Πατήματα γύρου: ${turn} / 6`;
    if (total >= boomAt) return confirmOut(holder, `Το κουμπί έσκασε στα ${total} συνολικά πατήματα`);
    if (turn >= 6) pass.disabled = false;
  }), pass));
}

function sacrifice() {
  const content = render("ΘΥΣΙΑ", state.active.name);
  content.append(hero(state.active), actions(button("Φεύγω εγώ", "", () => confirmOut(state.active, "Θυσία")), button("Φεύγουν δύο άλλοι", "secondary", () => chooseTwoOut(`Θυσία από ${state.active.name}`))));
}

function startMini(game, a, b) {
  if (game.includes("Τρίλιζα")) startTicTacToe(a, b, 1);
  else if (game.includes("Μνήμη")) startMemory(a, b);
  else if (game.includes("Ερωτήσεις")) startQuiz(a, b);
  else if (game.includes("Κορώνα")) coinFlip(a, b);
  else rpsPick(a, b, a, "");
}

function rpsPick(a, b, picker, first, tieCount = 0) {
  const content = render("ΠΕΤΡΑ ΨΑΛΙΔΙ ΧΑΡΤΙ", picker.name);
  if (tieCount) content.append(paragraph(`Ισοπαλίες: ${tieCount} / 6. Στις 6 πάμε σε κορώνα ή γράμματα.`));
  content.append(paragraph(`Δώσε το κινητό στον/στην ${picker.name}. Διάλεξε κρυφά.`));
  content.append(rpsChoices(move => picker === a ? rpsPick(a, b, b, move, tieCount) : resolveRps(a, b, first, move, tieCount)));
}

function resolveRps(a, b, am, bm, tieCount = 0) {
  if (am === bm) {
    const nextTie = tieCount + 1;
    if (nextTie >= 6) return coinFlip(a, b);
    return rpsPick(a, b, a, "", nextTie);
  }
  const aw = (am === "Πέτρα" && bm === "Ψαλίδι") || (am === "Ψαλίδι" && bm === "Χαρτί") || (am === "Χαρτί" && bm === "Πέτρα");
  confirmOut(aw ? b : a, "Έχασε στο Πέτρα Ψαλίδι Χαρτί");
}

function rpsChoices(onPick) {
  const wrap = el("div", "rps-grid");
  [
    ["Πέτρα", "🪨"],
    ["Ψαλίδι", "✂️"],
    ["Χαρτί", "📄"]
  ].forEach(([move, icon]) => {
    const b = el("button", "rps-choice", `<span>${icon}</span><strong>${move}</strong>`);
    b.addEventListener("click", () => onPick(move));
    wrap.append(b);
  });
  return wrap;
}

function startTicTacToe(a, b, starting = 1, tieCount = 0) {
  state.ttt = Array(9).fill(0);
  state.tttTurn = starting;
  state.tttTieCount = tieCount;
  showTicTacToe(a, b);
}

function showTicTacToe(a, b) {
  const turn = state.tttTurn === 1 ? a : b;
  const content = render("ΤΡΙΛΙΖΑ", `${turn.name} παίζει`);
  content.append(paragraph(`${a.name} = X | ${b.name} = O`));
  if (state.tttTieCount) content.append(paragraph(`Ισοπαλίες: ${state.tttTieCount} / 6. Στις 6 πάμε σε κορώνα ή γράμματα.`));
  const board = el("div", "ttt");
  state.ttt.forEach((v, i) => {
    const cell = button(v === 1 ? "X" : v === 2 ? "O" : "", "cell", () => {
      if (state.ttt[i]) return;
      state.ttt[i] = state.tttTurn;
      const winner = tttWinner();
      if (winner === 1) confirmOut(b, "Έχασε στην Τρίλιζα");
      else if (winner === 2) confirmOut(a, "Έχασε στην Τρίλιζα");
      else if (state.ttt.every(Boolean)) {
        const nextTie = state.tttTieCount + 1;
        if (nextTie >= 6) coinFlip(a, b);
        else startTicTacToe(a, b, state.tttTurn === 1 ? 2 : 1, nextTie);
      }
      else { state.tttTurn = state.tttTurn === 1 ? 2 : 1; showTicTacToe(a, b); }
    });
    board.append(cell);
  });
  content.append(board);
}

function tttWinner() {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of lines) if (state.ttt[a] && state.ttt[a] === state.ttt[b] && state.ttt[b] === state.ttt[c]) return state.ttt[a];
  return 0;
}

function startMemory(a, b) {
  state.memory = Array.from({ length: 5 }, () => Math.floor(Math.random() * 4));
  state.memoryStep = 3;
  memoryPreview(a, b, a);
}

function memoryPreview(a, b, p) {
  const content = render("ΜΝΗΜΗ", p.name);
  content.append(el("div", "memory-view", state.memory.slice(0, state.memoryStep).map(x => x + 1).join("  ")));
  content.append(actions(button("Το θυμήθηκα", "", () => { state.memoryInput = 0; memoryInput(a, b, p); })));
}

function memoryInput(a, b, p) {
  const content = render("ΜΝΗΜΗ", p.name);
  const pad = el("div", "grid");
  [0,1,2,3].forEach(n => pad.append(button(String(n + 1), "secondary", () => {
    if (n !== state.memory[state.memoryInput]) return confirmOut(p, "Απέτυχε στη Μνήμη");
    state.memoryInput++;
    if (state.memoryInput >= state.memoryStep) {
      if (p === a) memoryPreview(a, b, b);
      else if (state.memoryStep < state.memory.length) { state.memoryStep++; memoryPreview(a, b, a); }
      else coinFlip(a, b);
    } else memoryInput(a, b, p);
  })));
  content.append(pad);
}

function startQuiz(a, b) {
  state.quizIndex = 0;
  state.quizA = 0;
  state.quizB = 0;
  state.quizDeck = shuffle(QUIZ_BANK).slice(0, 6).map(item => {
    const answers = shuffle([
      { text: item[1], correct: item[3] === 0 },
      { text: item[2], correct: item[3] === 1 }
    ]);
    return { question: item[0], answers };
  });
  quiz(a, b);
}

function quiz(a, b) {
  if (state.quizIndex >= state.quizDeck.length) return state.quizA === state.quizB ? coinFlip(a, b) : confirmOut(state.quizA < state.quizB ? a : b, "Έχασε στις 6 Ερωτήσεις");
  const answerer = state.quizIndex % 2 === 0 ? a : b;
  const item = state.quizDeck[state.quizIndex];
  const content = render("6 ΕΡΩΤΗΣΕΙΣ", answerer.name);
  const quizPanel = el("div", "quiz-panel");
  quizPanel.append(
    el("div", "quiz-score", `<strong>${a.name}</strong><span>${state.quizA}</span><b>VS</b><span>${state.quizB}</span><strong>${b.name}</strong>`),
    el("div", "quiz-progress", `Ερώτηση ${state.quizIndex + 1} / ${state.quizDeck.length}`),
    el("div", "quiz-question", item.question)
  );
  const options = el("div", "quiz-options");
  item.answers.forEach(answer => options.append(button(answer.text, "secondary quiz-choice", () => {
    if (answer.correct) answerer === a ? state.quizA++ : state.quizB++;
    state.quizIndex++;
    quiz(a, b);
  })));
  quizPanel.append(options);
  content.append(quizPanel);
}

function coinFlip(a, b) {
  const content = render("ΚΟΡΩΝΑ ΓΡΑΜΜΑΤΑ", `${a.name} vs ${b.name}`);
  content.append(hero(a), paragraph(`${a.name}, διάλεξε πλευρά. Ο/Η ${b.name} παίρνει την άλλη.`));
  content.append(actions(button("Κορώνα", "", () => coinFlipSpin(a, b, "ΚΟΡΩΝΑ")), button("Γράμματα", "secondary", () => coinFlipSpin(a, b, "ΓΡΑΜΜΑΤΑ"))));
}

function coinFlipSpin(a, b, aPick) {
  const result = Math.random() < .5 ? "ΚΟΡΩΝΑ" : "ΓΡΑΜΜΑΤΑ";
  const loser = result === aPick ? b : a;
  const content = render("ΚΟΡΩΝΑ ΓΡΑΜΜΑΤΑ", "Ρίψη");
  const coin = el("div", "coin", "?");
  content.append(coin, actions(button("Ρίξε το νόμισμα", "", e => {
    const flipButton = e.currentTarget;
    flipButton.disabled = true;
    coin.classList.add("flip");
    setTimeout(() => {
      coin.textContent = result;
      flipButton.textContent = `${loser.name} χάνει`;
      flipButton.disabled = false;
      flipButton.replaceWith(button(`${loser.name} χάνει`, "", () => confirmOut(loser, `Έχασε στο Κορώνα Γράμματα. Βγήκε ${result}`)));
    }, 950);
  })));
}

function showFinale() {
  const [a, b] = alive();
  finaleRound(a, b, 0, 0, 1);
}

function finaleRound(a, b, as, bs, match) {
  if (match > 2) {
    if (as === bs) return finaleJuryVote(a, b);
    eliminateNow(as > bs ? b : a, "Έχασε τον τελικό Best of 2");
    return showWinner();
  }
  const test = match === 1 ? "Πέτρα Ψαλίδι Χαρτί" : "Τρίλιζα";
  const content = render("BEST OF 2", test);
  content.append(paragraph(`Σκορ τελικού: ${a.name} ${as} - ${bs} ${b.name}`));
  content.append(actions(button(`Παίξε ${test}`, "", () => match === 1 ? finaleRpsPick(a, b, a, "", as, bs, match) : startFinaleTicTacToe(a, b, as, bs, match, 1))));
}

function finaleRpsPick(a, b, picker, first, as, bs, match, tieCount = 0) {
  const content = render("ΤΕΛΙΚΟΣ RPS", picker.name);
  if (tieCount) content.append(paragraph(`Ισοπαλίες: ${tieCount} / 6. Στις 6 πάμε σε κορώνα ή γράμματα.`));
  content.append(rpsChoices(move => picker === a ? finaleRpsPick(a, b, b, move, as, bs, match, tieCount) : resolveFinaleRps(a, b, first, move, as, bs, match, tieCount)));
}

function resolveFinaleRps(a, b, am, bm, as, bs, match, tieCount = 0) {
  if (am === bm) {
    const nextTie = tieCount + 1;
    if (nextTie >= 6) return finaleCoinFlip(a, b, as, bs, match);
    return finaleRpsPick(a, b, a, "", as, bs, match, nextTie);
  }
  const aw = (am === "Πέτρα" && bm === "Ψαλίδι") || (am === "Ψαλίδι" && bm === "Χαρτί") || (am === "Χαρτί" && bm === "Πέτρα");
  finaleRound(a, b, aw ? as + 1 : as, aw ? bs : bs + 1, match + 1);
}

function startFinaleTicTacToe(a, b, as, bs, match, starting = 1, tieCount = 0) {
  state.ttt = Array(9).fill(0);
  state.tttTurn = starting;
  state.tttTieCount = tieCount;
  showFinaleTicTacToe(a, b, as, bs, match);
}

function showFinaleTicTacToe(a, b, as, bs, match) {
  const turn = state.tttTurn === 1 ? a : b;
  const content = render("ΤΕΛΙΚΟΣ ΤΡΙΛΙΖΑ", `${turn.name} παίζει`);
  content.append(paragraph(`${a.name} = X | ${b.name} = O`));
  if (state.tttTieCount) content.append(paragraph(`Ισοπαλίες: ${state.tttTieCount} / 6. Στις 6 πάμε σε κορώνα ή γράμματα.`));
  const board = el("div", "ttt");
  state.ttt.forEach((v, i) => board.append(button(v === 1 ? "X" : v === 2 ? "O" : "", "cell", () => {
    if (state.ttt[i]) return;
    state.ttt[i] = state.tttTurn;
    const winner = tttWinner();
    if (winner === 1) finaleRound(a, b, as + 1, bs, match + 1);
    else if (winner === 2) finaleRound(a, b, as, bs + 1, match + 1);
    else if (state.ttt.every(Boolean)) {
      const nextTie = state.tttTieCount + 1;
      if (nextTie >= 6) finaleCoinFlip(a, b, as, bs, match);
      else startFinaleTicTacToe(a, b, as, bs, match, state.tttTurn === 1 ? 2 : 1, nextTie);
    }
    else { state.tttTurn = state.tttTurn === 1 ? 2 : 1; showFinaleTicTacToe(a, b, as, bs, match); }
  })));
  content.append(board);
}

function finaleCoinFlip(a, b, as, bs, match) {
  const content = render("ΚΟΡΩΝΑ ΓΡΑΜΜΑΤΑ", "Ισοπαλία x6");
  content.append(paragraph(`${a.name}, διάλεξε πλευρά. Το coin flip αποφασίζει τον πόντο αυτού του παιχνιδιού.`));
  content.append(actions(
    button("Κορώνα", "", () => finaleCoinFlipSpin(a, b, as, bs, match, "ΚΟΡΩΝΑ")),
    button("Γράμματα", "secondary", () => finaleCoinFlipSpin(a, b, as, bs, match, "ΓΡΑΜΜΑΤΑ"))
  ));
}

function finaleCoinFlipSpin(a, b, as, bs, match, aPick) {
  const result = Math.random() < .5 ? "ΚΟΡΩΝΑ" : "ΓΡΑΜΜΑΤΑ";
  const winner = result === aPick ? a : b;
  const content = render("ΚΟΡΩΝΑ ΓΡΑΜΜΑΤΑ", "Ρίψη");
  const coin = el("div", "coin", "?");
  content.append(coin, actions(button("Ρίξε το νόμισμα", "", e => {
    const flipButton = e.currentTarget;
    flipButton.disabled = true;
    coin.classList.add("flip");
    setTimeout(() => {
      coin.textContent = result;
      flipButton.replaceWith(button(`${winner.name} παίρνει πόντο`, "", () => finaleRound(a, b, winner === a ? as + 1 : as, winner === b ? bs + 1 : bs, match + 1)));
    }, 950);
  })));
}

function finaleJuryVote(a, b) {
  if (!state.eliminated.length) return diceFinale(a, b);
  const votes = new Map();
  finaleJuryStep(a, b, votes, 0);
}

function finaleJuryStep(a, b, votes, index) {
  const content = render("ΨΗΦΟΦΟΡΙΑ ΤΕΛΙΚΟΥ", index >= state.eliminated.length ? "Αποτέλεσμα" : state.eliminated[index].name);
  content.append(scoreboard([a, b], votes));
  if (index >= state.eliminated.length) {
    const av = votes.get(a) || 0, bv = votes.get(b) || 0;
    if (av === bv) content.append(actions(button("Ισοπαλία - Ρίξε ζάρι", "", () => diceFinale(a, b))));
    else { eliminateNow(av > bv ? b : a, "Έχασε στην ψηφοφορία τελικού"); showWinner(); }
    return;
  }
  const voter = state.eliminated[index];
  content.append(hero(voter), paragraph(`${voter.name} ψηφίζει ποιον θέλει νικητή.`), grid([a, b], "Ψήφος νικητή", p => { votes.set(p, (votes.get(p) || 0) + 1); finaleJuryStep(a, b, votes, index + 1); }));
}

function diceFinale(a, b) {
  const content = render("ΖΑΡΙ ΤΕΛΙΚΟΥ", `${a.name} vs ${b.name}`);
  const da = diceBox("?"), db = diceBox("?");
  const result = el("div", "panel", "Κάθε φιναλίστ ρίχνει μία φορά. Μεγαλύτερος αριθμός κερδίζει.");
  const actionBox = actions();
  const roll = button("Ρίξτε τα ζάρια", "", e => {
    const rollButton = e.currentTarget;
    rollButton.disabled = true;
    const av = 1 + Math.floor(Math.random() * 6), bv = 1 + Math.floor(Math.random() * 6);
    da.classList.add("roll"); db.classList.add("roll");
    setTimeout(() => {
      da.classList.remove("roll"); db.classList.remove("roll");
      da.innerHTML = dicePips(av); db.innerHTML = dicePips(bv);
      if (av === bv) {
        result.textContent = `Ισοπαλία ${av}-${bv}. Ρίξτε ξανά.`;
        rollButton.textContent = "Ισοπαλία - ξανά ρίψη";
        rollButton.disabled = false;
        return;
      }
      const winner = av > bv ? a : b;
      const loser = av > bv ? b : a;
      result.textContent = `${a.name}: ${av} | ${b.name}: ${bv}. ${winner.name} κερδίζει.`;
      actionBox.replaceChildren(button("Συνέχεια", "", () => { eliminateNow(loser, "Έχασε στο ζάρι τελικού"); showWinner(); }));
    }, 800);
  });
  actionBox.append(roll);
  content.append(result, el("div", "panel", a.name), da, el("div", "panel", b.name), db, actionBox);
}

function diceBox(value) {
  const d = el("div", "dice", value);
  return d;
}

function dicePips(value) {
  const map = { 1: ["c"], 2: ["tl","br"], 3: ["tl","c","br"], 4: ["tl","tr","bl","br"], 5: ["tl","tr","c","bl","br"], 6: ["tl","tr","ml","mr","bl","br"] };
  return `<div class="pips">${map[value].map(x => `<span class="pip ${x}"></span>`).join("")}</div>`;
}

function finalRanking() {
  const ranking = [];
  const winner = alive()[0];
  if (winner) ranking.push(winner);
  [...state.eliminated].reverse().forEach(p => {
    if (!ranking.includes(p)) ranking.push(p);
  });
  state.players.forEach(p => {
    if (!ranking.includes(p)) ranking.push(p);
  });
  return ranking;
}

function rankingPanel() {
  const panel = el("div", "ranking panel");
  panel.append(el("h2", "", "Τελική κατάταξη"));
  finalRanking().forEach((p, index) => {
    const row = el("div", "rank-row");
    row.innerHTML = `<span class="rank-num">#${index + 1}</span><img class="rank-avatar" src="${img(p)}" alt="${p.name}"><strong>${p.name}</strong><span class="label">${index === 0 ? "Νικητής" : `Θέση ${index + 1}`}</span>`;
    panel.append(row);
  });
  return panel;
}

function showWinner() {
  playMusic("./audio/many_villains_victory.mp3", { loop: true, volume: 0.82 });
  const winner = alive()[0];
  const content = render("ΝΙΚΗΤΗΣ", winner ? winner.name : "Κανένας");
  if (winner) content.append(hero(winner));
  content.append(rankingPanel());
  addLog(content, 20);
  content.append(actions(button("Νέο παιχνίδι", "", showHome)));
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}

showLoading();
