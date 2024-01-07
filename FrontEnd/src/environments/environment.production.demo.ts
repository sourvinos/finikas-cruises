// ng build --output-path="release" --configuration=production-demo

export const environment = {
    apiUrl: 'http://appfinikas-001-site1.etempurl.com/api',
    url: 'http://appfinikas-001-site1.etempurl.com',
    appName: 'Finikas Cruises',
    clientUrl: 'https://appfinikas-001-site1.etempurl.com',
    defaultLanguage: 'en-GB',
    featuresIconDirectory: 'assets/images/features/',
    nationalitiesIconDirectory: 'assets/images/nationalities/',
    portStopOrdersDirectory: 'assets/images/port-stop-orders/',
    cssUserSelect: 'auto',
    minWidth: 1280,
    login: {
        username: '',
        email: '',
        password: '',
        noRobot: false
    },
    production: true
}
