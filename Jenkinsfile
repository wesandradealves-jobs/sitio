pipeline {
    agent any

    tools {
			nodejs 'nodejs'
    }

    environment {
			AZURE_STORAGE_ACCOUNT_NAME = getSAName()
			REACT_APP_ENV = getEnvironment()
			REACT_APP_BFF_URL = getBffUrl()
    }

    stages {

        stage("Build Statics") {
            when {
                anyOf {
                    branch 'develop'
                    branch 'master'
                }
            }
            steps {
                sh "yarn install"
                sh "yarn build"
            }
        }

        stage("Publish Statics - Azure Blob") {
            when {
                anyOf {
                    branch 'develop'
                    branch 'master'
                }
            }
            steps {
							dir("build") {
								azureUpload blobProperties: [cacheControl: '', contentEncoding: '', contentLanguage: '', contentType: '', detectContentType: true], cleanUpContainerOrShare: true, containerName: '$web', filesPath: '**/', storageCredentialId: "${env.AZURE_STORAGE_ACCOUNT_NAME}", storageType: 'blobstorage'
							}
            }
        }
    }

    post {
        success {
            office365ConnectorSend color: 'GREEN', status: 'success', webhookUrl: "${env.TEAMS_CHANNEL_URL}"
        }
        failure {
            office365ConnectorSend color: 'RED', status: 'failed', webhookUrl: "${env.TEAMS_CHANNEL_URL}"
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        disableConcurrentBuilds()
        timeout(time: 25, unit: 'MINUTES')
    }
}

def getSAName() {
	if (env.BRANCH_NAME == 'develop') {
		return "siscobfrontendhml"
	}
	return "siscobfrontendprod"
}

def getEnvironment() {
	if (env.BRANCH_NAME == 'develop') {
		return "homolog"
	}

	return "production"
}

def getBffUrl() {
	if (env.BRANCH_NAME == 'develop') {
		return "bff-siscob-hml.integracao.brmalls.com.br"
	}

	return "bff-siscob-prd.integracao.brmalls.com.br"
}
