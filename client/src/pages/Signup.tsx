import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Header } from '@/components/Header';
import { LegalDialogs } from '@/components/LegalDialogs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PURPLE_GRADIENT_BG } from '@/constants';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { PageTitle } from '@/components/ui/typography';
import { AuthLayout } from '@/components/AuthLayout';
import { api } from '@/services/api';

const formSchema = z.object({
    fullName: z.string().refine(
        (name) => {
            const words = name.trim().split(/\s+/);
            return words.length === 2 && words.every((word) => word.length > 1);
        },
        {
            message: 'Please enter a valid full name - At least two letters for each name (Example: ac dc)',
        }
    ),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    terms: z.boolean().refine((data) => data === true, {
        message: 'You must accept the terms and conditions.',
    }),
});

export const Signup = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            terms: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await api.auth.signup(values.fullName, values.email, values.password);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            // Handle signup error
        }
    };

    return (
        <div
            className="bg-gray-100 min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100"
            style={{ fontFamily: 'Roboto, sans-serif' }}
        >
            <Header />

            <AuthLayout>
                <PageTitle>Open your account Now</PageTitle>
                <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">Welcome! Let's set up your account</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            I agree to the <LegalDialogs variant="combined" />
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full text-white font-bold py-3 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105"
                            style={{
                                background: PURPLE_GRADIENT_BG,
                            }}
                            type="submit"
                        >
                            Signup
                        </Button>

                        <div className="my-6 flex items-center">
                            <div className="flex-grow bg-gray-300 h-px"></div>
                            <span className="flex-shrink text-sm text-gray-500 px-4">or</span>
                            <div className="flex-grow bg-gray-300 h-px"></div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center py-2 px-4 border hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <img
                                alt="Google icon"
                                className="h-5 w-5 mr-2"
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            />
                            Sign in with Google
                        </Button>

                        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                            Have an account?{' '}
                            <Link className="font-medium text-blue-600 hover:text-blue-500" to="/signin">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </Form>
            </AuthLayout>
        </div>
    );
};
