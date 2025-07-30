import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface SdgAlignment{
    sdg: string;
    title: string;
    activities: string;
}

interface SDGSectionProps{
    sdgAlignment: SdgAlignment[];
}

function SDGSection(props:SDGSectionProps) {
    const { sdgAlignment } = props;

    return (
        <section className="py-12">
            <MaxWidthWrapper>
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">UN Sustainable Development Goals Alignment</h2>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">SDG</TableHead>
                                    <TableHead className="w-[200px]">Title</TableHead>
                                    <TableHead>Our Activities</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sdgAlignment.map((sdg) => (
                                    <TableRow key={sdg.sdg}>
                                        <TableCell className="font-bold text-blue-600">{sdg.sdg}</TableCell>
                                        <TableCell className="font-medium">{sdg.title}</TableCell>
                                        <TableCell>{sdg.activities}</TableCell>
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

export default SDGSection;
