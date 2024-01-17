// ng build --output-path="release" --configuration=production-live
// 2ba13d31-c66f-43c0-952d-605be7e85983

export const environment = {
    apiUrl: 'https://appfinikascruises.com/api',
    url: 'https://appfinikascruises.com',
    appName: 'Finikas Cruises',
    clientUrl: 'https://appfinikascruises.com',
    defaultLanguage: 'el-GR',
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
