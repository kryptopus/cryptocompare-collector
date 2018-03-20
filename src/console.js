import SolfegeJS from "solfegejs"
import MyBundle from "./Bundle"

// Create application instance
let application = SolfegeJS.factory(`${__dirname}/../config/parameters.yml`);
application.addBundle(new MyBundle);

// Start the application
let parameters = process.argv.slice(2);
application.start(parameters);
