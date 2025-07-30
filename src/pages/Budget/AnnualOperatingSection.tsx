import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface AnnualBudgetItems{
    item: string;
    amount: string;
}

interface AnnualOperatingSectionProps{
    annualBudgetItems: AnnualBudgetItems[];
    totalBudget: string;
}

function AnnualOperatingSection(props: AnnualOperatingSectionProps) {
    const { annualBudgetItems, totalBudget } = props;
    return (
        <section className="py-12">
            <MaxWidthWrapper>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Annual Operating Budget</h2>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Budget Item</TableHead>
                                    <TableHead className="text-right">Amount (USD)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {annualBudgetItems.map((item) => (
                                    <TableRow key={item.item}>
                                        <TableCell className="font-medium">{item.item}</TableCell>
                                        <TableCell className="text-right font-semibold">{item.amount}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="border-t-2 border-gray-300 bg-gray-50">
                                    <TableCell className="font-bold text-lg">Total Annual Budget</TableCell>
                                    <TableCell className="text-right font-bold text-lg text-blue-600">{totalBudget}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default AnnualOperatingSection;
