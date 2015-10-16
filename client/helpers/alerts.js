// Local (client-only) collection
Alerts = new Mongo.Collection(null);

throwAlert = function(message, type) {
  Alerts.insert({message: message, type: type});
};