import Hero from '../../components/ui/Hero';
import MembershipForm from '../../components/forms/MembershipForm';

export default function BecomeMember() {
  return (
    <>
      <Hero
        title="Become a Member"
        subtitle="Join our community of businesswomen and unlock exclusive opportunities for growth and networking."
        bgImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Application Form</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Please fill out the form below with your details. Our team will review your application
                and contact you within 5 business days. If you have any questions, please contact us at
                <a href="mailto:info@nabw.org" className="text-primary-600 hover:underline"> info@nabw.org</a>.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <MembershipForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
