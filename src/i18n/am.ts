import type { MessageKey } from './en';

/**
 * Amharic strings. Only keys a native speaker should still review are here;
 * everything missing falls back to English automatically. Add translations
 * key by key as they are approved.
 *
 * Company name in Amharic is taken from the workshop's own team-photo banner.
 */
export const am: Partial<Record<MessageKey, string>> = {
  'brand.short': 'ጆኒ አውቶ',
  'brand.legal': 'ጆኒ ጀነራል አውቶ የመኪና መጠገኛ እና መገጣጠሚያ ኃ/የተ/የግ/ማህበር',

  'nav.services': 'አገልግሎቶች',
  'nav.process': 'የጥገና ሂደት',
  'nav.workshop': 'ጋራዥ',
  'nav.future': 'የወደፊት ፕሮጀክት',
  'nav.fleet': 'የድርጅት መኪኖች',
  'nav.notes': 'ማስታወሻዎች',
  'nav.contact': 'አግኙን',
  'nav.track': 'የመኪናዬ ሁኔታ',
  'nav.book': 'ቀጠሮ ይያዙ',
  'nav.quote': 'ዋጋ ይጠይቁ',
  'nav.menu': 'ምናሌ',
  'nav.close': 'ዝጋ',

  'lang.label': 'ቋንቋ',

  'hero.eyebrow': 'መገናኛ፣ አዲስ አበባ',
  'hero.title1': 'መኪናዎችን በመገናኛ እንጠግናለን።',
  'hero.title2': 'በቀጣይ በገላን እንገጣጥማለን።',
  'hero.cta.book': 'ቀጠሮ ይያዙ',
  'hero.cta.track': 'የመኪናዬ ሁኔታ',
  'hero.cta.call': 'ይደውሉ',

  'stats.years': 'ዓመታት በአዲስ አበባ',
  'stats.staff': 'ሠራተኞች',
  'stats.area': 'ካሬ ሜትር ጋራዥ',
  'stats.customers': 'ደንበኞች',

  'services.eyebrow': 'አገልግሎቶች',
  'services.book': 'ቀጠሮ ይያዙ',
  'services.quote': 'ዋጋ ይጠይቁ',

  'process.eyebrow': 'የጥገና ሂደት',

  'workshop.eyebrow': 'ጋራዥ',

  'gallery.eyebrow': 'ሥራዎች',
  'gallery.all': 'ሁሉም',

  'future.eyebrow': 'የወደፊት',
  'future.title': 'በገላን የኤሌክትሪክ መኪና መገጣጠሚያ።',

  'contact.eyebrow': 'አግኙን',
  'contact.call': 'ይደውሉ',
  'contact.phones': 'ስልክ',
  'contact.email': 'ኢሜይል',
  'contact.address': 'አድራሻ',
  'contact.hours': 'የሥራ ሰዓት',
  'contact.map': 'ካርታ',
  'contact.whatsapp': 'ዋትስአፕ',
  'contact.telegram': 'ቴሌግራም',
  'contact.form.send': 'ላክ',

  'footer.rights': 'መብቱ በህግ የተጠበቀ ነው።',

  'form.name': 'ሙሉ ስም',
  'form.phone': 'ስልክ ቁጥር',
  'form.email': 'ኢሜይል',
  'form.notes': 'ማስታወሻ',
  'form.next': 'ቀጣይ',
  'form.back': 'ተመለስ',
  'form.submit': 'አስገባ',
  'form.vehicle': 'መኪና',
  'form.date': 'ቀን',
  'form.time': 'ሰዓት',

  'book.title': 'ቀጠሮ ይያዙ',
  'book.step.service': 'አገልግሎት',
  'book.step.vehicle': 'መኪና',
  'book.step.slot': 'ቀን እና ሰዓት',
  'book.step.contact': 'አድራሻ',

  'quote.title': 'ዋጋ ይጠይቁ',
  'quote.step.photos': 'ፎቶዎች',

  'track.title': 'የመኪናዬ ሁኔታ',
  'track.find': 'ፈልግ',
};
