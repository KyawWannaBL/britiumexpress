import { useI18n } from "@/i18n/I18nProvider";
export const Demo = () => {
  const { t } = useI18n();

  return <div>{t("Hello World")}</div>;
};