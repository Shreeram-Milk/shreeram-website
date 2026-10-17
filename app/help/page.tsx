import { JsonLd } from '@/components/JsonLd'
import { Button, PageHeader, Section } from '@/components/ui'
import { getHelp, type Faq } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

export const revalidate = 300
export const metadata = pageMetadata({
  title: 'Help and FAQ',
  description: 'Answers to common questions about ordering, delivery, payments and subscriptions with ShreeRam Milks.',
  path: '/help',
})

const bySortOrder = (a: Faq, b: Faq) => a.sortOrder - b.sortOrder

export default async function HelpPage() {
  const help = await getHelp()
  const groups = help
    ? help.topics.map(topic => ({ topic, faqs: help.faqs.filter(faq => faq.topic === topic.id).sort(bySortOrder) })).filter(group => group.faqs.length > 0)
    : []
  const allFaqs = groups.flatMap(group => group.faqs)
  return (
    <Section narrow>
      {allFaqs.length > 0 ? (
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', url: `${SITE_URL}/help`, mainEntity: allFaqs.map(faq => ({ '@type': 'Question', name: faq.questionEn, acceptedAnswer: { '@type': 'Answer', text: faq.answerEn } })) }} />
      ) : null}
      <PageHeader title="Help and FAQ" intro="Quick answers to common questions. Can't find yours? We are happy to help." />
      {help === null ? <p className="notice" role="status">Help is not available right now. Please try again in a little while, or contact us.</p> : null}
      {help !== null && groups.length === 0 ? <p className="notice">No questions have been added yet. Please contact us and we will help.</p> : null}
      {groups.map(({ topic, faqs }) => (
        <div key={topic.id} className="faq-topic">
          <h2>{topic.labelEn}</h2>
          {faqs.map(faq => (
            <details key={faq.id} className="faq-item">
              <summary>{faq.questionEn}</summary>
              <p className="faq-answer pre-line">{faq.answerEn}</p>
            </details>
          ))}
        </div>
      ))}
      <div className="hero-actions"><Button href="/contact">Contact us</Button></div>
    </Section>
  )
}
