// ng build --output-path="release" --configuration=production-demo
// 2ba13d31-c66f-43c0-952d-605be7e85983

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
