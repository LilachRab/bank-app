import { Separator } from '@/components/ui/separator';

export const OrSeparator = () => {
    return (
        <div className="flex items-center w-full">
            <Separator className="flex-1 bg-gray-200 dark:bg-gray-700" />
            <span className="px-3 text-sm  bg-inherit">or</span>
            <Separator className="flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>
    );
};
