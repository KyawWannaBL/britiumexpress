import { Demo } from "./components/Demo";
import { useI18n } from "@/i18n/I18nProvider";
const Index = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Demo />
        <p className="text-xl text-muted-foreground">{t("Start building your amazing project here!")}</p>
      </div>
    </div>
  );
};

export default Index;