const log = require('/opt/helper/logger').logger;
const validator = require('/opt/helper/validator');

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });

exports.lambdaHandler = async (event, context) => {
	try {
		// Checking event
		log.info('Checking event');
		if (!event) throw new Error('Event not found');

		// Validating Payload
		log.info('Validating payload');
		const validation = await validator.validate(event, 'getdata');

		if (validation.result === 'invalid') {
			// Invalid Payload
			log.error(JSON.stringify(validation.errors));
			return { status: 'Error', message: validation.errors };
		} else {
			// Valid payload
			log.info('Payload valid');

			// DDb Query parameters
			const getDataParams = {
				TableName: process.env.MERCHANTS_DDB_TABLE,
			};
			// Add index if event contains storeName
			if (event.storeName && event.storeName !== '') {
				getDataParams.IndexName = 'storeName-index';
			}
			// Add keyConditions based on index
			if (getDataParams.IndexName && getDataParams.IndexName === 'storeName-index') {
				getDataParams.KeyConditions = {
					storeName: {
						ComparisonOperator: 'EQ',
						AttributeValueList: [event.storeName],
					},
				};
			} else {
				getDataParams.KeyConditions = {
					email: {
						ComparisonOperator: 'EQ',
						AttributeValueList: [event.email],
					},
				};
			}

			// Query Dynamo DB
			log.info('Querying Dynamo DB');
			const getDataRes = await docClient.query(getDataParams).promise();

			// Return Data
			return {
				status: 'Success',
				data: getDataRes.Items,
			};
		}
	} catch (error) {
		console.log(error);
		log.error(error.message ? error.message : error);
		return { status: 'Error', message: error.message ? error.message : error };
	}
};
