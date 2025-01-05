import './LandingPage.css';

export default function LandingPage() {
    return(
        <div class="flex flex-col min-h-screen">
            <header class="px-4 lg:px-6 h-14 flex items-center">
                <a class="flex items-center justify-center" href="#">
                    <svg class="h-6 w-6">Dumbbell Icon SVG</svg>
                    <span class="ml-2 text-2xl font-bold">FitTrack</span>
                </a>
                <nav class="ml-auto flex gap-4 sm:gap-6">
                    <a class="text-sm font-medium" href="#">Features</a>
                    <a class="text-sm font-medium" href="#">Pricing</a>
                    <a class="text-sm font-medium" href="#">About</a>
                    <a class="text-sm font-medium" href="#">Contact</a>
                </nav>
            </header>
            <main class="flex-1">
                <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div class="container px-4 md:px-6">
                        <div class="flex flex-col items-center space-y-4 text-center">
                            <div class="space-y-2">
                                <h1 class="text-3xl font-bold">Your Personal Fitness Journey Starts Here</h1>
                                <p class="mx-auto max-w-700px text-gray-500">Create, modify, and discover exercises and workouts tailored to your fitness goals.</p>
                            </div>
                            <div class="space-x-4">
                                <button>Get Started</button>
                                <button class="outline">Learn More</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div class="container px-4 md:px-6">
                        <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
                        <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                            <div class="flex flex-col items-center space-y-3 text-center">
                                <div class="p-3 rounded-full bg-blue-500 text-white">
                                    <svg class="h-6 w-6">Plus Icon SVG</svg>
                                </div>
                                <h3 class="text-xl font-bold">Create Exercises</h3>
                                <p class="text-gray-500">Design custom exercises that fit your unique fitness routine.</p>
                            </div>
                            <div class="flex flex-col items-center space-y-3 text-center">
                                <div class="p-3 rounded-full bg-green-500 text-white">
                                    <svg class="h-6 w-6">Edit Icon SVG</svg>
                                </div>
                                <h3 class="text-xl font-bold">Modify Workouts</h3>
                                <p class="text-gray-500">Easily adjust and personalize your workout plans as you progress.</p>
                            </div>
                            <div class="flex flex-col items-center space-y-3 text-center">
                                <div class="p-3 rounded-full bg-purple-500 text-white">
                                    <svg class="h-6 w-6">Search Icon SVG</svg>
                                </div>
                                <h3 class="text-xl font-bold">Discover Exercises</h3>
                                <p class="text-gray-500">Explore a vast library of exercises to diversify your workouts.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="w-full py-12 md:py-24 lg:py-32">
                    <div class="container px-4 md:px-6">
                        <div class="flex flex-col items-center space-y-4 text-center">
                            <div class="space-y-2">
                                <h2 class="text-3xl font-bold">Start Your Fitness Journey Today</h2>
                                <p class="mx-auto max-w-600px text-gray-500">Join thousands of users who have transformed their lives with FitTrack.</p>
                            </div>
                            <div class="w-full max-w-sm space-y-2">
                                <form class="flex space-x-2">
                                    <input class="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                                    <button type="submit">Sign Up</button>
                                </form>
                                <p class="text-xs text-gray-500">
                                By signing up, you agree to our <a class="underline" href="#">Terms & Conditions</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
                <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
                    <p class="text-xs text-gray-500">© 2023 FitTrack. All rights reserved.</p>
                    <nav class="sm:ml-auto flex gap-4 sm:gap-6">
                        <a class="text-xs" href="#">Terms of Service</a>
                        <a class="text-xs" href="#">Privacy</a>
                    </nav>
                </footer>
        </div>
    );
}