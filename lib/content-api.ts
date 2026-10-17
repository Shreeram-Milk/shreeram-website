import { API_URL, REVALIDATE_SECONDS } from './site'

export type HomeCard = { title: string; text: string }
export type HomeContent = {
  announcement: string
  heroTitle: string
  heroSubtitle: string
  heroImageUrl: string
  highlights: HomeCard[]
  steps: HomeCard[]
  showProducts: boolean
  productsTitle: string
  ctaTitle: string
  ctaText: string
  playStoreUrl: string
  seoTitle: string
  seoDescription: string
}
export type ProductCard = { id: string; name: string; imageUrl: string | null; priceFromPaise: number }
export type HelpTopic = { id: string; labelEn: string }
export type Faq = { id: string; topic: string; questionEn: string; answerEn: string; sortOrder: number }
export type HelpContent = { topics: HelpTopic[]; faqs: Faq[] }
export type ContactDetails = { supportPhone: string; supportEmail: string; supportWhatsApp: string; supportHoursEn: string }
export type Policy = { type: string; titleEn: string; bodyEn: string; version: string; effectiveDate: string }

/** Shown when the backend cannot be reached, so the front page is never blank. Staff text replaces it as soon as it loads. */
export const FALLBACK_HOME: HomeContent = {
  announcement: '',
  heroTitle: 'Fresh milk at your door, every morning',
  heroSubtitle: 'Pure farm milk and dairy from a family business, delivered fresh across Gujarat.',
  heroImageUrl: '',
  highlights: [],
  steps: [],
  showProducts: false,
  productsTitle: 'Our products',
  ctaTitle: 'Order on the ShreeRam Milks app',
  ctaText: 'Subscribe once and we deliver every day.',
  playStoreUrl: '',
  seoTitle: 'ShreeRam Milks – Fresh milk delivered daily',
  seoDescription: 'Pure farm milk and dairy products delivered fresh to your door every day.',
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null
const text = (value: unknown): string => (typeof value === 'string' ? value : '')

/** Reads one public backend answer. Any failure becomes null: a public page must never crash because the backend is down. */
async function getJson(path: string): Promise<unknown> {
  try {
    const response = await fetch(`${API_URL}${path}`, { headers: { Accept: 'application/json' }, next: { revalidate: REVALIDATE_SECONDS } })
    return response.ok ? ((await response.json()) as unknown) : null
  } catch {
    return null
  }
}

const cards = (value: unknown): HomeCard[] =>
  Array.isArray(value) ? value.filter(isRecord).map(item => ({ title: text(item.title), text: text(item.text) })).filter(item => item.title !== '') : []

export async function getHome(): Promise<HomeContent> {
  const payload = await getJson('/public/website/home')
  const home = isRecord(payload) && isRecord(payload.home) ? payload.home : null
  if (!home) return FALLBACK_HOME
  return {
    announcement: text(home.announcement), heroTitle: text(home.heroTitle) || FALLBACK_HOME.heroTitle, heroSubtitle: text(home.heroSubtitle), heroImageUrl: text(home.heroImageUrl),
    highlights: cards(home.highlights), steps: cards(home.steps), showProducts: home.showProducts === true, productsTitle: text(home.productsTitle) || FALLBACK_HOME.productsTitle,
    ctaTitle: text(home.ctaTitle), ctaText: text(home.ctaText), playStoreUrl: text(home.playStoreUrl),
    seoTitle: text(home.seoTitle) || FALLBACK_HOME.seoTitle, seoDescription: text(home.seoDescription) || FALLBACK_HOME.seoDescription,
  }
}

export async function getProducts(): Promise<ProductCard[]> {
  const payload = await getJson('/public/products?pageSize=8')
  if (!isRecord(payload) || !Array.isArray(payload.products)) return []
  return payload.products.filter(isRecord).map(item => ({
    id: text(item.id), name: text(item.name), imageUrl: typeof item.imageUrl === 'string' ? item.imageUrl : null, priceFromPaise: typeof item.priceFromPaise === 'number' ? item.priceFromPaise : 0,
  })).filter(item => item.id !== '' && item.name !== '')
}

/** The help topics and published questions, or null when the backend could not be reached. */
export async function getHelp(): Promise<HelpContent | null> {
  const payload = await getJson('/public/help')
  if (!isRecord(payload) || !Array.isArray(payload.topics) || !Array.isArray(payload.faqs)) return null
  return {
    topics: payload.topics.filter(isRecord).map(item => ({ id: text(item.id), labelEn: text(item.labelEn) })),
    faqs: payload.faqs.filter(isRecord).map(item => ({ id: text(item.id), topic: text(item.topic), questionEn: text(item.questionEn), answerEn: text(item.answerEn), sortOrder: typeof item.sortOrder === 'number' ? item.sortOrder : 0 })),
  }
}

export async function getContact(): Promise<ContactDetails | null> {
  const payload = await getJson('/public/app-settings')
  const settings = isRecord(payload) && isRecord(payload.settings) ? payload.settings : null
  if (!settings) return null
  return { supportPhone: text(settings.supportPhone), supportEmail: text(settings.supportEmail), supportWhatsApp: text(settings.supportWhatsApp), supportHoursEn: text(settings.supportHoursEn) }
}

/** The published policy of one type, or null when none is published (or the backend is down). */
export async function getPolicy(type: string): Promise<Policy | null> {
  const payload = await getJson('/public/policies')
  if (!isRecord(payload) || !Array.isArray(payload.policies)) return null
  const found = payload.policies.filter(isRecord).find(item => item.type === type)
  return found ? { type, titleEn: text(found.titleEn), bodyEn: text(found.bodyEn), version: text(found.version), effectiveDate: text(found.effectiveDate) } : null
}

/** Play Store link from the Home page record; the Download page shares it. */
export async function getPlayStoreUrl(): Promise<string> {
  return (await getHome()).playStoreUrl
}
