import { AuthLayout } from '@/components/AuthLayout';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { GradientButton } from '@/components/GradientButton';
import { Header } from '@/components/Header';
import { OrSeparator } from '@/components/OrSeparator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PageTitle } from '@/components/ui/typography';
import { api } from '@/services/api';
import { extractErrorMessage } from '@/utils/errorHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
});

export const Signin: FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            await api.auth.signin(values.email, values.password);
            toast.success('You logged in successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            const errorMessage = extractErrorMessage(error);
            toast.error('Signin failed', {
                description: errorMessage,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignin = async () => {
        setIsGoogleLoading(true);
        toast.info('Google sign-in coming soon');
        // TODO: Implement Google OAuth flow
        setTimeout(() => {
            setIsGoogleLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
            <Header />

            {/* Body */}
            <AuthLayout>
                <PageTitle>Welcome back!</PageTitle>
                <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">
                    Enter your Credentials to access your account
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <GradientButton isLoading={isSubmitting}>
                            Sign In
                        </GradientButton>

                        <OrSeparator />

                        <GoogleSignInButton
                            isLoading={isGoogleLoading}
                            disabled={isSubmitting}
                            onClick={handleGoogleSignin}
                        />

                        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                            Don't have an account?{' '}
                            <Link className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400" to="/signup">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </Form>
            </AuthLayout>
        </div>
    );
};
