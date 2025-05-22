import { memo } from "react";

function HeaderApp() {
    return (
        <header
            style={styles.header}
            className="header">
            <image />
            <h1>My App</h1>

            <div>
                <image />
                <image />
            </div>
        </header>
    );
}

export default memo(HeaderApp);


const styles = {
    header: {
        backgroundColor: '#3993D9',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
        with: '100%',
        height: '60px',
    },
}