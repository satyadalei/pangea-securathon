require('dotenv').config({ path: require('find-config')('.env') });
const { PangeaConfig, 
        AuditService, 
        URLIntelService,
        UserIntelService, 
        IPIntelService, 
        DomainIntelService ,
        RedactService
    } = require("pangea-node-sdk");
//const pangea = require('pangea-node-sdk'); see services in log
// this is common
const pangeaDomain = process.env.PANGEA_DOMAIN;

//respective  service token
const auditLogToken = process.env.AUDIT_LOG_TOKEN; // audit-log-token
const ipIntelToken  = process.env.IP_INTEL_TOKEN;  // ip-intel-token
const domainIntelToken = process.env.DOMAIN_INTEL_TOKEN; //domain-intel token
const userIntelToken = process.env.USER_INTEL_TOKEN;
const urlIntelToken = process.env.URL_INTEL_TOKEN;
const redactToken = process.env.REDACT_TOKEN;


//config - think like connecting your app to pangea domain
const config = new PangeaConfig({ domain: pangeaDomain });

//enabled services
const audit = new AuditService(auditLogToken,config);
const ipIntel = new IPIntelService(ipIntelToken,config);
const domainIntel = new DomainIntelService(domainIntelToken,config);
const userIntel = new UserIntelService(userIntelToken,config);
const urlIntel = new URLIntelService(urlIntelToken,config);
const redact = new RedactService(redactToken,config);
async function testPangeaServices(){
    const redactResponse = await redact.redact(
        email="satya@gmail.com",
        phone="87564516"
    )
    //console.log(redactResponse);
}
testPangeaServices();


//get ip address of user and host
//---> this is helpfull when some one requests to my server. then i can recognise his ip address easily
const clientIpAddress = (req) => {
    return req?.headers["origin"] || req?.socket.remoteAddress || "localhost";
};
//---> this is help to know that at address client is trying request
const hostIpAddress = (req) => {
    return req?.headers["host"] || req?.hostname || "localhost";
};

//pangea's all possible services are listed below
// AuditService: --we will use
// AuthNService: -- couldnot understand & not able to implement 
// BaseService: 
// EmbargoService: -- we may use
// RedactService:  -- We will use
// FileIntelService: 
// DomainIntelService: 
// IPIntelService:  -- we may use this
// URLIntelService:
// UserIntelService: -- we will use





// export modules 
module.exports = {audit,userIntel,urlIntel,redact,ipIntel,domainIntel, clientIpAddress,hostIpAddress};