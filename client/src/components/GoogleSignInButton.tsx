import { Button } from './ui/button';
import { GoogleIcon } from './GoogleIcon';
import { Spinner } from './ui/shadcn-io/spinner';

interface GoogleSignInButtonProps {
    isLoading?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export const GoogleSignInButton = ({ isLoading = false, disabled = false, onClick }: GoogleSignInButtonProps) => {
    return (
        <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center py-2 px-4 border hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <>
                    <Spinner variant="default" size={20} className="mr-2" />
                    Loading...
                </>
            ) : (
                <>
                    <GoogleIcon className="h-5 w-5 mr-2" />
                    Sign in with Google
                </>
            )}
        </Button>
    );
};
