import SiteHeader from "@/components/SiteHeader";

export default function TermsPage() {
    return (
      <main className="min-h-screen bg-[#000000] text-[#FFFFFF]">
        <SiteHeader />
        <div className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <p
            className="text-2xl tracking-[0.18em]"
            style={{ fontFamily: "Aboreto, serif" }}
          >
            TERMS OF SERVICE
          </p>
  
          <div className="mt-12 space-y-12">
  
            {/* LAST UPDATED */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Last Updated
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-xl text-[#FFFFFF]">April 2026</p>
              </div>
            </section>
  
            {/* ACCEPTANCE */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Acceptance of Terms
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  By accessing or using BuilderiY, you agree to these Terms
                  of Service. If you do not agree, do not use the app.
                </p>
              </div>
            </section>
  
            {/* USE OF APP */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Use of the App
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY provides AI-powered design discovery,
                  personalization, and concept generation tools. You agree
                  to use the app only in compliance with applicable laws
                  and these terms.
                </p>
              </div>
            </section>
  
            {/* ACCOUNT RESPONSIBILITY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Account Responsibility
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You are responsible for maintaining the confidentiality
                  of your account credentials and for all activity that
                  occurs under your account.
                </p>
              </div>
            </section>
  
            {/* USER CONTENT */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                User Content
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You may provide content such as images, prompts,
                  preferences, and project data. You retain rights to your
                  content to the extent permitted by law, but you grant
                  BuilderiY a worldwide, non-exclusive license to use,
                  host, store, process, and display that content to
                  operate and improve the service. You represent and
                  warrant that you have all necessary rights,
                  permissions, and authority to upload and use any
                  content you provide.
                </p>
              </div>
            </section>
  
            {/* GENERATED OUTPUTS */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Generated Outputs
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY may generate visual and written outputs based
                  on your inputs. Outputs are provided for inspiration and
                  planning purposes only and are not professional
                  architectural, engineering, construction, legal, or
                  safety advice.
                </p>
  
                <p className="mt-8 text-base leading-7 text-[#EDEBE4]">
                  Outputs may be incomplete, inaccurate, or not feasible
                  in real-world conditions. You are solely responsible for
                  verifying all designs before implementation.
                </p>
  
                <p className="mt-8 text-base leading-7 text-[#EDEBE4]">
                  Due to the nature of AI systems, outputs may not be
                  unique and similar or identical results may be generated
                  for other users.
                </p>
  
                <p className="mt-8 text-base leading-7 text-[#EDEBE4]">
                  As between you and BuilderiY, and to the extent permitted
                  by law, you own the generated outputs. BuilderiY makes no
                  representations regarding the availability of
                  intellectual property protection for such outputs.
                </p>
              </div>
            </section>
  
            {/* PROHIBITED USE */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Prohibited Use
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You may not misuse the app, interfere with its
                  operation, attempt unauthorized access, violate
                  applicable law, upload unlawful content, or infringe the
                  rights of others.
                </p>
              </div>
            </section>
  
            {/* CONTENT POLICY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Content Policy
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You may not upload, submit, request, or generate
                  content that is illegal, harmful, or inappropriate.
                  This includes, but is not limited to, explicit sexual
                  content, nudity, pornographic material, sexually
                  suggestive content, or content involving minors.
                </p>
  
                <p className="mt-8 text-base leading-7 text-[#EDEBE4]">
                  Violations of this policy will result in immediate
                  content removal and may lead to suspension or permanent
                  termination of your account without prior notice. No
                  refunds will be issued for violations.
                </p>
              </div>
            </section>
  
            {/* THIRD PARTY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Third-Party Services
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  Certain features rely on third-party providers. Your use
                  of these features is also subject to the terms and
                  policies of those providers.
                </p>
              </div>
            </section>
  
            {/* PAYMENTS */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Credits and Payments
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  Certain features may require credits or purchases.
                  Credits may be consumed when unlocking projects or
                  generating outputs.
                </p>
  
                <p className="mt-8 text-base leading-7 text-[#EDEBE4]">
                  All purchases are final unless required by applicable
                  law. We may modify pricing, credit structures, or
                  feature access at any time.
                </p>
              </div>
            </section>
  
            {/* SERVICE AVAILABILITY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Service Availability
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We may modify, suspend, or discontinue any part of the
                  service at any time without notice. We do not guarantee
                  uninterrupted or error-free operation.
                </p>
              </div>
            </section>
  
            {/* INTELLECTUAL PROPERTY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Intellectual Property
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  The BuilderiY app, software, branding, and related
                  materials are owned by BuilderiY or its licensors and are
                  protected by intellectual property laws.
                </p>
              </div>
            </section>
  
            {/* DISCLAIMERS */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Disclaimers
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  The app is provided on an “as is” and “as available”
                  basis without warranties of any kind, including
                  accuracy, reliability, or fitness for a particular
                  purpose.
                </p>
              </div>
            </section>
  
            {/* LIABILITY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Limitation of Liability
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  To the maximum extent permitted by law, BuilderiY is not
                  liable for indirect, incidental, special,
                  consequential, or punitive damages, including loss of
                  data, profits, or business.
                </p>
              </div>
            </section>
  
            {/* USER RESPONSIBILITY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                User Responsibility
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You assume all risk for any actions taken based on
                  generated outputs, including construction, purchasing,
                  or modifications to physical spaces.
                </p>
              </div>
            </section>
  
            {/* INDEMNIFICATION */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Indemnification
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You agree to indemnify and hold harmless BuilderiY from
                  any claims, damages, or expenses arising from your use
                  of the app or violation of these terms.
                </p>
              </div>
            </section>
  
            {/* TERMINATION */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Termination
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We may suspend or terminate your account at any time,
                  with or without notice, for any reason.
                </p>
              </div>
            </section>
  
            {/* GOVERNING LAW */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Governing Law
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  These Terms are governed by the laws of the State of
                  New York.
                </p>
              </div>
            </section>
  
            {/* CHANGES */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Changes to Terms
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We may update these Terms at any time. Continued use of
                  the app constitutes acceptance of the updated terms.
                </p>
              </div>
            </section>
  
            {/* CONTACT */}
            <section className="pb-12">
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Contact
              </p>
  
              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                  Support Email
                </p>
  
                <p className="mt-4 text-xl text-[#FFFFFF]">
                  support@builderiy.app
                </p>
              </div>
            </section>
  
          </div>
        </div>
        </div>
      </main>
    );
  }