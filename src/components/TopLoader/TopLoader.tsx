import { useNavigation } from 'react-router-dom';

function TopLoader() {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return (
        <div
            className={`fixed z-50 top-0 left-0 w-full h-1 bg-primary transition-transform duration-300 ${
                isLoading ? 'transform scale-x-100' : 'transform scale-x-0'
            }`}
            style={{ transformOrigin: 'left center' }}
        />
    );
}

export default TopLoader;
