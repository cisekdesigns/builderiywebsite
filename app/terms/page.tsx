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
                <p className="text-xl text-[#FFFFFF]">July 2026</p>
              </div>
            </section>

            {/* ACCEPTANCE */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Acceptance of Terms
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  By accessing or using BuilderiY, you agree to these Terms of
                  Service. If you do not agree, do not use the app.
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
                  BuilderiY provides AI-powered construction project planning,
                  concept image generation, and DIY build guidance tools. You agree
                  to use the app only in compliance with applicable laws and these
                  terms.
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
                  You are responsible for maintaining the confidentiality of your
                  account credentials and for all activity that occurs under your
                  account.
                </p>
              </div>
            </section>

            {/* ELIGIBILITY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Eligibility
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You must be at least 13 years old to access or participate in the
                  BuilderiY Featured Community. By accessing the Featured
                  Community, you represent that you meet this age requirement. We
                  may suspend or remove access to the Featured Community if we
                  reasonably believe this requirement has been violated.
                </p>
              </div>
            </section>

            {/* USER CONTENT */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                User Content
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You may provide content such as images, prompts, preferences,
                  and project data. You retain rights to your content to the extent
                  permitted by law, but you grant BuilderiY a worldwide,
                  non-exclusive license to use, host, store, process, and display
                  that content to operate and improve the service.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  You represent and warrant that you have all necessary rights,
                  permissions, and authority to upload and use any content you
                  provide.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  If you choose to share a project to the BuilderiY Featured
                  community, you grant BuilderiY a worldwide, non-exclusive,
                  royalty-free license to display that project and its associated
                  original uploaded image within the Featured section of the app
                  until you remove the submission or it is removed by BuilderiY.
                </p>
              </div>
            </section>

            {/* GENERATED OUTPUTS */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Generated Outputs
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY may generate concept images, build plans, material
                  lists, tool recommendations, construction steps, and other
                  visual and written outputs based on your inputs. Outputs are
                  provided for inspiration and planning purposes only and are not
                  professional architectural, engineering, structural, electrical,
                  plumbing, permitting, code-compliance, legal, or safety advice.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Outputs may be incomplete, inaccurate, or not feasible in
                  real-world conditions. You are solely responsible for verifying
                  dimensions, materials, permits, local building codes, structural
                  requirements, utilities, and safety before beginning
                  construction or implementing any build plan.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Due to the nature of AI systems, outputs may not be unique and
                  similar or identical results may be generated for other users.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  As between you and BuilderiY, and to the extent permitted by law,
                  you own the generated outputs. BuilderiY makes no
                  representations regarding the availability of intellectual
                  property protection for such outputs.
                </p>
              </div>
            </section>

            {/* BUILDERIY AGENT */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                BuilderiY Agent
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY includes the BuilderiY Agent, a project assistant that
                  can answer questions, provide explanations, suggest materials,
                  recommend products, and offer guidance related to your project.
                  Responses are generated automatically and may be incomplete,
                  inaccurate, or outdated.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  The BuilderiY Agent does not provide professional architectural,
                  engineering, structural, electrical, plumbing, legal,
                  permitting, inspection, code-compliance, or safety advice.
                  Conversations are provided for informational purposes only.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  You are solely responsible for verifying all measurements,
                  materials, product compatibility, local building codes,
                  permits, manufacturer instructions, and safety requirements
                  before purchasing materials or beginning work. You should
                  consult qualified professionals, your local building department,
                  or your inspector when appropriate.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Product and retailer recommendations are provided for
                  convenience only. BuilderiY does not endorse or guarantee the
                  availability, suitability, compatibility, quality, pricing,
                  performance, or safety of any recommended product or service.
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
                  You may not misuse the app, interfere with its operation,
                  attempt unauthorized access, violate applicable law, upload
                  unlawful content, or infringe the rights of others.
                </p>
              </div>
            </section>

            {/* CONTENT POLICY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Content Policy
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You may not upload, submit, generate, or share content that is
                  illegal, infringing, harmful, fraudulent, or otherwise
                  inappropriate. You may upload only content that you have the
                  legal right to use.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY uses automated moderation systems to review uploaded
                  images and may reject or remove content that violates these
                  Terms. We reserve the right to remove Featured submissions,
                  suspend or terminate accounts, or take other appropriate action
                  for violations of these Terms. No refunds will be issued for
                  violations.
                </p>
              </div>
            </section>

            {/* FEATURED COMMUNITY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Featured Community
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY allows users to voluntarily share eligible projects
                  with the Featured community. Shared projects may be viewed by
                  other users of the app.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Access to the Featured Community requires users to acknowledge
                  that they are at least 13 years old and agree to the Community
                  Guidelines. Participation in the Featured Community is optional.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Only the concept image you choose to share and its associated
                  original uploaded image are visible as part of a Featured
                  submission. No project details, prompts, preferences, account
                  information, or other project data are shared as part of a
                  Featured submission.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Users may report Featured submissions for review. Reports do not
                  automatically remove content, and BuilderiY may review reported
                  submissions using automated systems and human review.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  We reserve the right to reject, remove, or disable any Featured
                  submission at any time if it violates these Terms, our content
                  policies, applicable law, or for any other reason at our sole
                  discretion.
                </p>
              </div>
            </section>

            {/* THIRD-PARTY SERVICES */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Third-Party Services
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  Certain features rely on third-party providers. Your use of these
                  features is also subject to the terms and policies of those
                  providers.
                </p>
              </div>
            </section>

            {/* CREDITS AND PAYMENTS */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Credits and Payments
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  Certain features may require credits or purchases. Credits may
                  be consumed when unlocking projects or generating outputs. All
                  purchases are final unless required by applicable law. We may
                  modify pricing, credit structures, or feature access at any time.
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
                  We may modify, suspend, or discontinue any part of the service
                  at any time without notice. We do not guarantee uninterrupted or
                  error-free operation.
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
                  The BuilderiY app, software, branding, and related materials are
                  owned by BuilderiY or its licensors and are protected by
                  intellectual property laws.
                </p>
              </div>
            </section>

            {/* DISCLAIMERS */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Disclaimers
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  The app is provided on an “as is” and “as available” basis
                  without warranties of any kind, including accuracy, reliability,
                  or fitness for a particular purpose. BuilderiY does not provide
                  architectural, engineering, structural, electrical, plumbing,
                  permitting, code-compliance, legal, or safety advice.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  This disclaimer applies to all content generated by BuilderiY,
                  including BuilderiY Agent conversations, recommendations, build
                  plans, material lists, tool suggestions, construction steps, and
                  generated images.
                </p>
              </div>
            </section>

            {/* LIMITATION OF LIABILITY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Limitation of Liability
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  To the maximum extent permitted by law, BuilderiY is not liable
                  for indirect, incidental, special, consequential, or punitive
                  damages, including loss of data, profits, or business.
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
                  You assume all risk for any actions taken based on generated
                  outputs, including construction, purchasing materials, or
                  modifications to physical spaces. You are solely responsible for
                  verifying dimensions, materials, permits, local building codes,
                  structural requirements, utilities, and safety before beginning
                  construction.
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
                  You agree to indemnify and hold harmless BuilderiY from any
                  claims, damages, or expenses arising from your use of the app or
                  violation of these terms.
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
                  We may suspend or terminate your account at any time, with or
                  without notice, for any reason.
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
                  These Terms are governed by the laws of the State of New York.
                </p>
              </div>
            </section>

            {/* CHANGES TO TERMS */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Changes to Terms
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We may update these Terms at any time. Continued use of the app
                  constitutes acceptance of the updated terms.
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
