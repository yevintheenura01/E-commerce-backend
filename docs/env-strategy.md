# Env Strategy  
  
Use one env file per service for service-specific values like PORT and MONGODB_URI.  
  
A shared root env example is fine only for values that are truly common, such as NODE_ENV or LOG_LEVEL.  
  
In real microservices, a single common runtime env file for all services is not a good default because it couples deployments and exposes unnecessary secrets across services. 
