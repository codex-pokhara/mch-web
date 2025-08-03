import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function ContactSection() {
    return (
        <section className="py-12 bg-gray-100">
            <MaxWidthWrapper>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        For detailed project proposals or partnership inquiries,
                        please contact us
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Chairman</h3>
                            <p className="text-gray-600">Ramesh Dev Sunar</p>
                            <p className="text-gray-600">Phone: +977 9860469271</p>
                            <p className="text-gray-600">Email: orphanhomedadagoun@gmail.com</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Manager</h3>
                            <p className="text-gray-600">Raj Kumar Sunar</p>
                            <p className="text-gray-600">Phone: +977-9860469271</p>
                            <p className="text-gray-600">Email: orphanhomedadagoun@gmail.com</p>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default ContactSection;
