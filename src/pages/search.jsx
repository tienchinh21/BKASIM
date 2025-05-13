import {
    Page, Header
} from "zmp-ui";

function SearchPage() {
    return (
        <Page className="bg-gradient-to-b from-blue-700 to-blue-500 min-h-screen">
            <Header title="TÌM KIẾM" backLink={true} className="text-white" />
        </Page>
    );
}

export default SearchPage;
