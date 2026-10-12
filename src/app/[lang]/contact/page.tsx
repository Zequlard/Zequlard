import type { Metadata } from "next";
import { PageHead } from "@/components/page-head";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/metadata";
import { ContactForm } from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return { title: dict.footer.contact, description: dict.contact.description, alternates: alternates(locale, "/contact") };
}

export default async function ContactPage() {
  const dict = await getDictionary();
  return (
    <>
      <PageHead eyebrow={dict.footer.contact} title={dict.contact.title}>
        {dict.contact.intro}
      </PageHead>
      <div className="hairline grid border-t pt-10 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-4">
          <ContactForm copy={dict.contact} />
        </div>
      </div>
    </>
  );
}
