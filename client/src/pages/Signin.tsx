import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PageTitle } from '@/components/ui/typography';
import { AuthLayout } from '@/components/AuthLayout';

const formSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
});

export const Signin = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    </form>
                </Form>

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
                    Don't have an account?{' '}
                    <Link className="font-medium text-blue-600 hover:text-blue-500" to="/signup">
                        Sign Up
                    </Link>
                </p>
            </AuthLayout>
        </div>
    );
};
