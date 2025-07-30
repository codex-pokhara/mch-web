import AnnualOperatingSection from './AnnualOperatingSection';
import BudgetOverview from './BudgetOverview';
import ChildWelfareSection from './ChildWelfareSection';
import ContactSection from './ContactSection';
import SDGSection from './SDGSection';
import SustainableSection from './SustainableSection';

import HeroSection from '@/components/HeroSection';

function Budget() {
    const title = 'Budget & Project Details';
    const description = 'Detailed breakdown of our annual budget and project activities for Mountain Children Home';

    const sustainableDevelopmentProjects = [
        {
            objective: 'Solar Energy',
            activities: 'Install solar panels, rechargeable batteries',
            budgetUSD: '$10,384.62',
        },
        {
            objective: 'Waste Management',
            activities: 'Segregation, composting, creative reuse',
            budgetUSD: '$1,000.00',
        },
        {
            objective: 'Afforestation',
            activities: 'Plant native trees; educate on conservation',
            budgetUSD: '$1,000.00',
        },
        {
            objective: 'Eco-Friendly Buildings',
            activities: 'Sustainable materials, natural ventilation',
            budgetUSD: '$69,230.77',
        },
        {
            objective: 'E-Library/Computer Room',
            activities: 'Digital literacy tools, internet access',
            budgetUSD: '$6,153.85',
        },
    ];

    const childWelfareActivities = [
        {
            objective: 'Education',
            activities: 'School fees, tutors, vocational training',
        },
        {
            objective: 'Healthcare',
            activities: 'Medical check-ups, insurance, mental health support',
        },
        {
            objective: 'Recreation',
            activities: 'Sports (yoga, football), music, festivals',
        },
    ];

    const annualBudgetItems = [
        { item: 'Food', amount: '$25,416.77' },
        { item: 'Clothing', amount: '$6,311.54' },
        { item: 'Staff Salaries', amount: '$13,015.38' },
        { item: 'Healthcare', amount: '$1,989.23' },
        { item: 'Education', amount: '$15,000.00' },
        { item: 'Infrastructure Maintenance', amount: '$8,000.00' },
        { item: 'Utilities', amount: '$3,500.00' },
        { item: 'Transportation', amount: '$2,000.00' },
        { item: 'Administrative Costs', amount: '$4,000.00' },
        { item: 'Emergency Fund', amount: '$5,000.00' },
    ];

    const sdgAlignment = [
        { sdg: 'SDG 1', title: 'No Poverty', activities: 'Providing shelter, food, and basic needs' },
        { sdg: 'SDG 2', title: 'Zero Hunger', activities: 'Nutritious meals, food security' },
        { sdg: 'SDG 3', title: 'Good Health', activities: 'Healthcare services, mental health support' },
        { sdg: 'SDG 4', title: 'Quality Education', activities: 'School enrollment, vocational training, e-library' },
        { sdg: 'SDG 5', title: 'Gender Equality', activities: 'Equal opportunities for all children' },
        { sdg: 'SDG 7', title: 'Clean Energy', activities: 'Solar energy installation' },
        { sdg: 'SDG 10', title: 'Reduced Inequalities', activities: 'Supporting marginalized children' },
        { sdg: 'SDG 11', title: 'Sustainable Cities', activities: 'Sustainable building practices' },
        { sdg: 'SDG 13', title: 'Climate Action', activities: 'Environmental education, afforestation' },
        { sdg: 'SDG 16', title: 'Peace & Justice', activities: 'Child protection, anti-violence policies' },
    ];

    const totalBudget = '$155,450.62';
    const totalBudgetNPR = 'NPR 20,118,580';

    return (
        <div className="min-h-screen bg-gray-50">
            <HeroSection title={title} description={description} />
            <BudgetOverview totalBudget={totalBudget} totalBudgetNPR={totalBudgetNPR} />
            <SustainableSection sustainableDevelopmentProjects={sustainableDevelopmentProjects} />
            <ChildWelfareSection childWelfareActivities={childWelfareActivities} />
            <AnnualOperatingSection
                annualBudgetItems={annualBudgetItems}
                totalBudget={totalBudget}
            />
            <SDGSection sdgAlignment={sdgAlignment} />
            <ContactSection />
        </div>

    );
}

export default Budget;
