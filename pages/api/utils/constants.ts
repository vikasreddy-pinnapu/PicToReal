
export type LanguageType =   "English" | "Arabic" | "Spanish" | "French" | "German" | "Italian" | "Chinese" | "Japanese" | "Russian" | "Hindi"


export const languages: LanguageType[] = ["English", "German"];

export const languages_i18n: {LanguageType: string} = {
  English: "en",
  Arabic: "ar",
  Spanish: "es",
  French: "fr",
  German: "de",
  Italian: "it",
  Chinese: "zh",
  Japanese: "ja",
  Russian: "ru",
  Hindi: "hi",
};
export const regexMaybe = '"```" or "``` JSON"';
export const availableWidgets = [
  "wm-container",
  "wm-anchor",
  "wm-button",
  "wm-label",
  "wm-icon",
  "wm-picture",
  "wm-text",
  "wm-radioset",
  "wm-textarea",
  "wm-checkbox",
  "wm-gridcolumn",
  "wm-gridrow",
  "wm-layoutgrid",
  "wm-linearlayout",
  "wm-linearlayoutitem",
  "wm-form",
  "wm-formfield"
];

