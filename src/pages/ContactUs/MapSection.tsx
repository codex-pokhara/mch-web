import { Contact as ContactIcon } from 'lucide-react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function MapSection() {
    return (
        <section className="py-16 bg-gray-100">
            <MaxWidthWrapper>
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Us</h2>
                <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <ContactIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">Interactive map would be displayed here</p>
                        <p className="text-gray-500">123 Mountain View Road, Hillside, State 12345</p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default MapSection;
