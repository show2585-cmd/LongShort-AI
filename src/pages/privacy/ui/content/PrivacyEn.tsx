import { APP_NAME, CONTACT_EMAIL } from '@/shared/config'

export function PrivacyEn({ effectiveDate }: { effectiveDate: string }) {
  return (
    <>
      <p>
        {APP_NAME} (the "Service") complies with the Personal Information Protection Act of Korea and other applicable laws,
        and publishes this Privacy Policy to protect users' personal information.
      </p>
      <p>
        <em>
          This English version is provided for convenience. If it differs from the Korean version, the Korean version
          prevails.
        </em>
      </p>

      <h2>1. Personal information processed and how it is collected</h2>
      <p>
        The Service <strong>has no sign-up feature</strong> and does not ask for information that directly identifies you,
        such as your name or contact details. However, the following information may be generated and collected
        automatically while you use the Service.
      </p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Collected by · how</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>IP address, access time, browser and device information, requested URL</td>
            <td>Recorded automatically in the hosting provider's (Vercel) server logs</td>
          </tr>
          <tr>
            <td>Usage statistics such as pages visited, time on page, referral source and approximate region</td>
            <td>Collected automatically via Google Analytics cookies</td>
          </tr>
          <tr>
            <td>Ad impression and click information, advertising identifiers</td>
            <td>Collected automatically via cookies from Google AdSense and third-party ad vendors</td>
          </tr>
          <tr>
            <td>"Don't show again today" setting for the notice popup, and language preference</td>
            <td>Stored only in your browser's local storage (localStorage) and never sent to a server</td>
          </tr>
          <tr>
            <td>Email address and message content</td>
            <td>Only when you send us an inquiry email</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Purposes of processing</h2>
      <ul>
        <li>Providing and reliably operating the Service, and responding to outages and abuse</li>
        <li>Improving the Service through usage statistics</li>
        <li>Serving ads and measuring ad performance</li>
        <li>Responding to user inquiries</li>
      </ul>

      <h2>3. Retention period</h2>
      <ul>
        <li>Server access logs: according to the hosting provider's retention policy</li>
        <li>Google Analytics data: up to 14 months from collection</li>
        <li>Ad cookies: according to each ad vendor's policy (you can delete them at any time)</li>
        <li>Inquiry emails: deleted within one year after the inquiry is resolved</li>
      </ul>

      <h2>4. Disclosure to third parties</h2>
      <p>
        The Service does not provide users' personal information to third parties, except where required by law or upon a
        lawful request from investigative authorities.
      </p>

      <h2>5. Outsourcing and overseas transfer</h2>
      <p>
        The Service uses the providers below to operate, and information may be stored and processed on servers outside
        Korea in the process.
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Outsourced task</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vercel Inc.</td>
            <td>Website hosting, server log processing</td>
            <td>United States and others (including the Seoul region)</td>
          </tr>
          <tr>
            <td>Google LLC</td>
            <td>Usage analytics (Google Analytics), ad serving (Google AdSense)</td>
            <td>United States and others</td>
          </tr>
        </tbody>
      </table>

      <h2>6. Cookies and advertising</h2>
      <p>
        The Service uses cookies for usage analytics and ad serving. A cookie is a small text file that a website stores in
        your browser.
      </p>
      <ul>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other
          websites.
        </li>
        <li>
          Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this
          site and/or other sites on the Internet.
        </li>
        <li>
          You may opt out of personalized advertising by visiting{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          , and opt out of third-party vendors' cookies for personalized advertising at{' '}
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">
            www.aboutads.info
          </a>
          .
        </li>
        <li>
          See{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            How Google uses information from sites or apps that use its services
          </a>{' '}
          for details on Google's data practices.
        </li>
      </ul>
      <h3>How to refuse cookies</h3>
      <p>
        You can block or delete cookies in your browser settings (e.g. Chrome → Settings → Privacy and security →
        Third-party cookies). The main features of the Service remain available if you refuse cookies, but some personalized
        ads may not be shown.
      </p>

      <h2>7. Destruction of personal information</h2>
      <p>
        Personal information is destroyed without delay once its retention period expires or its purpose is fulfilled.
        Electronic files are deleted in a way that cannot be recovered.
      </p>

      <h2>8. Your rights and how to exercise them</h2>
      <p>
        You may at any time request access to, correction, deletion or suspension of processing of your personal
        information. Contact us at the address below and we will act without delay.
      </p>

      <h2>9. Security measures</h2>
      <ul>
        <li>All communication is encrypted with HTTPS.</li>
        <li>The Service does not store users' personal information in a separate database.</li>
      </ul>

      <h2>10. Privacy officer</h2>
      <ul>
        <li>Contact: {APP_NAME} operator</li>
        <li>
          Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </li>
      </ul>
      <p>
        For other reports or consultations on privacy infringement, you can contact the Personal Information Infringement
        Report Center (privacy.kisa.or.kr / 118 in Korea) or the Personal Information Dispute Mediation Committee
        (www.kopico.go.kr / 1833-6972).
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        This policy is effective from {effectiveDate}. Any changes will be announced on this page at least 7 days before they
        take effect.
      </p>
    </>
  )
}
