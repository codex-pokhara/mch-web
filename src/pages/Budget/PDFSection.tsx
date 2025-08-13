import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function PDFSection() {
    return (
        <section className="py-12">
            <MaxWidthWrapper>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Detailed MCH Proposal Report</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Get the complete budget breakdown and project documentation in PDF format
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="/MCH.pdf"
                            download="Mountain-Children-Home.pdf"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Budget Report (PDF)
                        </a>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        File size: ~2.5 MB | Last updated: August 2025
                    </p>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default PDFSection;
