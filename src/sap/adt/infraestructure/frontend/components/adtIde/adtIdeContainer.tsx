import { SplitterElement, SplitterLayout } from '@ui5/webcomponents-react';
import FavoritePackagesContainer from 'sap/adt/infraestructure/frontend/components/favoritePackages/favoritePackagesContainer';

export default function AdtIdeContainer() {

    return (<SplitterLayout>
        <SplitterElement size="30%">
            <FavoritePackagesContainer />
        </SplitterElement>
        <SplitterElement>
            <p>Codigo</p>
        </SplitterElement>
    </SplitterLayout>)
}