import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

interface TransactionLoadingProps {
    progress: number;
}

export const TransactionLoading = ({ progress }: TransactionLoadingProps) => {
    return (
        <div className="animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex justify-center">
                <div className="relative">
                    <Spinner variant="ellipsis" size={48} className="text-purple-600 dark:text-purple-400" />
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Payment Processing</h2>
                <p className="text-gray-600 dark:text-gray-400">Please wait while we process your transaction...</p>
            </div>
            <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full h-3" />
            </div>
        </div>
    );
};
