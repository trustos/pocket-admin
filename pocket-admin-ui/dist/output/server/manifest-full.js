export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.9nmXEFAN.js","app":"_app/immutable/entry/app.C6wErln_.js","imports":["_app/immutable/entry/start.9nmXEFAN.js","_app/immutable/chunks/entry.C3A8051z.js","_app/immutable/chunks/runtime.Dke3Ijwc.js","_app/immutable/entry/app.C6wErln_.js","_app/immutable/chunks/runtime.Dke3Ijwc.js","_app/immutable/chunks/render.BghTnDVO.js","_app/immutable/chunks/disclose-version.BqI4RJva.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
