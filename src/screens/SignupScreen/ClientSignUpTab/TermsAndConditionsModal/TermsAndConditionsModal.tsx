import { Column, Columns, Modal, Typography } from "components";

import type { FC } from "react";
import React from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TermsAndConditionsModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isModalVisible={isOpen} setModalVisible={setIsOpen}>
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography type="H3" className="text-center" weigth="bold">
            Terms and Condtions
          </Typography>
        </Column>
      </Columns>
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography>
            Introduction Welcome to Batch! These Terms and Conditions ("Terms")
            govern your use of our mobile application ("App") and the services
            provided by Batch ("we," "us," or "our"). By downloading, accessing,
            or using our App, you agree to comply with and be bound by these
            Terms. If you do not agree with these Terms, please do not use our
            App. 1. Use of the App 1.1 Eligibility: You must be at least 18
            years old to use our App. By using the App, you represent and
            warrant that you meet this age requirement. 1.2 Account
            Registration: To access certain features of the App, you may be
            required to create an account. You agree to provide accurate,
            current, and complete information during the registration process
            and to update such information as necessary to keep it accurate,
            current, and complete. 1.3 Account Security: You are responsible for
            maintaining the confidentiality of your account credentials and for
            all activities that occur under your account. You agree to notify us
            immediately of any unauthorized use of your account. 2. Services 2.1
            Meal Reservations and Purchases: Our App allows you to reserve and
            purchase batched meals from participating restaurants. All
            transactions are subject to availability and confirmation by the
            restaurant. 2.2 Payment: Payments for meals are processed through
            Stripe, our third-party payment processor. By making a payment, you
            agree to the terms and conditions of Stripe. 2.3 Refunds and
            Cancellations: Refunds and cancellations are subject to the policies
            of the participating restaurant. Please review the restaurant's
            policies before making a reservation or purchase. 3. User Conduct
            3.1 Prohibited Activities: You agree not to engage in any of the
            following activities: Violating any applicable laws or regulations.
            Using the App for any unlawful or fraudulent purposes. Interfering
            with or disrupting the operation of the App. Uploading or
            transmitting any harmful code, such as viruses or malware. 3.2 User
            Content: You are solely responsible for any content you upload or
            submit through the App. You grant us a non-exclusive, royalty-free,
            worldwide, and transferable license to use, reproduce, modify, and
            distribute your content for the purpose of operating and improving
            the App. 4. Intellectual Property 4.1 Ownership: All intellectual
            property rights in the App and its content are owned by us or our
            licensors. You may not use, reproduce, or distribute any content
            from the App without our prior written consent. 5. Disclaimers and
            Limitation of Liability 5.1 Disclaimer of Warranties: The App is
            provided on an "as-is" and "as-available" basis. We disclaim all
            warranties, whether express or implied, including the warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement. 5.2 Limitation of Liability: To the maximum extent
            permitted by law, we shall not be liable for any indirect,
            incidental, special, or consequential damages arising out of or in
            connection with your use of the App. We are not responsible for any
            adverse reactions, including food poisoning, that may result from
            consuming meals purchased through our App. 6. Indemnification You
            agree to indemnify and hold us harmless from any claims,
            liabilities, damages, and expenses (including legal fees) arising
            out of your use of the App or your violation of these Terms. 7.
            Compliance with Local Regulations All restaurants participating in
            Batch have a Food Handler's Certificate as required by Ontario
            regulations. By using the App, you acknowledge and agree that the
            participating restaurants comply with local food safety standards.
            8. Changes to the Terms We may modify these Terms at any time. Any
            changes will be effective immediately upon posting the revised Terms
            in the App. Your continued use of the App after any such changes
            constitutes your acceptance of the new Terms. 9. Governing Law These
            Terms shall be governed by and construed in accordance with the laws
            of Ontario, Canada, without regard to its conflict of law
            principles. 10. Contact Us If you have any questions about these
            Terms, please contact us at support@batch-app.info.
          </Typography>
        </Column>
      </Columns>
    </Modal>
  );
};

export { TermsAndConditionsModal };
