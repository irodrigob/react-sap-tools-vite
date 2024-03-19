import {
	TabItem,
	TabsList,
	TabContent,
	Tabs,
} from "shared/frontend/components/tabs";
import { useTranslations } from "@/translations/i18nContext";
import { TABS } from "sap/adt/infraestructure/constants/statusGroupContants";
import { useState } from "react";

export default function StatusGroupContainer() {
	const [tabSelected, setTabSelected] = useState(TABS.problems.key);
	const { getI18nText } = useTranslations();
	return (
		<Tabs>
			<TabsList>
				<TabItem
					key={TABS.problems.key}
					value={TABS.problems.key}
					active={tabSelected == TABS.problems.key}
					onSelectedTab={(tab: string) => {
						setTabSelected(tab);
					}}
				>
					{getI18nText(TABS.problems.i18nText)}
				</TabItem>
				<TabItem
					key={TABS.elementInfo.key}
					value={TABS.elementInfo.key}
					active={tabSelected == TABS.problems.key}
					onSelectedTab={(tab: string) => {
						setTabSelected(tab);
					}}
				>
					{getI18nText(TABS.elementInfo.i18nText)}
				</TabItem>
			</TabsList>
			<TabContent></TabContent>
		</Tabs>
	);
}
