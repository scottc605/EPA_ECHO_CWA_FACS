(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "ObjectId",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "CWPName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "SourceID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "CWPStreet",
            dataType: tableau.dataTypeEnum.string
        }, {
			id: "CWPCity",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "CWPState",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "CWPStateDistrict",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "CWPZip",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "MasterExternalPermitNmbr",
			dataType: tableau.dataTypeEnum.string
		}, {
			id: "CWPCounty",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "CWPEPARegion",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "FacFederalAgencyCode",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "FacLong",
			dataType: tableau.dataTypeEnum.float
        }, {
			id: "CWPFacilityTypeIndicator",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "SpeciesCriticalHabitalFlag",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "ExposedActivity",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "AssociatedPollutant",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "ControlMeasure",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "ControlMeasureSchedule",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "EjscreenFlagUs",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "Over80CountUs",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "PctilePctpre1960Us",
			dataType: tableau.dataTypeEnum.string	
        }, {
			id: "PctileProximityRmpUs",
			dataType: tableau.dataTypeEnum.string
        }, {
			id: "PctileProximityTsdfUs",
			dataType: tableau.dataTypeEnum.string			

		}];

        var tableSchema = {
            id: "epacwafacs",
            alias: "EPA CWA Facilities from ECHO",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://ofmpub.epa.gov/echo/cwa_rest_services.get_facility_info?output=JSON&p_st=MN&p_tribedist=0", function(resp) {
            var feat = resp.Results.Facilities,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "ObjectId": feat[i].ObjectId,
                    "CWPName": feat[i].CWPName,
                    "SourceID": feat[i].SourceID,
                    "CWPStreet": feat[i].CWPStreet,
                    "CWPCity": feat[i].CWPCity,
                    "CWPState": feat[i].CWPState,
                    "CWPStateDistrict": feat[i].CWPStateDistrict,
                    "CWPZip": feat[i].CWPZip,
                    "MasterExternalPermitNmbr": feat[i].MasterExternalPermitNmbr,
                    "CWPCounty": feat[i].CWPCounty,
                    "CWPEPARegion": feat[i].CWPEPARegion,
                    "FacFederalAgencyCode": feat[i].FacFederalAgencyCode,
                    "FacLong": feat[i].FacLong,
                    "CWPFacilityTypeIndicator": feat[i].CWPFacilityTypeIndicator,
                    "ReceivingMs4Name": feat[i].ReceivingMs4Name,
                    "SpeciesCriticalHabitalFlag": feat[i].SpeciesCriticalHabitalFlag,
                    "ExposedActivity": feat[i].ExposedActivity,
                    "AssociatedPollutant": feat[i].AssociatedPollutant,
                    "ControlMeasure": feat[i].ControlMeasure,
                    "ControlMeasureSchedule": feat[i].ControlMeasureSchedule,
                    "EjscreenFlagUs": feat[i].EjscreenFlagUs,
                    "Over80CountUs": feat[i].Over80CountUs,
                    "PctilePctpre1960Us": feat[i].PctilePctpre1960Us,	
                    "PctileProximityRmpUs": feat[i].PctileProximityRmpUs,
                    "PctileProximityTsdfUs": feat[i].PctileProximityTsdfUs,					

                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "EPA CWA Facs"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
