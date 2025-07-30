import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface ChildWelfareActivities{
    objective: string;
    activities: string;
}

interface ChildWelfareSectionProps{
    childWelfareActivities: ChildWelfareActivities[];
}

function ChildWelfareSection(props: ChildWelfareSectionProps) {
    const { childWelfareActivities } = props;

    return (
        <section className="py-12">
            <MaxWidthWrapper>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Child Welfare Activities</h2>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Objective</TableHead>
                                    <TableHead>Activities</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {childWelfareActivities.map((activity) => (
                                    <TableRow key={activity.objective}>
                                        <TableCell className="font-medium">{activity.objective}</TableCell>
                                        <TableCell>{activity.activities}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default ChildWelfareSection;
