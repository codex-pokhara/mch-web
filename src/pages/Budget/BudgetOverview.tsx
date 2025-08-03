import MaxWidthWrapper from '@/components/MaxWidthWrapper';

interface BudgetOverviewProp{
    totalBudget: string;
    totalBudgetNPR: string;
}

function BudgetOverview(props: BudgetOverviewProp) {
    const { totalBudget, totalBudgetNPR } = props;
    return (
        <section className="py-12">
            <MaxWidthWrapper>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Budget Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Annual Budget (USD)</h3>
                            <p className="text-3xl font-bold text-blue-600">{totalBudget}</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Annual Budget (NPR)</h3>
                            <p className="text-3xl font-bold text-green-600">{totalBudgetNPR}</p>
                        </div>
                        <div className="bg-orange-50 p-6 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Children Served</h3>
                            <p className="text-3xl font-bold text-orange-600">38</p>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default BudgetOverview;
