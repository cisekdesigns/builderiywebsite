import SiteHeader from "@/components/SiteHeader";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFFFF]">
      <SiteHeader />
      <div className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <p
            className="text-2xl tracking-[0.18em]"
            style={{ fontFamily: "Aboreto, serif" }}
          >
            PRIVACY POLICY
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

            {/* OVERVIEW */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Overview
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY collects and uses information to operate the app,
                  generate AI-powered construction project experiences, and improve
                  product performance.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  We never sell or share your personal identity. This includes
                  your email, uploaded images, and any data that can identify
                  you.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Any data used for insights is aggregated and anonymized, meaning
                  it cannot be linked back to you.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  We do not build individual user profiles for advertising or sell
                  behavioral data.
                </p>
              </div>
            </section>

            {/* INFORMATION WE COLLECT */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Information We Collect
              </p>

              <div className="overflow-hidden rounded-[2rem] border border-[#2A2A2A] bg-[#121212]">

                <div className="border-b border-[#2A2A2A] p-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                    Account Information
                  </p>

                  <p className="mt-4 text-base leading-7 text-[#EDEBE4]">
                    We collect basic account information such as your email address
                    and authentication details.
                  </p>
                </div>

                <div className="border-b border-[#2A2A2A] p-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                    Project and Build Data
                  </p>

                  <p className="mt-4 text-base leading-7 text-[#EDEBE4]">
                    We collect uploaded project photos, project details, generated
                    concept images, generated build plans, material recommendations,
                    tool recommendations, construction-related project data, prompts,
                    preferences, and project-related activity within the app.
                  </p>
                </div>

                <div className="border-b border-[#2A2A2A] p-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                    Usage and Analytics
                  </p>

                  <p className="mt-4 text-base leading-7 text-[#EDEBE4]">
                    We collect usage data such as interactions, feature usage,
                    session activity, and performance metrics.
                  </p>
                </div>

                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                    Device Information
                  </p>

                  <p className="mt-4 text-base leading-7 text-[#EDEBE4]">
                    We may collect device information such as device type, operating
                    system, and basic identifiers to ensure proper app functionality
                    and performance.
                  </p>
                </div>

              </div>
            </section>

            {/* HOW WE USE INFORMATION */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                How We Use Information
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We use your information to operate the app, generate concept
                  images, build plans, material and tool recommendations,
                  construction steps, and other project outputs, save projects,
                  personalize results, improve system performance, monitor usage,
                  and maintain security.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  Your uploaded images and project data are used to generate your
                  requested project experience and are not used to train public
                  AI models.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  We may use project data and interaction patterns to improve system
                  performance and product features.
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
                  If you choose to share a project to the Featured community, the
                  concept image you select and its associated original uploaded
                  image may be visible to other users of the app.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  No project details, prompts, preferences, account information, or
                  other project data are shared as part of a Featured submission
                  unless you choose to share them separately.
                </p>
              </div>
            </section>

            {/* AUTOMATED IMAGE MODERATION */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Automated Image Moderation
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY uses automated moderation systems to review uploaded
                  images and Featured submissions. Images may be processed to
                  determine eligibility for sharing and to help enforce our content
                  policies.
                </p>
              </div>
            </section>

            {/* COMMUNITY REPORTING */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Community Reporting
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  Users may report Featured submissions for review. Reports are
                  stored and may be reviewed using automated systems and human
                  review. Reports do not automatically remove content.
                </p>
              </div>
            </section>

            {/* DATA PROCESSING */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Data Processing and Third Parties
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We use third-party services for authentication, data storage,
                  analytics, payments, and AI-powered generation.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  These providers process data only as needed to perform their
                  functions and are contractually obligated to protect your
                  information.
                </p>
              </div>
            </section>

            {/* DATA SHARING */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Data Sharing
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We do not sell your personal information or any data that can be
                  used to identify you as an individual.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  We do not use your personal project data to serve third-party
                  advertisements.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  We may use general attributes such as region in combination with
                  aggregated usage patterns to generate insights. These insights
                  are processed in a way that cannot identify individual users.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  We may use and share aggregated, anonymized data such as project
                  preferences, feature usage, and usage trends. This data does not
                  identify individual users and may be used to generate insights
                  or reports for partners.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  All data shared externally is aggregated and anonymized, is not
                  linked to individual user accounts, email addresses, or
                  identifiers, and cannot be used to identify you.
                </p>
              </div>
            </section>

            {/* DATA RETENTION */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Data Retention
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We retain data for as long as necessary to operate the app,
                  support your account and projects, improve the service, and
                  comply with legal obligations.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  If you delete your account, your data is deleted as part of that
                  process.
                </p>
              </div>
            </section>

            {/* DATA RIGHTS */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Data Rights
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8 space-y-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  You may request access, correction, or deletion of your data.
                </p>

                <p className="text-base leading-7 text-[#EDEBE4]">
                  When you delete your account, your personal data and associated
                  project data are permanently deleted from our systems, except
                  where retention is required by law.
                </p>
              </div>
            </section>

            {/* SECURITY */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Security
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We implement reasonable administrative, technical, and
                  organizational safeguards to protect your information. No system
                  can guarantee complete security.
                </p>
              </div>
            </section>

            {/* CHILDREN */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Children
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  BuilderiY is not intended for children under 13, and we do not
                  knowingly collect personal information from children under 13.
                </p>
              </div>
            </section>

            {/* CHANGES */}
            <section>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#9A9A9A]">
                Changes to This Policy
              </p>

              <div className="rounded-[2rem] border border-[#2A2A2A] bg-[#121212] p-8">
                <p className="text-base leading-7 text-[#EDEBE4]">
                  We may update this Privacy Policy from time to time. Continued
                  use of the app means the updated policy applies.
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
