import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { LIVE_LINKS, RULES_AS_OF, URGENCY_LABEL, getAlert } from "@/lib/alerts";
import { DISCLAIMER_SHORT, HONESTY } from "@/lib/site";

const title = "Japan snow and winter alerts decoded: 大雪警報, 暴風雪警報, なだれ注意報 and what to do (2026-27 winter)";
const description =
  "What Japanese winter weather alerts mean for travellers and residents: 大雪特別警報, 暴風雪警報 Snowstorm Warning, 大雪警報 Heavy Snow Warning, 風雪注意報, なだれ注意報 Avalanche Advisory, 着雪・着氷・低温注意報 and the 短時間大雪 bulletin. Official JMA English names, urgency and what to do. Not an alert service.";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/winter" },
  openGraph: { title, description },
  twitter: { card: "summary_large_image", title, description },
};

const IDS = [
  "snowstorm-emergency",
  "heavy-snow-emergency",
  "bulletin-heavy-snow",
  "snowstorm-warning",
  "heavy-snow-warning",
  "gale-snow-advisory",
  "heavy-snow-advisory",
  "avalanche-advisory",
  "snow-accretion-advisory",
  "ice-accretion-advisory",
  "low-temperature-advisory",
  "snow-melting-advisory",
  "dry-air-advisory",
];

function a(id: string) {
  const x = getAlert(id);
  if (!x) throw new Error(`missing alert ${id}`);
  return x;
}

const faq: FaqItem[] = [
  {
    q: "What does 大雪警報 mean in Japan?",
    a: `${a("heavy-snow-warning").nameEn}: ${a("heavy-snow-warning").meaning.split(" This one")[0]} ${a("heavy-snow-warning").doNow[0]}`,
  },
  {
    q: "What is the difference between 暴風雪警報 and 大雪警報?",
    a: `暴風雪警報 is the ${a("snowstorm-warning").nameEn}: ${a("snowstorm-warning").meaning.split(" This one")[0]} 大雪警報 is the ${a("heavy-snow-warning").nameEn}: ${a("heavy-snow-warning").meaning.split(" This one")[0]} Neither has a 警戒レベル (alert level) number.`,
  },
  {
    q: "What is 気象防災速報（短時間大雪）?",
    a: `${a("bulletin-heavy-snow").nameEn}. ${a("bulletin-heavy-snow").meaning} ${a("bulletin-heavy-snow").doNow[0]}`,
  },
  {
    q: "Did Japan's snow warning names change in 2026?",
    a: "No. On 2026-05-29 JMA put level numbers into the names of heavy rain, landslide, flood and storm surge warnings, but snow, snowstorm, avalanche and other winter warnings and advisories kept their names and have no alert level. The old 顕著な大雪に関する気象情報 became the 気象防災速報（短時間大雪） bulletin.",
  },
  {
    q: "What does なだれ注意報 mean for skiers and snowboarders?",
    a: `${a("avalanche-advisory").nameEn}: ${a("avalanche-advisory").meaning.split(" This one")[0]} ${a("avalanche-advisory").doNow[0]}`,
  },
];

export default function WinterPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <section className="max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">Japan alert decoder · 冬の警報・注意報</p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">Japan snow and winter alerts, decoded</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Short answer: a <strong className="text-foreground">特別警報</strong> (Emergency Warning) means don&apos;t travel and stay in a heated, sturdy building; a{" "}
          <strong className="text-foreground">警報</strong> (Warning) means avoid unnecessary travel and expect road and rail closures; a{" "}
          <strong className="text-foreground">注意報</strong> (Advisory) means allow extra time and take care. Winter warnings have no 警戒レベル number. Official rules as of {RULES_AS_OF}.
        </p>
        <p className="mt-4 text-sm">
          <Link href="/" className="text-muted underline underline-offset-2 hover:text-foreground">
            ← Paste any Japanese alert into the decoder
          </Link>
        </p>
      </section>

      <section className="mt-10 max-w-4xl">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Every winter alert, strongest first</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="py-2 pr-4">Japanese</th>
                <th className="py-2 pr-4">Official English</th>
                <th className="py-2 pr-4">What it means</th>
                <th className="py-2">What to do</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line border-y border-line">
              {IDS.map((id) => {
                const x = a(id);
                return (
                  <tr key={id} className="align-top">
                    <td className="py-3 pr-4 font-medium text-foreground">
                      <Link href={`/r?a=${id}`} className="underline underline-offset-2">
                        {x.nameJa}
                      </Link>
                    </td>
                    <td className="py-3 pr-4">{x.nameEn}</td>
                    <td className="py-3 pr-4 text-muted">
                      {x.meaning.split(" This one")[0]} <span className="block text-xs">{URGENCY_LABEL[x.urgency]}</span>
                    </td>
                    <td className="py-3 text-muted">{x.doNow.join(" ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">
          Live warnings:{" "}
          {LIVE_LINKS.filter((l) => l.url.includes("warning") || l.url.includes("safety")).map((l, i) => (
            <span key={l.url}>
              {i ? ", " : ""}
              <a className="underline underline-offset-2 hover:text-foreground" href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </span>
          ))}
          . Sources: JMA (every source in <a className="underline underline-offset-2" href="/api/rules">/api/rules</a>).
        </p>
      </section>

      <FaqSection items={faq} heading="Winter alert questions" />
      <p className="mt-10 max-w-3xl text-xs text-muted">
        {DISCLAIMER_SHORT} {HONESTY}
      </p>
    </div>
  );
}
