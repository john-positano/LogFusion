window.GLOBAL.LogFusionApplication.config(
	function ($stateProvider, $locationProvider) {
		// defaults
		$locationProvider.hashPrefix('');

		// set routes
		$stateProvider
			.state(
				'Desktop',
				{
					url: '/',
					views: {
						'main' : {
							templateUrl: 'views/Desktop.html'
						} 
					}
				}
			)
			.state(
				'otherwise',
				{ url: '/' }
			)
		;
	}
);