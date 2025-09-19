import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface LegalDialogsProps {
    variant?: 'separate' | 'combined';
    triggerText?: string;
}

const sections = [
    {
        id: 'terms',
        title: 'Terms of Service',
        content: `By using my app, you agree to trust a junior full stack developer writing this app 
      in collaboration with Cursor. I provide these banking 'services' with care, 
      but I am not liable for issues caused by unauthorized access or by an Iranian cyber attack. 
      I may update these terms occasionally, and continue add features, 
      so use of the app constitutes acceptance of the changes.
      
      Good luck!`,
        triggerLabel: 'Terms of Service',
    },
    {
        id: 'privacy',
        title: 'Privacy Policy',
        content: `I respect your privacy and am committed to protecting your personal information. 
      Any data you share here is stored securely using Neon, and used solely to provide and 
      improve my banking services. I do not sell or share your information 
      (who cares about fake bank accounts, really) with third parties without your consent, 
      except as required by law.`,
        triggerLabel: 'Privacy Policy',
    },
];

export const LegalDialogs = ({ variant = 'separate', triggerText = 'terms & policy' }: LegalDialogsProps) => {
    if (variant === 'combined') {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <button type="button" className="text-blue-600 hover:text-blue-500 underline cursor-pointer">
                        {triggerText}
                    </button>
                </DialogTrigger>
                <DialogContent>
                    {sections.map(({ id, title, content }) => (
                        <div key={id} className="mt-2 first:mt-0">
                            <DialogHeader>
                                <DialogTitle>{title}</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>{content}</DialogDescription>
                        </div>
                    ))}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <>
            {sections.map(({ id, title, content, triggerLabel }) => (
                <Dialog key={id}>
                    <DialogTrigger asChild>
                        <button className="text-gray-500 hover:text-black dark:text-gray-400 cursor-pointer">
                            {triggerLabel}
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>{content}</DialogDescription>
                    </DialogContent>
                </Dialog>
            ))}
        </>
    );
};
