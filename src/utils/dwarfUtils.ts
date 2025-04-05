
// Utility functions for the Dwarf character

// Sample phrases for the dwarf to use
const DWARF_PHRASES = [
  "Клянусь своей бородой!",
  "Во имя подземных чертогов!",
  "Эль и хорошее кино - вот что нужно после долгого дня!",
  "Хммм, дай-ка подумать...",
  "Из-под земли достану лучший фильм для тебя!",
  "Хочешь историю так же крепкую, как гномий эль?",
  "Эти фильмы проверены временем, как мой топор!",
  "Мои рекомендации ценнее золота в горах!",
  "Ха! Вот что я тебе скажу...",
  "Садись поближе к огню, расскажу о чудных историях...",
];

// Get a random greeting
export const getRandomGreeting = (): string => {
  const greetings = [
    "Приветствую тебя в моей таверне, путник! Чего желаешь отведать сегодня вечером? Может быть, хорошую историю?",
    "Ха! Новый гость! Добро пожаловать в \"Таверну Гнома\"! Ищешь, что посмотреть сегодня?",
    "Заходи, заходи! Располагайся поудобнее! Я - Торин, хозяин этой таверны. Помогу тебе найти достойный фильм для вечера!",
    "Во имя гор и подземелий, приветствую в моей таверне! Расскажи, какую историю ты жаждешь услышать сегодня?",
  ];
  
  return greetings[Math.floor(Math.random() * greetings.length)];
};

// Get a random phrase for recommendations
export const getRandomRecommendationPhrase = (): string => {
  const phrases = [
    "Вот что я для тебя нашел в своих старых свитках:",
    "Клянусь своей бородой, эти истории тебе понравятся:",
    "В моих сундуках я отыскал эти сокровища:",
    "Лучше этих историй только кружка эля у камина:",
    "Эти предания достойны быть рассказанными за моим столом:",
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
};

// Get a random phrase for when the dwarf is "thinking"
export const getRandomThinkingPhrase = (): string => {
  const phrases = [
    "Хммм, роюсь в своих свитках...",
    "Секунду, ищу в памяти подходящие истории...",
    "Дай-ка подумать, что бы тебе порекомендовать...",
    "Сейчас загляну в свою коллекцию историй...",
    "Так-так, что у нас тут в архивах...",
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
};

// Get a random phrase to insert into messages
export const getRandomDwarfPhrase = (): string => {
  return DWARF_PHRASES[Math.floor(Math.random() * DWARF_PHRASES.length)];
};

// Stylize a movie synopsis in dwarf style
export const stylizeMovieSynopsis = (synopsis: string): string => {
  // Add dwarf-style phrases to the beginning and end
  const prefix = DWARF_PHRASES[Math.floor(Math.random() * DWARF_PHRASES.length)];
  const suffix = DWARF_PHRASES[Math.floor(Math.random() * DWARF_PHRASES.length)];
  
  return `${prefix} ${synopsis} ${suffix}`;
};

// Generate questions to ask users about movies
export const getNextQuestion = (questionIndex: number): string => {
  const questions = [
    "Какой жанр тебя интересует сегодня? Может быть, эпическое фэнтези, захватывающий боевик или что-то, от чего дрожат колени?",
    "Ты ищешь что-то новенькое или предпочитаешь проверенные временем истории? Назови примерный год или десятилетие.",
    "Есть ли актеры или режиссеры, чьи работы ты особенно ценишь? Назови имя, и я найду сокровища с их участием.",
    "Какое настроение ты хочешь получить? Хочешь смеяться, плакать или, может, задуматься о жизни?",
    "Расскажи о фильме, который тебе понравился в прошлом, и я найду что-то подобное."
  ];
  
  return questions[questionIndex % questions.length];
};
