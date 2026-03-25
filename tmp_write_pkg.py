import json  
from pathlib import Path  
pkg = {  
    \"name\": \"order-service\",  
    \"version\": \"1.0.0\",  
    \"private\": True,  
    \"main\": \"src/server.js\",  
    \"scripts\": {  
        \"start\": \"node src/server.js\",  
        \"dev\": \"nodemon src/server.js\",  
        \"test\": \"echo Error: no test specified && exit 1\"  
    },  
    \"type\": \"commonjs\",  
    \"dependencies\": {  
        \"dotenv\": \"16.4.5\",  
        \"express\": \"4.21.2\",  
        \"mongoose\": \"8.13.2\"  
    },  
    \"devDependencies\": {  
        \"nodemon\": \"3.1.10\"  
    }  
}  
Path(r\"services/order-service/package.json\").write_text(json.dumps(pkg, indent=2) + \"\n\", encoding=\"utf-8\")  
