import DashboardLayout from '@/app/dashboard/layout';
import NewTripWizard from '@/components/trips/NewTripWizard';

export default function NewTripPage() {
    return (
        <DashboardLayout>
            <div className="p-8 pt-12 min-h-screen">
                <NewTripWizard />
            </div>
        </DashboardLayout>
    );
}
