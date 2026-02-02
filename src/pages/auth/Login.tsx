import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
// Ensure this path matches your folder structure exactly (Case-Sensitive!)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
    const { t } = useI18n();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your login logic here (e.g., Firebase or NestJS API call)
        console.log("Logging in with:", email);
        setTimeout(() => setIsLoading(false), 2000); // Demo timeout
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md border-none shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-[#0d2c54]">
                        {t("Britium Express")}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {t("Enter your credentials to access your account")}
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                    type="email" 
                                    placeholder="name@britiumexpress.com" 
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                    type="password" 
                                    placeholder={t("Password")}
                                    className="pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-[#ff6b00] hover:bg-[#e66000]" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t("Signing in...")}
                                </>
                            ) : (
                                t("Login")
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}