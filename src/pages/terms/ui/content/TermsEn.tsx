import { Link } from 'react-router-dom'
import { APP_NAME, CONTACT_EMAIL } from '@/shared/config'

export function TermsEn() {
  return (
    <>
      <p>
        <em>
          This English version is provided for convenience. If it differs from the Korean version, the Korean version
          prevails.
        </em>
      </p>

      <h2>Article 1 (Purpose)</h2>
      <p>
        These Terms set out the conditions and procedures for using the crypto futures market analysis provided by{' '}
        {APP_NAME} (the "Service"), and the rights, obligations and responsibilities of the operator and users.
      </p>

      <h2>Article 2 (Services)</h2>
      <ul>
        <li>TradingView charts</li>
        <li>Per-timeframe long/short trend probabilities and their rationale, based on technical indicators</li>
        <li>Long/short ratios based on public exchange data</li>
        <li>An estimated liquidation map based on open interest</li>
      </ul>
      <p>
        The Service is free and requires no sign-up. Its content may change or be discontinued for operational or technical
        reasons.
      </p>

      <h2>Article 3 (Investment disclaimer)</h2>
      <ol>
        <li>
          All information provided by the Service is <strong>for reference only</strong>. It does not recommend buying or
          selling any asset and does not guarantee returns.
        </li>
        <li>
          The "trend probability" is a mathematical transformation of technical indicators and does not represent the actual
          probability of future price movements.
        </li>
        <li>
          The "liquidation map" is an estimate calculated from public data and an assumed leverage mix, and may differ from
          actual liquidation volumes.
        </li>
        <li>
          Trading crypto assets and derivatives carries the risk of losing your entire principal. All investment decisions and
          their outcomes are the user's own responsibility, and the operator is not liable for any losses arising from trades
          made using information from the Service.
        </li>
      </ol>

      <h2>Article 4 (Data accuracy)</h2>
      <p>
        The Service uses data provided by third parties such as Binance and TradingView. The operator does not guarantee the
        accuracy, completeness or timeliness of the data and is not liable for problems caused by outages, delays or errors
        in third-party services.
      </p>

      <h2>Article 5 (Operating principles)</h2>
      <p>
        The Service <strong>does not run exchange referral codes, paid memberships or signal groups.</strong> Anyone
        impersonating the Service to solicit sign-ups, deposits or personal information is unrelated to the Service, and the
        operator is not liable for any resulting damage.
      </p>

      <h2>Article 6 (User obligations)</h2>
      <p>Users must not:</p>
      <ul>
        <li>Disrupt operation of the Service by sending excessive requests through automated means</li>
        <li>
          Commercially redistribute the Service's screens or analysis without attribution, or present them in a way that could
          be mistaken for the Service
        </li>
        <li>Violate applicable laws</li>
      </ul>

      <h2>Article 7 (Advertising and donations)</h2>
      <p>
        The Service may display third-party ads such as Google AdSense to cover running costs. Advertisers are responsible
        for their ads and for their products and services. For ad cookies, see the <Link to="/privacy">Privacy Policy</Link>
        .
      </p>
      <p>
        Users may voluntarily support the operator, for example via KakaoPay transfer. Donations are gifts with nothing in
        return: they are not tied to any feature, information or priority access, and have nothing to do with investment
        performance. Donations are non-refundable unless sent by mistake.
      </p>

      <h2>Article 8 (Intellectual property)</h2>
      <p>
        Rights to the Service's design, logo and analysis methods belong to the operator. Rights to charts and market data
        belong to their respective providers.
      </p>

      <h2>Article 9 (Changes to these Terms)</h2>
      <p>
        The operator may change these Terms when necessary, and will announce changes on this page at least 7 days before
        they take effect.
      </p>

      <h2>Article 10 (Governing law and contact)</h2>
      <p>
        These Terms are governed by the laws of the Republic of Korea. Send inquiries about the Service to{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </>
  )
}
