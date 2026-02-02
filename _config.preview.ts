// Preview config - wraps the main config with base_path support
import basePath from "lume/plugins/base_path.ts";

// Dynamically import and modify the site
const configModule = await import("./_config.ts");
const site = configModule.default;

// Add base_path plugin for preview deployments  
site.use(basePath());

export default site;
