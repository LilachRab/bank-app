import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PageTitle } from '@/components/ui/typography';
import { AuthLayout } from '@/components/AuthLayout';
import { api } from '@/services/api';
import { OrSeparator } from '@/components/OrSeparator';
import { GoogleIcon } from '@/components/GoogleIcon';
import { toast } from 'sonner';
import axios from 'axios';

const formSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
});

export const Signin = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await api.auth.signin(values.email, values.password);
            toast.success('You logged in successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            let errorMessage = 'An unexpected error occurred. Please try again.';

            if (axios.isAxiosError(error) && error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error instanceof Error && error.message) {
                errorMessage = error.message;
            }

            toast.error('Signin failed', {
                description: errorMessage,
            });
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
            style={{ fontFamily: 'Roboto, sans-serif' }}
        >
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
                        <Button
                            className="w-full text-white font-bold py-3 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105"
                            style={{
                                background: 'linear-gradient(90deg, #2E2355 0%, #654DBB 100%)',
                            }}
                            type="submit"
                        >
                            Sign In
                        </Button>

                        <OrSeparator />

                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center py-2 px-4 border hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <GoogleIcon className="h-5 w-5 mr-2" />
                            Sign in with Google
                        </Button>

                        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                            Don't have an account?{' '}
                            <Link className="font-medium text-blue-600 hover:text-blue-500" to="/signup">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </Form>
            </AuthLayout>
        </div>
    );
};
