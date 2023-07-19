import styled from 'styled-components'
/* eslint-disable */

const Container = styled.div`
  padding: 50px;
`

export const PrivacyPolicy = () => {
  return (
    <Container>
      <h1>Privacy Policy</h1>
      <p>Effective Date: 2023/07/19</p>
      <p>
        Thank you for using our website for generating invoices. We are
        committed to protecting your privacy and ensuring the security of your
        personal information. This Privacy Policy outlines how we collect, use,
        and handle your data when you access and use our website. By using our
        website, you consent to the practices described in this policy.
      </p>

      <h2>1. Information Collected:</h2>
      <p>
        We only collect the minimum information required to provide our invoice
        generation services. The information we collect may include:
      </p>
      <ul>
        <li>Your name (for identification purposes).</li>
        <li>Your email address (to send generated invoices).</li>
        <li>Your company name (if provided for invoicing purposes).</li>
        <li>
          Invoice details such as billing address, product or service details,
          and payment terms (entered by you during the invoice creation
          process).
        </li>
      </ul>

      <h2>2. Use of Information:</h2>
      <p>
        We use the information collected solely for the purpose of generating
        and delivering invoices as per your requests. Your data will not be used
        for any other purposes, and we will not sell, rent, or share your
        personal information with third parties without your explicit consent,
        unless required by law.
      </p>

      <h2>3. Google Authentication:</h2>
      <p>
        To enhance the security of your account, we offer Google Authentication
        as an option for logging in. By using this feature, you agree to the
        collection and processing of your authentication data by Google. We do
        not have access to your Google password or any other sensitive data from
        your Google account.
      </p>

      <h2>4. Google Analytics:</h2>
      <p>
        We use Google Analytics to gather insights into how users interact with
        our website. Google Analytics may collect data such as your IP address,
        browser type, device information, and usage patterns. This data is used
        to improve our website's functionality and user experience. However, we
        do not track any personally identifiable information (PII) through
        Google Analytics.
      </p>

      <h2>5. Data Security:</h2>
      <p>
        We take reasonable measures to protect your data from unauthorized
        access, alteration, or disclosure. However, please note that no method
        of transmission over the internet or electronic storage is 100% secure.
        Therefore, while we strive to use commercially acceptable means to
        protect your information, we cannot guarantee its absolute security.
      </p>

      <h2>6. Data Retention:</h2>
      <p>
        We will retain your information for as long as necessary to provide the
        services and fulfill the purposes outlined in this Privacy Policy, or as
        required by law. After which, your data will be securely deleted.
      </p>

      <h2>7. Third-Party Links:</h2>
      <p>
        Our website may contain links to third-party websites or services.
        Please note that we are not responsible for the privacy practices of
        such external sites. We encourage you to read the privacy policies of
        those websites you visit.
      </p>

      <h2>8. Changes to this Privacy Policy:</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or for other operational, legal, or regulatory reasons.
        We will post any revised Privacy Policy on this page with a new
        effective date. We encourage you to review this page periodically to
        stay informed about our data practices.
      </p>

      <h2>9. Contact Us:</h2>
      <p>
        If you have any questions or concerns regarding this Privacy Policy or
        the way we handle your data, please contact us at{' '}
        <a href="team@invoicegen.online">team@invoicegen.online</a>.
      </p>

      <p>
        By using our website, you acknowledge that you have read and understood
        this Privacy Policy and consent to the collection, use, and disclosure
        of your information as described herein.
      </p>
    </Container>
  )
}

export default PrivacyPolicy
