import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function MissionAndVision() {
    return (
        <section className="py-16 bg-blue-50">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                        <p className="text-lg text-gray-700">
                            To provide a safe, loving, and nurturing environment for vulnerable
                            children, empowering them with education, life skills, and emotional
                            support to build successful, independent lives and become positive
                            contributors to society.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                        <p className="text-lg text-gray-700">
                            A world where every child, regardless of their circumstances, has
                            access to love, care, education, and opportunities to reach their
                            full potential and live with dignity and hope.
                        </p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default MissionAndVision;
