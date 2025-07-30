import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface SustainableDevelopmentProjects{
    objective: string;
    activities: string;
    budgetUSD: string;
}

interface SustainableSectionProp{
    sustainableDevelopmentProjects: SustainableDevelopmentProjects[];
}

function SustainableSection(props : SustainableSectionProp) {
    const { sustainableDevelopmentProjects } = props;

    return (
        <section className="py-12">
            <MaxWidthWrapper>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Sustainable Development Projects</h2>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Objective</TableHead>
                                    <TableHead>Activities</TableHead>
                                    <TableHead className="text-right">Budget (USD)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sustainableDevelopmentProjects.map((project) => (
                                    <TableRow key={project.objective}>
                                        <TableCell className="font-medium">{project.objective}</TableCell>
                                        <TableCell>{project.activities}</TableCell>
                                        <TableCell className="text-right font-semibold">{project.budgetUSD}</TableCell>
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

export default SustainableSection;
