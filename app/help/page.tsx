import { JsonLd } from '@/components/JsonLd'
import { Button, PageHeader } from '@/components/ui'
import { Icon } from '@/components/Icons'
import { getHelp, type Faq } from '@/lib/content-api'
import { pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
export const revalidate = 300
export const metadata = pageMetadata({
  title: 'Help and FAQ',
  description:
    'Answers to common questions about ordering, delivery, payments and subscriptions with ShreeRam Milks.',
  path: '/help',
})
const bySortOrder = (a: Faq, b: Faq) => a.sortOrder - b.sortOrder
export default async function HelpPage() {
  const help = await getHelp()
  const groups = help
    ? help.topics
        .map((topic) => ({
          topic,
          faqs: help.faqs
            .filter((faq) => faq.topic === topic.id)
            .sort(bySortOrder),
        }))
        .filter((group) => group.faqs.length > 0)
    : []
  const allFaqs = groups.flatMap((group) => group.faqs)
  return (
    <section className="section">
      <div className="wrap">
        {allFaqs.length > 0 ? (
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              url: `${SITE_URL}/help`,
              mainEntity: allFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.questionEn,
                acceptedAnswer: { '@type': 'Answer', text: faq.answerEn },
              })),
            }}
          />
        ) : null}
        <PageHeader
          title="A little help? Right here."
          intro="From your first order to your daily routine. Find answers to the little things you’re wondering about."
        />
        <div className="support-layout">
          <aside className="support-aside">
            <div className="support-panel">
              <Icon name="home" size={30} />
              <h2>
                We’re here
                <br />
                for your everyday.
              </h2>
              <p>
                Questions about your delivery, account or order? Our team will
                be happy to help.
              </p>
              <Button href="/contact">
                Let’s talk <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </aside>
          <div>
            {help === null ? (
              <div className="empty-state" role="status">
                <Icon name="bell" size={28} />
                <h2>Answers are taking a little break.</h2>
                <p>
                  Help is not available right now. Please try again in a little
                  while, or contact us.
                </p>
                <Button href="/contact" variant="secondary">
                  Contact support ↗
                </Button>
              </div>
            ) : null}
            {help !== null && groups.length === 0 ? (
              <div className="empty-state">
                <h2>Let’s answer that together.</h2>
                <p>
                  No questions have been added yet. Please contact us and we
                  will help.
                </p>
                <Button href="/contact">Contact us ↗</Button>
              </div>
            ) : null}
            {groups.map(({ topic, faqs }) => (
              <section key={topic.id} className="faq-topic">
                <h2>{topic.labelEn}</h2>
                {faqs.map((faq) => (
                  <details key={faq.id} className="faq-item">
                    <summary>{faq.questionEn}</summary>
                    <p className="faq-answer pre-line">{faq.answerEn}</p>
                  </details>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
