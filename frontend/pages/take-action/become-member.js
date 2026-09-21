import Hero from '../../components/ui/Hero';

const membershipRegistrationUrl = 'https://forms.gle/Ddy1vJcfHQa3ngzb7';

export default function BecomeMember() {
  return (
    <>
      <Hero
        title="Become a Member"
        subtitle="Join NABW and connect with a strong network of women entrepreneurs, leaders and advocates across Malawi."
        bgImage="/images/MUSME5.jpg"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Application Form</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete the membership registration form to join NABW. If you have any questions, please contact NABW at
                <a href="mailto:nabwmalawi@gmail.com" className="text-primary-600 hover:underline"> nabwmalawi@gmail.com</a>.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600 mb-6">
                The membership application is completed securely through our online registration form.
              </p>
              <a href={membershipRegistrationUrl} className="btn-primary inline-flex">
                Open Membership Registration Form
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
